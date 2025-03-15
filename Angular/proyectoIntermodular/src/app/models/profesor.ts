export class Profesor {
    private id : number;
    private nombre : string;
    private apellido1 : string;
    private apellido2 : string;
    private fechaNacimiento : Date;

    constructor(id: number, nombre: string, apellido1: string, apellido2: string, fechaNacimiento: Date) {
        this.id = id;
        this.nombre = nombre;
        this.apellido1 = apellido1;
        this.apellido2 = apellido2;
        this.fechaNacimiento = fechaNacimiento;
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

    get Apellido1(): string {
        return this.apellido1;
    }

    set Apellido1(apellido1: string) {
        this.apellido1 = apellido1;
    }

    get Apellido2(): string {
        return this.apellido2;
    }

    set Apellido2(apellido2: string) {
        this.apellido2 = apellido2;
    }

    get FechaNacimiento(): Date {
        return this.fechaNacimiento;
    }

    set FechaNacimiento(fechaNacimiento: Date) {
        this.fechaNacimiento = fechaNacimiento;
    }
}
