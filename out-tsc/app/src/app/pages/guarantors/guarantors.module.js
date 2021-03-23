import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { NewguarantorComponent } from './newguarantor/newguarantor.component';
import { EditguarantorComponent } from './editguarantor/editguarantor.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
var routes = [
    { path: '', redirectTo: 'dashboard' },
    { path: 'list', component: ListComponent },
    { path: 'newguarantor', component: NewguarantorComponent },
    { path: 'editguarantor/:id', component: EditguarantorComponent },
];
var GuarantorsModule = /** @class */ (function () {
    function GuarantorsModule() {
    }
    GuarantorsModule = __decorate([
        NgModule({
            declarations: [ListComponent, NewguarantorComponent, EditguarantorComponent],
            imports: [CommonModule, RouterModule.forChild(routes), FormsModule],
        })
    ], GuarantorsModule);
    return GuarantorsModule;
}());
export { GuarantorsModule };
//# sourceMappingURL=guarantors.module.js.map