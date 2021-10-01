import { Context, logging } from "near-sdk-as";
import { proyectos, ProyectosFondeo, Estado } from "./models";

export function nuevoProyecto( nombre: string,
  descripcion: string,
  cantidadMeta: i32
  ): void{
    assert(nombre.length>0,"no se pueden agregar proyectos sin nombre")
    assert(descripcion.length>0 && descripcion.length<50, 'Incluye una descripción no mayor a 50 caracteres')
    assert(cantidadMeta>0,"La meta de tu proyecto debe ser mayor que 0")
    proyectos.push(new ProyectosFondeo(proyectos.length, nombre, descripcion, cantidadMeta));
  }

  export function mostrarProyectos(): Array<ProyectosFondeo>{
    const resultado = new Array<ProyectosFondeo>(proyectos.length);
    for (let i=0; i < proyectos.length; i++){
      resultado[i] = proyectos[i];
    }
    return resultado;
  }

  export function fondearProyecto(id: i32,
    cantidad: i32,): ProyectosFondeo{      
      assert(<i32>cantidad>0,"la cantidad menor a transferir es 1")
      let proyecto = proyectos[id]
      //assert(proyecto.estado==Estado.fondeada,"Este programa social ya llegó a su meta y no puede aceptar mas donativos")
      if (proyecto.estado==1){
        logging.log("Este programa social ya llegó a su meta y no puede aceptar mas donativos")
      }
      else{
        let diferencia: i32
      let cantidadMeta: i32
      cantidadMeta =<i32>proyecto.cantidadMeta
      let cantidadFondeada: i32
       cantidadFondeada =<i32>proyecto.cantidadFondeada
      diferencia = cantidadMeta - cantidadFondeada
      // logging.log(cantidadMeta)
      // logging.log(cantidadFondeada)            
      // logging.log(diferencia)
      // logging.log(cantidad)
      assert(cantidad <= diferencia,"Este programa social no puede recaudar mas de lo que necesita")              
      proyecto.cantidadFondeada+=cantidad
      proyectos.replace(<i32>id,proyecto)
      if (proyecto.cantidadFondeada == proyecto.cantidadMeta){
        cambiarEstado(id)
      }      
      }
      return proyecto
    }

    export function cambiarEstado(id: i32
      ): ProyectosFondeo{
        let proyecto = proyectos[id]
        proyecto.estado = Estado.fondeada
        proyectos.replace(<i32>id, proyecto)
        return proyecto
      }

      export function borrarProyecto(id: i32
        ): void{
          assert(id>=0,"Introduce un id válido")
          proyectos.swap_remove(<i32>id)
        }