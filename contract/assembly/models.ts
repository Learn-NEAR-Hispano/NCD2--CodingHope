import { PersistentVector } from "near-sdk-core";

export enum Estado {
    increchendo,
    fondeada,
  }


@nearBindgen
export class ProyectosFondeo {
    id:u64
    nombre: string;
    descripcion: string;
    estado: Estado;
    cantidadMeta: u64;
    cantidadFondeada: u64;    

  constructor(
      id:u64,
      nombre: string,
      descripcion: string,
      cantidadMeta: u64
      ) {
    this.id = id; 
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = Estado.increchendo;
    this.cantidadMeta = cantidadMeta;
    this.cantidadFondeada = 0;
  }
}



/* STORAGE */
export let proyectos = new PersistentVector<ProyectosFondeo>("proyecto")