import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import * as introJs from 'intro.js/intro.js';
import { DataService } from '../../../services/data.service';

var URL = environment.valor;
var CollateralsComponent = /** @class */ (function () {
  //
  function CollateralsComponent(route, ecolService, dataService) {
    this.route = route;
    this.ecolService = ecolService;
    this.dataService = dataService;
    this.introJS = introJs();
    this.model = {};
    this.collaterals = [];
    this.edit = false;
    //
  }

  CollateralsComponent.prototype.CollateralsSteps = function () {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#collateraltable',
            intro:
              'Here you will find a list of all collaterals placed under the specified account ' +
              'you could then edit the collaterals if need be',
          },
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
      })
      .start();
  };
  CollateralsComponent.prototype.CollateralsSteps2 = function () {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#custnumber',
            intro: 'This is the 7 digit customer number. You can only view it',
          },
          {
            element: '#accnumber',
            intro:
              'This is the 14 digit number of the customer. You can only view it',
          },
          {
            element: '#collateralname',
            intro:
              'Here, you have to provide the Name of the Collateral that you are about to add',
          },
          {
            element: '#regowner',
            intro:
              'Here, you have to enter the details of the registered owners of the collateral ' +
              'at hand',
          },
          {
            element: '#forcedsale',
            intro:
              'This is the value that the bank has decided to place on the collateral',
          },
          {
            element: '#marketvalue',
            intro: 'This is the Marked Market value of the collateral',
          },
          {
            element: '#insurancevalue',
            intro: 'This is the specified insurance value of the collateral',
          },
          {
            element: '#valuationdate',
            intro: 'This is the date on which the collaterals was valued',
          },
          {
            element: '#tenure',
            intro: 'This is the tenure of the collateral',
          },
          {
            element: '#valuer',
            intro:
              'This is the details of the valuer who valuated the collateral at hand',
          },
          {
            element: '#collateralsubmit',
            intro:
              'Pressing this button will submit your information to the server. If disabled, please check ' +
              'to see if there is a field you left out',
          },
          {
            element: '#collateralreset',
            intro:
              'Pressing this button will reset your form to empty,so that you may start filling the ' +
              'information again',
          },
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
      })
      .start();
  };
  CollateralsComponent.prototype.ngOnInit = function () {
    var _this = this;
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(function (queryParams) {
      _this.accnumber = queryParams.get('accnumber');
      _this.model.accnumber = queryParams.get('accnumber');
    });
    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(function (queryParams) {
      _this.username = queryParams.get('username');
    });
    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(function (queryParams) {
      _this.custnumber = queryParams.get('custnumber');
      _this.model.custnumber = queryParams.get('custnumber');
    });
    // get collateral history
    this.getCollateral(this.custnumber);
    this.sendCollateralData(this.custnumber);
  };
  CollateralsComponent.prototype.onSubmit = function (form) {
    var _this = this;
    // Loading indictor
    this.ecolService.loader();
    //
    var body = {
      regowner: form.value.regowner,
      collateralname: form.value.collateralname,
      accnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      colofficer: this.username,
      forcedsale: form.value.forcedsale,
      insurancevalue: form.value.insurancevalue,
      marketvalue: form.value.marketvalue,
      tenure: form.value.tenure,
      valuationdate: form.value.valuationdate,
      valuer: form.value.valuer,
    };
    console.log(body);
    this.ecolService.submitCollateral(body).subscribe(
      function (data) {
        _this.sendCollateralData(_this.custnumber);
        swal.fire('Successful!', 'saved successfully!', 'success');
        _this.getCollateral(_this.custnumber);
      },
      function (error) {
        console.log(error);
        swal.fire('Error!', 'Error occurred during processing!', 'error');
      }
    );
  };
  CollateralsComponent.prototype.getCollateral = function (custnumber) {
    var _this = this;
    this.ecolService.retrieveCollateral(custnumber).subscribe(
      function (data) {
        _this.collaterals = data;
      },
      function (error) {
        console.log(error);
      }
    );
  };
  CollateralsComponent.prototype.sendCollateralData = function (custnumber) {
    var _this = this;
    this.ecolService.totalcollaterals(custnumber).subscribe(function (data) {
      _this.dataService.pushCollateral(data[0].TOTAL);
    });
  };
  CollateralsComponent.prototype.reset = function () {
    this.model.regowner = '';
    this.model.collateralname = '';
    this.model.forcedsale = '';
    this.model.insurancevalue = '';
    this.model.marketvalue = '';
    this.model.tenure = '';
    this.model.valuationdate = '';
    this.model.valuer = '';
  };
  CollateralsComponent.prototype.cancel = function () {
    this.edit = false;
    this.reset();
  };
  CollateralsComponent.prototype.updatecollateral = function (form) {
    var _this = this;
    // save to db
    this.ecolService.updateCollateral(this.model.id, form).subscribe(
      function (response) {
        swal.fire('Good!', 'Collateral updated!', 'success');
        _this.getCollateral(_this.custnumber);
      },
      function (error) {
        console.log(error);
        swal.fire('Ooops!', 'Contact Not updated!', 'error');
      }
    );
  };
  CollateralsComponent.prototype.editcollateral = function (collateral) {
    this.model.id = collateral.id;
    this.model.regowner = collateral.regowner;
    this.model.collateralname = collateral.collateralname;
    this.model.accnumber = collateral.accnumber;
    this.model.custnumber = collateral.custnumber;
    this.model.forcedsale = collateral.forcedsale;
    this.model.insurancevalue = collateral.insurancevalue;
    this.model.marketvalue = collateral.marketvalue;
    this.model.tenure = collateral.tenure;
    this.model.valuationdate = collateral.valuationdate;
    this.model.valuer = collateral.valuer;
    //
    this.edit = true;
  };
  CollateralsComponent = __decorate(
    [
      Component({
        selector: 'app-collaterals',
        templateUrl: './collaterals.component.html',
        styleUrls: ['./collaterals.component.css'],
      }),
      __metadata('design:paramtypes', [
        ActivatedRoute,
        EcolService,
        DataService,
      ]),
    ],
    CollateralsComponent
  );
  return CollateralsComponent;
})();
export { CollateralsComponent };
//# sourceMappingURL=collaterals.component.js.map
