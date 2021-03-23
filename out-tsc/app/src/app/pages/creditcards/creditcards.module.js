import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllcardsComponent } from './allcards/allcards.component';
import { MyallocationsComponent } from './myallocations/myallocations.component';
import { MyworklistComponent } from './myworklist/myworklist.component';
import { ViewallComponent } from './viewall/viewall.component';
import { ZerobalanceComponent } from './zerobalance/zerobalance.component';
import { RouterModule } from '@angular/router';
import { PanelModule } from '../../components/panel/panel.module';
import { AgGridModule } from '@ag-grid-community/angular';
import { DemandsdueComponent } from './creditcarddemands/demandsdue/demandsdue.component';
import { DemandshistoryComponent } from './creditcarddemands/demandshistory/demandshistory.component';
var routes = [
    { path: '', redirectTo: 'allcards' },
    { path: 'allcards', component: AllcardsComponent },
    { path: 'myallocations', component: MyallocationsComponent },
    { path: 'myworklist', component: MyworklistComponent },
    { path: 'viewall', component: ViewallComponent },
    { path: 'zerobalance', component: ZerobalanceComponent },
    // demands
    { path: 'creditcarddemands/demandsdue', component: DemandsdueComponent },
    {
        path: 'creditcarddemands/demandshistory',
        component: DemandshistoryComponent,
    },
];
var CreditcardsModule = /** @class */ (function () {
    function CreditcardsModule() {
    }
    CreditcardsModule = __decorate([
        NgModule({
            declarations: [
                AllcardsComponent,
                MyallocationsComponent,
                MyworklistComponent,
                ViewallComponent,
                ZerobalanceComponent,
                DemandsdueComponent,
                DemandshistoryComponet,
            ],
            imports: [
                CommonModule,
                PanelModule,
                AgGridModule.withComponents([]),
                RouterModule.forChild(routes),
                FormsModue,
            ],
            exports: [RouterModul],
        })
    ], CreditcardsModule);
    return CreditcardsModule;
}());
export { CreditcardsModule };
// this
//# sourceMappingURL=creditcards.module.js.map