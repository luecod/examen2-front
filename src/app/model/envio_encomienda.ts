export class Envio_encomienda {
  id: any;
  id_envio: number;
  id_encomienda: number;
  estado_entrega: string;

  constructor(id_envio: number, id_encomienda: number, estado_entrega: string) {
    this.id_envio = id_envio;
    this.id_encomienda = id_encomienda;
    this.estado_entrega = estado_entrega;
  }
}
