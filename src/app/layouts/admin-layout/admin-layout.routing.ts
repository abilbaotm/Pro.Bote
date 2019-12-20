import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import {ViajeComponent} from "../../pages/viaje/viaje.component";
import {NuevoviajeComponent} from "../../pages/nuevoviaje/nuevoviaje.component";
import {NuevogastoComponent} from "../../pages/nuevogasto/nuevogasto.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "viaje/:viaje", component: ViajeComponent },
  { path: "viaje/:viaje/nuevogasto", component: NuevogastoComponent },
  { path: "nuevoviaje", component: NuevoviajeComponent },

];
