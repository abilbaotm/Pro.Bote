import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  black: boolean;

  constructor() {
    if (parseInt(localStorage.getItem('dark')) == 0) {
      this.setDark(false)
      var body = document.getElementsByTagName('body')[0];
      body.classList.add('white-content');
    } else {
      this.setDark(true)
    }
  }

  setDark(b: boolean) {
    if (b) {
      this.black = true;
      localStorage.setItem('dark', '1')
    } else {
      this.black = false;
      localStorage.setItem('dark', '0')

    }
  }

  getDark() {
    return this.black
  }
}
