export class Curso {
    private nombre: string;

    constructor(nombre: string) {
        this.nombre = nombre;
    }

    get Nombre(): string {
        return this.nombre;
    }

    set Nombre(nombre: string) {
        this.nombre = nombre;
    }
}
