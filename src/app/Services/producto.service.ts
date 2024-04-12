import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FileDTO, LlaveValorDTO, LlaveValorObjectDTO } from '../Models/LlaveValorDTO';
import { ConductoresDTO, TipoArchivo } from '../Models/ConductoresDTO';
import { Archivo, ImportFilesRequest, ImportFilesRequestVehiculos } from '../Models/Files';
import { EmpresaVinculanteDTO, InputEmpresa, VehiculosDTO } from '../Models/VehiculosDTO';
import { InputPropietario, PropietarioDTO } from '../Models/PropietarioDTO';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  // private MyAppUrl = "https://odinbackend.azurewebsites.net/";
  private MyAppUrl = "https://localhost:44390/";
  private MyApiUrl = "api"

  rolSession: number = 0;

  constructor(private http: HttpClient) { }

  getConductores(): Observable<any> {
    const url = `${this.MyAppUrl}${this.MyApiUrl}/GetConductoresWhitOutPaginator`;
    return this.http.get<any>(url);
  }

  guardarConductor(producto: any): Observable<LlaveValorDTO> {
    return this.http.post<LlaveValorDTO>(this.MyAppUrl + this.MyApiUrl + "/GuardarConductor", producto);
  }

  actualizarConductor(conductor: any): Observable<LlaveValorDTO> {
    return this.http.put<LlaveValorDTO>(this.MyAppUrl + this.MyApiUrl + "/ActualizarConductor", conductor);
  }

  cargarTipoArchivo(): Observable<TipoArchivo[]> {
    return this.http.get<TipoArchivo[]>(this.MyAppUrl + this.MyApiUrl + "/GetTipoArchivos");
  }

  async ImportarArchivo(payload: ImportFilesRequest): Promise<LlaveValorDTO> {
    try {

      const data = await this.http.post<LlaveValorDTO>(this.MyAppUrl + this.MyApiUrl + "/ImportarArchivo", payload).toPromise();
      return data!;

    } catch (error) {

      throw error;

    }
  }

  async ImportarArchivoVehiculo(payload: ImportFilesRequestVehiculos): Promise<LlaveValorDTO> {
    try {

      const data = await this.http.post<LlaveValorDTO>(this.MyAppUrl + this.MyApiUrl + "/ImportarArchivoVehiculo", payload).toPromise();
      return data!;

    } catch (error) {

      throw error;

    }
  }

  async cargarTipoArchivoAsync(idConductor: number): Promise<TipoArchivo[]> {
    try {
      const data = await this.http.get<TipoArchivo[]>(this.MyAppUrl + this.MyApiUrl + `/GetTipoArchivos?idConductor=${idConductor}`).toPromise();
      return data!;
    } catch (error) {
      throw error;
    }
  }

  async cargarTipoArchivoVehiculoAsync(idvehiculo: number): Promise<TipoArchivo[]> {
    try {
      const data = await this.http.get<TipoArchivo[]>(this.MyAppUrl + this.MyApiUrl + `/GetTipoArchivo?idVehiculo=${idvehiculo}`).toPromise();
      return data!;
    } catch (error) {
      throw error;
    }
  }

  async getArchivos(idConductor: number): Promise<Archivo[]> {
    try {
      const data = await this.http.get<Archivo[]>(this.MyAppUrl + this.MyApiUrl + `/GetArchivos?idConductor=${idConductor}`).toPromise();
      return data!;
    } catch (error) {
      throw error;
    }
  }

  async getArchivosVehiculos(idConductor: number): Promise<Archivo[]> {
    try {
      const data = await this.http.get<Archivo[]>(this.MyAppUrl + this.MyApiUrl + `/GetArchivosVehiculos?idVehiculo=${idConductor}`).toPromise();
      return data!;
    } catch (error) {
      throw error;
    }
  }

  async GuardarPropietario(payload: InputPropietario): Promise<LlaveValorObjectDTO<PropietarioDTO>> {
    try {

      const data = await this.http.post<LlaveValorObjectDTO<PropietarioDTO>>(this.MyAppUrl + this.MyApiUrl + "/GuardarPropietario", payload).toPromise();
      return data!;

    } catch (error) {

      throw error;

    }
  }

  async guardarEmpresa(payload: InputEmpresa): Promise<LlaveValorObjectDTO<EmpresaVinculanteDTO>> {
    try {

      const data = await this.http.post<LlaveValorObjectDTO<EmpresaVinculanteDTO>>(this.MyAppUrl + this.MyApiUrl + "/GuardarEmpresa", payload).toPromise();
      return data!;

    } catch (error) {

      throw error;

    }
  }

  async actualizarVehiculo(payload: InputEmpresa): Promise<LlaveValorDTO> {
    try {

      const data = await this.http.put<LlaveValorDTO>(this.MyAppUrl + this.MyApiUrl + "/ActualizarVehiculo", payload).toPromise();
      return data!;

    } catch (error) {

      throw error;

    }
  }

  async asignarPropietario(payload: any): Promise<LlaveValorDTO> {
    try {

      const data = await this.http.post<LlaveValorDTO>(this.MyAppUrl + this.MyApiUrl + "/AsignarPropietario", payload).toPromise();
      return data!;

    } catch (error) {

      throw error;

    }
  }

  obtenerArchivo(ruta: string): Observable<FileDTO> {
    return this.http.get<FileDTO>(this.MyAppUrl + this.MyApiUrl + `/ObtenerArchivo?ruta=${ruta}`);
  }

  descargarArchivo(documentoBase64: string, fileName: string) {
    const byteCharacters = atob(documentoBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  }

  buscarEmpresa(idEmpresa: number): Observable<EmpresaVinculanteDTO> {
    return this.http.get<EmpresaVinculanteDTO>(this.MyAppUrl + this.MyApiUrl + `/GetEmpresa?idEmpresa=${idEmpresa}`);
  }

  buscarEmpresaByNit(nit: string): Observable<EmpresaVinculanteDTO> {
    return this.http.get<EmpresaVinculanteDTO>(this.MyAppUrl + this.MyApiUrl + `/GetEmpresaByNit?nit=${nit}`);
  }

  buscarPropietarioPorId(id: number): Observable<PropietarioDTO> {
    return this.http.get<PropietarioDTO>(this.MyAppUrl + this.MyApiUrl + `/GetPropietarioById?id=${id}`);
  }
  //Vehiculos

  buscarPropietario(valorBusqueda: string): Observable<PropietarioDTO[]> {
    return this.http.get<PropietarioDTO[]>(this.MyAppUrl + this.MyApiUrl + `/GetPropietario?valorBusqueda=${valorBusqueda}`);
  }

  async getVehiculos(): Promise<VehiculosDTO[]> {
    const url = `${this.MyAppUrl}${this.MyApiUrl}/GetVehiculos`;
    try {
      const data = await this.http.get<VehiculosDTO[]>(url).toPromise();
      return data!;
    } catch (error) {
      throw error;
    }
  }

  async guardarVehiculos(payload: any): Promise<LlaveValorDTO> {
    const url = `${this.MyAppUrl}${this.MyApiUrl}/GuardarVehiculo`;

    try {

      const data = await this.http.post<LlaveValorDTO>(url, payload).toPromise();
      return data!;

    } catch (error) {
      throw error;
    }
  }

  //Users

  GetUserList(): Observable<any> {
    return this.http.get(this.MyAppUrl + this.MyApiUrl + "/GetUserList")
  }

  GetUserAuth(user: any): Observable<any> {
    return this.http.post(this.MyAppUrl + this.MyApiUrl + "/GetUserAuth", user)
  }

  UspertUser(user: any): Observable<any> {
    return this.http.post(this.MyAppUrl + this.MyApiUrl + "/UspertUser", user)
  }

  setRol(input: number) {
    localStorage.setItem("objListVariables", input.toString());
  }

  getRol() {
    let rol = localStorage.getItem("objListVariables");

    if (rol != undefined && rol != null) {
      return +rol;
    }

    return 0;
  }
}
