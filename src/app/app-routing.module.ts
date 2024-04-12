import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './Components/clientes/clientes.component';
import { ContratosComponent } from './Components/contratos/contratos.component';
import { ExtractosComponent } from './Components/extractos/extractos.component';
import { LoginComponent } from './Components/login/login.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';
import { ProductosComponent } from './Components/productos/productos.component';
import { UserComponent } from './Components/user/user.component';
import { VehiculosComponent } from './Components/vehiculos/vehiculos.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'productos', component: ProductosComponent },
  { path: 'vehiculos', component: VehiculosComponent },
  { path: 'contratos', component: ContratosComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'extracto', component: ExtractosComponent },
  { path: 'login', component: LoginComponent},
  { path: 'user', component: UserComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
