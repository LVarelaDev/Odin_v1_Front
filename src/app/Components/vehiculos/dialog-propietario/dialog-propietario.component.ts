import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoService } from 'src/app/Services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { InputPropietario, PropietarioDTO } from 'src/app/Models/PropietarioDTO'

export interface DatosDialog {
  IdConductor: number;
}

@Component({
  selector: 'app-dialog-propietario',
  templateUrl: './dialog-propietario.component.html',
  styleUrls: ['./dialog-propietario.component.css']
})
export class DialogPropietarioComponent{

  form: FormGroup;

  isSearch: boolean = true;
  valorInput = '';
  listPropietario: PropietarioDTO[] = []
  selectedPropietario?: PropietarioDTO;

  
  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<DialogPropietarioComponent>, @Inject(MAT_DIALOG_DATA) public data: DatosDialog,
  private _productoService: ProductoService,private toastr: ToastrService,){
    this.form = this.fb.group({
      nombre: ['', [Validators.required]],
      idTipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      correo: ['', [Validators.required, this.validarCorreo]],
      direccion: ['', [Validators.required]],
    });
  }


  buscarPropietario(e: any){
    this._productoService.buscarPropietario(this.valorInput).subscribe(data => {
      this.listPropietario = data;
    })
  }

  propietarioSeleccionado(item:PropietarioDTO){
    this.selectedPropietario = item;

    this.dialogRef.close(this.selectedPropietario);
  }

  actualizarPropietario(tem:PropietarioDTO){

    console.log(tem)
  }

  async agregarPropietario(){
    let payload: InputPropietario = {
      nombre: this.form.controls["nombre"].value,
      idTipoDocumento: this.form.controls["idTipoDocumento"].value,
      documento: this.form.controls["documento"].value,
      celular: this.form.controls["celular"].value,
      correo: this.form.controls["correo"].value,
      direccion: this.form.controls["direccion"].value,
      fechaCreacion: new Date,
    }

    const data = await this._productoService.GuardarPropietario(payload)
    if(data.llave == 0){
      const result = data.data
      this.toastr.success(data.valor);
      this.dialogRef.close(result)
    }else{
      this.toastr.info(data.valor);
    }
  }

  limpiar(e: any){
    this.valorInput = '';
  }

  activarFormulario(){
    this.isSearch = false;
  }
  cancel(){
    this.isSearch = true;
  }

  validarCorreo(control: any) {
    const correoPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (correoPattern.test(control.value)) {
      return null;
    } else {
      return { correoInvalido: true };
    }
  }
}
