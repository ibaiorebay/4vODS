export class AsignaturaDTO {

    private iD_ASIGNATURA: number | undefined;
    private iD_CURSO: number;
    private nombre: string;

    constructor(idCurso: number, nombreAsignatura: string, id?: number) {
        this.iD_CURSO = idCurso;
        this.nombre = nombreAsignatura;
        this.iD_ASIGNATURA = id? id : undefined;
    }
    
    get Id(): number | undefined {
        return this.iD_ASIGNATURA;
    }

    set Id(id: number) {
        this.iD_ASIGNATURA = id;
    }

    get IdCurso(): number {
        return this.iD_CURSO;
    }   

    set IdCurso(idCurso: number) {
        this.iD_CURSO = idCurso;
    }

    get NombreAsignatura(): string {
        return this.nombre;
    }

    set NombreAsignatura(nombreAsignatura: string) {
        this.nombre = nombreAsignatura;
    }

}
