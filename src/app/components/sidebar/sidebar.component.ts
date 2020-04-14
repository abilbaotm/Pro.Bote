import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  {
    path: "/dashboard",
    title: "Inicio",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/nuevoviaje",
    title: "Nuevo viaje",
    icon: "icon-simple-add",
    class: ""
  },
];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  public ruta: string[];

  constructor(
    private router: Router
  ) {
  }

  ngOnInit() {
    this.ruta = [];
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    console.log(this.router.url.split('/'));
    this.ruta = this.router.url.split('/');
    this.router.events.subscribe(e => {
      if (e instanceof NavigationEnd) {
        console.log(this.router.url.split('/'));
        this.ruta = this.router.url.split('/');
        console.log(this.ruta)
      }
    });
  }

  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
