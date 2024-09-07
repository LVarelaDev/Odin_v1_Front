export interface VehiculosDTO {
  id: number;
  placa: string;
  numeroInterno: string;
  tarjetaOperacion: string;
  tipoVehiculo: string;
  cantidadPasajeros: number;
  marca: string;
  linea: string;
  modelo: number;
  fechaMatricula: string;
  color: string;
  servicio: string;
  tipoCombustible: string;
  numeroMotor: string;
  numeroSerie: string;
  idPropietario: number;
  convenio: boolean;
  idEmpresaVinculante: number;
  fechaCreacion: Date;
  idEstado: number;
}

export interface InputEmpresa {
  nombre: string;
  nit: string;
}

export interface EmpresaVinculanteDTO {
  id: number;
  nombre: string;
  nit: string;
}
