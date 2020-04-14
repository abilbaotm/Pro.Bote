import { Component, OnInit } from "@angular/core";
import {environmentversion} from "../../../environments/environmentversion";
import {ConnectionService} from "ng-connection-service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: "app-footer",
  templateUrl: "./footer.component.html",
  styleUrls: ["./footer.component.css"]
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  actualVersion: string;
  internetStatus: boolean;

  constructor(private connectionService: ConnectionService,
              private toastr: ToastrService) {


    function onOnline() {
      console.log("ONLINE")
    }

    function onOffline() {
      console.log("OFFLINE")
    }
    (<any> window).addEventListener("offline", onOffline, false);
    (<any> window).addEventListener("online", onOnline, false);


    if(!navigator.onLine) {
      this.internetStatus = false;
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> No se pudo establecer conexión a internet. Puede haber cambios no sincronizados', '', {
        disableTimeOut: true,
        closeButton: true,
        enableHtml: true,
        toastClass: "alert alert-danger alert-with-icon",
        positionClass: 'toast-bottom-right'
      });
    }

    this.connectionService.monitor().subscribe(currentState => {
      if (currentState) {
        this.internetStatus = true;
        this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Conexión recuperada.', '', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
      }
      else {
        this.internetStatus = false;
        this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> Se ha perdido conexión a internet. Puede haber cambios no sincronizados', '', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-bottom-right'
        });
      }
      console.log(this.internetStatus)
    });
  }

  ngOnInit() {
    this.actualVersion = environmentversion
  }
}
