export class Cliente {
  codigo: any;
  cedula: any;
  nombres: any;
  telefono: any;
  direccion: any;

  constructor(cedula: string, nombres: string, telefono: string, direccion: string){
    this.cedula = cedula;
    this.nombres = nombres;
    this.telefono = telefono;
    this.direccion = direccion;
  }
}
