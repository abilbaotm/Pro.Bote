import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Viaje} from "../../models/viaje.model";
import {map} from "rxjs/operators";
import {Persona} from "../../models/persona.model";
import * as firebase from "firebase";
import * as moment from "moment";


@Component({
  selector: "app-nuevogasto",
  templateUrl: "nuevogasto.component.html"
})
export class NuevogastoComponent implements OnInit {
  private idViaje: string;
  public viaje: Viaje;
  public form 			: FormGroup;
  public monedas: String[] = new Array<String>();
  public personasViaje: Persona[] = new Array<Persona>();


  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private _FB          : FormBuilder

) {
    this.viaje = new Viaje();

    this.form = this._FB.group({
      descripcion : ['', Validators.required],
      cantidad : ['', Validators.required],
      moneda : ['', Validators.required],
      ratio: [1.00, Validators.required],
      fecha:['', Validators.required],
      partesIguales:[true, Validators.required],
      terceros     : this._FB.array([]),
      pagador: ['', Validators.required]

  });
  }

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");
    this.form.controls['fecha'].setValue( moment().format( moment.HTML5_FMT.DATETIME_LOCAL));


    this.firestoreService.getViaje(this.idViaje).subscribe(dbviaje => {
      console.log(this.viaje);
      this.viaje = dbviaje.payload.data() as Viaje;
      console.log(this.viaje);

      this.monedas.push(this.viaje.monedaPrincipal);
      for (let monedasAdicionalesKey in this.viaje.monedasAdicionales) {
        this.monedas.push(this.viaje.monedasAdicionales[monedasAdicionalesKey])
      }
      this.form.controls['moneda'].setValue(this.viaje.monedaPrincipal);


    });

    this.firestoreService.getPersonas(this.idViaje).subscribe(personasSnapshot => {
      const controla = <FormArray>this.form.controls.terceros;
      personasSnapshot.forEach((viajeData: any) => {
        let persona;
        persona = viajeData.payload.doc.data() as Persona;
        persona.id = viajeData.payload.doc.id;
        controla.push(this.initTechnologyFields(persona));
        this.personasViaje.push(persona as Persona)
      });


    })


  }
  public documentId = null;
  public currentStatus = 1;

  nuevoGasto(form, documentId = this.documentId) {
    this.firestoreService.nuevoGasto(this.idViaje, form).then((docRef => {
      this.router.navigate([`/viaje/${this.idViaje}`])
    } ) )
  }
  initTechnologyFields(perso: Persona) : FormGroup
  {
    return this._FB.group({
      //TODO: controlar tipo de dato
      id 		: [perso.id, Validators.required],
      nombre 		: [perso.nombre, Validators.required],
      cantidad 		: ['', Validators.required]
    });
  }

  removeInputField(i: number) {

  }
}
