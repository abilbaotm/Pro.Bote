import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {FirebaseUserModel} from '../../core/user.model';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import * as moment from 'moment-timezone';
import {ToastrService} from "ngx-toastr";

//Servicios del Firestore

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {
  }

  //Obtiene los viajes
  public getViajes() {
    var user = firebase.auth().currentUser;

    return this.firestore.collection('viajes', ref => {
      var path = new firebase.firestore.FieldPath('permitidos', user.email, 'activo');
      return ref.where(path, '==', true);
    }).snapshotChanges();
  }

  //Obtiene un viaje
  public getViaje(documentId: string) {
    return this.firestore.collection('viajes').doc(documentId).snapshotChanges();
  }

  //Obtiene una persona
  public getPersonas(documentId: string) {
    return this.firestore.collection('viajes').doc(documentId).collection("personas").snapshotChanges()
  }

  //Obtiene los gastos de un viaje
  public getGastos(documentId: string) {
    return this.firestore.collection('viajes').doc(documentId).collection('gastos', ref => {
      return ref.orderBy('fecha')
    }).snapshotChanges()
  }

  //Obtiene los pagos de un viaje
  getPagos(documentId: string) {
    return this.firestore.collection('viajes').doc(documentId).collection('pagos', ref => {
      return ref.orderBy('fecha')
    }).snapshotChanges()
  }

  //Obtiene el gasto de un viaje
  public getGasto(documentId: string, id: string) {
    return this.firestore.collection('viajes').doc(documentId).collection("gastos").doc(id).snapshotChanges()
  }

  //Crea un viaje
  nuevoViaje(formdata: any) {
    var user = firebase.auth().currentUser;


    var permitidos = {};
    var personas = [];
    permitidos[user.email] = {
      nombre: user.displayName,
      activo: true,
      owner: true
    };
    personas.push({
      "nombre": user.displayName, "email": user.email
    });
    formdata.terceros.forEach(function (ter) {
      if (ter.email != '') {

        permitidos[ter.email] = {
          activo: true,
          owner: false,
          'nombre': ter.nombre,
        }
      } else {
        ter.email = null
      }
      personas.push({
        "nombre": ter.nombre, "email": ter.email
      })
    });


    return this.firestore.collection('viajes').add(
      {
        'admin': user.uid,
        'descripcion': formdata.descripcion,
        'permitidos': permitidos,
        'monedaPrincipal': formdata.monedaPrincipal,
        'monedasAdicionales': formdata.monedasAdicionales,
        'presupuesto': formdata.presupuesto,
        'fechas': {
          start: formdata.fechas.startDate.toDate(),
          end: formdata.fechas.endDate.toDate(),
        },
        'timezone': moment.tz.guess(),
        'borrado': false,
        'archivado': false
      }
    ).then(
      docRef => {
        for (let pers in personas) {
          this.firestore.collection('viajes/' + docRef.id + '/personas').add(personas[pers])
        }
        return docRef
      }
    )
  }

  //Borra un viaje
  borrarViaje(id: string) {
    return this.firestore.collection('viajes').doc(id).set({'borrado': true}, {merge: true})
  }

  //Archiva un viaje
  archivarViaje(id: string) {
    return this.firestore.collection('viajes').doc(id).set({'archivado': true}, {merge: true})
  }

  //Cancela el borrado de un viaje
  borrarViajeCancelar(idViaje: string) {
    return this.firestore.collection('viajes').doc(idViaje).set({'borrado': false}, {merge: true})
  }

  //Cancela el archivado de un viaje
  archivarViajeCancelar(idViaje: string) {
    return this.firestore.collection('viajes').doc(idViaje).set({'archivado': false}, {merge: true})
  }

  //Crea un nuevo gasto
  nuevoGasto(idViaje: string, form: any) {
    let gastoForm;
    gastoForm = form;

    let gasto;
    let personas = {};
    let numPersonas = 0;
    for (let personasKey in gastoForm.terceros) {
      personas[gastoForm.terceros[personasKey].id] = {"cantidad": gastoForm.terceros[personasKey].cantidad}
      numPersonas++;
    }

    // calcular totales
    if (gastoForm.partesIguales) {
      const total = gastoForm.cantidad / numPersonas;
      for (let personasKey in personas) {
        personas[personasKey]['cantidad'] = total;

      }
    } else {
      let total = 0.00;
      for (let personasKey in personas) {
        total += personas[personasKey]['cantidad'];
      }
      gastoForm.cantidad = total;
    }


    var user = firebase.auth().currentUser;
    gasto = {
      'descripcion': gastoForm.descripcion,
      'fecha': moment(gastoForm.fecha).unix() * 1000,
      'timezone': moment.tz.guess(),
      'cantidad': gastoForm.cantidad,
      'partesIguales': gastoForm.partesIguales,
      'moneda': gastoForm.moneda,
      'ratio': gastoForm.ratio,
      'personas': personas,
      'creador': user.uid,
      'pagador': gastoForm.pagador,
      'eliminado': false
    };

    return this.firestore.collection('viajes/' + idViaje + '/gastos').add(
      gasto
    )
  }

  //Crea un nuevo pago
  nuevopago(idViaje: string, form: any) {
    let pagoForm;
    pagoForm = form;
    let pago: {};

    var user = firebase.auth().currentUser;
    pago = {
      'pagador': pagoForm.pagador,
      'beneficiario': pagoForm.beneficiario,
      'fecha': moment(pagoForm.fecha).unix() * 1000,
      'creador': user.uid,
      'timezone': moment.tz.guess(),
      'cantidad': pagoForm.cantidad,
      'ratio': pagoForm.ratio,
      'moneda': pagoForm.moneda,
      'nota': pagoForm.nota,
      'eliminado': false


    };
    return this.firestore.collection('viajes/' + idViaje + '/pagos').add(
      pago
    )
  }

  //Actualiza un viaje
  updateViaje(form: any, idViaje: string) {
    let documento = this.firestore.collection('viajes').doc(idViaje);

    var user = firebase.auth().currentUser;

    var personas = {};
    var permitidos = {};
    var nuevasPersonas = [];
    permitidos[user.email] = {
      nombre: user.displayName,
      activo: true,
      owner: true
    };

    // verifica si hay terceros y luego procesarlos. Puede que sean solo personas participates del viaje.
    // Añadirlo a permitidos si tienen de un email
    if (form.terceros != undefined) {
      form.terceros.forEach(function (ter) {
        if (ter.email != '') {

          permitidos[ter.email] = {
            activo: true,
            owner: false,
            'nombre': ter.nombre,
          }
        } else {
          ter.email = null
        }
        if (ter.id != '') {
          personas[ter.id] = {
            "nombre": ter.nombre,
            "email": ter.email
          }
        } else {
          nuevasPersonas.push({
            "nombre": ter.nombre,
            "email": ter.email
          })
        }

      });
    }
    for( let pers in personas) {
      this.firestore.collection('viajes/' + idViaje + '/personas').doc(pers).update(personas[pers]).then(r => {})

    }
    for( let pers in nuevasPersonas) {
      this.firestore.collection( 'viajes/' + idViaje + '/personas').add(nuevasPersonas[pers])
    }
    return documento.set(
      {
        "descripcion": form.descripcion,
        "permitidos": permitidos,
        "monedasAdicionales": form.monedasAdicionales,
        'presupuesto': form.presupuesto,
        "fechas": {
          start: form.fechas.startDate.toDate(),
          end: form.fechas.endDate.toDate(),
        },
        "timezone": moment.tz.guess(),
        "borrado": false,
        "archivado": false
      }, {merge: true}
    ).then(
      docRef => {

        return docRef
      }
    )
  }

  //Elimina un pago
  eliminarPago(idViaje: string, idPago: string, accion: boolean) {
    return this.firestore.collection('viajes/' + idViaje + '/pagos').doc(idPago).set({'eliminado': accion}, {merge: true})

  }

  //Elimina un gasto
  eliminarGasto(idViaje: string, idGasto: string, accion: boolean) {
    return this.firestore.collection('viajes/' + idViaje + '/gastos').doc(idGasto).set({'eliminado': accion}, {merge: true})

  }

  //Edita un gasto
  editarGasto(idViaje: string, idGasto: string, form: any, timezone: string) {
    let gastoForm;
    gastoForm = form;

    let gasto;
    let personas = {};
    let numPersonas = 0;
    for (let personasKey in gastoForm.terceros) {
      personas[gastoForm.terceros[personasKey].id] = {"cantidad": gastoForm.terceros[personasKey].cantidad}
      numPersonas++;
    }

    // calcular totales
    if (gastoForm.partesIguales) {
      const total = gastoForm.cantidad / numPersonas;
      for (let personasKey in personas) {
        personas[personasKey]['cantidad'] = total;

      }
    } else {
      let total = 0.00;
      for (let personasKey in personas) {
        total += personas[personasKey]['cantidad'];
      }
      gastoForm.cantidad = total;
    }


    var user = firebase.auth().currentUser;
    gasto = {
      'descripcion': gastoForm.descripcion,
      'fecha': moment(gastoForm.fecha).unix() * 1000,
      'timezone': timezone,
      'cantidad': gastoForm.cantidad,
      'partesIguales': gastoForm.partesIguales,
      'moneda': gastoForm.moneda,
      'ratio': gastoForm.ratio,
      'personas': personas,
      'creador': user.uid,
      'pagador': gastoForm.pagador
    };


    return this.firestore.collection('viajes/' + idViaje + '/gastos').doc(idGasto).set(gasto)
  }

  unsuscribe(FBSuscribers: any[]) {
    FBSuscribers.forEach(sub => {
      sub.unsubscribe();
    })

  }

  public alzarError() {
    this.toastr.clear()
    this.toastr.error('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Error al procesar la solicitud', 'ERROR', {
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-danger alert-with-icon",
      positionClass: 'toast-bottom-right',
      progressBar: false,
      disableTimeOut: true,
      tapToDismiss: true
    });
  }
}
