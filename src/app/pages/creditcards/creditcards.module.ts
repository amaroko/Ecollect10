import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllcardsComponent } from './allcards/allcards.component';
import { CreditcarddemandsComponent } from './creditcarddemands/creditcarddemands.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { ViewallComponent } from './viewall/viewall.component';
import { ZerobalanceComponent } from './zerobalance/zerobalance.component';
import { RouterModule, Routes } from '@angular/router';
import { PanelModule } from '../../components/panel/panel.module';
import { AgGridModule } from '@ag-grid-community/angular';

const routes: Routes = [
  { path: '', redirectTo: 'allcards' },
  { path: 'allcards', component: AllcardsComponent },
  { path: 'myallocations', component: MyallocationsComponent },
  { path: 'myworklist', component: MyworklistComponent },
  { path: 'viewall', component: ViewallComponent },
  { path: 'zerobalance', component: ZerobalanceComponent }

  // demands
  // {path: 'creditcarddemands/demandsdue', component: DemandsdueComponent},
  // {path: 'creditcarddemands/demandshistory', component: DemandshistoryComponent}
];

@NgModule({
  declarations: [
    AllcardsComponent,
    CreditcarddemandsComponent,
    MyallocationsComponent,
    MyworklistComponent,
    ViewallComponent,
    ZerobalanceComponent
  ],
  imports: [
    CommonModule,
    PanelModule,
    AgGridModule.withComponents([]),
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CreditcardsModule {
}

// this
