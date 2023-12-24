import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteDTO } from 'src/app/Models/ClienteDTO';
import { ClientesService } from 'src/app/Services/Clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit{

  isEdit: boolean = false;
  accion: string = "accion";
  listCliente: ClienteDTO[] = [];
  $listCliente: ClienteDTO[] = [];

  valorInput = '';

  formData: FormGroup;
  idCliente: number = 0;
  
  constructor(private fb: FormBuilder, private service: ClientesService, public dialog: MatDialog,private toastr: ToastrService) {
    this.formData = this.fb.group({
      tipoPersona: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      correo: ['', [Validators.required, this.validarCorreo]],
    });

  }

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(){
    this.service.getclientes().subscribe({
      next:(data) => {
        this.listCliente = data;
        this.$listCliente= data;
      }
    })
  }

  agregarCliente(){
    const payload = {
      idTipoPersona: this.formData.controls['tipoPersona'].value,
      nmCliente: this.formData.controls['nombre'].value,
      idTipoDocumento: this.formData.controls['tipoDocumento'].value,
      noDocumento: this.formData.controls['documento'].value,
      telefono: this.formData.controls['telefono'].value,
      correo: this.formData.controls['correo'].value,
    }

    this.service.guardarCliente(payload).subscribe({
      next : (data) =>{
        if(data.llave == 0){
          this.toastr.success(data.valor);
          this.cargarClientes();
        }else{
          this.toastr.warning(data.valor);
        }
      },error(err) {
        console.log(err)
      },
    })
  }

  setValue(item: ClienteDTO) {
    this.idCliente = item.id;
    this.formData.controls['tipoPersona'].setValue(item.idTipoPersona.toString());
    this.formData.controls['nombre'].setValue(item.nmCliente);
    this.formData.controls['tipoDocumento'].setValue(item.idTipoDocumento.toString());
    this.formData.controls['documento'].setValue(item.noDocumento);
    this.formData.controls['telefono'].setValue(item.telefono);
    this.formData.controls['correo'].setValue(item.correo);

    this.isEdit = true;
    this.accion = 'Actualizar';

  }

  eliminarCliente(id: number){
    this.service.eliminarCliente(id).subscribe({
      next : (data) => {
        if(data.llave == 0){
          this.toastr.success(data.valor);
          this.cargarClientes();
        }else{
          this.toastr.error(data.valor);
        }
      }
    })
  }

  actualizarCliente(){
    const payload = {
      id: this.idCliente,
      idTipoPersona: this.formData.controls['tipoPersona'].value,
      nmCliente: this.formData.controls['nombre'].value,
      idTipoDocumento: this.formData.controls['tipoDocumento'].value,
      noDocumento: this.formData.controls['documento'].value,
      telefono: this.formData.controls['telefono'].value,
      correo: this.formData.controls['correo'].value,
    }

    this.service.actualizarCliente(payload).subscribe({
      next : (value) => {
        if(value.llave == 0){
          this.ResetForm();
          this.cargarClientes();
          this.toastr.success(value.valor);
        }else{
          this.toastr.warning(value.valor);
        }
      },error(err) {
        console.log(err);
      },
    })
  }

  buscarCliente(event: any){
    const filtro = event.target.value.toLowerCase();
    this.$listCliente = this.listCliente.filter(x => x.noDocumento.toLowerCase().includes(filtro) || x.nmCliente.toLowerCase().includes(filtro)
    );
  }

  limpiar(e: any){
    this.valorInput = '';
    this.$listCliente = this.listCliente
  }

  ResetForm(){
    this.isEdit = false;
    this.accion = 'Agregar'

    this.formData.reset();
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
