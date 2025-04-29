export class Asignatura {
    private id: number;
    private idCurso: number;
    private nombreCurso: string;
    private nombreAsignatura: string;

    constructor(id: number, idCurso: number, nombreCurso: string, nombreAsignatura: string) {
        this.id = id;
        this.nombreCurso = nombreCurso;
        this.idCurso = idCurso;
        this.nombreAsignatura = nombreAsignatura;
    }
    
    get Id(): number {
        return this.id;
    }

    set Id(id: number) {
        this.id = id;
    }


    get IdCurso(): number {
        return this.idCurso;
    }   

    set IdCurso(idCurso: number) {
        this.idCurso = idCurso;
    }


    get NombreCurso(): string {
        return this.nombreCurso;
    }   

    set NombreCurso(nombreCurso: string) {
        this.nombreCurso = nombreCurso;
    }


    get NombreAsignatura(): string {
        return this.nombreAsignatura;
    }

    set NombreAsignatura(nombreAsignatura: string) {
        this.nombreAsignatura = nombreAsignatura;
    }

}
