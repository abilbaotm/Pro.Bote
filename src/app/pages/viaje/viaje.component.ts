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

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      console.log(dbviaje.payload.data())
      this.viaje = dbviaje.payload.data()
    });

    console.log(this.idViaje)


  }

}
