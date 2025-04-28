import { EntidadExterior } from "./entidad-exterior";
import { Profesor } from "./profesor";
import { Asignatura } from "./asignatura";
import { Meta } from "./meta";

//crisComment: me cree esta clase para hacer post de una Iniciativa
export class IniciativaDTO {
    private iD_INICIATIVA: number;
    private titulo: string;
    private horas: number;
    private fechA_INICIO: string;
    private fechA_FIN: string;
    private descripcion: string;
    private tipo: string;
    private productO_FINAL: string = "";
    private nueva: number;
    private difusion: string = "";//redes sociales

    private iD_ASIGNATURAs: number[];
    private iD_ENTIDADs: number[];
    private iD_PROFESORs: number[];
    private iD_METAs: number[];

    private static ultimoId: number = 2;

    constructor(id: any, titulo: string, horas: number, fechaInicio: string, fechaFin: string, descripcion: string, tipoIniciativa: string, productoFinal: string, esInnovadora: number, difusion: string, asignaturas: number[], entidadesExteriores: number[], profesores: number[], metas: number[]) {
        this.iD_INICIATIVA = id !== null ? id : IniciativaDTO.ultimoId++;
        this.titulo = titulo;
        this.horas = horas;
        this.fechA_INICIO = fechaInicio;
        this.fechA_FIN = fechaFin;
        this.descripcion = descripcion;
        this.tipo = tipoIniciativa;
        this.productO_FINAL = productoFinal;
        this.nueva = esInnovadora;
        this.difusion = difusion;

        this.iD_ASIGNATURAs = asignaturas;
        this.iD_ENTIDADs = entidadesExteriores;
        this.iD_PROFESORs = profesores;
        this.iD_METAs = metas;
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
        return this.nueva;
    }

    set EsInnovadora(esInnovadora: number) {
        this.nueva = esInnovadora;
    }

    get Difusion(): string {
        return this.difusion;
    }

    set Difusion(difusion: string) {
        this.difusion = difusion;
    }



    get Asignaturas(): number[] {
        return this.iD_ASIGNATURAs;
    }

    set Asignaturas(asignaturas: number[]) {
        this.iD_ASIGNATURAs = asignaturas;
    }

    get EntidadesExteriores(): number[] {
        return this.iD_ENTIDADs;
    }

    set EntidadesExteriores(entidadesExteriores: number[]) {
        this.iD_ENTIDADs = entidadesExteriores;
    }

    get Profesores(): number[] {
        return this.iD_PROFESORs;
    }

    set Profesores(profesores: number[]) {
        this.iD_PROFESORs = profesores;
    }

    get Metas(): number[] {
        return this.iD_METAs;
    }

    set Metas(metas: number[]) {
        this.iD_METAs = metas;
    }
}