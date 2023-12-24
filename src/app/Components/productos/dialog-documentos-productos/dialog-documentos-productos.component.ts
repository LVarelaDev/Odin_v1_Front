import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TipoArchivo } from 'src/app/Models/ConductoresDTO';
import { Archivo, ImportFilesRequest, typeFile } from 'src/app/Models/Files';
import { FileDTO } from 'src/app/Models/LlaveValorDTO';
import { ProductoService } from 'src/app/Services/producto.service';

export interface DatosDialog {
  IdConductor: number;
}

@Component({
  selector: 'app-dialog-documentos-productos',
  templateUrl: './dialog-documentos-productos.component.html',
  styleUrls: ['./dialog-documentos-productos.component.css']
})
export class DialogDocumentosProductosComponent implements OnInit {

  IdConductor: number = 0;

  archivos: Archivo[] = [];
  TipoArchivos: TipoArchivo[] = [];
  $TipoArchivos: TipoArchivo[] = [];

  fileSelected?: TipoArchivo;

  base64File: string = '';
  selectedFileName: string = '';
  typeFileSelected?: typeFile;
  $typeFile: typeFile[] = [];

  formData: FormGroup;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogDocumentosProductosComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosDialog,
    private _productoService: ProductoService, private toastr: ToastrService,) {

    this.IdConductor = data.IdConductor;

    this.formData = this.fb.group({
      tipoArchivo: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
    });

  }
  async ngOnInit() {
    await this.cargarTipoArchivo();
    await this.getArchivos();

    this.formData.controls['tipoArchivo'].valueChanges.subscribe(data => {
    })
  }

  async cargarTipoArchivo() {
    this.TipoArchivos = await this._productoService.cargarTipoArchivoAsync();
    this.$TipoArchivos = await this._productoService.cargarTipoArchivoAsync();
  }

  async getArchivos() {
    this.archivos = await this._productoService.getArchivos(this.IdConductor);
  }

  onFileSelected(event: any) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      this.selectedFileName = selectedFile.name;

      const file = event.target.files[0];
      if (file) {

        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.base64File = e.target.result.split(',')[1];
        };
        reader.readAsDataURL(file); // Leer el archivo como base64
      }
    }
  }

  changeTipoCertificado(tipo: TipoArchivo) {
    this.fileSelected = tipo;
  }

  downloadFile(fileName: string) {
    let response : string = "";
    this._productoService.obtenerArchivo(fileName).subscribe({
      next:(x:FileDTO) => {
        response = x.file
        if(response != "" || response != null){
          let fileNameSplit : string = fileName.split(".")[0].split("\\")[2]
          this._productoService.descargarArchivo(response, fileNameSplit);
        }
      },error: (err: any) => {
        this.toastr.error('Error al obtener el documento');
      },
    })    
  }

  async uploadFileCheck() {
    if (this.base64File) {
      let payload: ImportFilesRequest = {
        IdConductor: this.IdConductor,
        IdTipoArchivo: this.formData.controls['tipoArchivo'].value,
        Archivo: this.base64File,
        FechaVencimiento: this.formData.controls['fechaVencimiento'].value
      }
      const data = await this._productoService.ImportarArchivo(payload);
      if (data.llave == 0) {
        this.toastr.success(data.valor)
        await this.cargarTipoArchivo();
        await this.getArchivos();
      } else {
        this.toastr.error(data.valor)
      }
    }
  }

  uploadfile() {
    this.uploadFileCheck();
  }
}


