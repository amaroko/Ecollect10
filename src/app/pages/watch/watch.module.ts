import { NgModule } from '@angular/core';
import { CreditbuildupComponent } from './creditbuildup/creditbuildup.component';
import { NocreditComponent } from './nocredit/nocredit.component';
import { RouterModule, Routes } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';
import { PanelModule } from '../../components/panel/panel.module';

const routes: Routes = [
  { path: '', redirectTo: 'nocredit' },
  { path: 'nocredit', component: NocreditComponent },
  { path: 'creditbuildup', component: CreditbuildupComponent },
];

@NgModule({
  imports: [
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes),
    PanelModule,
  ],
  declarations: [NocreditComponent, CreditbuildupComponent],
  exports: [RouterModule],
})
export class WatchModule {}
