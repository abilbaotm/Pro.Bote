import {Component, OnInit} from '@angular/core';
import {AuthService} from '../core/auth.service'
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {UserService} from "../core/user.service";

//Componente Registro
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public userService: UserService,
  ) {
    firebase.auth().getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigate(['/dashboard']);
      }
    });
    this.createForm();
  }

  //Crear formulario
  createForm() {
    this.registerForm = this.fb.group({
      displayName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  //Registro con Google
  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
          this.router.navigate(['/dashboard']);
        }, err => console.log(err)
      )
  }

  //Registro con Firebase
  tryRegister(value) {
    this.authService.doRegister(value)
      .then(res => {
        this.errorMessage = '';
        this.successMessage = 'Tu cuenta ha sido creada';
      }, err => {
        console.log(err)
        this.errorMessage = this.authService.FireBaseErrors[err.code];
        this.successMessage = '';
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
