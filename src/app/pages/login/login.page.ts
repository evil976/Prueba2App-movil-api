import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  cantidad: string = '';

  mdl_mail: string = '';
  mdl_pass: string = '';

  constructor(private router: Router, private db: DbService) {}

  async ngOnInit() {}

  navegarCrearUsuario() {
    this.router.navigate(['crear-usuario']);
  }

  //REFRESCA LOS DATOS DE MANERA INMEDIATA AL REFRESCAR LA PANTALLA
  async ionViewWillEnter() {
    this.cantidad = await this.db.obtenerCantidadUsuarios();
  }

  async login() {
    let cantidad = await this.db.login(this.mdl_mail, this.mdl_pass);
    if (cantidad == '0') {
      console.log('JRD: credenciales invalidas');
    } else {
      await this.db.sesionAlmacenar(this.mdl_mail);
      console.log('JRD: Inicio de sesion ok');
      this.router.navigate(['inicio']);
    }
  }
}
