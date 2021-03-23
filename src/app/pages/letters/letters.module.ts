import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AutomationComponent } from './automation/automation.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomersuspensionsComponent } from './customersuspensions/customersuspensions.component';

const routes: Routes = [
  { path: '', redirectTo: 'home' },
  { path: 'settings', component: SettingsComponent },
  { path: 'automation', component: AutomationComponent },
  { path: 'customersuspensions', component: CustomersuspensionsComponent },
];

@NgModule({
  declarations: [
    SettingsComponent,
    AutomationComponent,
    CustomersuspensionsComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,
    FormsModule,
    RouterModule.forChild(routes),
    AgGridModule,
    NgxSelectModule,
  ],
})
export class LettersModule {}
