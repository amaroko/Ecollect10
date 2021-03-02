import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewallComponent } from './viewall/viewall.component';
import { RouterModule } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';
import { PanelModule } from '../../components/panel/panel.module';
import { AllloansComponent } from './allloans/allloans.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { PredelqComponent } from './predelq/predelq.component';
import { PtpsComponent } from './ptps/ptps.component';
import { WithfundsComponent } from './withfunds/withfunds.component';

var routes = [
  { path: '', redirectTo: 'viewall' },
  { path: 'viewall', component: ViewallComponent },
  { path: 'myallocations', component: MyallocationsComponent },
  { path: 'myworklist', component: MyworklistComponent },
  { path: 'allloans', component: AllloansComponent },
  { path: 'predelq', component: PredelqComponent },
  { path: 'ptps', component: PtpsComponent },
  { path: 'withfunds', component: WithfundsComponent }
];
var WorkModule = /** @class */ (function() {
  function WorkModule() {
  }

  WorkModule = __decorate([
    NgModule({
      declarations: [
        ViewallComponent,
        AllloansComponent,
        MyallocationsComponent,
        MyworklistComponent,
        PredelqComponent,
        PtpsComponent,
        WithfundsComponent
      ],
      imports: [
        CommonModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes),
        PanelModule
      ],
      exports: [RouterModule]
    })
  ], WorkModule);
  return WorkModule;
}());
export { WorkModule };
// work module
//# sourceMappingURL=work.module.js.map
