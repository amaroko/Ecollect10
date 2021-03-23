import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllmanualsComponent } from './allmanuals/allmanuals.component';
import { RouterModule } from '@angular/router';
import { PanelModule } from '../../components/panel/panel.module';
import { NgMarqueeModule } from 'ng-marquee';
var routes = [
    { path: '', redirectTo: 'all' },
    { path: 'all', component: AllmanualsComponent },
];
var ManualsModule = /** @class */ (function () {
    function ManualsModule() {
    }
    ManualsModule = __decorate([
        NgModule({
            declarations: [AllmanualsComponent],
            imports: [
                CommonModule,
                RouterModule.forChild(routes),
                PanelModule,
                NgMarqueeModule,
            ],
        })
    ], ManualsModule);
    return ManualsModule;
}());
export { ManualsModule };
//# sourceMappingURL=manuals.module.js.map