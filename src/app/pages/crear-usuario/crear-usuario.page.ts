import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

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
  constructor(private db: DbService, private router: Router) {}

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
}
