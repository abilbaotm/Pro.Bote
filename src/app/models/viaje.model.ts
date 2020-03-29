import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

export class Viaje {
  descripcion: string;
  admin: string;
  permitidos: {
  };
  monedaPrincipal: string;
  monedasAdicionales: {
    moneda: string;
    ratio: number;
  };
  fechas: {
    start: Timestamp,
    end: Timestamp
  };
  timezone: string
}
