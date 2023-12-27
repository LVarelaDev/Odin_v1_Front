import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable, startWith } from 'rxjs';
import { ConductoresDTO } from 'src/app/Models/ConductoresDTO';
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
  $municipios?: MunicipioDTO[] =[];

  municipiosDestinos: MunicipioDTO[] = [];
  $municipiosDestinos?: MunicipioDTO[] =[];
  isEdit: boolean = false;

  conductores: ConductoresDTO [] = [];
  $conductores: ConductoresDTO [] = [];

  conductores2: ConductoresDTO [] = [];
  $conductores2: ConductoresDTO [] = [];

  municipioSeleccionado:string = '';

  constructor(private fb: FormBuilder, private service: ClientesService, public dialog: MatDialog, private toastr: ToastrService) {
    this.formData = this.fb.group({
      origen: [null, [Validators.required]],
      destino: [null, [Validators.required]],
      idaVuelta: [false, [Validators.required]],
      fechaInicio: [false, [Validators.required]],
      fechaFinal: [false, [Validators.required]],
      conductor: ['',[Validators.required]],
      conductor2: [''],
      contrato: ['', [Validators.required]],
      vehiculo: ['', [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.cargarExtracto();
    this.cargarMunicipios();
    this.cargarConductores();

    this.valueChangeInputs();
  }

  valueChangeInputs(){
    this.formData.controls['origen'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$municipios = this._filter(name ? name : '');
    });
    
    this.formData.controls['destino'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$municipiosDestinos = this._filterDestino(name ? name : '');
    });

    this.formData.controls['conductor'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$conductores = this._filterConductor(name ? name : '');
    });

    this.formData.controls['conductor2'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$conductores2 = this._filterConductor2(name ? name : '');
    });

    this.formData.controls['fechaInicio'].valueChanges.subscribe( x=>{
      console.log(x)
    })

    this.formData.controls['fechaFinal'].valueChanges.subscribe( x=>{
      console.log(x)
    })
  }

  private _filter(name: string): MunicipioDTO[] {
    const filterValue = name.toLowerCase();

    return this.municipios.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterDestino(name: string): MunicipioDTO[] {
    const filterValue = name.toLowerCase();

    return this.municipiosDestinos.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }


  private _filterConductor(name: string): ConductoresDTO[] {
    const filterValue = name.toLowerCase();

    return this.conductores.filter(option => option.nombre.toLowerCase().includes(filterValue) || option.documento.toLowerCase().includes(filterValue));
  }

  private _filterConductor2(name: string): ConductoresDTO[] {
    const filterValue = name.toLowerCase();

    return this.conductores2.filter(option => option.nombre.toLowerCase().includes(filterValue) || option.documento.toLowerCase().includes(filterValue));
  }
  municipioDisplay(value: MunicipioDTO): string {
    if(value && value.nombre){
      return value.nombre
    }    
    return '';
  }

  destinoDisplay(value: MunicipioDTO): string {
    if(value && value.nombre){
      return value.nombre
    }    
    return '';
  }

  conductoresDisplay(value: ConductoresDTO): string {
    if(value && value.nombre){
      return value.nombre
    }    
    return '';
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
        this.municipios = data;
        this.$municipios = data;

        this.municipiosDestinos = data;
        this.$municipiosDestinos = data;

      }
    })
  }

  cargarConductores(){
    this.service.getConductores().subscribe({
      next : (data) => {
        this.conductores = data;
        this.$conductores = data;

        this.conductores2 = data;
        this.$conductores2 = data;
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
