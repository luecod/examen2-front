export class Camion {
  id: any;
  placa: string;
  propietario: string;
  peso: number;
  estado: string;

  constructor(placa: string, propietario: string, peso: number, estado: string) {
    this.placa = placa;
    this.propietario = propietario;
    this.peso = peso;
    this.estado = estado;
  }
}
