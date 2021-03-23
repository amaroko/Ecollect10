import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
var DashboardsComponent = /** @class */ (function () {
    function DashboardsComponent() {
    }
    DashboardsComponent.prototype.ngOnInit = function () { };
    DashboardsComponent.prototype.onNavigate = function (reportname) {
        window.open('activitydash?report=' + reportname, '_blank');
    };
    DashboardsComponent.prototype.openactivityrpt = function () {
        window.open(environment.kibana, '_blank');
    };
    DashboardsComponent = __decorate([
        Component({
            selector: 'app-dashboards',
            templateUrl: './dashboards.component.html',
            styleUrls: ['./dashboards.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], DashboardsComponent);
    return DashboardsComponent;
}());
export { DashboardsComponent };
//# sourceMappingURL=dashboards.component.js.map