export class Camion {
  id: any;
  placa: string;
  propietario: string;
  peso: number;
  estado: string;
  num_viajes: number;

  constructor(placa: string, propietario: string, peso: number, estado: string, num_viajes: number) {
    this.placa = placa;
    this.propietario = propietario;
    this.peso = peso;
    this.estado = estado;
    this.num_viajes = num_viajes;
  }
}
