import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EmpresaVinculanteDTO, VehiculosDTO } from 'src/app/Models/VehiculosDTO';
import { ProductModel } from '../productos/productmodel';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/Services/producto.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DialogDocumentosVehiculosComponent } from './dialog-documentos/dialog-documentosVehiculos.component';
import { DialogPropietarioComponent } from './dialog-propietario/dialog-propietario.component';
import { PropietarioDTO } from 'src/app/Models/PropietarioDTO';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css']
})
export class VehiculosComponent {

  number = '^[0-9]+$';

  listVehiculos: VehiculosDTO[] = [];
  $listVehiculos: VehiculosDTO[] = [];

  propietario?: PropietarioDTO;

  total: number = 0;

  $report: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  p: number = 1;
  itemsPerPage: number = 5;

  valorInput = '';
  accion = "Agregar";
  isEdit: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private _service: ProductoService, public dialog: MatDialog, private toastr: ToastrService,
    private router: Router) {
    this.form = this.fb.group({
      placa: ['', [Validators.required]],
      numeroInterno: ['', [Validators.required, Validators.minLength(1)]],
      tarjetaOperacion: [''],
      tipoVehiculo: ['', [Validators.required]],
      cantidadPasajeros: ['', [Validators.required, Validators.pattern(this.number)]],
      marca: ['', [Validators.required]],
      linea: ['', [Validators.required]],
      modelo: ['', [Validators.required]],
      fechaMatricula: ['', [Validators.required]],
      color: ['', [Validators.required]],
      servicio: ['', [Validators.required]],
      tipoCombustible: ['', [Validators.required]],
      numeroMotor: ['', [Validators.required]],
      numeroSerie: ['', [Validators.required]],
      convenio: [false],
      nitEmpresa: [''],
      nombreEmpresa: ['']
    });

  }
  async ngOnInit() {
    await this.obtenerVehiculos();

    this.form.controls["convenio"].valueChanges.subscribe(x => {
      if (x) {
        this.form.controls['nitEmpresa'].addValidators(Validators.required);
        this.form.controls['nitEmpresa'].updateValueAndValidity();

        this.form.controls['nombreEmpresa'].addValidators(Validators.required);
        this.form.controls['nombreEmpresa'].updateValueAndValidity();
      } else {
        this.form.controls['nitEmpresa'].removeValidators(Validators.required);
        this.form.controls['nitEmpresa'].updateValueAndValidity();

        this.form.controls['nombreEmpresa'].removeValidators(Validators.required);
        this.form.controls['nombreEmpresa'].updateValueAndValidity();

        this.form.controls['nitEmpresa'].reset();
        this.form.controls['nombreEmpresa'].reset();

      }

    })
  }

  async obtenerVehiculos() {
    this.listVehiculos = await this._service.getVehiculos();
    this.$listVehiculos = await this._service.getVehiculos();

  }

  async validarConvenio() {
    const convenio = this.form.controls['convenio'].value;
    if (convenio) {
      const payloadEmpresa: any = {
        nombre: this.form.controls['nombreEmpresa'].value,
        nit: this.form.controls['nitEmpresa'].value
      }

      if (payloadEmpresa.nombre != "" && payloadEmpresa.nit != "") {
        const response = await this._service.guardarEmpresa(payloadEmpresa);
        await this.agregarVehiculo(response.data.id);
      }

    } else {
      await this.agregarVehiculo(0);
    }
  }

  blurEmpresa() {
    let nit: string = this.form.controls['nitEmpresa'].value;
    this.form.controls['nombreEmpresa'].reset();

    if (nit != "") {
      this._service.buscarEmpresaByNit(nit).subscribe({
        next: (x: EmpresaVinculanteDTO) => {
          if (x) {
            this.form.controls['nombreEmpresa'].setValue(x.nombre);
            this.form.controls['nombreEmpresa'].disable();
          } else {
            this.form.controls['nombreEmpresa'].enable();
          }
        },
        error: (err: any) => {
          this.toastr.error('Error cargando la empresa vinculante, por favor intente nuevamente');
        },
      });
    }
  }

  async agregarVehiculo(idEmpresa: number) {
    if (this.propietario?.id) {
      const payload: any = {
        placa: this.form.controls['placa'].value,
        numeroInterno: this.form.controls['numeroInterno'].value,
        tarjetaOperacion: this.form.controls['tarjetaOperacion'].value,
        tipoVehiculo: this.form.controls['tipoVehiculo'].value,
        cantidadPasajeros: this.form.controls['cantidadPasajeros'].value,
        marca: this.form.controls['marca'].value,
        linea: this.form.controls['linea'].value,
        modelo: Number(this.form.controls['modelo'].value),
        fechaMatricula: new Date(this.form.controls['fechaMatricula'].value),
        color: this.form.controls['color'].value,
        servicio: this.form.controls['servicio'].value,
        tipoCombustible: this.form.controls['tipoCombustible'].value,
        numeroMotor: this.form.controls['numeroMotor'].value.toString(),
        numeroSerie: this.form.controls['numeroSerie'].value.toString(),
        idPropietario: this.propietario?.id,
        convenio: this.form.controls['convenio'].value,
        idEmpresaVinculante: idEmpresa != 0 ? idEmpresa : 0
      }
      const data = await this._service.guardarVehiculos(payload)
      if (data.llave == 0) {
        this.toastr.success(data.valor);
        await this.obtenerVehiculos();
        this.form.reset();
      } else {
        this.toastr.info(data.valor);
      }
    } else {
      this.toastr.error("Por favor seleccionar un propietario")
    }
  }

  async actualizarVehiculo() {
    if (this.propietario?.id) {
      const payload: any = {
        placa: this.form.controls['placa'].value,
        numeroInterno: this.form.controls['numeroInterno'].value,
        tarjetaOperacion: this.form.controls['tarjetaOperacion'].value,
        tipoVehiculo: this.form.controls['tipoVehiculo'].value,
        cantidadPasajeros: this.form.controls['cantidadPasajeros'].value,
        marca: this.form.controls['marca'].value,
        linea: this.form.controls['linea'].value,
        modelo: Number(this.form.controls['modelo'].value),
        fechaMatricula: new Date(this.form.controls['fechaMatricula'].value),
        color: this.form.controls['color'].value,
        servicio: this.form.controls['servicio'].value,
        tipoCombustible: this.form.controls['tipoCombustible'].value,
        numeroMotor: this.form.controls['numeroMotor'].value.toString(),
        numeroSerie: this.form.controls['numeroSerie'].value.toString(),
        idPropietario: this.propietario?.id,
        convenio: this.form.controls['convenio'].value,
        nombreEmpresa: this.form.controls['nombreEmpresa'].value,
        nitEmpresa: this.form.controls['nitEmpresa'].value,

      }
      const data = await this._service.actualizarVehiculo(payload)
      if (data.llave == 0) {
        this.toastr.success(data.valor);
        await this.obtenerVehiculos();
        this.form.reset();
      } else {
        this.toastr.info(data.valor);
      }
    } else {
      this.toastr.error("Por favor seleccionar un propietario")
    }
  }

  openDialogDocumentos(id: number) {
    const dialogRef = this.dialog.open(DialogDocumentosVehiculosComponent, {
      width: '60%',
      data: {
        IdVehiculo: id
      }
    });

    dialogRef.afterClosed().subscribe(x => {
      this.obtenerVehiculos();
  })
  }

  openDialogPropietario() {
    const dialogRef = this.dialog.open(DialogPropietarioComponent, {
      width: '60%',
      data: {

      }
    });

    dialogRef.afterClosed().subscribe(x => {
      if (x != null) {
        this.propietario = x;
      }
    })
  }

  setValue(item: VehiculosDTO) {
    const fechaMatricula = new Date(item.fechaMatricula);
    const formattedfechaMatricula = fechaMatricula.toISOString().substring(0, 10);

    this.form.controls['placa'].setValue(item.placa);
    this.form.controls['numeroInterno'].setValue(item.numeroInterno);
    this.form.controls['tarjetaOperacion'].setValue(item.tarjetaOperacion);
    this.form.controls['tipoVehiculo'].setValue(item.tipoVehiculo);
    this.form.controls['cantidadPasajeros'].setValue(item.cantidadPasajeros);
    this.form.controls['marca'].setValue(item.marca);
    this.form.controls['linea'].setValue(item.linea);
    this.form.controls['modelo'].setValue(item.modelo);
    this.form.controls['fechaMatricula'].setValue(formattedfechaMatricula);
    this.form.controls['color'].setValue(item.color);
    this.form.controls['servicio'].setValue(item.servicio);
    this.form.controls['tipoCombustible'].setValue(item.tipoCombustible);
    this.form.controls['numeroMotor'].setValue(item.numeroMotor);
    this.form.controls['numeroSerie'].setValue(item.numeroSerie);
    this.form.controls['convenio'].setValue(item.convenio);

    this._service.buscarEmpresa(item.idEmpresaVinculante).subscribe({
      next: (x: EmpresaVinculanteDTO) => {
        this.form.controls['nombreEmpresa'].setValue(x.nombre);
        this.form.controls['nitEmpresa'].setValue(x.nit);
      },
      error: (err: any) => {
        this.toastr.error('Error cargando la empresa vinculante, por favor intente nuevamente');
      },
    });

    this._service.buscarPropietarioPorId(item.idPropietario).subscribe({
      next: (x: PropietarioDTO) => {
        this.propietario = x;
      },
      error: (err: any) => {
        this.toastr.error('Error cargando el propietario, por favor intente nuevamente');
      },
    });

    this.isEdit = true;
    this.accion = 'Actualizar';

  }

  buscarConductor(event: any) {

    const filtro = event.target.value.toLowerCase();
    this.$listVehiculos = this.listVehiculos.filter(x => x.placa.toLowerCase().includes(filtro) || x.numeroInterno.toLowerCase().includes(filtro)
    );
  }

  limpiar(e: any) {
    this.valorInput = '';
    this.$listVehiculos = this.listVehiculos
  }

  ResetForm() {
    this.isEdit = false;
    this.accion = 'Agregar'
    delete this.propietario

    this.form.reset();
  }

  edadMayorDe18Validator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fechaNacimiento: Date = new Date(control.value);
      const hoy: Date = new Date();
      const edad: number = hoy.getFullYear() - fechaNacimiento.getFullYear();

      fechaNacimiento.setFullYear(hoy.getFullYear());

      if (fechaNacimiento > hoy || edad < 18) {
        return { 'menorDeEdad': true };
      }

      return null;
    };
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
