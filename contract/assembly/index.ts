// /*
//  * This is an example of an AssemblyScript smart contract with two simple,
//  * symmetric functions:
//  *
//  * 1. setGreeting: accepts a greeting, such as "howdy", and records it for the
//  *    user (account_id) who sent the request
//  * 2. getGreeting: accepts an account_id and returns the greeting saved for it,
//  *    defaulting to "Hello"
//  *
//  * Learn more about writing NEAR smart contracts with AssemblyScript:
//  * https://docs.near.org/docs/develop/contracts/as/intro
//  *
//  */

// import { Context, logging, storage } from 'near-sdk-as'

// const DEFAULT_MESSAGE = 'Hello'

// // Exported functions will be part of the public interface for your smart contract.
// // Feel free to extract behavior to non-exported functions!
// export function getGreeting(accountId: string): string | null {
//   // This uses raw `storage.get`, a low-level way to interact with on-chain
//   // storage for simple contracts.
//   // If you have something more complex, check out persistent collections:
//   // https://docs.near.org/docs/concepts/data-storage#assemblyscript-collection-types
//   return storage.get<string>(accountId, DEFAULT_MESSAGE)
// }

// export function setGreeting(message: string): void {
//   const account_id = Context.sender

//   // Use logging.log to record logs permanently to the blockchain!
//   logging.log(
//     // String interpolation (`like ${this}`) is a work in progress:
//     // https://github.com/AssemblyScript/assemblyscript/pull/1115
//     'Saving greeting "' + message + '" for account "' + account_id + '"'
//   )

//   storage.set(account_id, message)
// }
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