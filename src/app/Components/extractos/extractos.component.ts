import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ConductoresDTO } from 'src/app/Models/ConductoresDTO';
import { ContratoDTO } from 'src/app/Models/ContratoDTO';
import { ExtractoDTO, InputActualizarExtracto, InputExtracto } from 'src/app/Models/ExtractoDTO';
import { LlaveValorDTO } from 'src/app/Models/LlaveValorDTO';
import { MunicipioDTO } from 'src/app/Models/MunicipioDTO';
import { VehiculosDTO } from 'src/app/Models/VehiculosDTO';
import { ClientesService } from 'src/app/Services/Clientes.service';

@Component({
  selector: 'app-extractos',
  templateUrl: './extractos.component.html',
  styleUrls: ['./extractos.component.css']
})
export class ExtractosComponent implements OnInit {
  formData: FormGroup;
  idExtracto: number = 0;

  $listExtracto: ExtractoDTO[] = [];
  listExtracto: ExtractoDTO[] = [];

  municipios: MunicipioDTO[] = [];
  $municipios?: MunicipioDTO[] = [];

  municipiosDestinos: MunicipioDTO[] = [];
  $municipiosDestinos?: MunicipioDTO[] = [];
  isEdit: boolean = false;

  conductores: ConductoresDTO[] = [];
  $conductores: ConductoresDTO[] = [];

  conductores2: ConductoresDTO[] = [];
  $conductores2: ConductoresDTO[] = [];

  contrato: ContratoDTO[] = [];
  $contrato: ContratoDTO[] = [];

  vehiculo: VehiculosDTO[] = [];
  $vehiculo: VehiculosDTO[] = [];

  opciones = [
    { id: 'flexRadioDefault', texto: 'SERVICIO DE TRANSPORTE TERRESTRE EMPRESARIAL' },
    { id: 'flexRadioDefault1', texto: 'SERVICIO DE TRANSPORTE TERRESTRE DE PARTICULARES Y/O GRUPO ESPECIFICO DE PERSONAS' },
  ];

  municipioSeleccionado: string = '';

  constructor(private fb: FormBuilder, private service: ClientesService, public dialog: MatDialog, private toastr: ToastrService) {
    this.formData = this.fb.group({
      origen: [null, [Validators.required]],
      destino: [null, [Validators.required]],
      idaVuelta: [false, [Validators.required]],
      fechaInicio: [false, [Validators.required]],
      fechaFinal: [false, [Validators.required]],
      conductor: ['', [Validators.required]],
      conductor2: [''],
      conductor3: [''],
      contrato: ['', [Validators.required]],
      vehiculo: ['', [Validators.required]],
      observacion: ['', [Validators.required]]
    });

  }
  ngOnInit(): void {
    this.cargarExtracto();
    this.cargarMunicipios();
    this.cargarConductores();
    this.cargarContrato();
    this.cargarVehiculos();

    this.valueChangeInputs();

    this.formData.controls['observacion'].valueChanges.subscribe(data => {
      console.log(data)
    })
  }



  cargarExtracto() {
    this.service.getExtracto().subscribe({
      next: (data) => {
        this.$listExtracto = data;
        this.listExtracto = data;
      }
    })
  }

  onCheckboxChange(event: any, texto: string) {
    if (event.target.checked) {
      this.formData.controls['observacion'].setValue(texto);

      const otherOptionId = (event.target.id === 'flexRadioDefault') ? 'flexRadioDefault1' : 'flexRadioDefault';
      const otherCheckbox = document.getElementById(otherOptionId) as HTMLInputElement;
      otherCheckbox.checked = false;
    } else {
      this.formData.controls['observacion'].setValue(null);
    }
  }

  cargarMunicipios() {
    this.service.getMunicipios().subscribe({
      next: (data) => {
        this.municipios = data;
        this.$municipios = data;

        this.municipiosDestinos = data;
        this.$municipiosDestinos = data;

      }
    })
  }

  cargarConductores() {
    this.service.getConductores().subscribe({
      next: (data) => {
        this.conductores = data;
        this.$conductores = data;

        this.conductores2 = data;
        this.$conductores2 = data;
      }
    })
  }

  cargarContrato() {
    this.service.getContratos().subscribe({
      next: (data) => {
        this.contrato = data;
        this.$contrato = data;
      }
    })
  }

  cargarVehiculos() {
    this.service.getVehiculos().subscribe({
      next: (data) => {
        this.vehiculo = data;
        this.$vehiculo = data;
      }
    })
  }

  crearExtracto() {
    let payload: InputExtracto = {
      idOrigen: this.formData.controls['origen'].value.id,
      idDestino: this.formData.controls['destino'].value.id,
      idaYvuelta: this.formData.controls['idaVuelta'].value,
      idContrato: this.formData.controls['contrato'].value.id,
      idVehiculo: this.formData.controls['vehiculo'].value.id,
      idConductor1: this.formData.controls['conductor'].value.id,
      idConductor2: this.formData.controls['conductor2'].value.id,
      idConductor3: this.formData.controls['conductor3'].value.id,
      fechaInicio: new Date(this.formData.controls['fechaInicio'].value),
      fechaFinal: new Date(this.formData.controls['fechaFinal'].value),
      observacion: this.formData.controls['observacion'].value,
    }
    this.service.crearExtracto(payload).subscribe({
      next: (value) => {
        if (value.llave != 0) {
          this.toastr.error(value.valor)
          return
        }
        this.toastr.success(value.valor);
        this.cargarExtracto();
      },
    })
  }

