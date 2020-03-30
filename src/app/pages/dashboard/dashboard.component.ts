import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import Unsplash, { toJson } from "unsplash-js";
import * as moment from 'moment-timezone';

@Component({
  selector: "app-dashboard",
  templateUrl: "dashboard.component.html"
})
export class DashboardComponent implements OnInit {
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;

  constructor(
    private firestoreService: FirestoreService
  ) { }

  ngOnInit() {


    this.cargarViajes();

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  public todosViajes = {"Activos": [],"Futuros": [],"Archivados": [],"Pendientes de Borrar": []};

  enviarFirebase() {
    let data;
    data =  new Date().toString();

    this.firestoreService.guardar(this.data);
    /*this.firestoreService.getCats().subscribe((catsSnapshot) => {
      this.cats = [];
      catsSnapshot.forEach((catData: any) => {
        this.cats.push({
          id: catData.payload.doc.id,
          data: catData.payload.doc.data()
        });
      })
    });*/
  }
  cargarViajes() {
    this.firestoreService.getViajes().subscribe((viajesSnapshot) => {
      viajesSnapshot.forEach((viajeData: any) => {
        var datosViaje = viajeData.payload.doc.data();
        datosViaje.fechasInicio = moment.tz(datosViaje.fechas.start.toDate(), datosViaje.timezone).format('DD/M/YYYY');
        datosViaje.fechasFin = moment.tz(datosViaje.fechas.end.toDate(), datosViaje.timezone).format('DD/M/YYYY');
        if (datosViaje.borrado) {
          this.todosViajes['Pendientes de Borrar'].push({
            id: viajeData.payload.doc.id,
            data: datosViaje}
            )
        } else if (datosViaje.archivado) {
          this.todosViajes['Archivados'].push({
            id: viajeData.payload.doc.id,
            data: datosViaje}
          )
        } else if (datosViaje.fechas.start.seconds < moment().unix()) {
          console.log(datosViaje.fechas.start.seconds);
          console.log(moment().unix());
          this.todosViajes['Activos'].push({
            id: viajeData.payload.doc.id,
            data: datosViaje}
          )
        } else {
          this.todosViajes['Futuros'].push({
            id: viajeData.payload.doc.id,
            data: datosViaje}
          )
        }

      })




      const unsplash = new Unsplash({
        accessKey: "sMiNyfb3_4aGOkoW3V3al1l0-oxTotd-7ZDKmB78sBk",
        secret: "OQotJKCbCgjsYh_2yasNG1TwRZe_4nNDgkc9_Y6DkNc"
      });

      for (let categorias in this.todosViajes) {

        for (let todosViajeKey in this.todosViajes[categorias]) {

          unsplash.search.photos(this.todosViajes[categorias][todosViajeKey].data.descripcion, 1, 1,  {})
            .then(toJson)
            .then(json => {
              console.log(json["results"][0])
              this.todosViajes[categorias][todosViajeKey].data.foto = json["results"][0];
            });



        }

      }
    });



  }


}
