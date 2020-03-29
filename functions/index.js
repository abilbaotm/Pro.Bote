// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.

const functions = require('firebase-functions');
const admin = require('firebase-admin');

async function validBearer(request) {
  const key = 'e1484430-4cfc-407f-8c02-d51f62d6f13d';

  const authorization = request.get('Authorization');
  const split =
    authorization ? authorization.split('Bearer ') : [];
  const bearerKey =
    split && split.length >= 2 ? split[1] : undefined;

  return key === bearerKey;
}



admin.initializeApp();
const db = admin.firestore();

exports.eliminar = functions.https.onRequest(async (request , response) => {
  const isValidBearer = await validBearer(request);

  if (!isValidBearer) {
    response.status(400).json({
      error: 'Not Authorized'
    });
    return;
  }


  function deleteCollection(db, collectionPath, batchSize) {
    let collectionRef = db.collection(collectionPath);
    let query = collectionRef.orderBy('__name__').where('borrado', '==', true).limit(batchSize);

    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
  }

  function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
      .then((snapshot) => {
        // When there are no documents left, we are done
        if (snapshot.size == 0) {
          return 0;
        }

        // Delete documents in a batch
        let batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
      .catch(reject);
  }

  deleteCollection(db, 'viajes', 2000).then( res => {
    response.status(202).json({
      status: 'Accepted'
    });
    }

  );


});
