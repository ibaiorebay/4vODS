export class CursoEscolar {

    private iD_CURSOESCOLAR: number | undefined;
    private descripcion : string;

    constructor(descripcion: string, idCursoEscolar?: number) {
        this.iD_CURSOESCOLAR = idCursoEscolar? idCursoEscolar : undefined;
        this.descripcion = descripcion;
    }

    get Id(): number | undefined{
        return this.iD_CURSOESCOLAR;
    }

    set Id(idCursoEscolar: number) {
        this.iD_CURSOESCOLAR = idCursoEscolar;
    }

    get Descripcion(): string {
        return this.descripcion;
    }

    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }

}