import { __decorate } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
var NewguarantorComponent = /** @class */ (function () {
    function NewguarantorComponent(ecolService, router) {
        this.ecolService = ecolService;
        this.router = router;
        this.model = {};
    }
    NewguarantorComponent.prototype.ngOnInit = function () { };
    NewguarantorComponent.prototype.onSubmit = function (form) {
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
        this.ecolService.submitGuarantor(body).subscribe(function (data) {
            swal.fire('Successful!', 'saved successfully!', 'success');
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Error occurred during processing!', 'error');
        });
    };
    NewguarantorComponent.prototype.cancel = function () {
        // redirect to ListComponent
        this.router.navigate(['/guarantors/list']);
    };
    NewguarantorComponent = __decorate([
        Component({
            selector: 'app-newguarantor',
            templateUrl: './newguarantor.component.html',
            styleUrls: ['./newguarantor.component.css'],
        })
    ], NewguarantorComponent);
    return NewguarantorComponent;
}());
export { NewguarantorComponent };
//# sourceMappingURL=newguarantor.component.js.map