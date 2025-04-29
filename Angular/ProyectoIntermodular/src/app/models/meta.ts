export class Meta {
    
    private numeroOds: number;
<<<<<<< HEAD
    private numeroMeta : number;
    private nombreODS: string;
    private descripcionODS: string;
    private dimensionODS: string;
    private descripcionMeta: string;

    constructor(numeroOds: number, numeroMeta: number, nombreODS: string, descripcionODS: string, dimensionODS: string, descripcionMeta: string) {
        this.numeroOds = numeroOds;
        this.numeroMeta = numeroMeta;
        this.nombreODS = nombreODS;
        this.descripcionODS = descripcionODS;
        this.dimensionODS = dimensionODS;
        this.descripcionMeta = descripcionMeta;
    }

=======
    // private numeroMeta : string;
    private numeroMeta : number;
    private descripcion: string;

    constructor(numeroOds: number, numeroMeta: number, descripcion: string) {
        this.numeroOds = numeroOds;
        this.numeroMeta = numeroMeta;
        this.descripcion = descripcion;
    }

    // Modificado para aceptar datos de la API directamente
    // constructor(data: any) {
    //     this.numeroOds = data.iD_ODS;  // Asumiendo que `iD_ODS` es el campo correspondiente de la API
    //     this.numeroMeta = data.numeroMeta || '';  // Asumí que `numeroMeta` puede venir vacío
    //     this.descripcion = data.descripcion || '';  // Igualmente, para descripción
    // }

>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
    get Id(): string {
        return this.numeroOds + "." + this.numeroMeta;
    }


    get NumeroOds(): number {
        return this.numeroOds;
    }
    set NumeroOds(numeroOds: number) {
        this.numeroOds = numeroOds;
    }
<<<<<<< HEAD


=======
>>>>>>> 8c8b53244e1cc573d1b2e45b83294943df7584e6
    get NumeroMeta(): number {
        return this.numeroMeta;
    }
    set NumeroMeta(numeroMeta: number) {
        this.numeroMeta = numeroMeta;
    }


    get NombreODS(): string {
        return this.nombreODS;
    }
    set NombreODS(nombreODS: string) {
        this.nombreODS = nombreODS;
    }


    get DescripcionODS(): string {
        return this.descripcionODS;
    }
    set DescripcionODS(descripcionODS: string) {
        this.descripcionODS = descripcionODS;
    }


    get DimensionODS(): string {
        return this.dimensionODS;
    }
    set DimensionODS(dimensionODS: string) {
        this.dimensionODS = dimensionODS;
    }


    get DescripcionMeta(): string {
        return this.descripcionMeta;
    }
    set DescripcionMeta(descripcionMeta: string) {
        this.descripcionMeta = descripcionMeta;
    }
}
