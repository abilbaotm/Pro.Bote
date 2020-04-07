// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const firebase_tools = require('firebase-tools');
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

exports.vPublicacion = functions.https.onRequest(async (request , response) => {
  const isValidBearer = await validBearer(request);
  if (!isValidBearer) {
    response.status(400).json({
      error: 'Not Authorized'
    });
    return;
  }

  if(request.get("BUILD_ID") && request.get("BUILD_ID") !== '') {

    //get version DB
    let collectionRef = db.collection('versionado').doc('gitlabCI');
    let promise = collectionRef.get()
      .then((snapshot) => {
        var datos = snapshot.data();
        ++datos.vMicro;
        let nuevaVersion = datos.vMayor + "." + datos.vMenor + "." + datos.vMicro;
        datos['historial'].push({'BUILD_ID': request.get("BUILD_ID"), 'CI_PIPELINE_ID': request.get("CI_PIPELINE_ID"), 'version': nuevaVersion});

        let guardar = db.collection('versionado').doc('gitlabCI');
        guardar.set(datos);


        response.status(200).send(nuevaVersion);
      });
  } else {
    response.status(500).json({
      error: "Nada que hacer"
    });
  }
});


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
    let query;

    query = collectionRef.orderBy('__name__').limit(batchSize);


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



  let collectionRef = db.collection('viajes');
  let query = collectionRef.where('borrado', '==', true);
  query.get()
    .then((snapshot) => {
      // When there are no documents left, we are done
      if (snapshot.size === 0) {
        response.status(200).json({
          success: "Nada que hacer"
        });
        return;
      }
        snapshot.docs.forEach((doc) => {
          deleteCollection(db, doc.ref.path+"/personas", 200 );
          deleteCollection(db, doc.ref.path+"/pagos", 200);
          deleteCollection(db, doc.ref.path+"/gastos", 200);
          let batch = db.batch();
          snapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
          });
          batch.commit()

        });
        response.status(200).json({
          success: "Procesando..."
        });
        return;

    }
    );



});