  setValue(item: any) {
    this.idExtracto = item.id
    const fechaInicio = new Date(item.fechaInicio);
    const formattedFechaInicio = fechaInicio.toISOString().substring(0, 10);

    const fechaFinal = new Date(item.fechaFinal != null ? item.fechaFinal : '');
    const formattedFechaFinal = fechaFinal.toISOString().substring(0, 10);

    this.formData.controls['origen'].setValue(this.municipios.find(x => x.id == item.idOrigen));
    this.formData.controls['destino'].setValue(this.municipiosDestinos.find(x => x.id == item.idDestino));
    this.formData.controls['idaVuelta'].setValue(item.idaYvuelta);
    this.formData.controls['contrato'].setValue(this.contrato.find(x => x.id == item.idContrato));
    this.formData.controls['vehiculo'].setValue(this.vehiculo.find(x => x.id == item.idVehiculo));
    this.formData.controls['conductor'].setValue(this.conductores.find(x => x.id == item.idConductor1));
    this.formData.controls['conductor2'].setValue(this.conductores2.find(x => x.id == item.idConductor2));
    this.formData.controls['conductor3'].setValue(this.conductores2.find(x => x.id == item.idConductor2));
    this.formData.controls['fechaInicio'].setValue(formattedFechaInicio);
    this.formData.controls['fechaFinal'].setValue(formattedFechaFinal);
    this.formData.controls['observacion'].setValue(item.observacion);


    this.isEdit = true;
    // this.accion = 'Actualizar';
  }

  actualizarExtracto() {
    let payload: InputActualizarExtracto = {
      id: this.idExtracto,
      idOrigen: this.formData.controls['origen'].value.id,
      idDestino: this.formData.controls['destino'].value.id,
      idaYvuelta: this.formData.controls['idaVuelta'].value,
      idContrato: this.formData.controls['contrato'].value.id,
      idVehiculo: this.formData.controls['vehiculo'].value.id,
      idConductor1: this.formData.controls['conductor'].value.id,
      idConductor2: this.formData.controls['conductor2'].value.id,
      idConductor3: this.formData.controls['conductor3'].value.id,
      fechaInicio: new Date(this.formData.controls['fechaInicio'].value),
      fechaFinal: new Date(this.formData.controls['fechaFinal'].value),
      observacion: this.formData.controls['observacion'].value
    }
    this.service.actualizarExtracto(payload).subscribe({
      next: (value) => {
        if (value.llave != 0) {
          this.toastr.error(value.valor)
          return
        }
        this.toastr.success(value.valor);
        this.cargarExtracto();
      },
    })
  }

  generarArchivo(idExtracto: number) {
    this.service.generarArchivo(idExtracto).subscribe({
      next: (data: LlaveValorDTO) => {
        this.descargarArchivo(data.valor);
      }
    })
  }

  private descargarArchivo(pdfBase64: string) {
    const blob = this.base64toBlob(pdfBase64, 'application/pdf');
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'FUEC.pdf';
    link.click();
  }

  private base64toBlob(base64: string, mimeType: string): Blob {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    return new Blob(byteArrays, { type: mimeType });
  }

  selected(e: any) {
    console.log(e)
  }



  valueChangeInputs() {
    this.formData.controls['origen'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$municipios = this._filter(name != '' ? name : '');
    });

    this.formData.controls['destino'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$municipiosDestinos = this._filterDestino(name != '' ? name : '');
    });

    this.formData.controls['conductor'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$conductores = this._filterConductor(name != '' ? name : '');
    });

    this.formData.controls['conductor2'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$conductores2 = this._filterConductor2(name != '' ? name : '');
    });

    this.formData.controls['contrato'].valueChanges.subscribe(value => {
      const name = typeof value.toString() === 'string' ? value.toString() : value?.nombre;
      this.$contrato = this._filterContrato(name != '' ? name : '');
    });

    this.formData.controls['vehiculo'].valueChanges.subscribe(value => {
      const name = typeof value === 'string' ? value : value?.nombre;
      this.$vehiculo = this._filterVehiculo(name != '' ? name : '');
    });
  }

  private _filter(name: string): MunicipioDTO[] {
    const filterValue = name

    return this.municipios.filter(option => option.nombre.toLowerCase().includes(filterValue));
  }

  private _filterDestino(name: string): MunicipioDTO[] {
    const filterValue = name

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

  private _filterContrato(name: string): ContratoDTO[] {
    const filterValue = name

    return this.contrato.filter(option => option.noContrato.toString().includes(filterValue) || option.nmCliente.includes(filterValue));
  }

  private _filterVehiculo(name: string): VehiculosDTO[] {
    const filterValue = name;

    return this.vehiculo.filter(option => option.placa.toLowerCase().includes(filterValue) || option.numeroInterno.toLowerCase().includes(filterValue));
  }

  municipioDisplay(value: MunicipioDTO): string {
    if (value) {
      return value.nombre
    }
    return '';
  }

  destinoDisplay(value: MunicipioDTO): string {
    if (value) {
      return value.nombre
    }
    return '';
  }

  conductoresDisplay(value: ConductoresDTO): string {
    if (value) {
      return value.nombre
    }
    return '';
  }

  contratoDisplay(value: ContratoDTO): string {
    if (value) {
      return value.noContrato.toString()
    }
    return '';
  }

  vehiculoDisplay(value: VehiculosDTO): string {
    if (value) {
      return value.placa
    }
    return '';
  }
}
