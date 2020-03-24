import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Viaje} from "../../models/viaje.model";
import {map} from "rxjs/operators";


@Component({
  selector: "app-nuevogasto",
  templateUrl: "nuevogasto.component.html"
})
export class NuevogastoComponent implements OnInit {
  private idViaje: string;
  public viaje: Viaje;
  public form 			: FormGroup;


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
      fecha:['', Validators.required],
      terceros     : this._FB.array([])

  });
  }

  ngOnInit() {
    this.idViaje = this.route.snapshot.paramMap.get("viaje");


    this.firestoreService.getViaje(this.idViaje).subscribe(dbviaje => {
      console.log(this.viaje)
      this.viaje = dbviaje.payload.data() as Viaje;
      console.log(this.viaje)
      const controla = <FormArray>this.form.controls.terceros;

      for (let perso in this.viaje.permitidos) {
        controla.push(this.initTechnologyFields(perso));
      }

      });

  }
  public documentId = null;
  public currentStatus = 1;

  nuevoGasto(form, documentId = this.documentId) {
    this.firestoreService.nuevoGasto(this.idViaje, form).then(

    )
  }
  initTechnologyFields(perso) : FormGroup
  {
    return this._FB.group({
      //TODO: controlar tipo de dato
      id 		: [perso, Validators.required],
      nombre 		: [perso, Validators.required],
      cantidad 		: ['', Validators.required]
    });
  }

  removeInputField(i: number) {

  }
}
