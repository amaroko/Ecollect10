import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemandhisComponent } from './demandhis/demandhis.component';
import { DemandsdueComponent } from './demandsdue/demandsdue.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from '@ag-grid-community/angular';
var routes = [
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
var DemandModule = /** @class */ (function () {
    function DemandModule() {
    }
    DemandModule = __decorate([
        NgModule({
            declarations: [DemandhisComponent, DemandsdueComponent],
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                FormsModule,
                AgGridModule,
            ],
        })
    ], DemandModule);
    return DemandModule;
}());
export { DemandModule };
//# sourceMappingURL=demand.module.js.map