import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import * as introJs from 'intro.js/intro.js';

var URL = environment.valor;
var GuarantorsComponent = /** @class */ (function () {
  function GuarantorsComponent(route, ecolService) {
    this.route = route;
    this.ecolService = ecolService;
    this.introJS = introJs();
    this.model = {};
    this.guarantors = [];
    this.emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
    //
  }

  GuarantorsComponent.prototype.GuarantorSteps = function () {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#existinguarantors',
            intro:
              'Here you will find a list of the existing guarantors for this account',
          },
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
      })
      .start();
  };
  GuarantorsComponent.prototype.GuarantorSteps2 = function () {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#custnumber',
            intro: 'This is the 7 digit number of the customer',
          },
          {
            element: '#accnumber',
            intro: 'This is the 14 digit number of the customer',
          },
          {
            element: '#nationid',
            intro: 'This is the Nation Identification number of the guarantor',
          },
          {
            element: '#guarantorname',
            intro: 'This is the Full names of the guarantor',
          },
          {
            element: '#address',
            intro: 'This is the postal address of the guarator',
          },
          {
            element: '#postalcode',
            intro:
              'This is the postal code of the postal address provided by the guarantor',
          },
          {
            element: '#telnumber',
            intro: 'This is the telephone number ontacts of the guarantor',
          },
          {
            element: '#email',
            intro: 'Here you enter a valid email address of the guarantor',
          },
          {
            element: '#active',
            intro: 'Her you can specify if the guarantor is active or inactive',
          },
          {
            element: '#guarantorsubmit',
            intro:
              'Pressing this button will submit your details to the server. If disabled, kindly check ' +
              'to see if you have left a field unattended',
          },
          {
            element: '#reset',
            intro:
              'This button will clear your form or reset so that you could start entering ' +
              'the information again',
          },
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
      })
      .start();
  };
  GuarantorsComponent.prototype.ngOnInit = function () {
    var _this = this;
    // check if logged in
    this.ecolService.ifLogged();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(function (queryParams) {
      _this.accnumber = queryParams.get('accnumber');
      _this.model.accnumber = queryParams.get('accnumber');
    });
    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/
    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(function (queryParams) {
      _this.custnumber = queryParams.get('custnumber');
      _this.model.custnumber = queryParams.get('custnumber');
    });
    // get guarantors history
    this.getGuarantors(this.accnumber);
  };
  GuarantorsComponent.prototype.onSubmit = function (form) {
    var _this = this;
    // check if logged in
    this.ecolService.ifLogged();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
    // Loading indictor
    this.ecolService.loader();
    //
    var body = {
      nationid: form.value.nationid,
      guarantorname: form.value.guarantorname,
      accnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      address: form.value.address,
      postalcode: form.value.postalcode,
      telnumber: form.value.telnumber,
      email: form.value.email,
      active: form.value.active,
    };
    this.ecolService.submitGuarantor(body).subscribe(
      function (data) {
        swal.fire('Successful!', 'saved successfully!', 'success');
        _this.getGuarantors(_this.accnumber);
      },
      function (error) {
        console.log(error);
        swal.fire('Error!', 'Error occurred during processing!', 'error');
      }
    );
  };
  GuarantorsComponent.prototype.getGuarantors = function (accnumber) {
    var _this = this;
    this.ecolService.guarantordetails(accnumber).subscribe(
      function (data) {
        _this.guarantors = data;
      },
      function (error) {
        console.log(error);
      }
    );
  };
  GuarantorsComponent.prototype.reset = function () {
    console.log('please!!!');
  };
  GuarantorsComponent = __decorate(
    [
      Component({
        selector: 'app-guarantors',
        templateUrl: './guarantors.component.html',
        styleUrls: ['./guarantors.component.css'],
      }),
      __metadata('design:paramtypes', [ActivatedRoute, EcolService]),
    ],
    GuarantorsComponent
  );
  return GuarantorsComponent;
})();
export { GuarantorsComponent };
//# sourceMappingURL=guarantors.component.js.map
