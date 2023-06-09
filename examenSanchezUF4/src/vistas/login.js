import { createClient } from '@supabase/supabase-js'
import { User } from './claseUser'
import { header } from '../componentes/header'

export default  {
  template: `<div class="pt-5">
  <h1 class="w-100 text-center">Login</h1>
  <form action="" class="form p-4 border shadow bordered mt-5 mx-auto" style="width: 400px;" id="form-id">
    <label for="email" class="mt-2 form-label">User: </label>
    <input type="text" class="form-control" placeholder="usuario@mail.com" id="email-id">

    <label for="pass" class="mt-2 form-label">Contraseña: </label>
    <input type="password" class="form-control" id="password-id">

    <button type="submit" class="btn btn-primary mt-4 w-100 " id="enviar">Entrar</button>
  </form>
</div>`,
  async script() {
    header.script()
    //Seleccionamos el formulario y añadimos un listener
    const formLogin = document.querySelector('#form-id')
    formLogin.addEventListener('submit', async(e)=>{
      e.preventDefault()
      e.stopPropagation()
      try{
        //Guardamos los datos obtenidos de los formularios
        const userData = {
          email: document.querySelector('#email-id').value,
          password: document.querySelector('#password-id').value
        }
      //Llamamos al metodo login
      const usuarioLogeado = await User.login(userData)
      console.log("Logueado")
      window.location.href = '/#/panel'
      header.script()
      }catch (error) {
       swal({title:'Error', text:'Las credenciales no son correcta o no estás registrado correctamente' , icon:'warning'})
      }
       
    })
  
  },
}
