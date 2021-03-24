import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
var AccplanComponent = /** @class */ (function () {
    function AccplanComponent(route, ecolService) {
        this.route = route;
        this.ecolService = ecolService;
        this.currentplan = [];
        this.allplans = [];
        this.model = {};
        this.update = false;
        //
    }
    AccplanComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        /*this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(queryParams => {
          this.username = queryParams.get('username');
        });*/
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        this.getallplans();
        this.planexists(this.accnumber);
    };
    AccplanComponent.prototype.openaccplan = function () {
        // tslint:disable-next-line:max-line-length
        window.open(environment.accplanlink +
            '/?accnumber=' +
            this.accnumber +
            '&custnumber=' +
            this.custnumber +
            '&username=' +
            this.username +
            '&nationid=00', '_blank');
    };
    AccplanComponent.prototype.getallplans = function () {
        var _this = this;
        this.ecolService.tbl_s_plans().subscribe(function (data) {
            _this.allplans = data;
        });
    };
    AccplanComponent.prototype.planexists = function (accnumber) {
        var _this = this;
        this.ecolService.s_check_account_plans(accnumber).subscribe(function (data) {
            // check if there if a plan
            if (data && data.length) {
                _this.changeAction(data[0].planid);
                _this.model.plan = data[0].planid;
            }
        }, function (error) {
            console.log(error);
        });
    };
    AccplanComponent.prototype.changeAction = function (planid) {
        // build planactions
        var _this = this;
        if (planid) {
            this.currentplan = [];
            // retrieve plan actions
            this.ecolService.s_plan_actions(planid).subscribe(function (resp) {
                // console.log(resp);
                // tbl_s_account_plans
                _this.ecolService.s_account_plans(_this.accnumber, planid).subscribe(function (data) {
                    // console.log('tbl_s_account_plans', data);
                    if (data && data.length > 0) {
                        _this.update = true;
                        for (var i = 0; i < data.length; i++) {
                            var body = {
                                id: data[i].id,
                                accnumber: _this.accnumber,
                                planid: planid,
                                actionid: data[i].actionid,
                                actiontitle: data[i].actiontitle,
                                completed: data[i].completed.toLowerCase() === 'true',
                                updateby: data[i].updateby,
                                datecompleted: new Date(data[i].datecompleted),
                            };
                            _this.currentplan.push(body);
                        }
                    }
                    else {
                        for (var i = 0; i < resp.length; i++) {
                            var body = {
                                accnumber: _this.accnumber,
                                planid: planid,
                                actionid: resp[i].actionid,
                                actiontitle: resp[i].actiontitle,
                                completed: false,
                                updateby: '',
                                datecompleted: '',
                            };
                            _this.currentplan.push(body);
                        }
                    }
                }, function (error) {
                    console.log(error);
                });
                // console.log(this.currentplan);
            }, function (error) {
                console.log(error);
            });
        }
        else {
            this.currentplan = [];
        }
    };
    AccplanComponent.prototype.saveplan = function () {
        var _this = this;
        swal
            .fire({
            title: 'Are you sure?',
            text: 'You want to save plan!',
            // type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save!',
        })
            .then(function (result) {
            if (result.value) {
                for (var i = 0; i < _this.currentplan.length; i++) {
                    _this.currentplan[i].datecompleted = moment(_this.currentplan[i].datecompleted).format('YYYY-MM-DD');
                    _this.currentplan[i].updateby = _this.username;
                }
                if (_this.update) {
                    // updating
                    // console.log('this.currentplan', this.currentplan);
                    var acc = {
                        accnumber: _this.currentplan[0].accnumber,
                        planid: _this.currentplan[0].planid,
                        dateupdated: moment(new Date()).format('YYYY-MM-DD'),
                        updateby: _this.username,
                    };
                    for (var i = 0; i < _this.currentplan.length; i++) {
                        _this.ecolService.putaccountplan(_this.currentplan[i]).subscribe(function (data) { }, function (error) {
                            console.log(error);
                        });
                    }
                    _this.update_s_accounts(acc);
                    _this.changeAction(_this.currentplan[0].planid);
                    alert('plan updated!');
                }
                else {
                    // adding new
                    // console.log('this.currentplan', this.currentplan);
                    // console.log(acc);
                    _this.ecolService.saveaccountplan(_this.currentplan).subscribe(function (data) {
                        alert('plan saved');
                        console.log(data);
                        _this.changeAction(_this.currentplan[0].planid);
                        //
                        var acc = {
                            accnumber: _this.accnumber,
                            planid: data[0].planid,
                            dateupdated: moment(new Date()).format('YYYY-MM-DD'),
                            updateby: _this.username,
                        };
                        _this.update_s_accounts(acc);
                    }, function (error) {
                        console.log(error);
                    });
                }
            }
        });
    };
    // update tbl_s_accounts
    AccplanComponent.prototype.update_s_accounts = function (body) {
        this.ecolService.put_s_accounts(body).subscribe(function (data) {
            // console.log(data);
        }, function (error) {
            console.log('put_s_accounts error', error);
        });
    };
    AccplanComponent = __decorate([
        Component({
            selector: 'app-accplan',
            templateUrl: './accplan.component.html',
            styleUrls: ['./accplan.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute, EcolService])
    ], AccplanComponent);
    return AccplanComponent;
}());
export { AccplanComponent };
//# sourceMappingURL=accplan.component.js.map