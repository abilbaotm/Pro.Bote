import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Viaje} from '../../models/viaje.model';
import {Persona} from '../../models/persona.model';
import {Gasto} from '../../models/gasto.model';
import * as moment from 'moment-timezone';
import {Pago} from '../../models/pago.model';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import {NavServiceService} from "../../services/nav-service/nav-service.service";

//Componente Viaje

@Component({
  selector: 'app-dashboard',
  templateUrl: 'viaje.component.html'
})
export class ViajeComponent implements OnInit {
  public user: any;
  public viaje: Viaje = new Viaje();
  public personas = new Array<Persona>();
  public personasIndex = {};
  public gastos = new Array<Gasto>();
  fechasFin: String;
  fechasInicio: String;
  public pagos = new Array<Pago>();
  public resumenPagos = {};
  public idPersonaCuentasActiva: string;
  verPagosEliminados: boolean;
  verGastosEliminados: boolean;
  private idViaje: string;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    public nav: NavServiceService,
  ) {
  }

  ngOnInit() {
    this.user = firebase.auth().currentUser;


    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    //Datos del viaje
    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      this.viaje = (dbviaje.payload.data()) as Viaje;
      this.fechasInicio = moment.tz(this.viaje.fechas.start.toDate(), this.viaje.timezone).format('DD/M/YYYY');
      this.fechasFin = moment.tz(this.viaje.fechas.end.toDate(), this.viaje.timezone).format('DD/M/YYYY');

      if (this.viaje.admin != this.user.uid) {
        this.nav.permisos = false;
      } else {
        this.nav.permisos = true
      }

    });


    //Datos de las personas del viaje
    this.firestoreService.getPersonas(this.idViaje).subscribe((personasSnapshot) => {
      this.personas = new Array<Persona>();
      this.personasIndex = {}
        personasSnapshot.forEach(perso => {
          let persoTemp: Persona = perso.payload.doc.data() as Persona;
          persoTemp.id = perso.payload.doc.ref.id;
          this.personas.push(persoTemp);
          this.personasIndex[perso.payload.doc.ref.id] = (persoTemp).nombre
        })
      }
    );

    //Datos de los gastos del viaje
    this.firestoreService.getGastos(this.idViaje).subscribe((gastosSnapshot) => {
      this.gastos = new Array<Gasto>();
      gastosSnapshot.forEach(gast => {
        let nuevoGasto;
        nuevoGasto = gast.payload.doc.data() as Gasto;
        nuevoGasto.fechaLocal = moment.tz(nuevoGasto.fecha, nuevoGasto.timezone).format('HH:mm DD/M/YYYY Z z');
        nuevoGasto.diaLocal = moment.tz(nuevoGasto.fecha, nuevoGasto.timezone).format('DD/M/YYYY');
        nuevoGasto.id = gast.payload.doc.id

        this.gastos.push(nuevoGasto)
      });

      this.personas.forEach(persoA => {
        if (this.resumenPagos[persoA.id] == undefined) {
          this.resumenPagos[persoA.id] = {}
        }
        this.resumenPagos[persoA.id].debe = {};
        this.personas.forEach(persoB => {
          this.resumenPagos[persoA.id].debe[persoB.id] = 0
        })

      });

      this.gastos.forEach(gasto => {
        if (!gasto.eliminado) {
          for (let personasKey in gasto.personas) {
            this.resumenPagos[personasKey].debe[gasto.pagador] += (gasto.personas[personasKey].cantidad / gasto.ratio)
          }
        }

      })

    });

    //Datos de los pagos del viaje
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

      this.personas.forEach(persoA => {
        if (this.resumenPagos[persoA.id] == undefined) {
          this.resumenPagos[persoA.id] = {}
        }
        this.resumenPagos[persoA.id].pagos = {};
        this.personas.forEach(persoB => {
          this.resumenPagos[persoA.id].pagos[persoB.id] = 0
        })

      });
      this.pagos.forEach(pago => {
        if (!pago.eliminado) {
          this.resumenPagos[pago.pagador].pagos[pago.beneficiario] += (pago.cantidad / pago.ratio)
        }
      });
    })


  }

  //Cancelar el borrado de un viaje
  cancelarBorrado() {
    this.firestoreService.borrarViajeCancelar(this.idViaje).then(() => {
      }
    )
  }

  //Cancelar el archivado de un viaje
  cancelarArchivado() {
    this.firestoreService.archivarViajeCancelar(this.idViaje).then(() => {
      }
    )
  }

  //Ver las cuentas de las personas
  verCuentasPersona(id: string) {
    this.idPersonaCuentasActiva = id;

  }

  //Eliminar un pago
  eliminarPago(pago: Pago) {
    this.firestoreService.eliminarPago(this.idViaje, pago.id, true).then(() => {
    })
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Pago eliminado',
      showConfirmButton: false,
      timer: 1500
    })

  }

  //Restaurar un pago
  restaurarPago(pago: Pago) {
    this.firestoreService.eliminarPago(this.idViaje, pago.id, false).then(() => {
    })
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Pago restaurado',
      showConfirmButton: false,
      timer: 1500
    })

  }

  //Eliminar un gasto
  eliminarGasto(gasto: Gasto) {
    this.firestoreService.eliminarGasto(this.idViaje, gasto.id, true).then(() => {
    })
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Gasto eliminado',
      showConfirmButton: false,
      timer: 1500
    })

  }

  //Restaurar un gasto
  restaurarGasto(gasto: Gasto) {
    this.firestoreService.eliminarGasto(this.idViaje, gasto.id, false).then(() => {
    })
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Gasto restaurado',
      showConfirmButton: false,
      timer: 1500
    })

  }
}
