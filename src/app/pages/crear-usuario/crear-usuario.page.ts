import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.page.html',
  styleUrls: ['./crear-usuario.page.scss'],
})
export class CrearUsuarioPage implements OnInit {
  mdl_mail: string = '';
  mdl_pass: string = '';
  mdl_nombre: string = '';
  mdl_apellido: string = '';
  mdl_carrera: string = '';
  constructor(
    private db: DbService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {}

  async almacenarUsuario() {
    await this.db.usuarioAlmacenar(
      this.mdl_mail,
      this.mdl_pass,
      this.mdl_nombre,
      this.mdl_apellido,
      this.mdl_carrera
    );
    this.router.navigate(['login']);
  }

  async registrar() {
    try {
      // Registro de datos en la API
      let datos = this.api.creacionUsuario(
        this.mdl_mail,
        this.mdl_pass,
        this.mdl_nombre,
        this.mdl_apellido,
        this.mdl_carrera
      );

      // Esperar respuesta de la API
      let respuesta = await lastValueFrom(datos);
      let json_texto = JSON.stringify(respuesta);
      let json = JSON.parse(json_texto);

      // Verificar si el registro en la API fue exitoso
      if (json.status == 'success') {
        // Almacenar en la base de datos local
        await this.db.usuarioAlmacenar(
          this.mdl_mail,
          this.mdl_pass,
          this.mdl_nombre,
          this.mdl_apellido,
          this.mdl_carrera
        );

        // Redirigir directamente a la página de login
        this.router.navigate(['login'], { replaceUrl: true });
      } else {
        // Manejo de error si el registro en la API falla
        console.log('Error al Crear Usuario: ' + json.message);
      }
    } catch (error) {
      // Manejo de errores en el proceso de registro
      console.error('Se produjo un error al registrar el usuario: ', error);
    }
  }
}
