import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { EcolService } from 'app/services/ecol.service';

var EditguarantorComponent = /** @class */ (function () {
  function EditguarantorComponent(ecolService, router, activeRoute) {
    this.ecolService = ecolService;
    this.router = router;
    this.activeRoute = activeRoute;
    this.model = {
      custnumber: null,
    };
  }

  EditguarantorComponent.prototype.ngOnInit = function () {
    // do something with the parameters
    this.getguarantor(this.activeRoute.snapshot.params.id);
  };
  EditguarantorComponent.prototype.onSubmit = function (form) {
    // console.log(form.value);
    // Loading indictor
    this.ecolService.loader();
    //
    var body = {
      nationid: form.value.nationid,
      guarantorname: form.value.guarantorname,
      accnumber: form.value.accnumber,
      custnumber: form.value.custnumber,
      address: form.value.address,
      postalcode: form.value.postalcode,
      telnumber: form.value.telnumber,
      email: form.value.email,
      active: form.value.active,
    };
    this.ecolService
      .updateGuarantor(this.activeRoute.snapshot.params.id, body)
      .subscribe(
        function (data) {
          swal.fire('Successful!', 'saved successfully!', 'success');
        },
        function (error) {
          console.log(error);
          swal.fire('Error!', 'Error occurred during processing!', 'error');
        }
      );
  };
  EditguarantorComponent.prototype.getguarantor = function (id) {
    var _this = this;
    this.ecolService.retrieve_a_Guarantor(id).subscribe(
      function (data) {
        _this.model = data[0];
      },
      function (error) {
        console.log(error);
      }
    );
  };
  EditguarantorComponent.prototype.cancel = function () {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/list']);
  };
  EditguarantorComponent = __decorate(
    [
      Component({
        selector: 'app-editguarantor',
        templateUrl: './editguarantor.component.html',
        styleUrls: ['./editguarantor.component.css'],
      }),
      __metadata('design:paramtypes', [EcolService, Router, ActivatedRoute]),
    ],
    EditguarantorComponent
  );
  return EditguarantorComponent;
})();
export { EditguarantorComponent };
//# sourceMappingURL=editguarantor.component.js.map
