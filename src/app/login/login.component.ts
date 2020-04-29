import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service'
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';
import {UserService} from "../core/user.service";

//Componente Login
@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';
  public mostarMsgPassword: boolean;
  public ultimoCorreo: string;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
    public userService: UserService,
  ) {
    this.createForm();
  }

  //Crear formulario de acceso
  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  //Usar Google Auth para loguearse
  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/dashboard']);
      })
  }

  //Usar login Firebase para loguearse
  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        if (res.user.emailVerified !== true) {
          this.authService.enviarCorreoActivacion()
          this.errorMessage = "Cuenta desactivada, se ha mandado un link de activación a tu cuenta."
        } else {
          this.router.navigate(['/dashboard']);
        }
      }, err => {
        if (this.authService.FireBaseErrors[err.code]) {
          this.errorMessage = this.authService.FireBaseErrors[err.code];
          // no demos muchas pistas si el mail es valido
          if (err.code == 'auth/wrong-password' || err.code == 'auth/user-not-found') {
            this.ultimoCorreo = value.email
            this.mostarMsgPassword = true
          }
        } else {
          this.errorMessage = err.message
        }
      })
  }


  enviarRecoveryEmail() {
    this.authService.passOlvidada(this.ultimoCorreo).then(() => {
      this.mostarMsgPassword = false;
      this.errorMessage = "Si la cuenta existiera, un link con instrucciones para cambiar su contraseña fue enviado a " + this.ultimoCorreo
    })
  }

  ngOnInit(): void {
    this.userService.getCurrentUser()
      .then(user => {
        this.router.navigate(['/dashboard'])
      }, err => {
      })
  }
}
