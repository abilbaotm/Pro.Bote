import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-nuevogasto",
  templateUrl: "nuevogasto.component.html"
})
export class NuevogastoComponent implements OnInit {
  private idViaje: string;
  public viaje = [];
  public form 			: FormGroup;


  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,
    private _FB          : FormBuilder

) {     this.form = this._FB.group({
    descripcion : ['', Validators.required],
    cantidad : ['', Validators.required]
  });
  }

  ngOnInit() {
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

  nuevoGasto(form, documentId = this.documentId) {
    this.firestoreService.nuevoGasto(this.idViaje, form).then(

    )
  }
}
