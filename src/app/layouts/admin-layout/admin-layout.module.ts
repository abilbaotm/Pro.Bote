import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {ViajeComponent} from "../../pages/viaje/viaje.component";
import {NuevoviajeComponent} from "../../pages/nuevoviaje/nuevoviaje.component";
import {NuevogastoComponent} from "../../pages/nuevogasto/nuevogasto.component";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    ViajeComponent,
    NuevoviajeComponent,
    NuevogastoComponent,
    NotificationsComponent,
    // RtlComponent
  ]
})
export class AdminLayoutModule {}
