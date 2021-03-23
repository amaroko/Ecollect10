import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { saveAs } from 'file-saver';

var DemandhisComponent = /** @class */ (function () {
  function DemandhisComponent(ecolService) {
    this.ecolService = ecolService;
    this.model = {};
  }

  DemandhisComponent.prototype.ngOnInit = function () {};
  DemandhisComponent.prototype.Search = function (accnumber) {
    var _this = this;
    this.ecolService.loader();
    this.ecolService.getdemandshistory(accnumber.value).subscribe(
      function (data) {
        if (data.length > 0) {
          _this.demands = data;
          swal.fire('Successful!', 'Historical letters generated!', 'success');
        } else {
          _this.demands = [];
          swal.fire('Warning!', 'No demand Letter was found!', 'warning');
        }
      },
      function (error) {
        console.log(error);
        swal.fire('Error!', 'Error occurred letter generation!', 'error');
      }
    );
  };
  DemandhisComponent.prototype.downloadFile = function (filepath) {
    this.ecolService.downloadFile(filepath).subscribe(
      function (data) {
        saveAs(data, 'filename');
      },
      function (error) {
        console.log(error.error);
        swal.fire('Error!', ' Cannot download  file!', 'error');
      }
    );
  };
  DemandhisComponent = __decorate(
    [
      Component({
        selector: 'app-demandhis',
        templateUrl: './demandhis.component.html',
        styleUrls: ['./demandhis.component.css'],
      }),
      __metadata('design:paramtypes', [EcolService]),
    ],
    DemandhisComponent
  );
  return DemandhisComponent;
})();
export { DemandhisComponent };
//# sourceMappingURL=demandhis.component.js.map
