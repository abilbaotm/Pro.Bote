import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Viaje} from '../../models/viaje.model';
import {Persona} from '../../models/persona.model';
import * as moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';

//Componente NuevoPago

@Component({
  selector: 'app-nuevopago',
  templateUrl: 'nuevopago.component.html'
})
export class NuevopagoComponent implements OnInit, OnDestroy {
  private FBSuscribers = []
  public viaje: Viaje;
  public form: FormGroup;
  public monedas: String[] = new Array<String>();
  public personasViaje: Persona[] = new Array<Persona>();
  public msgRatio: string;
  public documentId = null;
  public currentStatus = 1;
  partesIguales: boolean = true;
  public formError: string;
  private idViaje: string;
  private ratios: number[] = new Array<number>();

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private _FB: FormBuilder,
    private httpClient: HttpClient
  ) {
    this.viaje = new Viaje();

    this.form = this._FB.group({
      nota: [''],
      cantidad: [0, Validators.required],
      moneda: ['', Validators.required],
      ratio: [1.00, Validators.required],
      fecha: ['', Validators.required],
      pagador: ['', Validators.required],
      beneficiario: ['', Validators.required]

    });
  }

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get('viaje');
    this.form.controls['fecha'].setValue(moment().format(moment.HTML5_FMT.DATETIME_LOCAL));


    //Recoger la informacion del viaje
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

    }, error => this.firestoreService.alzarError()));

    //Recoger la informacion de las personas del viaje
    this.FBSuscribers.push(this.firestoreService.getPersonas(this.idViaje).subscribe(personasSnapshot => {
      personasSnapshot.forEach((viajeData: any) => {
        let persona;
        persona = viajeData.payload.doc.data() as Persona;
        persona.id = viajeData.payload.doc.id;
        this.personasViaje.push(persona as Persona);
      });
    }, error => this.firestoreService.alzarError()));

  }

  //Crear el nuevo pago
  nuevoPago(form, documentId = this.documentId) {
    if (this.form.get('pagador').value != this.form.get('beneficiario').value) {
      this.firestoreService.nuevopago(this.idViaje, form).then(() => {
      }, error => this.firestoreService.alzarError())
      this.router.navigate([`/viaje/${this.idViaje}`])
    } else {
      this.formError = 'Pagador y beneficiario no puede ser la misma persona';
    }


  }

  ngOnDestroy(): void {
    // destruir todas las suscripciones de firestore.
    this.FBSuscribers.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
