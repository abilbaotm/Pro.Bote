import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {ToastrModule} from 'ngx-toastr';

import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin-layout/admin-layout.component';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './login/login.component';
import {AuthService} from './core/auth.service';
import {UserService} from './core/user.service';
import {AuthGuard} from './core/auth.guard';
import {RegisterComponent} from './register/register.component';
import {UserResolver} from './pages/user/user.resolver';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2';
import {NgxDaterangepickerMd} from 'ngx-daterangepicker-material';
import * as moment from 'moment';
import * as localization from 'moment/locale/es';
import {PrivacidadComponent} from './pages/legal/privacidad/privacidad.component';
import {NavServiceService} from "./services/nav-service/nav-service.service";

moment.locale('es', localization);

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
    SweetAlert2Module.forRoot(),
    NgxDaterangepickerMd.forRoot({
      daysOfWeek: ["do", "lu", "ma", "mi", "ju", "vi", "sá"],
      monthNames: ['ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.', 'jul.', 'ago.', 'sep.', 'oct.', 'nov.', 'dic.'],
      firstDay: 1,
      applyLabel: 'ok', format: 'DD/MM/YYYY', separator: ' -> '
    }),
    NgbModule,
  ],
  declarations: [AppComponent, AdminLayoutComponent, LoginComponent, RegisterComponent, PrivacidadComponent],
  providers: [AuthService, UserService, AuthGuard, UserResolver, NavServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
