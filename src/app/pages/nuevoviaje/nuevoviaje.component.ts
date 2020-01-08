import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FirebaseUserModel} from "../../core/user.model";

@Component({
  selector: "app-nuevoviaje",
  templateUrl: "nuevoviaje.component.html"
})
export class NuevoviajeComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  private idViaje: string;
  public viaje = [];
  public form 			: FormGroup;

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private _FB          : FormBuilder


) {
    this.form = this._FB.group({
      descripcion : ['', Validators.required],
      terceros     : this._FB.array([
        this.initTechnologyFields()
      ])
    });
  }

  initTechnologyFields() : FormGroup
  {
    return this._FB.group({
      //TODO: controlar tipo de dato
      nombre 		: ['', Validators.required],
      email 		: ['', Validators.required]
    });
  }
  addNewInputField() : void
  {
    const control = <FormArray>this.form.controls.terceros;
    control.push(this.initTechnologyFields());
  }
  removeInputField(i : number) : void
  {
    const control = <FormArray>this.form.controls.terceros;
    control.removeAt(i);
  }
  manage(val : any) : void
  {
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


    this.firestoreService.getViaje(this.idViaje).subscribe((dbviaje) => {
      console.log(dbviaje.payload.data())
      this.viaje.push(dbviaje.payload.data())
    });

    console.log(this.idViaje)


  }
  public documentId = null;
  public currentStatus = 1;
  nuevoViaje(form, documentId = this.documentId) {
    this.firestoreService.nuevoViaje(form).then( (docRef => {
      console.log(docRef);
      this.router.navigate([`/viaje/${docRef.id}`])
    } ) )
  }
}
