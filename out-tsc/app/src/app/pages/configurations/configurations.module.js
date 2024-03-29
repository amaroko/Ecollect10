import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccplansComponent } from './accplans/accplans.component';
import { AllocationsComponent } from './allocations/allocations.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { PlanactionsComponent } from './planactions/planactions.component';
import { PlanmemosComponent } from './planmemos/planmemos.component';
import { SmsComponent } from './sms/sms.component';
import { SpComponent } from './sp/sp.component';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgGridModule } from '@ag-grid-community/angular';
import { NgxSelectModule } from 'ngx-select-ex';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PanelModule } from '../../components/panel/panel.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'sms', component: SmsComponent },
    { path: 'allocations', component: AllocationsComponent },
    {
        path: 'accplans',
        component: AccplansComponent,
        data: { title: 'Configurations | AccountPlan Settings' },
    },
    { path: 'planactions', component: PlanactionsComponent },
    { path: 'planmemos', component: PlanmemosComponent },
    { path: 'sp', component: SpComponent },
    { path: 'insurance', component: InsuranceComponent },
];
var ConfigurationsModule = /** @class */ (function () {
    function ConfigurationsModule() {
    }
    ConfigurationsModule = __decorate([
        NgModule({
            declarations: [
                AccplansComponent,
                AllocationsComponent,
                InsuranceComponent,
                PlanactionsComponent,
                PlanmemosComponent,
                SmsComponent,
                SpComponent,
            ],
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                NgxSpinnerModule,
                FormsModule,
                NgSelectModule,
                AgGridModule,
                NgxSelectModule,
                BsDatepickerModule,
                NgxPaginationModule,
                Ng2SearchPipeModule,
                PanelModule,
                PerfectScrollbarModule,
            ],
        })
    ], ConfigurationsModule);
    return ConfigurationsModule;
}());
export { ConfigurationsModule };
//# sourceMappingURL=configurations.module.js.map