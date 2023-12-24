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
}