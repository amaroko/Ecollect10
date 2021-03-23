import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home.component';
import { RouterModule } from '@angular/router';
import { PanelModule } from '../../components/panel/panel.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { AgmCoreModule } from '@agm/core';
import { CalendarMonthModule } from 'angular-calendar';
import { PermissionsensorComponent } from './permissionsensor/permissionsensor.component';
var routes = [
    // {path: '', redirectTo: 'home'},
    { path: '', component: HomePageComponent },
];
var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        NgModule({
            declarations: [HomePageComponent, PermissionsensorComponent],
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                PanelModule,
                PerfectScrollbarModule,
                // AgmCoreModule,
                CalendarMonthModule,
            ],
            exports: [RouterModule],
        })
    ], HomeModule);
    return HomeModule;
}());
export { HomeModule };
// works
//# sourceMappingURL=home.module.js.map