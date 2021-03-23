import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings/settings.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AutomationComponent } from './automation/automation.component';
import { AgGridModule } from '@ag-grid-community/angular';
import { NgxSelectModule } from 'ngx-select-ex';
import { CustomersuspensionsComponent } from './customersuspensions/customersuspensions.component';
var routes = [
    { path: '', redirectTo: 'home' },
    { path: 'settings', component: SettingsComponent },
    { path: 'automation', component: AutomationComponent },
    { path: 'customersuspensions', component: CustomersuspensionsComponent },
];
var LettersModule = /** @class */ (function () {
    function LettersModule() {
    }
    LettersModule = __decorate([
        NgModule({
            declarations: [
                SettingsComponent,
                AutomationComponent,
                CustomersuspensionsComponent,
            ],
            imports: [
                CommonModule,
                NgxSpinnerModule,
                FormsModule,
                RouterModule.forChild(routes),
                AgGridModule,
                NgxSelectModule,
            ],
        })
    ], LettersModule);
    return LettersModule;
}());
export { LettersModule };
//# sourceMappingURL=letters.module.js.map