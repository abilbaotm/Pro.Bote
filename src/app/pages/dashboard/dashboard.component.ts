import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirestoreService} from '../../services/firestore/firestore.service';
import Unsplash, {toJson} from 'unsplash-js';
import * as moment from 'moment-timezone';

//Componente Dashboard
@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private FBSuscribers = []
  public data: any;
  public todosViajes = {'Activos': [], 'Futuros': [], 'Archivados': [], 'Pendientes de Borrar': []};
  public ningunViaje = true;

  constructor(
    private firestoreService: FirestoreService
  ) {
  }

  ngOnInit() {


    this.cargarViajes();

  }

  //Cargar los viajes en sus respectivas categorias para poder visualizarlos en la pagina
  cargarViajes() {
    this.FBSuscribers.push(this.firestoreService.getViajes().subscribe((viajesSnapshot) => {
      this.todosViajes = {'Activos': [], 'Futuros': [], 'Archivados': [], 'Pendientes de Borrar': []};
      viajesSnapshot.forEach((viajeData: any) => {
        this.ningunViaje = false;
        var datosViaje = viajeData.payload.doc.data();
        datosViaje.fechasInicio = moment.tz(datosViaje.fechas.start.toDate(), datosViaje.timezone).format('DD/M/YYYY');
        datosViaje.fechasFin = moment.tz(datosViaje.fechas.end.toDate(), datosViaje.timezone).format('DD/M/YYYY');
        if (datosViaje.borrado) {
          this.todosViajes['Pendientes de Borrar'].push({
              id: viajeData.payload.doc.id,
              data: datosViaje
            }
          )
        } else if (datosViaje.archivado) {
          this.todosViajes['Archivados'].push({
              id: viajeData.payload.doc.id,
              data: datosViaje
            }
          )
        } else if (datosViaje.fechas.start.seconds < moment().unix()) {
          this.todosViajes['Activos'].push({
              id: viajeData.payload.doc.id,
              data: datosViaje
            }
          )
        } else {
          this.todosViajes['Futuros'].push({
              id: viajeData.payload.doc.id,
              data: datosViaje
            }
          )
        }

      })


      const unsplash = new Unsplash({
        accessKey: "sMiNyfb3_4aGOkoW3V3al1l0-oxTotd-7ZDKmB78sBk",
        secret: "OQotJKCbCgjsYh_2yasNG1TwRZe_4nNDgkc9_Y6DkNc"
      });

      for (let categorias in this.todosViajes) {

        for (let todosViajeKey in this.todosViajes[categorias]) {

          unsplash.search.photos(this.todosViajes[categorias][todosViajeKey].data.descripcion, 1, 1, {})
            .then(toJson)
            .then(json => {
              if (json['total'] == 0) {
                unsplash.search.photos("Trip", 1, 1, {})
                  .then(toJson)
                  .then(json => {
                    this.todosViajes[categorias][todosViajeKey].data.foto = json["results"][0];

                  })
              } else {
                this.todosViajes[categorias][todosViajeKey].data.foto = json["results"][0];
              }
            });


        }

      }
    }));


  }

  ngOnDestroy(): void {
    // destruir todas las suscripciones de firestore.
    this.FBSuscribers.forEach(sub => {
      sub.unsubscribe();
    })
  }


}
