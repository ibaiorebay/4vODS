import { EntidadExterior } from "./entidad-exterior";
import { Profesor } from "./profesor";
import { Asignatura } from "./asignatura";
import { Meta } from "./meta";

export class Iniciativa {
    private iD_INICIATIVA: number;
    private titulo: string;
    private horas: number;
    private fechA_INICIO: string;
    private fechA_FIN: string;
    private descripcion: string;
    private tipo: string;
    private productO_FINAL: string = "";
    private esInnovadora: number;
    private difusion: string = "";//redes sociales

    private asignaturas: Asignatura[];
    private entidadesExteriores: EntidadExterior[];
    private profesores: Profesor[];
    private metas: Meta[];

<<<<<<< HEAD
    // private ultimoId = 2;

    constructor(id: number, titulo: string, horas: number, fechaInicio: string, fechaFin: string, descripcion: string, tipoIniciativa: string, productoFinal: string, esInnovadora: number, difusion: string, asignaturas: Asignatura[], entidadesExteriores: EntidadExterior[], profesores: Profesor[], metas: Meta[]) {
        //    this.iD_INICIATIVA = this.ultimoId += 1;
        this.iD_INICIATIVA = id;
        this.titulo = titulo;
        this.horas = horas;
        this.fechA_INICIO = fechaInicio;
        this.fechA_FIN = fechaFin;
        this.descripcion = descripcion;
        this.tipo = tipoIniciativa;
        this.productO_FINAL = productoFinal;
        this.esInnovadora = esInnovadora;
        this.difusion = difusion;
=======
    private ultimoId = 2;
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6

    constructor(id: number, titulo:string, horas: number, fechaInicio: string, fechaFin: string, descripcion: string, tipoIniciativa: string, productoFinal: string, esInnovadora: number, difusion: string, asignaturas: Asignatura[], entidadesExteriores: EntidadExterior[], profesores: Profesor[], metas:Meta[]) {
       this.iD_INICIATIVA = this.ultimoId += 1;
       this.titulo = titulo;
       this.horas = horas;
       this.fechA_INICIO = fechaInicio;
       this.fechA_FIN = fechaFin;
       this.descripcion = descripcion;
       this.tipo = tipoIniciativa;
       this.productO_FINAL = productoFinal;
       this.esInnovadora = esInnovadora;
       this.difusion = difusion;

       this.asignaturas = asignaturas;
       this.entidadesExteriores = entidadesExteriores;
       this.profesores = profesores;
       this.metas = metas;
    }

    get Id(): number {
        return this.iD_INICIATIVA;
    }

    set Id(id: number) {
        this.iD_INICIATIVA = id;
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
        return this.fechA_INICIO;
    }

    set FechaInicio(fechaInicio: string) {
        this.fechA_INICIO = fechaInicio;
    }

    get FechaFin(): string {
        return this.fechA_FIN;
    }

    set FechaFin(fechaFin: string) {
        this.fechA_FIN = fechaFin;
    }

    get Descripcion(): string {
        return this.descripcion;
    }

    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

    get TipoIniciativa(): string {
        return this.tipo;
    }

    set TipoIniciativa(tipoIniciativa: string) {
        this.tipo = tipoIniciativa;
    }

    get ProductoFinal(): string {
        return this.productO_FINAL;
    }

    set ProductoFinal(productoFinal: string) {
        this.productO_FINAL = productoFinal;
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