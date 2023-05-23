import { s as supabase } from "./main-beaeeee2.js";
console.log("Conecciton done");
class Tiquet {
  constructor(id = null, created_at = null, codigos = null, aula = null, grupo = null, ordenador = null, descripcion = null, alumno = null, estado = null) {
    this.id = id;
    this.created_at = created_at;
    this.codigos = codigos;
    this.aula = aula;
    this.grupo = grupo;
    this.ordenador = ordenador;
    this.descripcion = descripcion;
    this.alumno = alumno;
    this.estado = estado;
  }
  static async getAll() {
    const { data: tiquet, error } = await supabase.from("tiquets").select("*");
    if (error) {
      throw new Error(error.message);
    }
    return tiquet.map(({ id, created_at, codigos, aula, grupo, ordenador, descripcion, alumno, estado }) => {
      return new Tiquet(id, created_at, codigos, aula, grupo, ordenador, descripcion, alumno, estado);
    });
  }
  static async resolver(dataId) {
    const { data, error } = await supabase.from("tiquets").update({
      estado: "resolt"
    }).match({ id: `${dataId}` });
    if (error) {
      swal({ title: "No se ma ha podido resolver", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Resuelto", icon: "success" });
    }
  }
  static async eliminar(dataId) {
    const { data, error } = await supabase.from("tiquets").delete().match({ id: `${dataId}` });
    if (error) {
      swal({ title: "No se ha podido eliminar", text: `${error}`, icon: "warning" });
    } else {
      swal({ title: "Eliminado Correctamente", icon: "success" });
    }
  }
}
const panel = {
  template: ` 
<div class="container-fluid">
<h2 class="mt-5">Tickets pendientes</h2>
<table class="table mt-4">
<thead>
  <tr>
    <th>Código</th>
    <th>Fecha</th>
    
    <th>Aula</th>
    <th>Grupo</th>
    <th>Ordenador</th>
    <th>Descripción</th>
    <th>Alumno</th>
    <th>Resolver</th>
    <th>Editar</th>
    <th>Comentar</th>
    <th>Eliminar</th>
  </tr>
</thead>
<tbody id="tabla">

</tbody>
</table>
</div>
<div class="container-fluid mt-5">
<table class="table mt-4">
<h2>Tickets Resueltos</h2>
<thead>

  <tr>
    <th>Código</th>
    <th>Fecha</th>
    
    <th>Aula</th>
    <th>Grupo</th>
    <th>Ordenador</th>
    <th>Descripción</th>
    <th>Alumno</th>
    <th>Comentar</th>
    <th>Eliminar</th>
  </tr>
</thead>
<tbody id="tabla2">

</tbody>
</table>
</div>
`,
  async script() {
    const tiquets = await Tiquet.getAll();
    console.log(tiquets);
    tiquets.forEach((tiquet) => {
      if (tiquet.estado === "pendiente") {
        const tablatr = document.createElement("tr");
        tablatr.innerHTML = `
        <th scope="row">${tiquet.codigos}</th>
        <td>${tiquet.created_at}</td>
        <td>${tiquet.aula}</td>
        <td>${tiquet.grupo}</td>
        <td>${tiquet.ordenador}</td>
        <td>${tiquet.descripcion}</td>
        <td>${tiquet.alumno}</td>
        <td><a href="#" class="btn btn-success" color:white" id="resolver-${tiquet.id}">Resolver</a></td>
        <td><a href="#" class="btn btn-warning" color:white" id="editar-${tiquet.id}"><i class="bi  bi-pencil" data-bs-toggle="modal" data-bs-target="#exampleModal"></i></a></td>
        <td><a href="#" class="btn btn-info" color:white" id="comentar-${tiquet.id}"><i class="bi bi-chat-left-text"></i></a></td>
        <td><a href="#" class="btn btn-danger" color:white" id="eliminar-${tiquet.id}"><i class="bi bi-trash3"></i></a></td>
        `;
        const resolverObt = tablatr.querySelector(`#resolver-${tiquet.id}`);
        console.log(resolverObt);
        resolverObt.addEventListener("click", async (e) => {
          const obtId = e.target.id;
          console.log("Este es el id: ", obtId);
          const IdResolver = obtId.replace("resolver-", "");
          console.log("Este es el id2 : ", IdResolver);
          swal("Desea resolver el ticket?", {
            buttons: ["Cancelar", "Confirmar"]
          }).then(async (value) => {
            if (value) {
              await Tiquet.resolver(IdResolver);
              window.location = "#/panel";
            } else {
              swal({ title: "Cancelado", icon: "warning" });
            }
          });
        });
        const eliminarObt = tablatr.querySelector(`#eliminar-${tiquet.id}`);
        eliminarObt.addEventListener("click", async (e) => {
          const obtIdeliminar = e.target.id;
          const IdEliminar = obtIdeliminar.replace("eliminar-", "");
          swal("Desea eliminar el ticket?", {
            buttons: ["Cancelar", "Confirmar"]
          }).then(async (value) => {
            if (value) {
              await Tiquet.eliminar(IdEliminar);
              window.location = "#/panel";
            } else {
              swal({ title: "Cancelado", icon: "warning" });
            }
          });
        });
        const tabla = document.querySelector("#tabla");
        tabla.appendChild(tablatr);
      } else if (tiquet.estado === "resolt") {
        const tablatr2 = document.createElement("tr");
        tablatr2.innerHTML = `
        <th scope="row">${tiquet.codigos}</th>
        <td>${tiquet.created_at}</td>
        <td>${tiquet.aula}</td>
        <td>${tiquet.grupo}</td>
        <td>${tiquet.ordenador}</td>
        <td>${tiquet.descripcion}</td>
        <td>${tiquet.alumno}</td>
        <td><a href="#" class="btn btn-info" color:white" id="comentar-${tiquet.id}"><i class="bi bi-chat-left-text"></i></a></td>
        <td><a href="#" class="btn btn-danger" color:white" id="eliminar2-${tiquet.id}"><i class="bi bi-trash3"></i></a></td>
        `;
        const eliminarObt = tablatr2.querySelector(`#eliminar2-${tiquet.id}`);
        eliminarObt.addEventListener("click", async (e) => {
          const obtIdeliminar = e.target.id;
          const IdEliminar = obtIdeliminar.replace("eliminar2-", "");
          swal("Desea eliminar el ticket?", {
            buttons: ["Cancelar", "Confirmar"]
          }).then(async (value) => {
            if (value) {
              await Tiquet.eliminar(IdEliminar);
              window.location = "#/panel";
            } else {
              swal({ title: "Cancelado", icon: "warning" });
            }
          });
        });
        const tabla2 = document.querySelector("#tabla2");
        tabla2.appendChild(tablatr2);
      }
    });
  }
};
export {
  panel as default
};
