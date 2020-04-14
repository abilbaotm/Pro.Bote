import {Component} from '@angular/core';
import {AuthService} from '../core/auth.service'
import {Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/auth';

@Component({
  selector: 'page-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.scss']
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public afAuth: AngularFireAuth,
  ) {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  tryGoogleLogin() {
    this.authService.doGoogleLogin()
      .then(res => {
        this.router.navigate(['/dashboard']);
      })
  }

  tryLogin(value) {
    this.authService.doLogin(value)
      .then(res => {
        this.router.navigate(['/dashboard']);
      }, err => {
        console.log(err);
        this.errorMessage = err.message;
      })
  }
}
