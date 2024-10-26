import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {
  correo: string = '';
  nombre: string = '';
  apellido: string = '';
  constructor(private db: DbService, private router: Router) {}

  async ngOnInit() {
    this.correo = await this.db.obtenerCorreoLogueado();
    let objeto = await this.db.obtenerUsuarioLogueado(this.correo);
    this.nombre = objeto.nombre;
    this.apellido = objeto.apellido;
  }

  async cerrarSesion() {
    try {
      await this.db.cerrarSesion(); // Llamada a la función cerrarSesion del servicio
      this.router.navigate(['/login']); // Redirige al usuario a la página de login o donde desees
      console.log('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión', error);
    }
  }

  sedes() {
    this.router.navigate(['/sedes'], { replaceUrl: true });
  }

  cambioPass() {
    this.router.navigate(['/cambio-datos'], { replaceUrl: true });
  }
}
