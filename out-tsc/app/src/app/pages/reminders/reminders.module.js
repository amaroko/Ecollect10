import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllremindersComponent } from './allreminders/allreminders.component';
import { NewremindersComponent } from './newreminders/newreminders.component';
import { RouterModule } from '@angular/router';
import { AgGridModule } from '@ag-grid-community/angular';
import { PanelModule } from '../../components/panel/panel.module';
var routes = [
    { path: '', redirectTo: 'allreminders' },
    { path: 'allreminders', component: AllremindersComponent },
    { path: 'newreminders', component: NewremindersComponent },
];
var RemindersModule = /** @class */ (function () {
    function RemindersModule() {
    }
    RemindersModule = __decorate([
        NgModule({
            declarations: [AllremindersComponent, NewremindersComponent],
            imports: [
                CommonModule,
                AgGridModule.withComponents([]),
                RouterModule.forChild(routes),
                PanelModule,
            ],
            exports: [RouterModule],
        })
    ], RemindersModule);
    return RemindersModule;
}());
export { RemindersModule };
//# sourceMappingURL=reminders.module.js.map