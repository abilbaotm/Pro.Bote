import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service'
import { Router, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from "firebase";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    firebase.auth().getRedirectResult().then(result => {
      if (result.user) {
        this.router.navigate(['/dashboard']);
      }
    });
    this.createForm();
   }

   createForm() {
     this.registerForm = this.fb.group({
       displayName: ['',Validators.required],
       email: ['', Validators.required ],
       password: ['',Validators.required]
     });
   }



   tryGoogleLogin(){
     this.authService.doGoogleLogin()
     .then(res =>{
       this.router.navigate(['/dashboard']);
     }, err => console.log(err)
     )
   }

   tryRegister(value){
     this.authService.doRegister(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "Your account has been created";
     }, err => {
       console.log(err);
       this.errorMessage = err.message;
       this.successMessage = "";
     })
   }

}
