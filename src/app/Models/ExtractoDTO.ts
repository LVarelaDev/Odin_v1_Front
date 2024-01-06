export interface ExtractoDTO {
    id: number;
    idOrigen: number;
    nmOrigen: string;
    idDestino: number;
    nmDestino: string;
    idaYvuelta: boolean;
    idContrato: number;
    noContrato: string;
    idVehiculo: number;
    placa: string;
    idConductor1: number;
    nmConductor1: string;
    idConductor2: number | null;
    nmConductor2: string;
    fechaInicio: string;
    fechaFinal: string | null;
    fechaCreacion: string;
    correo: string;
    direccion: string;
    telefono1: string;
    telefono2:string;
}

export interface InputExtracto {
    idOrigen: number;
    idDestino: number;
    idaYvuelta: boolean;
    idContrato: number;
    idVehiculo: number;
    idConductor1: number;
    idConductor2: number | null;
    fechaInicio: Date;
    fechaFinal: Date | null;
    correo: string;
    direccion: string;
    telefono1: string;
    telefono2:string;
}

export interface InputActualizarExtracto {
    id: number;
    idOrigen: number;
    idDestino: number;
    idaYvuelta: boolean;
    idContrato: number;
    idVehiculo: number;
    idConductor1: number;
    idConductor2: number | null;
    fechaInicio: Date;
    fechaFinal: Date | null;
    correo: string;
    direccion: string;
    telefono1: string;
    telefono2:string;
}