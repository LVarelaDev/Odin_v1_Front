import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TipoArchivo } from 'src/app/Models/ConductoresDTO';
import { Archivo, ImportFilesRequestVehiculos, typeFile } from 'src/app/Models/Files';
import { FileDTO } from 'src/app/Models/LlaveValorDTO';
import { ProductoService } from 'src/app/Services/producto.service';

export interface DatosDialog {
  IdVehiculo: number;
}

@Component({
  selector: 'app-dialog-documentos',
  templateUrl: './dialog-documentosVehiculos.component.html',
  styleUrls: ['./dialog-documentosVehiculos.Component.scss']
})
export class DialogDocumentosVehiculosComponent implements OnInit {

  IdVehiculo: number = 0;

  archivos: Archivo[] = [];
  TipoArchivos: TipoArchivo[] = [];
  $TipoArchivos: TipoArchivo[] = [];

  fileSelected?: TipoArchivo;

  base64File: string = '';
  selectedFileName: string = '';
  typeFileSelected?: typeFile;
  $typeFile: typeFile[] = [];

  form: FormGroup;

  @ViewChild('fileInput') myInputVariable!: ElementRef;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogDocumentosVehiculosComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosDialog,
    private _productoService: ProductoService, private toastr: ToastrService,) {

    this.IdVehiculo = data.IdVehiculo;

    this.form = this.fb.group({
      tipoArchivo: ['', [Validators.required]],
      archivo: ['', [Validators.required]],
      fechaVencimiento: ['', [Validators.required]],
    });

  }
  async ngOnInit() {
    await this.cargarTipoArchivo();
    await this.getArchivos();

    this.form.controls['tipoArchivo'].valueChanges.subscribe(data => {
    })
  }

  async cargarTipoArchivo() {
    this.TipoArchivos = await this._productoService.cargarTipoArchivoVehiculoAsync(this.IdVehiculo);
    this.$TipoArchivos = await this._productoService.cargarTipoArchivoVehiculoAsync(this.IdVehiculo);
  }

  async getArchivos() {
    this.archivos = await this._productoService.getArchivosVehiculos(this.IdVehiculo);

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
        reader.readAsDataURL(file);
      }
    }
  }

  changeTipoCertificado(tipo: TipoArchivo) {
    this.fileSelected = tipo;
  }

  downloadFile(fileName: string) {
    let response: string = "";
    this._productoService.obtenerArchivo(fileName).subscribe({
      next: (x: FileDTO) => {
        response = x.file
        if (response != "" || response != null) {
          this._productoService.descargarArchivo(response, fileName);
        }
      }, error: (err: any) => {
        this.toastr.error('Error al obtener el documento');
      },
    })
  }

  limpiarInputArchivo() {
    this.myInputVariable.nativeElement.value = '';
    this.base64File = '';
    this.selectedFileName = '';
  }

  async uploadFileCheck() {
    if (this.base64File) {
      let payload: ImportFilesRequestVehiculos = {
        IdVehiculo: this.IdVehiculo,
        IdTipoArchivo: this.form.controls['tipoArchivo'].value,
        Archivo: this.base64File,
        FechaVencimiento: this.form.controls['fechaVencimiento'].value
      }
      const data = await this._productoService.ImportarArchivoVehiculo(payload);
      if (data.llave == 0) {
        this.toastr.success(data.valor)
        await this.cargarTipoArchivo();
        await this.getArchivos();
        this.limpiarInputArchivo();
        this.form.controls['tipoArchivo'].setValue(0);
        this.form.controls['fechaVencimiento'].reset();
      } else {
        this.toastr.error(data.valor)
      }
    }
  }

  uploadfile() {
    this.uploadFileCheck();
  }
}


