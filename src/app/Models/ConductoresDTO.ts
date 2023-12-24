export interface ConductoresDTO {
    id: number;
    idTipoDocumento: number;
    documento: string;
    nombre: string;
    celular: string;
    fechaNacimiento: Date;
    correo: string;
    tipoLicencia: string;
    numeroPazYSalvo: number;
    estado: string;
  }

  export interface TipoArchivo{
    id: number;
    nombre: string;
    fechaCreacion: Date;
  }