import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import Unsplash, { toJson } from "unsplash-js";

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
    const unsplash = new Unsplash({
      accessKey: "sMiNyfb3_4aGOkoW3V3al1l0-oxTotd-7ZDKmB78sBk",
      secret: "OQotJKCbCgjsYh_2yasNG1TwRZe_4nNDgkc9_Y6DkNc"
    });
    unsplash.search.photos("viaje tokyo", 1)
      .then(toJson)
      .then(json => {
        console.log(json["results"][0])
        unsplash.photos.downloadPhoto(json["results"][0]);
      });
    this.cargarViajes();

  }
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }
  public viajes = [];

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
      this.viajes = [];
      viajesSnapshot.forEach((viajeData: any) => {
        this.viajes.push({
          id: viajeData.payload.doc.id,
          data: viajeData.payload.doc.data()
        });
        console.log( viajeData.payload.doc.data())

      })
    });
  }


}
