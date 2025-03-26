export class EntidadExterior {
    private id: number;
    private nombre: string;
    private descripcion: string;

    constructor(id: number, nombre: string, descripcion: string) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
    }

    // Constructor que recibe un objeto de datos
    // constructor(data: any) {
    //     this.id = data.iD_ENTIDAD;  // Asumiendo que `iD_ENTIDAD` es el campo correspondiente en la API
    //     this.nombre = data.nombre || '';  // Asignamos nombre, o un valor vacío si no viene
    //     this.descripcion = data.descripcion || '';  // Asignamos descripcion, o un valor vacío si no viene
    // }

    get Id(): number {
        return this.id;
    }

    set Id(id: number) {
        this.id = id;
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
