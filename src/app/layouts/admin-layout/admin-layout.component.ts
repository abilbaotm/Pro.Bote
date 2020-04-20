import {Component, OnInit} from '@angular/core';
import {ThemeService} from "../../services/theme/theme.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(public themeService: ThemeService) {
  }

  ngOnInit() {
  }
}
