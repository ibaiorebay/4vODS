export class Meta {
    
    private numeroOds: number;
    // private caracterMeta : string;
    private caracterMeta : number;
    private descripcion: string;

    constructor(numeroOds: number, caracterMeta: number, descripcion: string) {
        this.numeroOds = numeroOds;
        this.caracterMeta = caracterMeta;
        this.descripcion = descripcion;
    }

    // Modificado para aceptar datos de la API directamente
    // constructor(data: any) {
    //     this.numeroOds = data.iD_ODS;  // Asumiendo que `iD_ODS` es el campo correspondiente de la API
    //     this.caracterMeta = data.caracterMeta || '';  // Asumí que `caracterMeta` puede venir vacío
    //     this.descripcion = data.descripcion || '';  // Igualmente, para descripción
    // }

    get Id(): string {
        return this.numeroOds + "." + this.caracterMeta;
    }
    get NumeroOds(): number {
        return this.numeroOds;
    }
    set NumeroOds(numeroOds: number) {
        this.numeroOds = numeroOds;
    }
    get CaracterMeta(): number {
        return this.caracterMeta;
    }
    set CaracterMeta(caracterMeta: number) {
        this.caracterMeta = caracterMeta;
    }
    get Descripcion(): string {
        return this.descripcion;
    }
    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }
}
