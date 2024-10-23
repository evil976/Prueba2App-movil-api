import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  api_duoc: string = 'https://www.s2-studio.cl';
  constructor(private http: HttpClient) {}

  creacionUsuario(
    correo: string,
    contrasena: string,
    nombre: string,
    apellido: string,
    carrera: string
  ) {
    let objeto: any = {};
    objeto.correo = correo;
    objeto.contrasena = contrasena;
    objeto.nombre = nombre;
    objeto.apellido = apellido;
    objeto.carrera = carrera;

    return this.http
      .post(this.api_duoc + '/api_duoc/usuario/usuario_almacenar', objeto)
      .pipe();
  }

  login(correo: string, contrasena: string) {
    let objeto: any = {};
    objeto.correo = correo;
    objeto.contrasena = contrasena;
    return this.http
      .post(this.api_duoc + '/api_duoc/usuario/usuario_login', objeto)
      .pipe();
  }

  obtencionSedes() {
    return this.http
      .get(this.api_duoc + '/api_duoc/usuario/sedes_obtener')
      .pipe();
  }

  modificacionUsuario(correo: string, contrasena: string, carrera: string) {
    let objeto: any = {};
    objeto.correo = correo;
    objeto.contrasena = contrasena;
    objeto.carrera = carrera;
    return this.http
      .patch(this.api_duoc + '/api_duoc/usuario/usuario_modificar', objeto)
      .pipe();
  }
}
