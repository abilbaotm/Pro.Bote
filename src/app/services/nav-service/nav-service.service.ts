import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavServiceService {
  permisos = false;
  tituloViaje = null;

  constructor() {
  }
}
