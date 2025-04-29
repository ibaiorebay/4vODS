export class EntidadExterior {
    private iD_ENTIDAD: number;
    private nombre: string;
    private descripcion: string;

    constructor(id: number, nombre: string, descripcion: string) {
        this.iD_ENTIDAD = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    get Id(): number {
        return this.iD_ENTIDAD;
    }

    set Id(id: number) {
        this.iD_ENTIDAD = id;
    }

    get Nombre(): string {
        return this.nombre;
    }

    set Nombre(nombre: string) {
        this.nombre = nombre;
    }

    get Descripcion(): string {
        return this.descripcion;
    }

    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }
}
