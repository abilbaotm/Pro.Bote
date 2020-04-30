import {Component, OnInit} from '@angular/core';
import {FirebaseUserModel} from '../../core/user.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/user.service';
import {ThemeService} from "../../services/theme/theme.service";
import {AuthService} from "../../core/auth.service";

//Componente user

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;


  passMsg: string;

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
  }

  //Crear formulario
  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }


  //Guardar los valores
  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        this.user.name = value.name;
      }, err => console.log(err))
  }

  //Alternar color Oscuro/Claro
  changeDashboardColor(color) {
    var body = document.getElementsByTagName('body')[0];
    if (body && color === 'white-content') {
      body.classList.add(color);
    } else if (body.classList.contains('white-content')) {
      body.classList.remove('white-content');
    }
    if (body && color === 'white-content') {
      this.themeService.setDark(false)
    } else {
      this.themeService.setDark(true)
    }
  }

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private fb: FormBuilder,
    private themeService: ThemeService,
    public authService: AuthService,
  ) {
  }

  cambiarPassword() {
    this.authService.passOlvidada(this.user.email).then(() => {
      this.passMsg = "Se ha solicitado el cambio de contraseña. Verifique su email para poder realizar la operación de cambio de contraseña."
    })
  }
}
