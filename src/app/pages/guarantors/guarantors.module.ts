import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NewguarantorComponent } from './newguarantor/newguarantor.component';
import { EditguarantorComponent } from './editguarantor/editguarantor.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'list', component: ListComponent },
  { path: 'newguarantor', component: NewguarantorComponent },
  { path: 'editguarantor/:id', component: EditguarantorComponent },
];

@NgModule({
  declarations: [ListComponent, NewguarantorComponent, EditguarantorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
})
export class GuarantorsModule {}
