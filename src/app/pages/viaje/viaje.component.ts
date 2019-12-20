import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "viaje.component.html"
})
export class ViajeComponent implements OnInit {
  private idViaje: string;
  public viaje: unknown = [];

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute


) { }
  public gastos = [];

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      console.log(dbviaje.payload.data())
      this.viaje = dbviaje.payload.data()
    });

    this.firestoreService.getGastos(this.idViaje).subscribe((viajesSnapshot) => {
      this.gastos = [];
      viajesSnapshot.forEach((viajeData: any) => {
        this.gastos.push({
          id: viajeData.payload.doc.id,
          data: viajeData.payload.doc.data()
        });

      })
      console.log(this.gastos)

    });



  }

}
