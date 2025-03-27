import { EntidadExterior } from "./entidad-exterior";
import { Profesor } from "./profesor";
import { Asignatura } from "./asignatura";
import { Meta } from "./meta";

export class Iniciativa {
    private idIniciativa: number;
    private titulo: string;
    private horas: number;
    private fechaInicio: string;
    private fechaFin: string;
    private descripcion: string;
    private tipoIniciativa: string;
    private productoFinal: string = "";
    private esInnovadora: number;
    private difusion: string = "";

    private asignaturas: Asignatura[];
    private entidadesExteriores: EntidadExterior[];
    private profesores: Profesor[];
    private metas: Meta[];

    constructor(id: number, titulo:string, horas: number, fechaInicio: string, fechaFin: string, descripcion: string, tipoIniciativa: string, productoFinal: string, esInnovadora: number, difusion: string, asignaturas: Asignatura[], entidadesExteriores: EntidadExterior[], profesores: Profesor[], metas:Meta[]) {
        this.idIniciativa = id;
        this.titulo = titulo;
        this.horas = horas;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.descripcion = descripcion;
        this.tipoIniciativa = tipoIniciativa;
        this.productoFinal = productoFinal;
        this.esInnovadora = esInnovadora;
        this.difusion = difusion;

        this.asignaturas = asignaturas;
        this.entidadesExteriores = entidadesExteriores;
        this.profesores = profesores;
        this.metas = metas;
    }

    /*
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
    }*/

    get Id(): number {
        return this.idIniciativa;
    }

    set Id(id: number) {
        this.idIniciativa = id;
    }

    get Titulo(): string {
        return this.titulo;
    }

    set Titulo(titulo: string) {
        this.titulo = titulo;
    }

    get Horas(): number {
        return this.horas;
    }

    set Horas(horas: number) {
        this.horas = horas;
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

    get Descripcion(): string {
        return this.descripcion;
    }

    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    get TipoIniciativa(): string {
        return this.tipoIniciativa;
    }

    set TipoIniciativa(tipoIniciativa: string) {
        this.tipoIniciativa = tipoIniciativa;
    }

    get ProductoFinal(): string {
        return this.productoFinal;
    }

    set ProductoFinal(productoFinal: string) {
        this.productoFinal = productoFinal;
    }

    get EsInnovadora(): number {
        return this.esInnovadora;
    }

    set EsInnovadora(esInnovadora: number) {
        this.esInnovadora = esInnovadora;
    }

    get Difusion(): string {
        return this.difusion;
    }

    set Difusion(difusion: string) {
        this.difusion = difusion;
    }



    get Asignaturas(): Asignatura[] {
        return this.asignaturas;
    }

    set Asignaturas(asignaturas: Asignatura[]) {
        this.asignaturas = asignaturas;
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

    get Metas(): Meta[] {
        return this.metas;
    }

    set Metas(metas: Meta[]) {
        this.metas = metas;
    }
}
