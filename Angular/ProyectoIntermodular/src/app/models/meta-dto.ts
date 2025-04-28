export class MetaDTO {

    private numeroMeta : number;
    private numeroOds: number;
    private descripcion: string;

    constructor(numeroOds: number, numeroMeta: number, descripcion: string) {
        this.numeroOds = numeroOds;
        this.numeroMeta = numeroMeta;
        this.descripcion = descripcion;
    }

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
