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
          this.errorMessage = "Cuenta desactivada, se ha mandado un link de activación a tu cuenta."
        } else {
          this.router.navigate(['/dashboard']);
        }
      }, err => {
        console.log(err);
        this.errorMessage = this.authService.FireBaseErrors[err.code];
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
