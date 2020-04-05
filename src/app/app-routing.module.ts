import { NgModule } from "@angular/core";
import {APP_BASE_HREF, CommonModule} from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./core/auth.guard";
import {UserComponent} from "./pages/user/user.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {RegisterComponent} from "./register/register.component";
import {UserResolver} from "./pages/user/user.resolver";
import {PrivacidadComponent} from "./pages/legal/privacidad/privacidad.component";

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'politica-privacidad', component: PrivacidadComponent},
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        canActivate: [AuthGuard],
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule",
        resolve: { data: UserResolver}
      }
    ],
}
  /*
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: AdminLayoutComponent,
    children: [
      {
        path: "",
        loadChildren:
          "./layouts/admin-layout/admin-layout.module#AdminLayoutModule"
      }
    ]
  }, {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './layouts/auth-layout/auth-layout.module#AuthLayoutModule'
      }
    ]
  },
  {
    path: "**",
    redirectTo: "dashboard"
  }*/
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {
      useHash: true
    })
  ],
  providers: [{provide: APP_BASE_HREF, useValue : '/' }],
  exports: [RouterModule]
})
export class AppRoutingModule {}
