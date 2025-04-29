export class AsignaturaDTO {
    private id: number;
    private idCurso: number;
    private nombreAsignatura: string;

    constructor(id: number, idCurso: number, nombreAsignatura: string) {
        this.id = id;
        this.idCurso = idCurso;
        this.nombreAsignatura = nombreAsignatura;
    }
    
    get getId(): number {
        return this.id;
    }

    set setId(id: number) {
        this.id = id;
    }

    get IdCurso(): number {
        return this.idCurso;
    }   

    public setIdCurso(idCurso: number): void {
        this.idCurso = idCurso;
    }

    get NombreAsignatura(): string {
        return this.nombreAsignatura;
    }

    set NombreAsignatura(nombreAsignatura: string) {
        this.nombreAsignatura = nombreAsignatura;
    }

}
