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

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      console.log(dbviaje.payload.data())
      this.viaje.push(dbviaje.payload.data())
    });

    console.log(this.idViaje)


  }

  borrarViaje() {
    this.firestoreService.borrarViaje(this.idViaje).then(() => {
        this.router.navigate(['/dashboard'])
      }
    )
  }
}
