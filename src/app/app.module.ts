import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import {AngularFireStorageModule} from "@angular/fire/storage";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {LoginComponent} from "./login/login.component";
import {AuthService} from "./core/auth.service";
import {UserService} from "./core/user.service";
import {AuthGuard} from "./core/auth.guard";
import {RegisterComponent} from "./register/register.component";
import {UserResolver} from "./pages/user/user.resolver";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule.enablePersistence(), // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    ReactiveFormsModule,
    // imports firebase/storage only needed for storage features
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, LoginComponent, RegisterComponent],
  providers: [AuthService, UserService, AuthGuard, UserResolver],
  bootstrap: [AppComponent]
})
export class AppModule {}
