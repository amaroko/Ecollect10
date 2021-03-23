import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllreportsComponent } from './allreports/allreports.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { PanelModule } from '../../components/panel/panel.module';
var routes = [
    { path: '', redirectTo: 'allreports' },
    {
        path: 'allreports',
        component: AllreportsComponent,
        data: { title: 'AllReports' },
    },
    {
        path: 'dashboards',
        component: DashboardsComponent,
        data: { title: 'Dashboards' },
    },
];
var ReportsModule = /** @class */ (function () {
    function ReportsModule() {
    }
    ReportsModule = __decorate([
        NgModule({
            declarations: [AllreportsComponent, DashboardsComponent],
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                FormsModule,
                PanelModule,
            ],
        })
    ], ReportsModule);
    return ReportsModule;
}());
export { ReportsModule };
//# sourceMappingURL=reports.module.js.map