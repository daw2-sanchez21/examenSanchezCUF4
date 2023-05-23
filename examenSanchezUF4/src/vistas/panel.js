import { Tiquet } from "./claseTiquet"

export default {
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
async script(){
    

    const tiquets = await Tiquet.getAll()
    console.log(tiquets)
    tiquets.forEach((tiquet) => {
        if(tiquet.estado==="pendiente"){
        const tablatr = document.createElement('tr')
        tablatr.innerHTML=`
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
        `
        //Resolver
        //Obtenemos el elemento con el id resolver+numero que es el id
        const resolverObt = tablatr.querySelector(`#resolver-${tiquet.id}`)
        console.log(resolverObt)
        //Añadimos un listener para detectar click sobre este elemento
        resolverObt.addEventListener('click', async(e)=>{
            const obtId = e.target.id
            console.log("Este es el id: ", obtId)
            //Eliminamos el texto resolver para quedarnos solo con el numero del id
            const IdResolver = obtId.replace("resolver-", "")
            console.log("Este es el id2 : ", IdResolver)
            swal("Desea resolver el ticket?",{
                buttons:["Cancelar", "Confirmar"]
            })
            .then(async(value) => {
              if (value) {
                //Llamamos al metodo de tiquet
                await Tiquet.resolver(IdResolver)
                //Recargamos la pagina
                window.location = '#/panel'
              } else {
                swal({title:'Cancelado', icon:'warning'})
              }
            })
        })

        //Eliminar
        const eliminarObt = tablatr.querySelector(`#eliminar-${tiquet.id}`)
        //Añadimos un listener para detectar click sobre este elemento
        eliminarObt.addEventListener('click', async(e)=>{
            const obtIdeliminar = e.target.id
            //Eliminamos el texto resolver para quedarnos solo con el numero del id
            const IdEliminar = obtIdeliminar.replace("eliminar-", "")
            
            swal("Desea eliminar el ticket?",{
                buttons:["Cancelar", "Confirmar"]
            })
            .then(async(value) => {
              if (value) {
                //Llamamos al metodo de tiquet
                await Tiquet.eliminar(IdEliminar)
                //Recargamos la pagina
                window.location = '#/panel'
              } else {
                swal({title:'Cancelado', icon:'warning'})
              }
            })
        })

        const tabla = document.querySelector('#tabla')
        tabla.appendChild(tablatr)
    }else if(tiquet.estado==="resolt"){
        const tablatr2 = document.createElement('tr')
        tablatr2.innerHTML=`
        <th scope="row">${tiquet.codigos}</th>
        <td>${tiquet.created_at}</td>
        <td>${tiquet.aula}</td>
        <td>${tiquet.grupo}</td>
        <td>${tiquet.ordenador}</td>
        <td>${tiquet.descripcion}</td>
        <td>${tiquet.alumno}</td>
        <td><a href="#" class="btn btn-info" color:white" id="comentar-${tiquet.id}"><i class="bi bi-chat-left-text"></i></a></td>
        <td><a href="#" class="btn btn-danger" color:white" id="eliminar2-${tiquet.id}"><i class="bi bi-trash3"></i></a></td>
        `
         //Eliminar
         const eliminarObt = tablatr2.querySelector(`#eliminar2-${tiquet.id}`)
         //Añadimos un listener para detectar click sobre este elemento
         eliminarObt.addEventListener('click', async(e)=>{
             const obtIdeliminar = e.target.id
             //Eliminamos el texto resolver para quedarnos solo con el numero del id
             const IdEliminar = obtIdeliminar.replace("eliminar2-", "")
             
             swal("Desea eliminar el ticket?",{
                 buttons:["Cancelar", "Confirmar"]
             })
             .then(async(value) => {
               if (value) {
                 //Llamamos al metodo de tiquet
                 await Tiquet.eliminar(IdEliminar)
                 //Recargamos la pagina
                 window.location = '#/panel'
               } else {
                 swal({title:'Cancelado', icon:'warning'})
               }
             })
         })
         //Seleccionamos la tabla
        const tabla2= document.querySelector('#tabla2')
        //Añadimos al html
        tabla2.appendChild(tablatr2)
    }



    })

}


}