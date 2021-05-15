import { __decorate } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
var DemandshistoryComponent = /** @class */ (function () {
    function DemandshistoryComponent(ecolService) {
        this.ecolService = ecolService;
        this.model = {};
    }
    DemandshistoryComponent.prototype.ngOnInit = function () { };
    DemandshistoryComponent.prototype.Search = function (accnumber) {
        var _this = this;
        this.ecolService.loader();
        this.ecolService.getdemandshistory(accnumber.value).subscribe(function (data) {
            if (data.length > 0) {
                _this.demands = data;
                swal.fire('Successful!', 'Historical letters generated!', 'success');
            }
            else {
                _this.demands = [];
                swal.fire('Warning!', 'No demand Letter was found!', 'warning');
            }
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Error occurred letter generation!', 'error');
        });
    };
    DemandshistoryComponent.prototype.downloadFile = function (filepath) {
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, 'filename');
        }, function (error) {
            console.log(error.error);
            swal.fire('Error!', ' Cannot download  file!', 'error');
        });
    };
    DemandshistoryComponent = __decorate([
        Component({
            selector: 'app-demandshistory',
            templateUrl: './demandshistory.component.html',
            styleUrls: ['./demandshistory.component.css'],
        })
    ], DemandshistoryComponent);
    return DemandshistoryComponent;
}());
export { DemandshistoryComponent };
//# sourceMappingURL=demandshistory.component.js.map