export class Ods {

    private id : number;
    private nombre : string;
    // private descripcion : string;
    // private dimension: string;

    // constructor(id: number, nombre: string, descripcion: string, dimension: string) {
    constructor(id: number, nombre: string) {
        this.id = id;
        this.nombre = nombre;
        // this.descripcion = descripcion;
        // this.dimension = dimension;
    }

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

    // get Descripcion(): string {
    //     return this.descripcion;
    // }

    // set Descripcion(descripcion: string) {
    //     this.descripcion = descripcion;
    // }

    // get Dimension(): string {
    //     return this.dimension;
    // }

    // set Dimension(dimension: string) {
    //     this.dimension = dimension;
    // }
}
