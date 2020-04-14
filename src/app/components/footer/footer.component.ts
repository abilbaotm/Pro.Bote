import {Component, OnInit} from '@angular/core';
import {environmentversion} from '../../../environments/environmentversion';
import {ConnectionService} from 'ng-connection-service';
import {ToastrService} from 'ngx-toastr';

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
              private toastr: ToastrService) {}

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
      console.log(this.internetStatus)
    });
  }
}
