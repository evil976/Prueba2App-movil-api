import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db: SQLiteObject | null = null;
  constructor(private sqlite: SQLite) {}

  async abrirDB() {
    this.db = await this.sqlite.create({
      name: 'datos.db',
      location: 'default',
    });
    console.log('JRD: BASE DE DATOS ABIERTA OK');
  }

  async crearTablaUsuario() {
    await this.abrirDB();
    await this.db?.executeSql(
      'CREATE TABLE IF NOT EXISTS USUARIO(MAIL VARCHAR(75), PASS VARCHAR(30), NOMBRE VARCHAR(30), APELLIDO VARCHAR(30), CARRERA VARCHAR(30))',
      []
    );
    console.log('JRD: TABLA USUARIO CREADA OK');
  }

  async sesionAbierta() {
    await this.abrirDB();
    await this.db?.executeSql(
      'CREATE TABLE IF NOT EXISTS SESION(MAIL VARCHAR(75))',
      []
    );
    console.log('JRD: SESION CREADA OK');
  }

  async usuarioAlmacenar(
    correo: string,
    contrasena: string,
    nombre: string,
    apellido: string,
    carrera: string
  ) {
    try {
      await this.abrirDB();
      await this.db?.executeSql('INSERT INTO USUARIO VALUES(?,?,?,?,?)', [
        correo,
        contrasena,
        nombre,
        apellido,
        carrera,
      ]);
      console.log('JRD: USUARIO ALMACENADO OK');
    } catch (error) {
      console.log('JRD: SE HA PRODUCIDO UN ERROR' + JSON.stringify(error));
    }
  }

  async obtenerCantidadUsuarios() {
    await this.abrirDB();
    let respuesta = await this.db?.executeSql(
      'SELECT COUNT(MAIL) AS CANTIDAD FROM USUARIO',
      []
    );
    console.log('JRD: ' + JSON.stringify(respuesta.rows.item(0).CANTIDAD));
    return JSON.stringify(respuesta.rows.item(0).CANTIDAD);
  }

  async login(correo: string, contrasena: string) {
    let respuesta = await this.db?.executeSql(
      'SELECT COUNT(MAIL) AS CANTIDAD FROM USUARIO WHERE MAIL = ? AND PASS = ?',
      [correo, contrasena]
    );
    return JSON.stringify(respuesta.rows.item(0).CANTIDAD);
  }

  async obtenerCantidadSesion() {
    await this.abrirDB();
    let respuesta = await this.db?.executeSql(
      'SELECT COUNT(MAIL) AS CANTIDAD FROM SESION',
      []
    );
    return JSON.stringify(respuesta.rows.item(0).CANTIDAD);
  }

  async sesionAlmacenar(correo: string) {
    try {
      await this.abrirDB();
      await this.db?.executeSql('INSERT INTO SESION VALUES(?)', [correo]);
      console.log('JRD: USUARIO ALMACENADO OK');
    } catch (error) {
      console.log('JRD: SE HA PRODUCIDO UN ERROR' + JSON.stringify(error));
    }
  }

  async obtenerCorreoLogueado() {
    await this.abrirDB();
    let respuesta = await this.db?.executeSql('SELECT MAIL FROM SESION', []);

    return respuesta.rows.item(0).MAIL;
  }

  async obtenerUsuarioLogueado(correo: string) {
    await this.abrirDB();
    let respuesta = await this.db?.executeSql(
      'SELECT NOMBRE, APELLIDO FROM USUARIO WHERE MAIL = ?',
      [correo]
    );

    let objeto: any = {};
    objeto.nombre = respuesta.rows.item(0).NOMBRE;
    objeto.apellido = respuesta.rows.item(0).APELLIDO;

    return objeto;
  }

  async cerrarSesion() {
    try {
      await this.abrirDB();
      await this.db?.executeSql('DELETE FROM SESION', []);
      console.log('JRD: SESIÓN CERRADA OK');
    } catch (error) {
      console.log(
        'JRD: SE HA PRODUCIDO UN ERROR AL CERRAR LA SESIÓN' +
          JSON.stringify(error)
      );
    }
  }
}
