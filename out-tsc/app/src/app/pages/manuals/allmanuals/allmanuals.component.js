import { __decorate } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { saveAs } from 'file-saver';
var AllmanualsComponent = /** @class */ (function () {
    function AllmanualsComponent(ecolService) {
        this.ecolService = ecolService;
        //
    }
    AllmanualsComponent.prototype.ngOnInit = function () { };
    AllmanualsComponent.prototype.open = function (manualpath, filename) {
        this.downloadDemand(environment.manuals_path + manualpath, filename);
    };
    AllmanualsComponent.prototype.downloadDemand = function (filepath, filename) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error);
            swal.fire('Error!', ' Cannot download  file!', 'error');
        });
    };
    AllmanualsComponent = __decorate([
        Component({
            selector: 'app-allmanuals',
            templateUrl: './allmanuals.component.html',
            styleUrls: ['./allmanuals.component.css'],
        })
    ], AllmanualsComponent);
    return AllmanualsComponent;
}());
export { AllmanualsComponent };
//# sourceMappingURL=allmanuals.component.js.map