import {Routes} from '@angular/router';

import {DashboardComponent} from '../../pages/dashboard/dashboard.component';
import {UserComponent} from '../../pages/user/user.component';
import {ViajeComponent} from '../../pages/viaje/viaje.component';
import {NuevoviajeComponent} from '../../pages/nuevoviaje/nuevoviaje.component';
import {NuevogastoComponent} from '../../pages/nuevogasto/nuevogasto.component';
import {NuevopagoComponent} from '../../pages/nuevopago/nuevopago.component';

export const AdminLayoutRoutes: Routes = [
  {path: 'dashboard', component: DashboardComponent},
  {path: 'user', component: UserComponent},
  {path: 'viaje/:viaje', component: ViajeComponent},
  {path: 'viaje/:viaje/nuevogasto', component: NuevogastoComponent},
  {path: 'viaje/:viaje/nuevopago', component: NuevopagoComponent},
  {path: 'nuevoviaje', component: NuevoviajeComponent},
  {path: 'viaje/:viaje/editarviaje', component: NuevoviajeComponent},
  {path: 'viaje/:viaje/editargasto/:gasto', component: NuevogastoComponent},

];
