import {Component, OnInit} from '@angular/core';
import {environmentversion} from '../../../environments/environmentversion';
import {ConnectionService} from 'ng-connection-service';
import {ToastrService} from 'ngx-toastr';
import Swal from "sweetalert2";
import {CookieService} from "ngx-cookie-service";

//Componente Footer revisa si hay conexion a internet o no y saca un mensaje

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  actualVersion: string;
  internetStatus: boolean;

  constructor(private connectionService: ConnectionService,
              private toastr: ToastrService,
              private cookieService: CookieService) {
  }

  ngOnInit() {
    this.actualVersion = environmentversion

    if(!navigator.onLine) {
      this.internetStatus = false;
      this.toastr.clear()
      this.toastr.info('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> No se pudo establecer conexión a internet. Puede haber cambios no sincronizados', '', {
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
    }

    this.connectionService.monitor().subscribe(currentState => {
      if (currentState) {
        this.internetStatus = true;
        this.toastr.clear()
        this.toastr.info('<span class="tim-icons icon-spaceship" [data-notify]="icon"></span> Conexión recuperada.', '', {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      }
      else {
        this.internetStatus = false;
        this.toastr.clear()
        this.toastr.info('<span class="tim-icons icon-alert-circle-exc" [data-notify]="icon"></span> Se ha perdido conexión a internet. Puede haber cambios no sincronizados', '', {
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-bottom-right',
          progressBar: true
        });
      }
    });

    if (this.cookieService.get('nota-desarrollador') != 'ocultar') {
      this.verNotaDesarrollador()
    }


  }

  verNotaDesarrollador() {
    Swal.fire({
      position: 'top',
      icon: 'info',
      title: '',
      width: '80%',
      html: '<div id="nota-desarrollador"><p style="text-align: center; "><b>Bienvenido a Pro.Bote.</b> Es importante que entienda lo siguiente: </p>' +
        '<p>Esta aplicación es resultado de un proyecto académico efectuado en CIFP Ciudad Jardín LHII de ' +
        'Vitoria-Gasteiz durante el curso académico 2019/2020. Tras los IDE de desarrollo se encuentran dos ' +
        'alumnos que aprovecharon la oportunidad de desarrollar una aplicación para poder gestionar los gastos ' +
        'generados durante sus viajes. <br>' +
        '<span>Tras este proyecto no hay una empresa que mantenga la aplicación, usa la aplicación bajo tu responsabilidad.</span> <br>' +
        'Quizás le interese saber: ' +
        '<ul>' +
        '<li>La aplicación es de código abierto bajo licencia MIT</li>' +
        '<li><a href="https://gitlab.com/pabil/bote-dw" target="_blank"> Puedes consultar el código fuente en GitLab</a></li>' +
        '<li><a href="https://gitlab.com/pabil/bote-dw/-/tree/master/documentacion" target="_blank">Dispones del \'Manual de implantación\' y \'Manual de usuario\' en GitLab</a></li>' +
        '<li>La aplicación Pro.Bote está disponible para <a href="https://play.google.com/store/apps/details?id=net.izabil.bote" target="_blank">Android</a> y <a href="https://bote.izabil.net/" target="_blank">versión web</a></li>' +
        '<li>Los desarrolladores principales de este proyecto (<a href="https://www.linkedin.com/in/asier-bilbao-790a88130/" target="_blank">@abilbaotm</a> y <a href="https://www.linkedin.com/in/redlayer/" target="_blank">@RedLayer</a>) buscan trabajo.</li>' +
        '</ul>' +
        'Gracias por su atención y buen viaje</p></div>',
      showConfirmButton: true,
    }).then((result) => {
      if (result.value) {
        this.cookieService.set('nota-desarrollador', 'ocultar', 20)
      }
    })
  }
}
