import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Viaje} from "../../models/viaje.model";
import {Persona} from "../../models/persona.model";
import {Gasto} from "../../models/gasto.model";
import * as moment from 'moment-timezone';

@Component({
  selector: "app-dashboard",
  templateUrl: "viaje.component.html"
})
export class ViajeComponent implements OnInit {
  private idViaje: string;
  public viaje: Viaje = new Viaje();
  public personas = new Array<Persona>();
  public personasIndex = {};
  public gastos = new Array<Gasto>();
  fechasFin: String;
  fechasInicio: String;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router


) { }

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      this.viaje = (dbviaje.payload.data()) as Viaje;
      this.fechasInicio = moment.tz(this.viaje.fechas.start.toDate(), this.viaje.timezone).format('DD/M/YYYY');
      this.fechasFin = moment.tz(this.viaje.fechas.end.toDate(), this.viaje.timezone).format('DD/M/YYYY');
    });


    this.firestoreService.getPersonas(this.idViaje).subscribe((personasSnapshot) => {
        personasSnapshot.forEach(perso => {
          this.personas.push(perso.payload.doc.data() as Persona);
          this.personasIndex[perso.payload.doc.ref.id] = (perso.payload.doc.data() as Persona).nombre
        })
      }
    );

    this.firestoreService.getGastos(this.idViaje).subscribe((gastosSnapshot) => {
      this.gastos = new Array<Gasto>();
      gastosSnapshot.forEach(gast => {
        let nuevoGasto;
        nuevoGasto = gast.payload.doc.data() as Gasto;
        nuevoGasto.fechaLocal = moment.tz(nuevoGasto.fecha, nuevoGasto.timezone).format('HH:mm DD/M/YYYY Z z');

        this.gastos.push(nuevoGasto)
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

  archivarViaje() {
    this.firestoreService.archivarViaje(this.idViaje).then(() => {
        this.router.navigate(['/dashboard'])
      }
    )
  }

  cancelarBorrado() {
    this.firestoreService.borrarViajeCancelar(this.idViaje).then(() => {}
    )
  }
}
