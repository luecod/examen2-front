import { Component, OnInit, Input, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/app/model/cliente';
import { Camion } from 'src/app/model/camion';
import { Encomienda } from 'src/app/model/encomienda';
import { Envio } from '../../model/envio';
import { Envio_encomienda } from '../../model/envio_encomienda';

// importaciones antiguas
import { Personaje } from 'src/app/model/personaje';
import { DbzService } from 'src/app/service/dbz.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  urlClientes = 'http://localhost:3000/api/clientes';
  urlCamiones = 'http://localhost:3000/api/camiones';
  urlEncomiendas = 'http://localhost:3000/api/encomiendas';
  urlEnvio = 'http://localhost:3000/api/envio';
  urlEnvio_encomienda = 'http://localhost:3000/api/envio_encomienda';
  vectorClientes!: Cliente[];
  vectorCamiones!: Camion[];
  vectorEncomiendas!: Encomienda[];
  vectorEnvio!: Envio[];
  vectorEnvio_encomienda!: Envio_encomienda[];
  idsEnvio = 0;

  http = inject(HttpClient);

  aggCedCli!: string;
  aggNomCli!: string;
  aggtelCli!: string;
  aggdirCli!: string;

  aggPlaCam!: string;
  aggProCam!: string;
  aggPesCam!: number;
  aggEstCam!: string;

  aggPesEnc!: number;
  aggDirEnc!: string;
  aggCosEnc!: number;
  aggEstEnc!: string;

  edtCodEnc: number = 0;
  edtPesEnc!: number;
  edtDirEnc!: string;
  edtCosEnc!: number;
  edtEstEnc!: string;

  edtCodCli: number = 0;
  edtCedCli!: string;
  edtNomCli!: string;
  edtTelCli!: string;
  edtDirCli!: string;

  edtCodCam: number = 0;
  edtPlaCam!: string;
  edtProCam!: string;
  edtPesCam!: number;
  edtEstCam!: string;

  agregarCliente() {
    this.http.post<Cliente>(this.urlClientes, new Cliente(this.aggCedCli, this.aggNomCli, this.aggtelCli, this.aggdirCli))
      .subscribe((data) => {
        console.log(data);
        this.traerClientes();
        location.reload();
      })
  }

  agregarCamion() {
    this.http.post<Camion>(this.urlCamiones, new Camion(this.aggPlaCam, this.aggProCam, this.aggPesCam, this.aggEstCam, 0))
      .subscribe((data) => { console.log(data); this.traerCamiones(); location.reload(); })
  }

  agregarEncomienda() {
    this.http.post<Encomienda>(this.urlEncomiendas, new Encomienda(this.aggPesEnc, this.aggDirEnc, this.aggCosEnc, this.aggEstEnc))
      .subscribe((data) => { console.log(data); this.traerEncomiendas(); location.reload(); })
  }

  eliminarCliente(event: any) {
    let id = event.target.value;
    this.http.delete<Cliente[]>(this.urlClientes + '/' + id)
      .subscribe((data) => {
        this.traerClientes();

      })
  }

  abrirEditarCliente(event: any) {
    let id = event.target.value;
    let nuevoCliente = this.vectorClientes.find((cliente) => cliente.codigo == id);
    console.log(nuevoCliente);
    if (nuevoCliente != undefined) {
      this.edtCodCli = nuevoCliente.codigo;
      this.edtCedCli = nuevoCliente.cedula;
      this.edtNomCli = nuevoCliente.nombres;
      this.edtTelCli = nuevoCliente.telefono;
      this.edtDirCli = nuevoCliente.direccion;
    }
    this.abrirModalGeneral("modalEditarClientes");
  }

  editarCliente() {
    this.http.put<Cliente>(this.urlClientes + '/' + this.edtCodCli, new Cliente(this.edtCedCli, this.edtNomCli, this.edtTelCli, this.edtDirCli))
      .subscribe((data) => { console.log(data); this.traerClientes(); })
  }

  abrirEditarCamion(event: any) {
    let id = event.target.value;
    let nuevoCamion = this.vectorCamiones.find((camion) => camion.id == id);
    console.log(nuevoCamion);
    if (nuevoCamion != undefined) {
      this.edtCodCam = nuevoCamion.id;
      this.edtPlaCam = nuevoCamion.placa;
      this.edtProCam = nuevoCamion.propietario;
      this.edtPesCam = nuevoCamion.peso;
      this.edtEstCam = nuevoCamion.estado;
    }
    this.abrirModalGeneral("modalEditarCamiones");
  }

  editarCamion() {
    this.http.put<Camion>(this.urlCamiones + '/' + this.edtCodCam, new Camion(this.edtPlaCam, this.edtProCam, this.edtPesCam, this.edtEstCam, 0))
      .subscribe((data) => { console.log(data); this.traerCamiones(); })
  }

  abrirEditarEncomienda(event: any) {
    let id = event.target.value;
    let nuevoEncomienda = this.vectorEncomiendas.find((encomienda) => encomienda.codigo == id);
    console.log(nuevoEncomienda);
    if (nuevoEncomienda != undefined) {
      this.edtCodEnc = nuevoEncomienda.codigo;
      this.edtPesEnc = nuevoEncomienda.peso;
      this.edtDirEnc = nuevoEncomienda.direccion;
      this.edtCosEnc = nuevoEncomienda.costo_envio;
      this.edtEstEnc = nuevoEncomienda.estado;
    }
    this.abrirModalGeneral("modalEditarEncomiendas");
  }

  editarEncomienda() {
    this.http.put<Encomienda>(this.urlEncomiendas + '/' + this.edtCodEnc, new Encomienda(this.edtPesEnc, this.edtDirEnc, this.edtCosEnc, this.edtEstEnc))
      .subscribe((data) => { console.log(data); this.traerEncomiendas(); })
  }

  eliminarCamion(event: any) {
    let id = event.target.value;
    this.http.delete<Camion[]>(this.urlCamiones + '/' + id)
      .subscribe((data) => {
        this.traerCamiones();
      })
  }
  eliminarEncomienda(event: any) {
    let id = event.target.value;
    this.http.delete<Encomienda[]>(this.urlEncomiendas + '/' + id)
      .subscribe((data) => {
        this.traerEncomiendas();
      })
  }

  // abrirModalCliente() {
  //   this.modal = new (window as any).bootstrap.Modal(
  //     document.getElementById("modalCrearCliente") as HTMLElement
  //   );
  //   this.modal.show();
  // }


  limpiarTodos() {
    this.aggCedCli = "";
    this.aggNomCli = "";
    this.aggtelCli = "";
    this.aggdirCli = "";
  }

  abrirModalGeneral(idmodal: any) {
    this.modal = new (window as any).bootstrap.Modal(
      document.getElementById(idmodal) as HTMLElement
    );
    this.modal.show();
  }

  generarEnvios() {
    let auxVectorEncomienda: Encomienda[] = [];
    let pesoTotalCamion = 0;
    let recaudado = 0;
    this.http.get<Camion[]>(this.urlCamiones)
      .subscribe((data) => {
        this.vectorCamiones = data;
        console.log(this.vectorCamiones);
        // recorre camiones
        for (const camion of this.vectorCamiones) {
          if (camion.estado == "Disponible") {
            // trae encomiendas
            this.http.get<Encomienda[]>(this.urlEncomiendas)
              .subscribe((data) => {
                this.vectorEncomiendas = data;
                console.log(this.vectorEncomiendas);
                // recorre encomiendas
                for (let encomienda of this.vectorEncomiendas) {
                  if (encomienda.estado == "Pendiente") {
                    // if (camion.peso >= encomienda.peso) {
                      pesoTotalCamion += encomienda.peso;
                      if (camion.peso >= pesoTotalCamion) {
                        recaudado += encomienda.costo_envio;
                        auxVectorEncomienda.push(new Encomienda(encomienda.peso, encomienda.direccion, encomienda.costo_envio, "Enviado"));
                        encomienda.estado = "Enviado";

                      } else {
                        this.http.post<Envio>(this.urlEnvio, new Envio(++this.idsEnvio, camion.id, pesoTotalCamion -= encomienda.peso, recaudado, 0))
                          .subscribe((data) => { console.log("envio creado") })
                        let idEnvio = this.idsEnvio;
                        for (let auxEncomienda of auxVectorEncomienda) {
                          console.log("entro")
                          this.http.put<Encomienda>(this.urlEncomiendas + '/' + encomienda.codigo, new Encomienda(encomienda.peso, encomienda.direccion, encomienda.costo_envio, "Enviado"))
                            .subscribe((data) => { console.log("encomienda actualizada") })
                          this.http.post<Envio_encomienda>(this.urlEnvio_encomienda, new Envio_encomienda(idEnvio, auxEncomienda.codigo, "Entregada"))
                            .subscribe((data) => { console.log("envio_encomienda creado") })
                        }
                        pesoTotalCamion = 0;
                        recaudado = 0;
                        auxVectorEncomienda = [];
                        break;
                      }
                    // } else {
                    //   pesoTotalCamion = 0;
                    //   recaudado = 0;
                    //   break
                    // }
                  }
                }
              })
            this.http.put<Camion>(this.urlCamiones + '/' + camion.id, new Camion(camion.placa, camion.propietario, camion.peso, "Ocupado", camion.num_viajes))
          }
        }

      })
    this.traerCamiones();
    this.traerEncomiendas();
    this.traerEnvio_encomienda();
    this.traerEnvios();
    // location.reload();
  }




  generarEnvios2() {
    let pesoEncomiendas = 0;
    let recaudado = 0;
    this.http.get<Encomienda[]>(this.urlEncomiendas)
      .subscribe((data) => {
        this.vectorEncomiendas = data;
        console.log(this.vectorEncomiendas);
        this.vectorEncomiendas.forEach((encomienda) => {

          this.http.get<Camion[]>(this.urlCamiones)
            .subscribe((data) => {
              this.vectorCamiones = data;
              console.log(this.vectorCamiones);
              this.vectorCamiones.forEach((camion) => {
                if (camion.estado == "Disponible") {
                  if (camion.peso >= encomienda.peso) {
                    pesoEncomiendas += encomienda.peso;
                    if (camion.peso >= pesoEncomiendas) {
                      recaudado += encomienda.costo_envio;

                      this.http.put<Camion>(this.urlCamiones + '/' + camion.id, new Camion(camion.placa, camion.propietario, camion.peso, "Ocupado", encomienda.codigo))
                        .subscribe((data) => { console.log(data); this.traerCamiones(); })
                      this.http.put<Encomienda>(this.urlEncomiendas + '/' + encomienda.codigo, new Encomienda(encomienda.peso, encomienda.direccion, encomienda.costo_envio, "Enviado"))
                        .subscribe((data) => { console.log(data); this.traerEncomiendas(); })
                    } else {

                    }
                  } else {

                  }




                }
              })
            })
        })
      })
  }

  // generarEnvios2() {
  //   let pesoEncomiendas = 0;
  //   let recaudado = 0;
  //   this.http.get<Encomienda[]>(this.urlEncomiendas)
  //     .subscribe((data) => {
  //       this.vectorEncomiendas = data;
  //       console.log(this.vectorEncomiendas);
  //       this.vectorEncomiendas.forEach((encomienda) => {

  //         this.http.get<Camion[]>(this.urlCamiones)
  //           .subscribe((data) => {
  //             this.vectorCamiones = data;
  //             console.log(this.vectorCamiones);
  //             this.vectorCamiones.forEach((camion) => {
  //               if (camion.estado == "Disponible") {

  //                 this.http.put<Camion>(this.urlCamiones + '/' + camion.id, new Camion(camion.placa, camion.propietario, camion.peso, "Ocupado", encomienda.codigo))
  //                   .subscribe((data) => { console.log(data); this.traerCamiones(); })
  //                 this.http.put<Encomienda>(this.urlEncomiendas + '/' + encomienda.codigo, new Encomienda(encomienda.peso, encomienda.direccion, encomienda.costo_envio, "Enviado"))
  //                   .subscribe((data) => { console.log(data); this.traerEncomiendas(); })
  //               }
  //             })
  //           })
  //       })
  //     })
  // }


  // }













  // codigo viejo
  personajesDbz!: Personaje[];
  cod!: string;
  nom!: string;
  ciu!: string;
  pod!: string;

  modal!: any;
  nuevo!: Personaje;
  constructor(private dbzService: DbzService) { }

  agregar() {
    this.dbzService.AgregarPersonaje(new Personaje(this.cod, this.nom, this.ciu, this.pod));
    console.log(this.personajesDbz);
    this.limpiarDatos();
  }

  editar(event: any) {
    let id = event.target.value;
    let pers = this.dbzService.BuscarPersonaje(id);
    console.log(pers);
    this.cod = pers.Codigo;
    this.nom = pers.Nombre;
    this.ciu = pers.Ciudad;
    this.pod = pers.Poder;
    console.log(this.cod, this.nom, this.ciu, this.pod);
    this.abrirModal();
  }
  actualizar() {
    //let lis = new Personaje()
    this.dbzService.EditarPersonaje(new Personaje(this.cod, this.nom, this.ciu, this.pod), this.cod);
    this.limpiarDatos();
  }

  eliminar(event: any) {
    let id = event.target.value;
    this.dbzService.EliminarPersonaje(id);
    console.log(this.personajesDbz);

  }
  limpiarDatos() {
    this.cod = "";
    this.nom = "";
    this.ciu = "";
    this.pod = "";
  }
  abrirModal() {
    this.modal = new (window as any).bootstrap.Modal(
      document.getElementById("editar") as HTMLElement
    );
    this.modal.show();
  }

  cerrarModal() {
    this.limpiarDatos();
    this.modal.hide();
  }






  // Nuevo codigo
  traerClientes() {
    this.http.get<Cliente[]>(this.urlClientes)
      .subscribe((data) => {
        this.vectorClientes = data;
        // console.log(this.vectorClientes);
      })
  }
  traerCamiones() {
    this.http.get<Camion[]>('http://localhost:3000/api/camiones')
      .subscribe((data) => {
        this.vectorCamiones = data;
        // console.log(this.vectorCamiones);
      })
  }
  traerEncomiendas() {
    this.http.get<Encomienda[]>('http://localhost:3000/api/encomiendas')
      .subscribe((data) => {
        this.vectorEncomiendas = data;
        // console.log(this.vectorEncomiendas);
      })
  }
  traerEnvios() {
    this.http.get<Envio[]>('http://localhost:3000/api/envio')
      .subscribe((data) => {
        this.vectorEnvio = data;
        // console.log(this.vectorEnvio);
      })
  }
  traerEnvio_encomienda() {
    this.http.get<Envio_encomienda[]>('http://localhost:3000/api/envio_encomienda')
      .subscribe((data) => {
        this.vectorEnvio_encomienda = data;
        // console.log(this.vectorEnvio_encomienda);
      })
  }

  ngOnInit(): void {
    // this.vectorClientes =
    this.traerClientes();
    this.traerCamiones();
    this.traerEncomiendas();
    this.traerEnvios();


    // codigo antiguo
    this.personajesDbz = this.dbzService.ListaPersonajes;
    // console.log(this.dbzService.ListaPersonajes);
  }
}
