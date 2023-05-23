// Importamos la conexión a la base de datos
import { createClient } from '@supabase/supabase-js'
// import { supabase } from './supabase'
import { supabase } from './supabase'

console.log('Conecciton done')
export class User {
  // Mapping de propiedades de la tabla perfiles
  constructor (id=null, email = null, password = null) {
    this.id = id
    this.email = email
    this.password = password
  }
  // login
  static async login (userData) {
      const { data, error } = await supabase.auth.signInWithPassword(userData)
      if (error) {
        swal({title:'Error', text:'Credenciales incorrectas o falta de confirmación de email.' , icon:'warning'})
      }
      return new User(data.user.id, data.user.email)
    }
    static async create (userData) {
        const { data, error } = await supabase.auth.signUp(userData)
    
        if (error) {
          swal({title:'Error al crear el usuario', icon:'danger'})
        }
        swal({title:'Usuario Creado', icon:'success'})
        return new User(data.user.id,data.user.email)
    }
    static async logout(){
      // USER LOGOUT
    const { error } = await supabase.auth.signOut()
    if (error) {
      throw new Error(error.message)
    }
    return true
    }
  // leer user logeado
  static async getUser () {
    try {
      // GET USER
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        return new User(user.id, user.email)
      } else {
        return false
      }
    } catch (error) {
      console.error(error);
    }
  }
  static async getAllUsers () {
    
    const { data: { users }, error } = await supabase.auth.admin.listUsers()

    if (users) {
      return new User(users.id, users.email)
    } else {
      console.log(error)
    }
  }
  
  
}
