export class AuxEncomienda {
  codigo: any;
  peso: number;
  direccion: string;
  costo_envio: number;
  estado: string;

  constructor(codigo: any, peso: number, direccion: string, costo_envio: number, estado: string) {
    this.codigo = codigo;
    this.peso = peso;
    this.direccion = direccion;
    this.costo_envio = costo_envio;
    this.estado = estado;
  };

}
