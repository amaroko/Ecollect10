import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllremindersComponent } from './allreminders/allreminders.component';
import { NewremindersComponent } from './newreminders/newreminders.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';
import { PanelModule } from '../../components/panel/panel.module';

const routes: Routes = [
  { path: '', redirectTo: 'allreminders' },
  { path: 'allreminders', component: AllremindersComponent },
  { path: 'newreminders', component: NewremindersComponent },
];

@NgModule({
  declarations: [AllremindersComponent, NewremindersComponent],
  imports: [
    CommonModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes),
    PanelModul,
  ],
  exports: [RouterModule,
})
export class RemindersModule {
}
