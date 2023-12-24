export interface LlaveValorDTO{
    llave: number,
    valor: string
}

export interface LlaveValorObjectDTO<T>{
    llave: number,
    valor: string,
    data: T
}

export interface FileDTO{
    file: string
}