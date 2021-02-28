import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllecreditComponent } from './allecredit/allecredit.component';
import { PanelModule } from '../../components/panel/panel.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { RouterModule, Routes } from '@angular/router';
import { ViewallComponent } from './viewall/viewall.component';

const routes: Routes = [
  { path: '', redirectTo: 'viewall' },
  { path: 'viewall', component: ViewallComponent },
  { path: 'allecredit', component: AllecreditComponent }
];

@NgModule({
  declarations: [AllecreditComponent, ViewallComponent],
  imports: [
    CommonModule,
    PanelModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes)
  ]
})
export class McoopcashModule {
}

// this
