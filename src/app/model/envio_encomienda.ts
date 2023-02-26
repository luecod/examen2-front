export class Envio_encomienda {
  id: any;
  id_envio: number;
  codigo_encomienda: number;
  estado_entrega: string;

  constructor(id_envio: number, codigo_encomienda: number, estado_entrega: string) {
    this.id_envio = id_envio;
    this.codigo_encomienda = codigo_encomienda;
    this.estado_entrega = estado_entrega;
  }
}
