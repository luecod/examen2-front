export class Personaje {
    Codigo:any;
    Nombre:string;
    Ciudad:string;
    Poder:any;

    constructor(cod:any, nom:string, ciu:string, pod:any){
        this.Codigo = cod;
        this.Nombre = nom;
        this.Ciudad = ciu;
        this.Poder = pod;
    }
}
