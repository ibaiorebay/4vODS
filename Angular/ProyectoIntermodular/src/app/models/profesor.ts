export class Profesor {
    private id : number;
    private nombre : string;
    private apellido1 : string = "";
    private apellido2 : string = "";
<<<<<<< HEAD
=======
    // private fechaNacimiento : Date;
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
    private fechaNacimiento : string = "";

    constructor(id: number, nombre: string, apellido1?: string, apellido2?: string, fechaNacimiento?: string) {
        this.id = id;
        this.nombre = nombre;
<<<<<<< HEAD

        if (apellido1) {
            this.apellido1 = apellido1;
        }
        if (apellido2) {
            this.apellido2 = apellido2;
        }
        if (fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento;
        }
        // this.apellido1 = apellido1;
        // this.apellido2 = apellido2;
        // this.fechaNacimiento = fechaNacimiento;
    }
=======

        if (apellido1) {
            this.apellido1 = apellido1;
        }
        if (apellido2) {
            this.apellido2 = apellido2;
        }
        if (fechaNacimiento) {
            this.fechaNacimiento = fechaNacimiento;
        }
        // this.apellido1 = apellido1;
        // this.apellido2 = apellido2;
        // this.fechaNacimiento = fechaNacimiento;
    }

    

    // Constructor que recibe un objeto de datos de la API
    // constructor(data: any) {
    //     this.id = data.iD_PROFESOR;  // Asumiendo que `iD_PROFESOR` es el campo correspondiente en la API
    //     this.nombre = data.nombre || '';  // Si `nombre` no viene, se asigna un valor vacío
    //     this.apellido1 = data.apellidO1 || '';  // Lo mismo para el primer apellido
    //     this.apellido2 = data.apellidO2 || '';  // Lo mismo para el segundo apellido
    //     this.fechaNacimiento = new Date(data.fechA_NACIMIENTO);  // Convertimos la fecha de string a Date
    // }
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6

    get Id(): number {
        return this.id;
    }

    set Id(id: number) {
        this.id = id;
    }

    get NombreCompleto(): string {
        return this.nombre + " " + this.apellido1 + " " + this.apellido2;
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

    get FechaNacimiento(): string {
        return this.fechaNacimiento;
    }

    set FechaNacimiento(fechaNacimiento: string) {
        this.fechaNacimiento = fechaNacimiento;
    }
}
