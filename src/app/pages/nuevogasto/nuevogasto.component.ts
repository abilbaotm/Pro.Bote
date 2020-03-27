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
      cantidad : [0, Validators.required],
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
        this.personasViaje.push(persona as Persona);
        this.cantidadPersona.push(0)



      });


      // sumas
      (this.form.get('terceros') as FormArray).valueChanges.subscribe(elemento => {
        if (!this.form.get('partesIguales').value) {
          console.log(elemento);
          let total = 0.00;
          for (let elementoKey in elemento) {
            total += elemento[elementoKey].cantidad
          }
          this.form.get('cantidad').setValue(total);
        }
      });
      /*
      (this.form.get('terceros') as FormArray).controls.forEach( elemento => {
        elemento.get('cantidad').valueChanges.subscribe(subCantidad => {
          console.log(subCantidad)
        })
      });

       */

    });

    //sumas
    this.form.get('cantidad').valueChanges.subscribe(x => {
      if (this.form.get('partesIguales').value) {

        let totalADividir = this.form.get('terceros')['controls'].length;
        for (let tercerosKey in this.form.get('terceros')['controls']) {
          (this.form.get('terceros')['controls'][tercerosKey] as FormControl).get('cantidad').setValue(x / totalADividir)
        }
        console.log(x / totalADividir)
      }
    });




    this.form.get('partesIguales').valueChanges.subscribe(x => {
      if (!x)  {
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
  public documentId = null;
  public currentStatus = 1;
  cantidadPersona = [];
  partesIguales: boolean = true;

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
