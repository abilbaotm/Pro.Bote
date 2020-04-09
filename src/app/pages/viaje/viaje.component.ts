import { Component, OnInit } from "@angular/core";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Viaje} from "../../models/viaje.model";
import {Persona} from "../../models/persona.model";
import {Gasto} from "../../models/gasto.model";
import * as moment from 'moment-timezone';
import {Pago} from "../../models/pago.model";
import * as firebase from "firebase";
import Swal from "sweetalert2";
import {ThemePalette} from "@angular/material/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "viaje.component.html"
})
export class ViajeComponent implements OnInit {
  public user: any;
  private idViaje: string;
  public viaje: Viaje = new Viaje();
  public personas = new Array<Persona>();
  public personasIndex = {};
  public gastos = new Array<Gasto>();
  fechasFin: String;
  fechasInicio: String;
  public pagos = new Array<Pago>();

  public resumenPagos = {};

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router


) { }

  ngOnInit() {
    this.user = firebase.auth().currentUser;

    console.log(this.user.provider)

    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      this.viaje = (dbviaje.payload.data()) as Viaje;
      this.fechasInicio = moment.tz(this.viaje.fechas.start.toDate(), this.viaje.timezone).format('DD/M/YYYY');
      this.fechasFin = moment.tz(this.viaje.fechas.end.toDate(), this.viaje.timezone).format('DD/M/YYYY');
    });


    this.firestoreService.getPersonas(this.idViaje).subscribe((personasSnapshot) => {
        personasSnapshot.forEach(perso => {
          let persoTemp: Persona= perso.payload.doc.data() as Persona;
          persoTemp.id = perso.payload.doc.ref.id;
          this.personas.push(persoTemp);
          this.personasIndex[perso.payload.doc.ref.id] = (persoTemp).nombre
        })
      }
    );

    this.firestoreService.getGastos(this.idViaje).subscribe((gastosSnapshot) => {
      this.gastos = new Array<Gasto>();
      gastosSnapshot.forEach(gast => {
        let nuevoGasto;
        nuevoGasto = gast.payload.doc.data() as Gasto;
        nuevoGasto.fechaLocal = moment.tz(nuevoGasto.fecha, nuevoGasto.timezone).format('HH:mm DD/M/YYYY Z z');
        nuevoGasto.diaLocal = moment.tz(nuevoGasto.fecha, nuevoGasto.timezone).format('DD/M/YYYY');

        this.gastos.push(nuevoGasto)
      });
      console.log(this.gastos);

      this.personas.forEach( persoA => {
        if (this.resumenPagos[persoA.id] == undefined) {
          this.resumenPagos[persoA.id] = {}
        }
        this.resumenPagos[persoA.id].debe = {};
        this.personas.forEach( persoB => {
          this.resumenPagos[persoA.id].debe[persoB.id] = 0
        })

      });

      this.gastos.forEach(gasto => {
        for (let personasKey in gasto.personas) {
          this.resumenPagos[personasKey].debe[gasto.pagador] += (gasto.personas[personasKey].cantidad / gasto.ratio )
        }

      })

    });

    this.firestoreService.getPagos(this.idViaje).subscribe((gastosSnapshot) => {
      this.pagos = new Array<Pago>();
      gastosSnapshot.forEach(pag => {
        let nuevoPago;
        nuevoPago = pag.payload.doc.data() as Pago;
        nuevoPago.id = pag.payload.doc.id;
        nuevoPago.fechaLocal = moment.tz(nuevoPago.fecha, nuevoPago.timezone).format('HH:mm DD/M/YYYY Z z');
        nuevoPago.fechaDia = moment.tz(nuevoPago.fecha, nuevoPago.timezone).format('DD/M/YYYY');

        this.pagos.push(nuevoPago)
      });

      this.personas.forEach( persoA => {
        if (this.resumenPagos[persoA.id] == undefined) {
          this.resumenPagos[persoA.id] = {}
        }
        this.resumenPagos[persoA.id].pagos = {};
        this.personas.forEach( persoB => {
          this.resumenPagos[persoA.id].pagos[persoB.id] = 0
        })

      });
      this.pagos.forEach(pago => {
        if(!pago.eliminado) {
          this.resumenPagos[pago.pagador].pagos[pago.beneficiario] += (pago.cantidad / pago.ratio )
        }
      });
      console.log(this.resumenPagos)
    })


  }

  cancelarBorrado() {
    this.firestoreService.borrarViajeCancelar(this.idViaje).then(() => {}
    )
  }

  cancelarArchivado() {
    this.firestoreService.archivarViajeCancelar(this.idViaje).then(() => {}
    )
  }

  public idPersonaCuentasActiva: string;
  verPagosEliminados: boolean;
  verCuentasPersona(id: string) {
    this.idPersonaCuentasActiva = id;
    console.log(id)

  }

  eliminarPago(pago: Pago) {
    this.firestoreService.eliminarPago(this.idViaje, pago.id, true).then(() => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Pago eliminado',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }

  restaurarPago(pago: Pago) {
    this.firestoreService.eliminarPago(this.idViaje, pago.id, false).then(() => {
      Swal.fire({
        position: 'top',
        icon: 'success',
        title: 'Pago restaurado',
        showConfirmButton: false,
        timer: 1500
      })
    })

  }
}
