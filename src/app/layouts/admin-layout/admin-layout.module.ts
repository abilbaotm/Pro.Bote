import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AdminLayoutRoutes} from './admin-layout.routing';
import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ViajeComponent} from '../../pages/viaje/viaje.component';
import {GestorviajeComponent} from '../../pages/gestorviaje/gestorviaje.component';
import {GestorgastoComponent} from '../../pages/gestorgasto/gestorgasto.component';
import {GestorpagoComponent} from '../../pages/gestorpago/gestorpago.component';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {NgAbsPipeModule} from 'angular-pipes';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatChipsModule} from "@angular/material/chips";
import {MatCardModule} from "@angular/material/card";
import {GaugeChartModule} from "angular-gauge-chart";

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    SweetAlert2Module,
    NgxDaterangepickerMd,
    MatExpansionModule,
    MatListModule,
    MatTableModule,
    MatTabsModule,
    NgAbsPipeModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatCardModule,
    GaugeChartModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    ViajeComponent,
    GestorviajeComponent,
    GestorgastoComponent,
    GestorpagoComponent,
    // RtlComponent
  ]
})
export class AdminLayoutModule {
}
