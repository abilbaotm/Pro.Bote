import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: "app-dashboard",
  templateUrl: "viaje.component.html"
})
export class ViajeComponent implements OnInit {
  private idViaje: string;
  public viaje = [];

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router


) { }
  public gastos = [];

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      this.viaje.push(dbviaje.payload.data())
    });

    console.log("this.viaje");
    console.log(this.viaje);
    this.firestoreService.getGastos(this.idViaje).subscribe((viajesSnapshot) => {
      this.gastos = [];
      viajesSnapshot.forEach((viajeData: any) => {
        this.gastos.push({
          id: viajeData.payload.doc.id,
          data: viajeData.payload.doc.data()
        });

      });
      console.log(this.gastos)

    });



  }

  borrarViaje() {
    this.firestoreService.borrarViaje(this.idViaje).then(() => {
        this.router.navigate(['/dashboard'])
      }
    )
  }
}
