import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Viaje} from '../../models/viaje.model';
import {Persona} from '../../models/persona.model';
import {Gasto} from '../../models/gasto.model';
import * as moment from 'moment-timezone';
import {Pago} from '../../models/pago.model';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import Swal from 'sweetalert2';
import {NavServiceService} from "../../services/nav-service/nav-service.service";
import {ToastrService} from "ngx-toastr";

//Componente Viaje

@Component({
  selector: 'app-dashboard',
  templateUrl: 'viaje.component.html'
})
export class ViajeComponent implements OnInit, OnDestroy {
  private FBSuscribers = []
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
  public optionsGastadoViaje = {
    hasNeedle: true,
    needleColor: 'gray',
    needleUpdateSpeed: 1000,
    arcColors: ['rgb(44, 151, 222)', 'rgb(234,33,33)'],
    arcDelimiters: [],
    rangeLabel: ['', ''],
    needleStartValue: 0,
  }
  public totalGastadoViaje = 0;
  public porcenPresupuesto = 0;
  public ningunGasto = {eliminado: true, activo: true};
  public ningunPago = {eliminado: true, activo: true};

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    public nav: NavServiceService,
    private toastr: ToastrService
  ) {
  }

  ngOnInit() {
    this.user = firebase.auth().currentUser;


    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    //Datos del viaje
    this.FBSuscribers.push(this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      this.viaje = (dbviaje.payload.data()) as Viaje;
      this.fechasInicio = moment.tz(this.viaje.fechas.start.toDate(), this.viaje.timezone).format('DD/M/YYYY');
      this.fechasFin = moment.tz(this.viaje.fechas.end.toDate(), this.viaje.timezone).format('DD/M/YYYY');

      if (this.viaje.admin != this.user.uid) {
        this.nav.permisos = false;
      } else {
        // eliminado o archivado
        this.nav.permisos = !(this.viaje.archivado || this.viaje.borrado);
      }
      // dar a NavServiceService el titulo del viaje para header
      // DESHABILITADO: el texto se desborda en la UI y no aporta mucho
      //this.nav.tituloViaje = this.viaje.descripcion

    }, error => this.firestoreService.alzarError()));


    //Datos de las personas del viaje
    this.FBSuscribers.push(this.firestoreService.getPersonas(this.idViaje).subscribe((personasSnapshot) => {
        this.personas = new Array<Persona>();
        this.personasIndex = {}
        personasSnapshot.forEach(perso => {
          let persoTemp: Persona = perso.payload.doc.data() as Persona;
          persoTemp.id = perso.payload.doc.ref.id;
          this.personas.push(persoTemp);
          this.personasIndex[perso.payload.doc.ref.id] = (persoTemp).nombre
        })
      }, error => this.firestoreService.alzarError())
    );

    //Datos de los gastos del viaje
    this.FBSuscribers.push(this.firestoreService.getGastos(this.idViaje).subscribe((gastosSnapshot) => {
      this.gastos = new Array<Gasto>();
      this.totalGastadoViaje = 0;
      this.ningunGasto['activo'] = true
      this.ningunGasto['eliminado'] = true
      gastosSnapshot.forEach(gast => {
        let nuevoGasto;
        nuevoGasto = gast.payload.doc.data() as Gasto;
        nuevoGasto.fechaLocal = moment.tz(nuevoGasto.fecha, nuevoGasto.timezone).format('HH:mm DD/M/YYYY Z z');
        nuevoGasto.diaLocal = moment.tz(nuevoGasto.fecha, nuevoGasto.timezone).format('DD/M/YYYY');
        nuevoGasto.id = gast.payload.doc.id

        // check eliminado. Esto es para el mensaje de que no hay gastos en esta categoría
        if (nuevoGasto.eliminado) {
          this.ningunGasto['eliminado'] = false
        } else {
          this.ningunGasto['activo'] = false
        }

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
          // actualizar grafico de gastos
          this.totalGastadoViaje += (gasto.cantidad / gasto.ratio)
          for (let personasKey in gasto.personas) {
            this.resumenPagos[personasKey].debe[gasto.pagador] += (gasto.personas[personasKey].cantidad / gasto.ratio)
          }
        }

      })

      if (this.viaje.presupuesto == undefined || typeof (this.viaje.presupuesto) == 'string') {
        this.porcenPresupuesto = 100
        this.optionsGastadoViaje.arcDelimiters = []
        this.optionsGastadoViaje.rangeLabel = ['', (Math.round(this.totalGastadoViaje * 100) / 100).toFixed(2) + ' ' + this.viaje.monedaPrincipal]

      } else if (this.viaje.presupuesto < this.totalGastadoViaje) {
        // presupuesto excedido
        this.porcenPresupuesto = this.totalGastadoViaje * 100 / this.viaje.presupuesto
        this.optionsGastadoViaje.arcDelimiters = [10000 / this.porcenPresupuesto]
        this.optionsGastadoViaje.rangeLabel = ['', (Math.round(this.totalGastadoViaje * 100) / 100).toFixed(2) + ' ' + this.viaje.monedaPrincipal]

      } else {
        // presupuesto correcto
        this.porcenPresupuesto = this.totalGastadoViaje * 100 / this.viaje.presupuesto
        this.optionsGastadoViaje.arcDelimiters = []
        this.optionsGastadoViaje.rangeLabel = ['', (Math.round(this.viaje.presupuesto * 100) / 100).toFixed(2) + ' ' + this.viaje.monedaPrincipal]
      }

    }, error => this.firestoreService.alzarError()));

    //Datos de los pagos del viaje
    this.FBSuscribers.push(this.firestoreService.getPagos(this.idViaje).subscribe((pagosSnapshot) => {
      this.pagos = new Array<Pago>();
      this.ningunPago['activo'] = true
      this.ningunPago['eliminado'] = true
      pagosSnapshot.forEach(pag => {
        let nuevoPago;
        nuevoPago = pag.payload.doc.data() as Pago;
        nuevoPago.id = pag.payload.doc.id;
        nuevoPago.fechaLocal = moment.tz(nuevoPago.fecha, nuevoPago.timezone).format('HH:mm DD/M/YYYY Z z');
        nuevoPago.fechaDia = moment.tz(nuevoPago.fecha, nuevoPago.timezone).format('DD/M/YYYY');

        // check eliminado. Esto es para el mensaje de que no hay gastos en esta categoría
        if (nuevoPago.eliminado) {
          this.ningunPago['eliminado'] = false
        } else {
          this.ningunPago['activo'] = false
        }

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
    }, error => this.firestoreService.alzarError()))


  }

  //Cancelar el borrado de un viaje
  cancelarBorrado() {
    this.firestoreService.borrarViajeCancelar(this.idViaje).then(() => {
      }, error => this.firestoreService.alzarError()
    )
  }

  //Cancelar el archivado de un viaje
  cancelarArchivado() {
    this.firestoreService.archivarViajeCancelar(this.idViaje).then(() => {
      }, error => this.firestoreService.alzarError()
    )
  }

  //Ver las cuentas de las personas
  verCuentasPersona(id: string) {
    this.idPersonaCuentasActiva = id;

  }

  //Eliminar un pago
  eliminarPago(pago: Pago) {
    this.firestoreService.eliminarPago(this.idViaje, pago.id, true).then(() => {
    }, error => this.firestoreService.alzarError())
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
    }, error => this.firestoreService.alzarError())
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
    }, error => this.firestoreService.alzarError())
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
    }, error => this.firestoreService.alzarError())
    Swal.fire({
      position: 'top',
      icon: 'success',
      title: 'Gasto restaurado',
      showConfirmButton: false,
      timer: 1500
    })

  }

  ngOnDestroy(): void {
    // destruir todas las suscripciones de firestore.
    this.firestoreService.unsuscribe(this.FBSuscribers)
  }

}
