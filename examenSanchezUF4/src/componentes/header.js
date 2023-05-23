import { User } from "../vistas/claseUser"

export const header = {
  template: `<nav class="navbar navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand">Gestión de incidencias FPLLEFIA</a>
    <div>
      <button class="btn btn-secondary ms-2"><a href="/#/panel" style="text-decoration:none; color:white;">PANEL</a></button>
      <button class="btn btn-secondary ms-2"><a href="/#/login" style="text-decoration:none; color:white;">LOGIN</a></button>
      <button class="btn btn-secondary ms-2"><a href="/#/registro" style="text-decoration:none; color:white;">REGISTRO</a></button>
    </div>
    <div>
      <span>administrador@fpllefia.com</span>
      
    </div>
  </div>
</nav>`,
  async script (){

  }
}