import { supabase } from './supabase'

console.log('Conecciton done')
export class Tiquet {
    constructor (id=null, created_at = null, codigos = null, aula = null, grupo = null, ordenador = null, descripcion = null, alumno = null, estado = null) {
        this.id = id
        this.created_at = created_at
        this.codigos = codigos
        this.aula = aula
        this.grupo = grupo
        this.ordenador = ordenador
        this.descripcion = descripcion
        this.alumno = alumno
        this.estado = estado
        
      }
      
    static async getAll () {
        const { data: tiquet , error } = await supabase
        .from('tiquets')
        .select('*')
      if (error) {
        throw new Error(error.message)
      }
      return tiquet.map(({ id, created_at, codigos, aula, grupo , ordenador , descripcion, alumno , estado}) => {
          return new Tiquet(id, created_at, codigos, aula, grupo , ordenador , descripcion, alumno , estado)
      })
    }
    static async resolver(dataId) {
        const { data, error } = await supabase
          .from('tiquets')
          .update({
            estado: 'resolt'
          })
          .match({ id: `${dataId}` })
      
        if (error) {
          swal({ title: 'No se ma ha podido resolver', text: `${error}`, icon: 'warning' })
        } else {
          swal({ title: 'Resuelto', icon: 'success' })
        }
    } 
    static async eliminar(dataId){
        const { data, error } = await supabase 
              .from('tiquets')
              .delete()
              .match({ id: `${dataId}` })
        if(error){
          swal({title:'No se ha podido eliminar',text:`${error}`, icon:'warning'})
        }else{
          swal({title:'Eliminado Correctamente', icon:'success'})
        }
      }
}
