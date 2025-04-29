export class Meta {
    
    private numeroOds: number;
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
