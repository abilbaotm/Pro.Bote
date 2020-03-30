import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {FirebaseUserModel} from "../../core/user.model";
import * as firebase from "firebase";
import {Gasto} from "../../models/gasto.model";
import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  user: FirebaseUserModel = new FirebaseUserModel();

  constructor(
    private firestore: AngularFirestore
  ) {}
  //Crea un nuevo gato
  public createCat(data: {nombre: string, url: string}) {
    return this.firestore.collection('cats').add(data);
  }
  //Obtiene un gato
  public getCat(documentId: string) {
    return this.firestore.collection('cats').doc(documentId).snapshotChanges();
  }
  //Obtiene todos los gatos
  public getCats() {
    return this.firestore.collection('cats').snapshotChanges();
  }
  //Actualiza un gato
  public updateCat(documentId: string, data: any) {
    return this.firestore.collection('cats').doc(documentId).set(data);
  }


  public getViajes() {
    var user = firebase.auth().currentUser;

    return this.firestore.collection('viajes', ref => {
      var path = new firebase.firestore.FieldPath('permitidos', user.email ,'activo');
      return ref.where(path, '==', true);
    }).snapshotChanges();
  }
  public getViaje(documentId: string) {
    return this.firestore.collection('viajes').doc(documentId).snapshotChanges();
  }

  public getPersonas(documentId: string) {
    return this.firestore.collection('viajes').doc(documentId).collection("personas").snapshotChanges()
  }

  public getGastos(documentId: string) {
    return this.firestore.collection('viajes').doc(documentId).collection('gastos',ref => {
      return ref.orderBy('fecha')
    }).snapshotChanges()
  }

  public getGasto(documentId: string, id: string) {
    return this.firestore.collection('viajes').doc(documentId).collection("gastos").doc(id).snapshotChanges()
  }
  public guardar(data: any) {
    return this.firestore.collection('test').add({"test": data});
  }

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
      if (ter.email!="") {

        permitidos[ter.email] = {
          activo: true,
          owner: false,
        }
      } else {
        ter.email = null
      }
      personas.push({
        "nombre": ter.nombre, "email": ter.email
      })
    });


    return this.firestore.collection( 'viajes').add(
      {
        "admin": user.uid,
        "descripcion": formdata.descripcion,
        "permitidos": permitidos,
        "monedaPrincipal": formdata.monedaPrincipal,
        "monedasAdicionales": formdata.monedasAdicionales,
        "fechas": {
            start: formdata.fechas.startDate.toDate(),
            end: formdata.fechas.endDate.toDate(),
          },
        "timezone": moment.tz.guess(),
        "borrado": false,
        "archivado": false
      }
    ).then(
      docRef => {
        for( let pers in personas) {
          this.firestore.collection( 'viajes/' + docRef.id + '/personas').add(personas[pers])
        }
        return docRef
      }
    )
  }

  borrarViaje(id: string) {
    return this.firestore.collection('viajes').doc(id).set({'borrado': true}, { merge: true })
  }

  archivarViaje(id: string) {
    return this.firestore.collection('viajes').doc(id).set({'archivado': true}, {merge: true})
  }

  borrarViajeCancelar(idViaje: string) {
    return this.firestore.collection('viajes').doc(idViaje).set({'borrado': false}, { merge: true })
  }

  nuevoGasto(idViaje: string, form: any) {
    let gastoForm;
    gastoForm = form ;

    let gasto;
    let personas = {};
    let numPersonas = 0;
    console.log(gastoForm);
    for (let personasKey in gastoForm.terceros) {
      personas[gastoForm.terceros[personasKey].id] = {"cantidad": gastoForm.terceros[personasKey].cantidad}
      numPersonas++;
    }

    // calcular totales
    if (gastoForm.partesIguales) {
      const total = gastoForm.cantidad / numPersonas;
      console.log("total");
      console.log(total);
      for (let personasKey in personas) {
        personas[personasKey]['cantidad'] = total;

      }
    } else {
      let total = 0.00;
      for (let personasKey in personas) {
        total += personas[personasKey]['cantidad'];
      }
      console.log("total");
      console.log(total);
      gastoForm.cantidad = total;
    }



    var user = firebase.auth().currentUser;
    gasto = {
      "descripcion": gastoForm.descripcion,
      "fecha":  moment(gastoForm.fecha).unix()* 1000,
      "timezone": moment.tz.guess(),
      "cantidad": gastoForm.cantidad,
      "partesIguales": gastoForm.partesIguales,
      "moneda":gastoForm.moneda,
      "ratio": gastoForm.ratio,
      "personas": personas,
      "creador": user.uid,
      "pagador": gastoForm.pagador
    };



    /* cantidad:
    partesIguales:
    ratio:
    moneda:
    pagador:
    personas

     */

    return this.firestore.collection( 'viajes/'+idViaje+'/gastos').add(
      gasto
    )
  }

  updateViaje(form: any, idViaje: string) {
    let documento = this.firestore.collection('cats').doc(idViaje)

    var user = firebase.auth().currentUser;


    var permitidos = {};
    permitidos[user.email] = {
      nombre: user.displayName,
      activo: true,
      owner: true
    };
    form.terceros.forEach(function (ter) {
      if (ter.email!="") {

        permitidos[ter.email] = {
          activo: true,
          owner: false,
        }
      } else {
        ter.email = null
      }
    });


    return documento.update(
      {
        "descripcion": form.descripcion,
        "permitidos": permitidos,
        "monedaPrincipal": form.monedaPrincipal,
        "monedasAdicionales": form.monedasAdicionales,
        "fechas": {
          start: form.fechas.startDate.toDate(),
          end: form.fechas.endDate.toDate(),
        },
        "timezone": moment.tz.guess(),
        "borrado": false,
        "archivado": false
      }
    )
  }
}
