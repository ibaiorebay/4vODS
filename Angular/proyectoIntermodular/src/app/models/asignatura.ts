export class Asignatura {
    private id: number;
    private nombreCurso: string;//TODO DEVUELVE ID AHORA
    private nombreAsignatura: string;

    constructor(id: number, nombreCurso: string, nombreAsignatura: string) {
        this.id = id;
        this.nombreCurso = nombreCurso;
        this.nombreAsignatura = nombreAsignatura;
    }

    // Constructor que recibe un objeto de datos de la API
    // constructor(data: any) {
    //     this.id = data.iD_ASIGNATURA;  // Mapeamos el valor de `iD_ASIGNATURA` de la API
    //     this.nombreCurso = data.nombreCurso || '';  // Asignamos nombreCurso, con valor vacío si no viene
    //     this.nombreAsignatura = data.nombre || '';  // Asignamos nombreAsignatura, con valor vacío si no viene
    // }

    
    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    get getNombreCurso(): string {
        return this.nombreCurso;
    }   

    public setNombreCurso(nombreCurso: string): void {
        this.nombreCurso = nombreCurso;
    }

    get getNombreAsignatura(): string {
        return this.nombreAsignatura;
    }

    public setNombreAsignatura(nombreAsignatura: string): void {
        this.nombreAsignatura = nombreAsignatura;
    }

}
