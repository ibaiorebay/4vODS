export class Asignatura {
    private id: number;
<<<<<<< HEAD
    private idCurso: number;
    private nombreCurso: string;
    private nombreAsignatura: string;

    constructor(id: number, idCurso: number, nombreCurso: string, nombreAsignatura: string) {
        this.id = id;
        this.nombreCurso = nombreCurso;
=======
    private idCurso: string;//TODO DEVUELVE ID AHORA
    private nombreAsignatura: string;

    constructor(id: number, idCurso: string, nombreAsignatura: string) {
        this.id = id;
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
        this.idCurso = idCurso;
        this.nombreAsignatura = nombreAsignatura;
    }
    
    get Id(): number {
        return this.id;
    }

    set Id(id: number) {
        this.id = id;
    }

<<<<<<< HEAD

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
=======
    get getNombreCurso(): string {
        return this.idCurso;
    }   

    public setNombreCurso(nombreCurso: string): void {
        this.idCurso = nombreCurso;
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
    }


    get NombreAsignatura(): string {
        return this.nombreAsignatura;
    }

    set NombreAsignatura(nombreAsignatura: string) {
        this.nombreAsignatura = nombreAsignatura;
    }

}
