import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-sedes',
  templateUrl: './sedes.page.html',
  styleUrls: ['./sedes.page.scss'],
})
export class SedesPage implements OnInit {
  lista_sedes: any[] = [];
  constructor(private api: ApiService, private route: Router) {}

  ngOnInit() {
    this.obtencionSedes();
  }

  async obtencionSedes() {
    this.lista_sedes = []; //inicializar lista vacia para limpiar cada vez que se ejecute
    let data = this.api.obtencionSedes();
    let response = await lastValueFrom(data); //se espera que salga el ultimo dato sobre los sismos

    let jsonTxt = JSON.stringify(response); //json toma los objetos y el metodo stringy convierte a texto la respuesta
    let json = JSON.parse(jsonTxt); //el parse separa por objeto(para recorrer)

    for (let x = 0; x < json[0].length; x++) {
      let sede: any = {}; //diccionario vacio
      sede.nombre = json[0][x].NOMBRE;
      sede.direccion = json[0][x].DIRECCION;
      sede.telefono = json[0][x].TELEFONO;
      sede.horario_atencion = json[0][x].HORARIO_ATENCION;
      sede.imagen = json[0][x].IMAGEN;

      this.lista_sedes.push(sede);
    }
  }
}
