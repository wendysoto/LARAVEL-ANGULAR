import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FabricanteComponent } from './demo/fabricante/fabricante.component';
import { VehiculoComponent } from './demo/vehiculo/vehiculo.component';

const routes: Routes = [
  { path: 'vehiculos', component: VehiculoComponent},
  { path: 'fabricantes', component: FabricanteComponent },
  { path: '', redirectTo: '/', pathMatch: 'prefix' },
  { path: '**', redirectTo: '/', pathMatch: 'prefix' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
