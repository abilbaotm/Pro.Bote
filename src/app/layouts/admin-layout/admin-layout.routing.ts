import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {ViajeComponent} from '../../pages/viaje/viaje.component';
import {GestorviajeComponent} from '../../pages/gestorviaje/gestorviaje.component';
import {GestorgastoComponent} from '../../pages/gestorgasto/gestorgasto.component';
import {GestorpagoComponent} from '../../pages/gestorpago/gestorpago.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'viaje/:viaje', component: ViajeComponent},
  {path: 'viaje/:viaje/nuevogasto', component: GestorgastoComponent},
  {path: 'viaje/:viaje/nuevopago', component: GestorpagoComponent},
  {path: 'nuevoviaje', component: GestorviajeComponent},
  {path: 'viaje/:viaje/editarviaje', component: GestorviajeComponent},
  {path: 'viaje/:viaje/editargasto/:gasto', component: GestorgastoComponent},

];
