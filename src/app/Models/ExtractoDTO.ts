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
    idConductor3: number | null;
    nmConductor3: string;
    fechaInicio: string;
    fechaFinal: string | null;
    fechaCreacion: string;
    observacion: string;
}

export interface InputExtracto {
    idOrigen: number;
    idDestino: number;
    idaYvuelta: boolean;
    idContrato: number;
    idVehiculo: number;
    idConductor1: number;
    idConductor2: number | null;
    idConductor3: number | null;
    fechaInicio: Date;
    fechaFinal: Date | null;
    observacion: string;
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
    idConductor3: number | null;
    fechaInicio: Date;
    fechaFinal: Date | null;
    observacion: string;
}