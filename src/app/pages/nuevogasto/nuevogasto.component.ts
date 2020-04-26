import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Viaje} from '../../models/viaje.model';
import {Persona} from '../../models/persona.model';
import * as moment from 'moment-timezone';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Gasto} from '../../models/gasto.model';

//Componente Nuevogasto
@Component({
  selector: 'app-nuevogasto',
  templateUrl: 'nuevogasto.component.html'
})
export class NuevogastoComponent implements OnInit, OnDestroy {
  private FBSuscribers = []
  public viaje: Viaje;
  public form: FormGroup;
  public monedas: String[] = new Array<String>();
  public personasViaje: Persona[] = new Array<Persona>();
  public msgRatio: string;
  public timezoneForm: string;
  public documentId = null;
  public currentStatus = 1;
  partesIguales: boolean = true;
  private idViaje: string;
  private ratios: number[] = new Array<number>();
  private idGasto: string;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private _FB: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.viaje = new Viaje();

    this.form = this._FB.group({
      descripcion: ['', Validators.required],
      cantidad: [0, Validators.required],
      moneda: ['', Validators.required],
      ratio: [1.00, Validators.required],
      fecha: ['', Validators.required],
      partesIguales: [true, Validators.required],
      terceros: this._FB.array([]),
      pagador: ['', Validators.required]

    });
  }

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get('viaje');
    this.form.controls['fecha'].setValue(moment().format(moment.HTML5_FMT.DATETIME_LOCAL));
    this.timezoneForm = moment.tz.guess()


    //Sacar la informacion del viaje
    this.FBSuscribers.push(this.firestoreService.getViaje(this.idViaje).subscribe(dbviaje => {
      this.viaje = dbviaje.payload.data() as Viaje;

      this.monedas.push(this.viaje.monedaPrincipal);
      for (let monedasAdicionalesKey in this.viaje.monedasAdicionales) {
        this.monedas.push(this.viaje.monedasAdicionales[monedasAdicionalesKey])
      }
      this.form.controls['moneda'].setValue(this.viaje.monedaPrincipal);

      //vamos a por los ratios
      if (this.viaje.monedasAdicionales) {

        const currencies = this.viaje.monedasAdicionales.toString();
        const url = `${environment.URLEXTAPI}?base=${this.viaje.monedaPrincipal}`;
        this.httpClient
          .get(url)
          .subscribe(apiData => {
            this.ratios = apiData['rates'];
            this.ratios[this.viaje.monedaPrincipal] = 1.00;
          });
        this.form.get('moneda').valueChanges.subscribe(monedaSnapshot => {
          if (this.ratios[monedaSnapshot] != undefined) {
            this.form.get('ratio').setValue(this.ratios[monedaSnapshot]);
            this.msgRatio = '';
          } else {
            this.form.get('ratio').setValue(1.00);
            this.msgRatio = 'Ratio no disponible para esta divisa';
          }
        })

      }

    }));

    //Sacar las personas de un viaje
    this.FBSuscribers.push(this.firestoreService.getPersonas(this.idViaje).subscribe(personasSnapshot => {
      const controla = <FormArray>this.form.controls.terceros;
      personasSnapshot.forEach((viajeData: any) => {
        let persona;
        persona = viajeData.payload.doc.data() as Persona;
        persona.id = viajeData.payload.doc.id;
        controla.push(this.initTechnologyFields(persona));
        this.personasViaje[persona.id] = persona as Persona;


      });


      // Sumas
      (this.form.get('terceros') as FormArray).valueChanges.subscribe(elemento => {
        if (!this.form.get('partesIguales').value) {
          let total = 0.00;
          for (let elementoKey in elemento) {
            total += elemento[elementoKey].cantidad
          }
          this.form.get('cantidad').setValue(total);
        }
      });
    }));

    //Sabes si se esta editando o no y actuar en consecuencia
    this.idGasto = this.route.snapshot.paramMap.get("gasto");
    if (this.idGasto != null) {

      this.currentStatus = 2;
      this.FBSuscribers.push(this.firestoreService.getGasto(this.idViaje, this.idGasto).subscribe((gastosSnapshot) => {
        let gasto = gastosSnapshot.payload.data() as Gasto;
        this.timezoneForm = gasto.timezone;
        this.form.get('descripcion').setValue(gasto.descripcion);
        this.form.controls['fecha'].setValue(moment(gasto.fecha).format(moment.HTML5_FMT.DATETIME_LOCAL));
        this.form.get('cantidad').setValue(gasto.cantidad);
        this.form.get('moneda').setValue(gasto.moneda);
        this.form.get('ratio').setValue(gasto.ratio);
        this.form.get('pagador').setValue(gasto.pagador);
        this.form.get('partesIguales').setValue(gasto.partesIguales);

        let personasForm = this.form.get('terceros').value
        console.log(personasForm)

        personasForm.forEach(w => {
          if (gasto.personas[w.id]) {
            w.cantidad = gasto.personas[w.id].cantidad
          } else {
            this.form.get('partesIguales').setValue(false);
            w.cantidad = 0
          }
          w.nombre = this.personasViaje[w.id].nombre
        })
        this.form.get('terceros').setValue(personasForm)
        this.msgRatio = ""
      }))

    }

    //Sumas
    this.form.get('cantidad').valueChanges.subscribe(x => {
      if (this.form.get('partesIguales').value) {

        let totalADividir = this.form.get('terceros')['controls'].length;
        for (let tercerosKey in this.form.get('terceros')['controls']) {
          (this.form.get('terceros')['controls'][tercerosKey] as FormControl).get('cantidad').setValue(x / totalADividir)
        }
      }
    });


    this.form.get('partesIguales').valueChanges.subscribe(x => {
      if (!x) {
        this.form.get('cantidad').disable();
        for (let tercerosKey in this.form.get('terceros')['controls']) {
          (this.form.get('terceros')['controls'][tercerosKey] as FormControl).get('cantidad').enable()
        }
      } else {
        this.form.get('cantidad').enable();
        for (let tercerosKey in this.form.get('terceros')['controls']) {
          (this.form.get('terceros')['controls'][tercerosKey] as FormControl).get('cantidad').disable()
        }
      }
    })

  }

  //Crear un nuevo gasto
  nuevoGasto(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {

      this.firestoreService.nuevoGasto(this.idViaje, form).then()
    } else {
      this.firestoreService.editarGasto(this.idViaje, this.idGasto, form, this.timezoneForm).then()
    }
    this.router.navigate([`/viaje/${this.idViaje}`])
  }

  initTechnologyFields(perso: Persona): FormGroup {
    let grup = this._FB.group({
      //TODO: controlar tipo de dato
      id: [perso.id, Validators.required],
      nombre: [perso.nombre],
      cantidad: ['', Validators.required]
    });
    grup.get('nombre').disable({onlySelf: true})
    return grup;
  }

  ngOnDestroy(): void {
    // destruir todas las suscripciones de firestore.
    this.firestoreService.unsuscribe(this.FBSuscribers)
  }

}
