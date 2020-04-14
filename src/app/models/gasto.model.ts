export class Gasto {
  id: string;
  descripcion: string;
  fecha: Date;
  cantidad: number;
  partesIguales: boolean;
  ratio: number;
  moneda: string;
  pagador: string;
  creador: string;
  timezone: string;
  personas: { string: { cantidad: number } };
  diaLocal: string;

  constructor() {
    this.fecha = new Date();
  }
}
