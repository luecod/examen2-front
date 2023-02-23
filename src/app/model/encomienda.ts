export class Encomienda {
    codigo: any;
    peso: number;
    direccion: string;
    costo_envio: number;
    estado: string;

    constructor(peso: number, direccion: string, costo_envio: number, estado: string) {
        this.peso = peso;
        this.direccion = direccion;
        this.costo_envio = costo_envio;
        this.estado = estado;
    }
}
