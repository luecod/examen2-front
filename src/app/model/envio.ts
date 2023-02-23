export class Envio {
  id: number;
  id_camion: number;
  peso_total: number;
  total_recaudado: number;
  porcentaje_entrega: number;

  constructor(id: number, id_camion: number, peso_total: number, total_recaudado: number, porcentaje_entrega: number) {
    this.id = id;
    this.id_camion = id_camion;
    this.peso_total = peso_total;
    this.total_recaudado = total_recaudado;
    this.porcentaje_entrega = porcentaje_entrega;
  }
}
