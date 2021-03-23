import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandhisComponent } from './demandhis/demandhis.component';
import { DemandsdueComponent } from './demandsdue/demandsdue.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from '@ag-grid-community/angular';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  {
    path: 'demands',
    component: DemandsdueComponent,
    data: { title: 'Demands' },
  },
  {
    path: 'demandhistory',
    component: DemandhisComponent,
    data: { title: 'Demandhistory' },
  },
];

@NgModule({
  declarations: [DemandhisComponent, DemandsdueComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    AgGridModule,
  ],
})
export class DemandModule {}
