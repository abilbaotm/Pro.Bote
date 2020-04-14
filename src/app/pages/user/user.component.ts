import {Component, OnInit} from '@angular/core';
import {FirebaseUserModel} from '../../core/user.model';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../core/user.service';

@Component({
  selector: 'app-user',
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;


  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(routeData => {
      let data = routeData['data'];
      if (data) {
        this.user = data;
        this.createForm(this.user.name);
      }
    })
  }

  createForm(name) {
    this.profileForm = this.fb.group({
      name: [name, Validators.required]
    });
  }


  save(value) {
    this.userService.updateCurrentUser(value)
      .then(res => {
        this.user.name = value.name;
        console.log(res);
      }, err => console.log(err))
  }
}
