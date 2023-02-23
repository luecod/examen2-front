import { Injectable } from '@angular/core';
import { Personaje } from '../model/personaje';

@Injectable({
  providedIn: 'root'
})
export class DbzService {
  ListaPersonajes: Personaje[] = [
    {
      Codigo: 1,
      Nombre: 'Goku',
      Ciudad: 'New York',
      Poder: 50
    },
    {
      Codigo: 2,
      Nombre: 'Vegeta',
      Ciudad: 'Orlando',
      Poder: 40
    }
  ];
  get getLista(): Personaje[] {
    return [...this.ListaPersonajes];
  }
  constructor( ) {
  }
  AgregarPersonaje(op: Personaje) {
    this.ListaPersonajes.push(op);
  }

  EditarPersonaje(obj:any, cod:string){
    for (let i = 0; i < this.ListaPersonajes.length; i++) {
      if(cod === this.ListaPersonajes[i].Codigo){
          this.ListaPersonajes[i].Codigo = obj.Codigo
          this.ListaPersonajes[i].Nombre = obj.Nombre
          this.ListaPersonajes[i].Ciudad = obj.Ciudad
          this.ListaPersonajes[i].Poder = obj.Poder
      }
    }
  }
  EliminarPersonaje(cod:string){
    for (let i = 0; i < this.ListaPersonajes.length; i++) {
      if(cod == this.ListaPersonajes[i].Codigo){
        this.ListaPersonajes.splice(i, 1)
      }
    }
  }
  BuscarPersonaje(cod:Number){
    let obj:any;
    for(let i = 0; i < this.ListaPersonajes.length; i++){
      if(cod == this.ListaPersonajes[i].Codigo){
        console.log("Encontrado");
        
        obj = this.ListaPersonajes[i];
      }
    }
    return obj;
  }
}
