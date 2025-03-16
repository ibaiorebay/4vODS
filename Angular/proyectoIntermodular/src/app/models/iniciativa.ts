;
import { EntidadExterior } from "./entidad-exterior";
import { Profesor } from "./profesor";
import { Asignatura } from "./asignatura";
import { Meta } from "./meta";

export class Iniciativa {
    private id: number;
    private horas: number;
    private titulo: string;
    private descripcion: string;
    private fechaInicio: Date;
    private fechaFin: Date;
    private metas:Meta[];
    private entidadesExteriores: EntidadExterior[];
    private profesores: Profesor[];
    private asignaturas: Asignatura[];
    private tipoIniciativa: string;
    private esInnovadora: boolean;

    constructor(id: number, tipoIniciativa: string, esInnovadora: boolean, horas: number,titulo:string, descripcion: string, fechaInicio: Date, fechaFin: Date, metas:Meta[], entidadesExteriores: EntidadExterior[], profesores: Profesor[], asignaturas: Asignatura[]) {
        this.id = id;
        this.tipoIniciativa = tipoIniciativa;
        this.esInnovadora = esInnovadora;
        this.horas = horas;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.metas = metas;
        this.entidadesExteriores = entidadesExteriores;
        this.profesores = profesores;
        this.asignaturas = asignaturas;
    }
    get Id(): number {
        return this.id;
    }

    set Id(id: number) {
        this.id = id;
    }

    get TipoIniciativa(): string {
        return this.tipoIniciativa;
    }

    set TipoIniciativa(tipoIniciativa: string) {
        this.tipoIniciativa = tipoIniciativa;
    }

    get EsInnovadora(): boolean {
        return this.esInnovadora;
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

    get FechaInicio(): Date {
        return this.fechaInicio;
    }

    set FechaInicio(fechaInicio: Date) {
        this.fechaInicio = fechaInicio;
    }

    get FechaFin(): Date {
        return this.fechaFin;
    }

    set FechaFin(fechaFin: Date) {
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
