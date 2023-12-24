export interface PropietarioDTO {
    id: number;
    nombre: string;
    idTipoDocumento: number;
    documento: string;
    celular: string;
    correo: string;
    direccion: string;
    fechaCreacion: string;
}

export interface InputPropietario {
    nombre: string;
    idTipoDocumento: number;
    documento: string;
    celular: string;
    correo: string;
    direccion: string;
    fechaCreacion: Date;
}
