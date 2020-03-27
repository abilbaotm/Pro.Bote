import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {FirebaseUserModel} from "../../core/user.model";
import * as firebase from "firebase";
import {Gasto} from "../../models/gasto.model";
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
    return this.firestore.collection('viajes').doc(documentId).collection("gastos").snapshotChanges()
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
        "permitidos": permitidos
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
    // TODO: borrar 'gastos'. Se quedaran documentos huérfanos hasta arreglar esto.
    return this.firestore.collection('viajes').doc(id).delete()
  }

  nuevoGasto(idViaje: string, form: any) {
    let gastoForm;
    gastoForm = form ;

    let gasto;
    let personas = {};
    console.log(gastoForm);
    for (let personasKey in gastoForm.terceros) {
      console.log(personasKey)
      personas[gastoForm.terceros[personasKey].id] = {"cantidad": gastoForm.terceros[personasKey].cantidad}
    }

    gasto = {
      "descripcion": gastoForm.descripcion,
      "fecha": gastoForm.fecha,
      "cantidad": gastoForm.cantidad,
      "partesIguales": gastoForm.partesIguales,
      "personas": personas
    };



    /* cantidad:
    partesIguales:
    ratio:
    moneda:
    pagador:
    personas

     */
    var user = firebase.auth().currentUser;

    return this.firestore.collection( 'viajes/'+idViaje+'/gastos').add(
      gasto
    )
  }
}
