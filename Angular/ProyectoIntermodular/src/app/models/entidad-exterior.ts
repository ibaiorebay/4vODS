export class EntidadExterior {
    private iD_ENTIDAD: number | undefined;
    private nombre: string;
    private descripcion: string;

    constructor(nombre: string, descripcion: string, id?: number) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.iD_ENTIDAD = id? id : undefined;
    }

    get Id(): number | undefined {
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
