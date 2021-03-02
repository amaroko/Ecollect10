import { __decorate } from 'tslib';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllecreditComponent } from './allecredit/allecredit.component';
import { PanelModule } from '../../components/panel/panel.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { RouterModule } from '@angular/router';
import { ViewallComponent } from './viewall/viewall.component';

var routes = [
  { path: '', redirectTo: 'viewall' },
  { path: 'viewall', component: ViewallComponent },
  { path: 'allecredit', component: AllecreditComponent }
];
var McoopcashModule = /** @class */ (function() {
  function McoopcashModule() {
  }

  McoopcashModule = __decorate([
    NgModule({
      declarations: [AllecreditComponent, ViewallComponent],
      imports: [
        CommonModule,
        PanelModule,
        AgGridModule.withComponents([]),
        RouterModule.forChild(routes)
      ]
    })
  ], McoopcashModule);
  return McoopcashModule;
}());
export { McoopcashModule };
// this
//# sourceMappingURL=mcoopcash.module.js.map
