import { __decorate } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
var ListComponent = /** @class */ (function () {
    function ListComponent(ecolService, router) {
        this.ecolService = ecolService;
        this.router = router;
    }
    ListComponent.prototype.ngOnInit = function () { };
    ListComponent.prototype.getguarantors = function (accnumber) {
        var _this = this;
        this.ecolService.loader();
        this.ecolService.retrieveGuarantors(accnumber).subscribe(function (data) {
            _this.guarantors = data;
            swal.fire('Success!', 'Retrieved guarantors!', 'success');
            swal.hideLoading();
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Error retrieving guarantors!', 'error');
        });
    };
    ListComponent.prototype.update = function (id) {
        // redirect to ListComponent
        this.router.navigate(['/guarantors/editguarantor/' + id]);
    };
    ListComponent.prototype.addnew = function () {
        // redirect to ListComponent
        this.router.navigate(['/guarantors/newguarantor']);
    };
    ListComponent = __decorate([
        Component({
            selector: 'app-list',
            templateUrl: './list.component.html',
            styleUrls: ['./list.component.css'],
        })
    ], ListComponent);
    return ListComponent;
}());
export { ListComponent };
//# sourceMappingURL=list.component.js.map