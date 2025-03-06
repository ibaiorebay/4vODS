export class Meta {
    private numeroOds: number;
    private caracterMeta : string;
    private descripcion: string;

    constructor(numeroOds: number, caracterMeta: string, descripcion: string) {
        this.numeroOds = numeroOds;
        this.caracterMeta = caracterMeta;
        this.descripcion = descripcion;
    }
    get Id(): string {
        return this.numeroOds + "." + this.caracterMeta;
    }
    get NumeroOds(): number {
        return this.numeroOds;
    }
    set NumeroOds(numeroOds: number) {
        this.numeroOds = numeroOds;
    }
    get CaracterMeta(): string {
        return this.caracterMeta;
    }
    set CaracterMeta(caracterMeta: string) {
        this.caracterMeta = caracterMeta;
    }
    get Descripcion(): string {
        return this.descripcion;
    }
    set Descripcion(descripcion: string) {
        this.descripcion = descripcion;
    }
}
