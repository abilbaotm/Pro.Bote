import {Component, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore/firestore.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FirebaseUserModel} from '../../core/user.model';
import * as moment from 'moment-timezone';
import {Moment} from 'moment';
import {Viaje} from '../../models/viaje.model';
import {Persona} from '../../models/persona.model';

@Component({
  selector: 'app-nuevoviaje',
  templateUrl: 'nuevoviaje.component.html'
})
export class NuevoviajeComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  public idViaje: string;
  public viaje = [];

  public viajeupdate: Viaje = new Viaje();
  fechasFin: String;
  fechasInicio: String;

  public totalTerceros = 0;

  public personas = new Array<Persona>();
  public personasIndex = {};

  public documentId = null;
  public currentStatus = 1;

  public form: FormGroup;
  selected: { start: Moment, end: Moment };

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private _FB: FormBuilder
  ) {
    this.form = this._FB.group({
      descripcion: ['', Validators.required],
      monedaPrincipal: ['EUR', Validators.required],
      monedasAdicionales: [],
      presupuesto: [''],
      terceros: this._FB.array([]),
      fechas: ['', Validators.required],
    });
  }

  initTechnologyFields(): FormGroup {
    return this._FB.group({
      //TODO: controlar tipo de dato
      nombre: ['', Validators.required],
      email: [''],
      id: ['']
    });
  }

  addNewInputField(): void {
    const control = <FormArray>this.form.controls.terceros;
    control.push(this.initTechnologyFields());
  }

  removeInputField(i: number): void {
    const control = <FormArray>this.form.controls.terceros;
    control.removeAt(i);
  }

  manage(val: any): void {
    console.dir(val);
  }

  ngOnInit() {

    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
      }
    })
    this.idViaje = this.route.snapshot.paramMap.get("viaje");
    if (this.idViaje != null) {

      this.currentStatus = 2;

      this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
        this.viajeupdate = (dbviaje.payload.data()) as Viaje;
        this.fechasInicio = moment.tz(this.viajeupdate.fechas.start.toDate(), this.viajeupdate.timezone).format('DD/M/YYYY');
        this.fechasFin = moment.tz(this.viajeupdate.fechas.end.toDate(), this.viajeupdate.timezone).format('DD/M/YYYY');


        this.form.get('descripcion').setValue(this.viajeupdate.descripcion);
        this.form.get('monedaPrincipal').setValue(this.viajeupdate.monedaPrincipal);
        this.form.controls['monedaPrincipal'].disable();
        this.form.get('monedasAdicionales').setValue(this.viajeupdate.monedasAdicionales);
        this.form.get('presupuesto').setValue(this.viajeupdate.presupuesto);

        this.form.get('fechas').setValue({
          startDate: moment.tz(this.viajeupdate.fechas.start.toDate(), this.viajeupdate.timezone),
          endDate: moment.tz(this.viajeupdate.fechas.end.toDate(), this.viajeupdate.timezone)
        })


      });

      this.firestoreService.getPersonas(this.idViaje).subscribe((personasSnapshot) => {
        const control = <FormArray>this.form.controls.terceros
        this.totalTerceros = personasSnapshot.length;
        personasSnapshot.forEach(perso => {
          this.personas.push(perso.payload.doc.data() as Persona);
          this.personasIndex[perso.payload.doc.ref.id] = (perso.payload.doc.data() as Persona).nombre

          let pers = this.initTechnologyFields();
          pers.get('nombre').setValue((perso.payload.doc.data() as Persona).nombre)
          pers.get('email').setValue((perso.payload.doc.data() as Persona).email)
          pers.get('id').setValue(perso.payload.doc.ref.id)

          if (this.user.email == (perso.payload.doc.data() as Persona).email) {
            pers.disable();
          }
            control.push(pers)


          })
        }
      );


    }


  }

  nuevoViaje(form, documentId = this.documentId) {
    if (this.currentStatus == 1) {
      this.firestoreService.nuevoViaje(form).then((docRef => {
        this.router.navigate([`/viaje/${docRef.id}`])
      }))
      this.router.navigate([`/dashboard`])
    } else {
      this.firestoreService.updateViaje(form, this.idViaje).then((docRef => {
      }))
      this.router.navigate([`/viaje/${this.idViaje}`])
    }
  }

  borrarViaje() {
    this.firestoreService.borrarViaje(this.idViaje).then()
    this.router.navigate(['/dashboard'])

  }

  archivarViaje() {
    this.firestoreService.archivarViaje(this.idViaje).then()
    this.router.navigate(['/dashboard'])
  }

}
