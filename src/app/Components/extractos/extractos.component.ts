import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ExtractoDTO } from 'src/app/Models/ExtractoDTO';
import { MunicipioDTO } from 'src/app/Models/MunicipioDTO';
import { ClientesService } from 'src/app/Services/Clientes.service';

@Component({
  selector: 'app-extractos',
  templateUrl: './extractos.component.html',
  styleUrls: ['./extractos.component.css']
})
export class ExtractosComponent implements OnInit {
  formData: FormGroup;
  $listExtracto: ExtractoDTO[] = [];
  listExtracto: ExtractoDTO[] = [];

  municipios: MunicipioDTO[] = [];
  isEdit: boolean = false;

  municipioSeleccionado:string = '';

  constructor(private fb: FormBuilder, private service: ClientesService, public dialog: MatDialog, private toastr: ToastrService) {
    this.formData = this.fb.group({
      origen: [null, [Validators.required]],
      destino: [null, [Validators.required]],
      idaVuelta: [false, [Validators.required]],
      fechaInicio: [false, [Validators.required]],
      fechaFinal: [false, [Validators.required]],
    });

  }
  ngOnInit(): void {
    this.cargarExtracto();
    this.cargarMunicipios();

    this.formData.controls['fechaInicio'].valueChanges.subscribe( x=>{
      console.log(x)
    })

    this.formData.controls['fechaFinal'].valueChanges.subscribe( x=>{
      console.log(x)
    })
  }

  agenciasDisplay(agenciatemp: MunicipioDTO): string {
    return agenciatemp && agenciatemp.nombre ? agenciatemp.nombre : '';
  }

  cargarExtracto(){
    this.service.getExtracto().subscribe({
      next: (data) =>{
        this.$listExtracto = data;
        this.listExtracto = data;
      }
    })
  }

  cargarMunicipios(){
    this.service.getMunicipios().subscribe({
      next : (data) => {
        this.municipios = data
      }
    })
  }

  crearExtracto() {
    console.log();
  }

  generarExtracto(){
    console.log();
  }

  selected(e: any){
    console.log(e)
  }
}
