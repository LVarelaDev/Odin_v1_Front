import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/Services/producto.service';
import { ProductModel } from './productmodel';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Injectable, ElementRef } from '@angular/core';
import { PaginationControlsComponent } from 'ngx-pagination';
import * as XLSX from 'xlsx';
import { ConductoresDTO } from 'src/app/Models/ConductoresDTO';
import { MatDialog } from '@angular/material/dialog';
import { DialogDocumentosVehiculosComponent } from '../vehiculos/dialog-documentos/dialog-documentosVehiculos.component';
import { ToastrService } from 'ngx-toastr';
import { DialogDocumentosProductosComponent } from './dialog-documentos-productos/dialog-documentos-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  number = '^[0-9]+$';

  listConductores: ConductoresDTO[] = [];
  $listConductores: ConductoresDTO[] = [];
  listProductosOptimos: any[] = [];
  listProductosDefectuosos: any[] = [];

  total:number = 0;

  $report: BehaviorSubject<ProductModel[]> = new BehaviorSubject<ProductModel[]>([]);

  p: number = 1;
  itemsPerPage: number = 5; 

  valorInput = '';
  accion = "Agregar";
  isEdit: boolean = false;
  form: FormGroup;

  constructor(private fb: FormBuilder, private _productoService: ProductoService, public dialog: MatDialog,private toastr: ToastrService,
    private router: Router) {
    this.form = this.fb.group({
      tipoDocumento: ['', [Validators.required]],
      documento: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(6)]],
      nombre: ['', [Validators.required]],
      celular: ['', [Validators.required, Validators.pattern(this.number)]],
      fechaNacimiento: ['', [Validators.required]],
      correo: ['', [Validators.required, this.validarCorreo]],
      tipoLicencia: ['', [Validators.required]],
      numeroPazYSalvo: ['', [Validators.required]],
    });

  }
  ngOnInit(): void {
    this.obtenerConductores();
    
  }

  

  obtenerConductores() {
    this._productoService.getConductores(this.p, this.itemsPerPage)
      .subscribe(data => {
        this.listConductores = data.items;
        this.total = data.totalCount
        this.$listConductores = data.items;
      });
  }

  agregarConductor() {
    const payload: any = {
      IdTipoDocumento: Number(this.form.controls['tipoDocumento'].value),
      Documento: this.form.controls['documento'].value,
      Nombre: this.form.controls['nombre'].value,
      Celular: this.form.controls['celular'].value.toString(),
      FechaNacimiento: new Date(this.form.controls['fechaNacimiento'].value),
      Correo: this.form.controls['correo'].value,
      TipoLicencia: this.form.controls['tipoLicencia'].value,
      NumeroPazYSalvo: this.form.controls['numeroPazYSalvo'].value
    }
    if (!this.isEdit) {
      this._productoService.guardarConductor(payload).subscribe(data => {
        if (data.llave == 0) {
          this.toastr.success(data.valor);
          this.obtenerConductores();
          this.form.reset();
        } else {
          this.toastr.success(data.valor);
        }

      }, error => {
      })
    } else {
      this._productoService.actualizarConductor(payload).subscribe(data => {
        if (data.llave == 0) {
          this.toastr.success(data.valor);
          this.obtenerConductores();
          this.ResetForm();
        } else {
          this.toastr.error(data.valor);
        }
      }, error => {
      })
    }
  }

  openDialogDocumentos(id: number){
    const dialogRef = this.dialog.open(DialogDocumentosProductosComponent,{
      width: '60%',
      data: {
        IdConductor: id
      }
    });

    dialogRef.afterClosed().subscribe(x => {
      if(x){
        this.obtenerConductores();
      }
    })
  }

  setValue(item: ConductoresDTO) {
    const fechaNacimiento = new Date(item.fechaNacimiento);
    const formattedFechaNacimiento = fechaNacimiento.toISOString().substring(0, 10);

    this.form.controls['tipoDocumento'].setValue(item.idTipoDocumento);
    this.form.controls['documento'].setValue(item.documento);
    this.form.controls['nombre'].setValue(item.nombre);
    this.form.controls['celular'].setValue(item.celular);
    this.form.controls['fechaNacimiento'].setValue(formattedFechaNacimiento);
    this.form.controls['correo'].setValue(item.correo);
    this.form.controls['tipoLicencia'].setValue(item.tipoLicencia);
    this.form.controls['numeroPazYSalvo'].setValue(item.numeroPazYSalvo);

    this.isEdit = true;
    this.accion = 'Actualizar';

  }

  buscarConductor(event: any){

    const filtro = event.target.value.toLowerCase();
    this.$listConductores = this.listConductores.filter(x => x.documento.toLowerCase().includes(filtro) || x.nombre.toLowerCase().includes(filtro)
    );
  }

  limpiar(e: any){
    this.valorInput = '';
    this.$listConductores = this.listConductores
  }

  ResetForm(){
    this.isEdit = false;
    this.accion = 'Agregar'

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

  exportToExcel() {
    var jsonstring = JSON.stringify(this.listConductores);
    var data = JSON.parse(jsonstring);

    let dataToExport = data.map((item: any) => {
      return {
        'CódigoProducto': item.codigoProducto,
        'NombreProducto': item.nombre,
        'Stock': item.stock,
        'Estado': item.estado,
        'FechaRegistro': item.fechaRegistro
      };
    });
    this.exportJsonToExcel(dataToExport, 'Prodcutos');
  }


  public exportTableElmToExcel(element: ElementRef, fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element.nativeElement);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Data');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

  public exportJsonToExcel(data: any[], fileName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, ws, 'Data');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }


}
