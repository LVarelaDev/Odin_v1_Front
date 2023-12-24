export interface typeFile {
    Id: number;
    NmTipoArchivo: string;
    FlActivo: boolean;
}

export interface ImportFilesRequest {
    IdConductor: number;
    IdTipoArchivo: number;
    Archivo: string;
    FechaVencimiento: Date;
 }

 export interface ImportFilesRequestVehiculos {
    IdVehiculo: number;
    IdTipoArchivo: number;
    Archivo: string;
    FechaVencimiento: Date;
 }

export interface Archivo{
    id: number;
    idVehiculo: number;
    idTipoArchivo: number;
    nmTipoArchivo: string;
    nombreArchivo: string;
    fechaVencimiento: Date;
}
