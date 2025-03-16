;
import { EntidadExterior } from "./entidad-exterior";
import { Profesor } from "./profesor";
import { Asignatura } from "./asignatura";
import { Meta } from "./meta";

export class Iniciativa {
    private idIniciativa: number;
    private horas: number;
    private titulo: string;
    private descripcion: string;
    private fechaInicio: string;
    private fechaFin: string;
    private metas:Meta[];
    private entidadesExteriores: EntidadExterior[];
    private profesores: Profesor[];
    private asignaturas: Asignatura[];
    private productoFinal: string = "";
    // private tipoIniciativa: string;
    private tipo: string;
    // private esInnovadora: boolean;
    private nueva: number;

    // constructor(id: number, tipoIniciativa: string, esInnovadora: number, horas: number,titulo:string, descripcion: string, fechaInicio: string, fechaFin: string, metas:Meta[], entidadesExteriores: EntidadExterior[], profesores: Profesor[], asignaturas: Asignatura[]) {
    //     this.idIniciativa = id;
    //     this.tipo = tipoIniciativa;
    //     this.nueva = esInnovadora;
    //     this.horas = horas;
    //     this.titulo = titulo;
    //     this.descripcion = descripcion;
    //     this.fechaInicio = fechaInicio;
    //     this.fechaFin = fechaFin;
    //     this.metas = metas;
    //     this.entidadesExteriores = entidadesExteriores;
    //     this.profesores = profesores;
    //     this.asignaturas = asignaturas;
    // }

    constructor(data: any) {
        console.log(data);
        // Mapeamos los datos que nos devuelve la API a nuestro modelo

        // this.idIniciativa = data.iD_INICIATIVA;
        this.idIniciativa = data.idIniciativa;

        this.horas = data.horas;
        this.titulo = data.titulo;
        this.descripcion = data.descripcion;
        
        // this.fechaInicio = data.fechA_INICIO;  // Convierte la fecha desde string
        this.fechaInicio = data.fechaInicio;  // Convierte la fecha desde string
        
        // this.fechaFin = data.fechA_FIN;  // Convierte la fecha desde string
        this.fechaFin = data.fechaFin;  // Convierte la fecha desde string

        // this.metas = data.iD_METAs.map((metaData: any) => new Meta(metaData));  // Suponiendo que tienes una clase Meta
        // this.metas = data.iD_METAs ? data.iD_METAs.map((metaData: any) => new Meta(metaData)) : []
        this.metas = data.metas;
        
        // this.entidadesExteriores = data.iD_ENTIDADs.map((entidadData: any) => new EntidadExterior(entidadData));  // Suponiendo que tienes una clase EntidadExterior
        this.entidadesExteriores = data.entidadesExteriores;  // Suponiendo que tienes una clase EntidadExterior
        
        // this.profesores = data.iD_PROFESORs.map((profesorData: any) => new Profesor(profesorData));  // Suponiendo que tienes una clase Profesor
        this.profesores = data.profesores;  // Suponiendo que tienes una clase Profesor
        
        // this.asignaturas = data.iD_ASIGNATURAs.map((asignaturaData: any) => new Asignatura(asignaturaData));  // Suponiendo que tienes una clase Asignatura
        this.asignaturas = data.asignaturas;  // Suponiendo que tienes una clase Asignatura
        
        this.tipo = data.tipo;

        // this.productoFinal = data.productO_FINAL;
        this.productoFinal = data.productoFinal;
        
        this.nueva = data.nueva;
    }

    get Id(): number {
        return this.idIniciativa;
    }

    set Id(id: number) {
        this.idIniciativa = id;
    }

    get TipoIniciativa(): string {
        return this.tipo;
    }

    set TipoIniciativa(tipoIniciativa: string) {
        this.tipo = tipoIniciativa;
    }

    get EsInnovadora(): number {
        return this.nueva;
    }

    set EsInnovadora(esInnovadora: number) {
        this.nueva = esInnovadora;
    }

    get Horas(): number {
        return this.horas;
    }

    set Horas(horas: number) {
        this.horas = horas;
    }

    get Titulo(): string {
        return this.titulo;
    }

    set Titulo(titulo: string) {
        this.titulo = titulo;
    }

    get Descripcion(): string {
        return this.descripcion;
    }

    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    get FechaInicio(): string {
        return this.fechaInicio;
    }

    set FechaInicio(fechaInicio: string) {
        this.fechaInicio = fechaInicio;
    }

    get FechaFin(): string {
        return this.fechaFin;
    }

    set FechaFin(fechaFin: string) {
        this.fechaFin = fechaFin;
    }

    get Metas(): Meta[] {
        return this.metas;
    }

    set Metas(metas: Meta[]) {
        this.metas = metas;
    }

    get EntidadesExteriores(): EntidadExterior[] {
        return this.entidadesExteriores;
    }

    set EntidadesExteriores(entidadesExteriores: EntidadExterior[]) {
        this.entidadesExteriores = entidadesExteriores;
    }

    get Profesores(): Profesor[] {
        return this.profesores;
    }

    set Profesores(profesores: Profesor[]) {
        this.profesores = profesores;
    }

    get Asignaturas(): Asignatura[] {
        return this.asignaturas;
    }

    set Asignaturas(asignaturas: Asignatura[]) {
        this.asignaturas = asignaturas;
    }

}
