import { Component, OnInit } from "@angular/core";
import Chart from 'chart.js';
import {AngularFirestore} from "@angular/fire/firestore";
import {FirestoreService} from "../../services/firestore/firestore.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: "app-nuevoviaje",
  templateUrl: "nuevoviaje.component.html"
})
export class NuevoviajeComponent implements OnInit {
  private idViaje: string;
  public viaje = [];
  public nuevoViajeForm = new FormGroup({
    descripcion: new FormControl('', Validators.required),
    //usuarios: new FormControl('', Validators.required),
  });

  constructor(
    private firestoreService: FirestoreService,
    private route: ActivatedRoute,
    private router: Router,


) { }

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

    this.firestoreService.nuevoViaje(form.descripcion).then( (docRef => {
      console.log(docRef);
      this.router.navigate([`/viaje/${docRef.id}`])
    } ) )
  }
}
