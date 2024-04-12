import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { NavMenuComponent } from './Components/nav-menu/nav-menu.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { LoginComponent } from './Components/login/login.component';
import { UserComponent } from './Components/user/user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BodyComponent } from './Components/body/body.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltipModule} from '@angular/material/tooltip';
import { NgxMaskModule } from 'ngx-mask'
import { ToastrModule } from 'ngx-toastr';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { VehiculosComponent } from './Components/vehiculos/vehiculos.component';
import { DialogPropietarioComponent } from './Components/vehiculos/dialog-propietario/dialog-propietario.component';
import { CommonModule } from '@angular/common';
import { DialogDocumentosProductosComponent } from './Components/productos/dialog-documentos-productos/dialog-documentos-productos.component';
import { DialogDocumentosVehiculosComponent } from './Components/vehiculos/dialog-documentos/dialog-documentosVehiculos.component';
import { ContratosComponent } from './Components/contratos/contratos.component';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { ExtractosComponent } from './Components/extractos/extractos.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import { AuthInterceptor } from './AuthInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    NavMenuComponent,
    PageNotFoundComponent,
    LoginComponent,
    UserComponent,
    BodyComponent,
    VehiculosComponent,
    DialogPropietarioComponent,
    DialogDocumentosProductosComponent,
    DialogDocumentosVehiculosComponent,
    ContratosComponent,
    ClientesComponent,
    ExtractosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatIconModule,
    MatSlideToggleModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatInputModule,
    MatAutocompleteModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatTooltipModule,
    ToastrModule.forRoot(),
    NgxMaskModule.forRoot(),
    CollapseModule.forRoot(),
    
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
