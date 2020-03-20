import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {FirebaseUserModel} from "../../core/user.model";
import * as firebase from "firebase";
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
    permitidos[user.email] = {
      nombre: user.displayName,
      activo: true,
      owner: true
    }
    formdata.terceros.forEach(function (ter) {
      permitidos[ter.email] = {
        nombre: ter.nombre,
        activo: true,
        owner: false,
      }
    });


    return this.firestore.collection( 'viajes').add(
      {
        "admin": user.uid,
        "descripcion": formdata.descripcion,
        "permitidos": permitidos
      }
    )
  }

  borrarViaje(id: string) {
    // TODO: borrar 'gastos'. Se quedaran documentos huérfanos hasta arreglar esto.
    return this.firestore.collection('viajes').doc(id).delete()
  }

  nuevoGasto(idViaje: string, form: any) {
    var user = firebase.auth().currentUser;

    return this.firestore.collection( 'viajes/'+idViaje+'/gastos').add(
      {
        "creador": user.uid,
        "descripcion": form.descripcion,
        "cantidad": form.cantidad
      }
    )
  }
}
