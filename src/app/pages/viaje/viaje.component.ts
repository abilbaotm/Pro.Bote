import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Viaje} from "../../models/viaje.model";
import {Persona} from "../../models/persona.model";
import {Gasto} from "../../models/gasto.model";

@Component({
  selector: "app-dashboard",
  templateUrl: "viaje.component.html"
})
export class ViajeComponent implements OnInit {
  private idViaje: string;
  public viaje: Viaje = new Viaje();
  public personas = new Array<Persona>();
  public gastos = new Array<Gasto>();

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router


) { }

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      this.viaje = (dbviaje.payload.data()) as Viaje
    });


    this.firestoreService.getPersonas(this.idViaje).subscribe((personasSnapshot) => {
        personasSnapshot.forEach(perso => {
          this.personas.push(perso.payload.doc.data() as Persona)
        })
      }
    );

    this.firestoreService.getGastos(this.idViaje).subscribe((gastosSnapshot) => {
      gastosSnapshot.forEach(gast => {
        this.gastos.push(gast.payload.doc.data() as Gasto)
      });
      console.log(this.gastos)
    })


  }

  borrarViaje() {
    this.firestoreService.borrarViaje(this.idViaje).then(() => {
        this.router.navigate(['/dashboard'])
      }
    )
  }
}
