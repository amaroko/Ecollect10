import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import { EcolService } from '../../../services/ecol.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

var SettingsComponent = /** @class */ (function () {
  function SettingsComponent(ecolService, route, spinner) {
    this.ecolService = ecolService;
    this.route = route;
    this.spinner = spinner;
    this.model = {};
    this.disable = true;
  }

  SettingsComponent.prototype.ngOnInit = function () {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
    this.getblobal();
  };
  SettingsComponent.prototype.setradio = function (e) {
    this.spinner.show();
    this.getLetter(e.toLowerCase());
    this.model.letterid = e.toLowerCase();
    this.selected_demand = e.toUpperCase();
  };
  SettingsComponent.prototype.getLetter = function (letter) {
    var _this = this;
    this.ecolService.getLetter(letter).subscribe(
      function (dletter) {
        _this.model = dletter;
        _this.model.bysms =
          dletter.bysms.toLowerCase() === 'true' ? true : false;
        _this.model.byphysical =
          dletter.byphysical.toLowerCase() === 'true' ? true : false;
        _this.model.byemail =
          dletter.byemail.toLowerCase() === 'true' ? true : false;
        _this.model.suspendsms =
          dletter.suspendsms.toLowerCase() === 'true' ? true : false;
        _this.model.suspendletter =
          dletter.suspendletter.toLowerCase() === 'true' ? true : false;
        _this.model.suspendautodelivery =
          dletter.suspendautodelivery.toLowerCase() === 'true' ? true : false;
        _this.spinner.hide();
      },
      function (error) {
        _this.spinner.hide();
        alert('error!');
        console.log(error);
      }
    );
  };
  SettingsComponent.prototype.globalSubmit = function (form) {
    this.ecolService.loader();
    this.ecolService.global(this.model).subscribe(
      function (response) {
        swal.fire('Success!', 'Settngs saved!', 'success');
      },
      function (error) {
        console.log(error);
        swal.fire('Error!', 'Error occured!', 'error');
      }
    );
  };
  SettingsComponent.prototype.getblobal = function () {
    this.ecolService.getglobal().subscribe(
      function (response) {
        console.log(response);
        // this.model = response[0];
      },
      function (error) {
        console.log(error);
      }
    );
  };
  SettingsComponent.prototype.onSubmit = function (form) {
    var _this = this;
    // Loading indictor
    this.spinner.show();
    //
    var body = {
      letterid: this.model.letterid,
      smstemplate: this.model.smstemplate,
      suspendletter: this.model.suspendletter,
      templatepath: this.model.templatepath || '0',
      autodelivered: this.model.autodelivered,
      suspendautodelivery: this.model.suspendautodelivery,
      suspendsms: this.model.suspendsms,
      datelastupdated: new Date(),
      updatedby: this.username,
      byemail: this.model.byemail,
      bysms: this.model.bysms,
      byphysical: this.model.byphysical,
    };
    // check letter duplicate
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to update!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, update!',
      })
      .then(function (result) {
        if (result.value) {
          _this.ecolService.loader();
          _this.ecolService.putLetter(body).subscribe(
            function (Response) {
              swal.fire('Successful!', 'letter updated!', 'success');
              _this.spinner.hide();
            },
            function (error) {
              console.log(error);
              _this.spinner.hide();
              swal.fire('Error!', 'Error updating letter!', 'error');
            }
          );
        }
      });
  };
  SettingsComponent.prototype.delete = function () {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to DELETE!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!',
      })
      .then(function (result) {
        if (result.value) {
          //
        }
      });
  };
  SettingsComponent = __decorate(
    [
      Component({
        selector: 'app-settings',
        templateUrl: './settings.component.html',
        styleUrls: ['./settings.component.css'],
      }),
      __metadata('design:paramtypes', [
        EcolService,
        ActivatedRoute,
        NgxSpinnerService,
      ]),
    ],
    SettingsComponent
  );
  return SettingsComponent;
})();
export { SettingsComponent };
//# sourceMappingURL=settings.component.js.map
