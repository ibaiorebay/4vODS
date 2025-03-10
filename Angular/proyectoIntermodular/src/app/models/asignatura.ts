export class Asignatura {
    private id: number;
    private nombreCurso: string;
    private nombreAsignatura: string;

    constructor(id: number, nombreCurso: string, nombreAsignatura: string) {
        this.id = id;
        this.nombreCurso = nombreCurso;
        this.nombreAsignatura = nombreAsignatura;
    }

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    get getNombreCurso(): string {
        return this.nombreCurso;
    }   

    public setNombreCurso(nombreCurso: string): void {
        this.nombreCurso = nombreCurso;
    }

    get getNombreAsignatura(): string {
        return this.nombreAsignatura;
    }

    public setNombreAsignatura(nombreAsignatura: string): void {
        this.nombreAsignatura = nombreAsignatura;
    }

}
