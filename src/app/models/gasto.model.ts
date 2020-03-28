export class Gasto {
  descripcion: string;
  fecha: Date;
  cantidad: number;
  partesIguales: boolean;
  ratio: number;
  moneda: string;
  pagador: string;
  creador: string;
  timezone: string;
  personas: {};

  constructor() {
    this.fecha = new Date();
  }
}
