import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {AngularFireAuth} from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthService {
  public FireBaseErrors = {
    'auth/invalid-email': 'El mail no esta bien formado',
    'auth/email-already-in-use': 'Email ya registrado',
    'auth/user-not-found': 'La combinación usuario/contraseña no son validas o el usuario no tiene contraseña',
    'auth/wrong-password': 'La combinación usuario/contraseña no son validas o el usuario no tiene contraseña'
  }

  constructor(
    public afAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  doGoogleLogin() {
    return new Promise<any>((resolve, reject) => {
      let provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');

      if (!(<any>window).cordova) {
        return this.afAuth.signInWithPopup(provider).then(res => {
          resolve(res);
        }, err => {
          console.log(err);
          reject(err);
        });
      } else {
        (<any>window).plugins.googleplus.login(
          {
            'webClientId': environment.WEBCLIENTID
          },
          function (obj) {
            return firebase.auth().signInWithCredential(firebase.auth.GoogleAuthProvider.credential(obj.idToken)).then(res => {
              resolve(res)
            });
          },
          function (msg) {
            alert('error: ' + msg);
          }
        );
      }

    })
  }

  public enviarCorreoActivacion() {
    var actionCodeSettings = {
      url: 'https://' + environment.BASE_DOMAIN + '/',
      handleCodeInApp: false
    };
    firebase.auth().currentUser.sendEmailVerification(actionCodeSettings).then()
  }

  doRegister(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
        .then(res => {
          var user = firebase.auth().currentUser;
          user.updateProfile({
            displayName: value.displayName
          }).then(() => {
            this.enviarCorreoActivacion()
          }, function (error) {
            // An error happened.
          });
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogin(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(res => {
          resolve(res);
        }, err => reject(err))
    })
  }

  doLogout() {
    return new Promise((resolve, reject) => {
      if ((<any>window).plugins) {
        (<any>window).plugins.googleplus.logout(function (msg) {
        });
      }
      if (firebase.auth().currentUser) {
        this.afAuth.signOut();
        resolve();
      } else {
        reject();
      }
    });
  }


  passOlvidada(ultimoCorreo: string) {
    var actionCodeSettings = {
      url: 'https://' + environment.BASE_DOMAIN + '/',
      handleCodeInApp: false
    };
    return new Promise((resolve, reject) => {
      if (this.afAuth.sendPasswordResetEmail(ultimoCorreo, actionCodeSettings)) {
        resolve();
      } else {
        reject();
      }
    });
  }
}
