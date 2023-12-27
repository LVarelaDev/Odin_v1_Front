import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ClienteDTO } from "../Models/ClienteDTO";
import { LlaveValorDTO } from "../Models/LlaveValorDTO";
import { ContratoDTO } from "../Models/ContratoDTO";
import { ExtractoDTO } from "../Models/ExtractoDTO";
import { MunicipioDTO } from "../Models/MunicipioDTO";
import { ConductoresDTO } from "../Models/ConductoresDTO";

@Injectable({
    providedIn: 'root'
})
export class ClientesService {

    private MyAppUrl = "https://localhost:44390/";
    private MyApiUrl = "api"

    rolSession: number = 0;

    constructor(private http: HttpClient) { }

    getclientes(): Observable<ClienteDTO[]>{
        return this.http.get<ClienteDTO[]>(`${this.MyAppUrl}${this.MyApiUrl}/GetClientes`)
    }

    guardarCliente(payload: any): Observable<LlaveValorDTO>{
        return this.http.post<LlaveValorDTO>(`${this.MyAppUrl}${this.MyApiUrl}/GuardarCliente`,payload)
    }

    eliminarCliente(id: number) : Observable<LlaveValorDTO>{
        return this.http.delete<LlaveValorDTO>(`${this.MyAppUrl}${this.MyApiUrl}/EliminarCliente?idCliente=${id}`)
    }
    
    actualizarCliente(payload: any) : Observable<LlaveValorDTO>{
        return this.http.put<LlaveValorDTO>(`${this.MyAppUrl}${this.MyApiUrl}/ActualizarCliente`,payload)
    }


    getContratos(): Observable<ContratoDTO[]>{
        return this.http.get<ContratoDTO[]>(`${this.MyAppUrl}${this.MyApiUrl}/GetContratos`)
    }

    guardarContrato(payload: any): Observable<LlaveValorDTO>{
        return this.http.post<LlaveValorDTO>(`${this.MyAppUrl}${this.MyApiUrl}/GuardarContrato`,payload)
    }

    eliminarContrato(id: number) : Observable<LlaveValorDTO>{
        return this.http.delete<LlaveValorDTO>(`${this.MyAppUrl}${this.MyApiUrl}/EliminarContrato?idCliente=${id}`)
    }
    
    actualizarContrato(payload: any) : Observable<LlaveValorDTO>{
        return this.http.put<LlaveValorDTO>(`${this.MyAppUrl}${this.MyApiUrl}/ActualizarContrato`,payload)
    }

    getMunicipios(): Observable<MunicipioDTO[]>{
        return this.http.get<MunicipioDTO[]>(`${this.MyAppUrl}${this.MyApiUrl}/GetMunicipios`)
    }

    getExtracto() : Observable<ExtractoDTO[]>{
        return this.http.get<ExtractoDTO[]>(`${this.MyAppUrl}${this.MyApiUrl}/getExtractos`)
    }

    getConductores(): Observable<ConductoresDTO[]> {
        const url = `${this.MyAppUrl}${this.MyApiUrl}/GetConductoresWhitOutPaginator`;
        return this.http.get<ConductoresDTO[]>(url);
      }

}