export class Gasto {
  descricion: string;
  fecha: Date;
  cantidad: number;
  partesIguales: boolean;
  ratio: number;
  moneda: string;
  pagador: string;

  constructor() {
    this.fecha = new Date();
  }
}
