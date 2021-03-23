import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { NgxSpinnerService } from 'ngx-spinner';

var AccplansComponent = /** @class */ (function () {
  function AccplansComponent(ecolService, spinner) {
    this.ecolService = ecolService;
    this.spinner = spinner;
    this.model = {};
    this.planactions = [];
    this.actions = [];
    this.edit = false;
    this.items = [];
    this.p = 0;
  }

  AccplansComponent.prototype.ngOnInit = function () {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.getallplans();
    this.getallactions();
  };
  AccplansComponent.prototype.setradio = function (e) {
    this.spinner.show();
    this.selected_plan = e.plantitle;
    this.getplanactions(e.planid);
    this.model.plan = e.planid;
    console.log(e);
  };
  AccplansComponent.prototype.getplanactions = function (planid) {
    var _this = this;
    this.ecolService.getplanactions(planid).subscribe(
      function (resp) {
        _this.planactions = resp;
        console.log(resp);
        _this.spinner.hide();
      },
      function (error) {
        _this.spinner.hide();
        alert('error!');
        console.log(error);
      }
    );
  };
  AccplansComponent.prototype.getallplans = function () {
    var _this = this;
    this.ecolService.all_s_plans().subscribe(
      function (response) {
        _this.items = response;
      },
      function (error) {
        console.log(error);
      }
    );
  };
  AccplansComponent.prototype.getid = function () {
    var possible =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var lengthOfCode = 7;
    this.model.planid = this.makeRandom(lengthOfCode, possible);
  };
  AccplansComponent.prototype.makeRandom = function (lengthOfCode, possible) {
    var text = '';
    for (var i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };
  AccplansComponent.prototype.getallactions = function () {
    var _this = this;
    this.ecolService.s_actions().subscribe(
      function (response) {
        _this.actions = response;
      },
      function (error) {
        console.log(error);
      }
    );
  };
  AccplansComponent.prototype.newplan = function (form) {
    var _this = this;
    // Loading indictor
    this.spinner.show();
    this.getid();
    //
    var body = {
      planid: this.model.planid,
      plantitle: form.plantitle,
      owner: this.username,
    };
    // check letter duplicate
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to add!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add!',
      })
      .then(function (result) {
        if (result.value) {
          _this.ecolService.loader();
          _this.ecolService.post_s_plan(body).subscribe(
            function (Response) {
              swal.fire('Successful!', 'plan added!', 'success');
              _this.getallplans();
              _this.spinner.hide();
            },
            function (error) {
              console.log(error);
              _this.spinner.hide();
              swal.fire('Error!', 'Error adding plan!', 'error');
            }
          );
        }
      });
  };
  AccplansComponent.prototype.addactionSubmit = function (form) {
    var _this = this;
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to add!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add!',
      })
      .then(function (result) {
        if (result.value) {
          // get action
          console.log(form);
          _this.ecolService.getanaction(form.planaction).subscribe(
            function (data) {
              // console.log(data);
              var body = {
                actionid: form.planaction,
                planid: form.plans,
                updateby: _this.username,
                actiontitle: data.actiontitle,
              };
              console.log(body);
              // post to tbl_s_plan_actions
              _this.ecolService.post_s_plan_actions(body).subscribe(
                function (resp) {
                  console.log(resp);
                  // refresh plan action lists
                  _this.getplanactions(body.planid);
                  swal.fire('Good!', 'Plan action added!', 'success');
                },
                function (error) {
                  alert('');
                  swal.fire('Ooops!', ':1 error saving plan action', 'error');
                }
              );
            },
            function (error) {
              console.log(error);
              alert('error saving plan action');
            }
          );
        }
      });
  };
  AccplansComponent.prototype.deleteaction = function (form) {
    var _this = this;
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
          // check if logged in
          // console.log(form);
          _this.ecolService.ifLogged();
          var currentUser = JSON.parse(localStorage.getItem('currentUser'));
          _this.username = currentUser.USERNAME;
          // save to db
          _this.ecolService.delete_s_plan_actions(form.id).subscribe(
            function (response) {
              // console.log(response); {count: 1}
              swal.fire('Good!', 'Plan action deleted!', 'success');
              _this.getplanactions(form.plan);
            },
            function (error) {
              console.log(error);
              swal.fire('Ooops!', 'Plan action Not deleted!', 'error');
            }
          );
        }
      });
  };
  AccplansComponent.prototype.editaction = function (form) {
    // check if logged in
    // console.log(form);
    this.ecolService.ifLogged();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.model.plan = form.planid;
    this.model.actionid = form.actionid;
    this.model.planaction = form.actiontitle;
    this.model.id = form.id;
    //
    this.edit = true;
  };
  AccplansComponent.prototype.cancel = function () {
    this.edit = false;
    // this.model = {};
    // this.getid();
  };
  AccplansComponent = __decorate(
    [
      Component({
        selector: 'app-accplans',
        templateUrl: './accplans.component.html',
        styleUrls: ['./accplans.component.css'],
      }),
      __metadata('design:paramtypes', [EcolService, NgxSpinnerService]),
    ],
    AccplansComponent
  );
  return AccplansComponent;
})();
export { AccplansComponent };
//# sourceMappingURL=accplans.component.js.map
