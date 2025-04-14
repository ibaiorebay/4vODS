export class Meta {
    
    private numeroOds: number;
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

    get Id(): string {
        return this.numeroOds + "." + this.numeroMeta;
    }
    get NumeroOds(): number {
        return this.numeroOds;
    }
    set NumeroOds(numeroOds: number) {
        this.numeroOds = numeroOds;
    }
    get NumeroMeta(): number {
        return this.numeroMeta;
    }
    set NumeroMeta(numeroMeta: number) {
        this.numeroMeta = numeroMeta;
    }
    get Descripcion(): string {
        return this.descripcion;
    }
    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }
}
