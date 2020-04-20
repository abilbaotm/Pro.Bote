// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
// Este fichero exporta dos funciones para Firebase Functions

// Inicio de constantes
const functions = require('firebase-functions');
const admin = require('firebase-admin');

// Check de key secreta. Necesario para que se realice cualquier tarea. Tipo de login: Bearer
async function validBearer(request) {
  // key valida
  const key = 'e1484430-4cfc-407f-8c02-d51f62d6f13d';

  // obtener key de cabecera
  const authorization = request.get('Authorization');
  // Retirar Bearer de la cabecera
  const split =
    authorization ? authorization.split('Bearer ') : [];
  const bearerKey =
    split && split.length >= 2 ? split[1] : undefined;

  // true/false si el login es OK
  return key === bearerKey;
}

// Acceder a la bbdd firestore
admin.initializeApp();
const db = admin.firestore();

// funcion vPublicacion
exports.vPublicacion = functions.https.onRequest(async (request, response) => {
  // validar login Bearer
  const isValidBearer = await validBearer(request);
  if (!isValidBearer) {
    response.status(400).json({
      error: 'Not Authorized'
    });
    return;
  }

  if (request.get("BUILD_ID") && request.get("BUILD_ID") !== '') {

    //get version DB
    let collectionRef = db.collection('versionado').doc('gitlabCI');
    let promise = collectionRef.get()
      .then((snapshot) => {
        var datos = snapshot.data();
        ++datos.vMicro;
        let nuevaVersion = datos.vMayor + "." + datos.vMenor + "." + datos.vMicro;
        datos['historial'].push({
          'BUILD_ID': request.get("BUILD_ID"),
          'CI_PIPELINE_ID': request.get("CI_PIPELINE_ID"),
          'version': nuevaVersion
        });

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

// funcion eliminar
exports.eliminar = functions.https.onRequest(async (request, response) => {
  // validar login Bearer

  const isValidBearer = await validBearer(request);
  if (!isValidBearer) {
    response.status(400).json({
      error: 'Not Authorized'
    });
    return;
  }


  // deleteCollection. Creara una query con documentos para ser eliminados
  function deleteCollection(db, collectionPath, batchSize) {
    let collectionRef = db.collection(collectionPath);
    let query;

    query = collectionRef.orderBy('__name__').limit(batchSize);


    // devolver una promesa de resultado de la funcionó deleteQueryBatch
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, batchSize, resolve, reject);
    });
  }

  // función necesaria para deleteCollection
  function deleteQueryBatch(db, query, batchSize, resolve, reject) {
    query.get()
      .then((snapshot) => {
        // Si no hay documentos, nada que hacer
        if (snapshot.size === 0) {
          return 0;
        }

        // declarar un eliminado en batch
        let batch = db.batch();
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });

        //por cada documento añadir una tarea de eliminado
        return batch.commit().then(() => {
          return snapshot.size;
        });
      }).then((numDeleted) => {
      if (numDeleted === 0) {
        resolve();
        return;
      }

      // iterar en siguiente tick de proceso, evitara que explote el stack
      process.nextTick(() => {
        deleteQueryBatch(db, query, batchSize, resolve, reject);
      });
    })
      .catch(reject);
  }


  // acceder colección viajes
  let collectionRef = db.collection('viajes');
  // filtrar y buscar los viajes pendientes de borrar
  let query = collectionRef.where('borrado', '==', true);
  query.get()
    .then((snapshot) => {
      // Finalizar si no existen documentos
      if (snapshot.size === 0) {
        response.status(200).json({
          success: "Nada que hacer"
        });
        return;
      }
      // por cada viaje eliminar la colección de /personas, /pagos y /gastos dentro del viaje
      // (llamada a deleteCollection)
      snapshot.docs.forEach((doc) => {
        deleteCollection(db, doc.ref.path + "/personas", 200);
        deleteCollection(db, doc.ref.path + "/pagos", 200);
        deleteCollection(db, doc.ref.path + "/gastos", 200);

        // declarar un eliminado en batch
        let batch = db.batch();

        //por cada documento dentro de viaje añadir una tarea de eliminado
        snapshot.docs.forEach((doc) => {
          batch.delete(doc.ref);
        });
        // hacer persistentes los cambios
        batch.commit()

      });
        response.status(200).json({
          success: "Procesando..."
        });


      }
    );


});
