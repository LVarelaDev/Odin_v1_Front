import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ClienteDTO } from 'src/app/Models/ClienteDTO';
import { ContratoDTO } from 'src/app/Models/ContratoDTO';
import { ClientesService } from 'src/app/Services/Clientes.service';

@Component({
  selector: 'app-contratos',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contratos.component.css']
})
export class ContratosComponent {

  listClientes: ClienteDTO[]=[];
  isEdit: boolean = false;
  accion: string = "accion";
  listContrato: ContratoDTO[] = [];
  $listContrato: ContratoDTO[] = [];

  valorInput = '';

  formData: FormGroup;
  idContrato: number = 0;
  
  constructor(private fb: FormBuilder, private service: ClientesService, public dialog: MatDialog,private toastr: ToastrService) {
    this.formData = this.fb.group({
      noContrato: ['', [Validators.required]],
      cliente: ['', [Validators.required]],
    });

  }

  ngOnInit(): void {
    this.cargarContratos();
    this.cargarClientes();
  }

  cargarClientes(){
    this.service.getclientes().subscribe({
      next:(data) => {
        this.listClientes = data;
      }
    })
  }

  cargarContratos(){
    this.service.getContratos().subscribe({
      next:(data) => {
        this.listContrato = data;
        this.$listContrato= data;
      }
    })
  }

  agregarCliente(){
    const payload = {
      noContrato: Number(this.formData.controls['noContrato'].value),
      idCliente: this.formData.controls['cliente'].value
    }

    this.service.guardarContrato(payload).subscribe({
      next : (data) =>{
        if(data.llave == 0){
          this.toastr.success(data.valor);
          this.cargarContratos();
          this.ResetForm();
        }else{
          this.toastr.warning(data.valor);
        }
      },error(err) {
        console.log(err)
      },
    })
  }

  setValue(item: ContratoDTO) {
    this.idContrato = item.id;
    this.formData.controls['noContrato'].setValue(item.noContrato.toString());
    this.formData.controls['cliente'].setValue(item.idCliente);

    this.isEdit = true;
    this.accion = 'Actualizar';

  }

  eliminarContrato(id: number){
    this.service.eliminarContrato(id).subscribe({
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

  actualizarContrato(){
    const payload = {
      id: this.idContrato,
      noContrato: this.formData.controls['noContrato'].value,
      idCliente: this.formData.controls['cliente'].value
    }

    this.service.actualizarContrato(payload).subscribe({
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
    const filtro = event.target.value;
    this.$listContrato = this.listContrato.filter(x => x.noContrato.toString().includes(filtro) || x.nmCliente.toLowerCase().includes(filtro)
    );
  }

  limpiar(e: any){
    this.valorInput = '';
    this.$listContrato = this.listContrato
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
