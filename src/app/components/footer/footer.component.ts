import {Component, OnInit} from '@angular/core';
import {environmentversion} from '../../../environments/environmentversion';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test: Date = new Date();
  actualVersion: string;

  constructor() {
  }

  ngOnInit() {
    this.actualVersion = environmentversion
  }
}
