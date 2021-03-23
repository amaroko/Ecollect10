import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import * as moment from 'moment';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import * as introJs from 'intro.js/intro.js';
var PtpsComponent = /** @class */ (function () {
    //
    function PtpsComponent(route, ecolService, ngxSmartModalService, datePipe) {
        this.route = route;
        this.ecolService = ecolService;
        this.ngxSmartModalService = ngxSmartModalService;
        this.datePipe = datePipe;
        this.introJS = introJs();
        this.ptps = [];
        this.ammendptp = {};
        this.iscard = false;
        this.p = 1;
        this.currentDate = new Date();
        this.year = parseInt(moment().format('YYYY'));
        this.maxyear = parseInt(moment().add(5, 'days').format('YYYY'));
        this.minyear = parseInt(moment().subtract(5, 'days').format('YYYY'));
        this.month = parseInt(moment().format('MM'));
        this.maxmonth = parseInt(moment().add(5, 'days').format('MM'));
        this.minmonth = parseInt(moment().subtract(5, 'days').format('MM'));
        this.day = parseInt(moment().format('DD'));
        this.maxday = parseInt(moment().add(5, 'days').format('DD'));
        this.minday = parseInt(moment().subtract(5, 'days').format('DD'));
        // console.log('this.ammendptp.ptpdate', this.ammendptp.ptpdate)
        // this.minDate = { year: this.year, month: this.month, day: this.day };
        // this.maxDate = { year: this.maxyear, month: this.maxmonth, day: this.maxday };
    }
    PtpsComponent.prototype.PtpsSteps = function () {
        this.introJS
            .setOptions({
            steps: [
                {
                    element: '#ptptable',
                    intro: 'Here, you will find a list of the available Promises to Pay for this account,,
                }
            ],
            hidePrev: true,
            hideNext: true,
            showProgress: tru,
        })
            .start();
    };
    PtpsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        this.getptps();
    };
    PtpsComponent.prototype.getptps = function () {
        var _this = this;
        this.ecolService.getptps(this.accnumber).subscribe(function (data) {
            _this.ptps = data;
            for (var i = 0; i < data.length; i++) {
                // if ((this.datePipe.transform(this.currentDate, 'dd-MMM-yy')).toUpperCase() <= (this.ptps[i].PTPDATE).toUpperCase()) {
                _this.ptps[i].showedit = _this.ptps[i].ammended !== 'y';
            }
        }, function (error) {
            console.log(error);
        });
    };
    PtpsComponent.prototype.openModal = function (id) {
        var _this = this;
        this.ammendptp.id = id;
        // get this ptp
        this.ecolService.getthisptp(id).subscribe(function (data) {
            _this.ammendptp.ptpamount = data.ptpamount;
            _this.ammendptp.ptpdate = data.ptpdate;
            _this.ammendptp.accnumber = data.accnumber;
            _this.ammendptp.owner = data.owner;
            // open modal
            _this.ngxSmartModalService.getModal('myModal').open();
            // console.log('diff', moment().diff(this.ammendptp.ptpdate, 'days') + 5)
            _this.year = parseInt(moment(_this.ammendptp.ptpdate).format('YYYY'));
            _this.maxyear = parseInt(moment(_this.ammendptp.ptpdate).add(5, 'days').format('YYYY'));
            _this.minyear = parseInt(moment(_this.ammendptp.ptpdate).subtract(5, 'days').format('YYYY'));
            _this.month = parseInt(moment(_this.ammendptp.ptpdate).format('MM'));
            _this.maxmonth = parseInt(moment(_this.ammendptp.ptpdate).add(5, 'days').format('MM'));
            _this.minmonth = parseInt(moment(_this.ammendptp.ptpdate).subtract(5, 'days').format('MM'));
            _this.day = parseInt(moment(_this.ammendptp.ptpdate).format('DD'));
            _this.maxday = parseInt(moment(_this.ammendptp.ptpdate).add(5, 'days').format('DD'));
            _this.minday = parseInt(moment(_this.ammendptp.ptpdate).subtract(5, 'days').format('DD'));
            _this.maxDate = {
                year: _this.maxyear,
                month: _this.maxmonth,
                day: _this.maxday
            };
            // min should not be less than today
            if (moment().diff(_this.ammendptp.ptpdate, 'days') + 5 >= 0) {
                // console.log(true);
                _this.year = parseInt(moment().format('YYYY'));
                _this.month = parseInt(moment().format('MM'));
                _this.day = parseInt(moment().format('DD'));
                _this.minDate = { year: _this.year, month: _this.month, day: _this.day };
            }
            else {
                _this.minDate = {
                    year: _this.minyear,
                    month: _this.minmonth,
                    day: _this.minday
                };
            }
        }, function (error) {
            console.log(error);
        });
    };
    PtpsComponent.prototype.ammendfunc = function (form) {
        var _this = this;
        //
        swal
            .fire({
            title: 'ammend ptp',
            imageUrl: 'assets/img/user/coop.jpg',
            text: 'Sure to proceed?',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes ammend!'
        })
            .then(function (result) {
            if (result.value) {
                // update
                var yr = form.value.ptpdate.year.toString();
                var mn = form.value.ptpdate.month.toString();
                var day = form.value.ptpdate.day.toString();
                var ptpdate = moment(yr + mn + day, 'YYYYMMDD')
                    .format('DD-MMM-YYYY')
                    .toUpperCase();
                var ptpdate2 = moment(yr + mn + day, 'YYYYMMDD').format('YYYY-MM-DD');
                form.value.ptpdate = ptpdate;
                var body = {
                    id: _this.ammendptp.id,
                    ptpamount: form.value.ptpamount,
                    ptpdate: ptpdate,
                    ptpdate2: ptpdate2,
                    ammendby: _this.username,
                    ammendcomment: form.value.comment
                };
                _this.ecolService.ammendptp(body).subscribe(function (resp) {
                    //
                    swal.fire('GOOD!', 'ALL Good! PTP Has Been Ammended', 'success');
                    _this.ngxSmartModalService.close('myModal');
                }, function (error) {
                    console.log(error);
                    swal.fire('Error!', 'ptpammend :: service is currently not available', 'error');
                    _this.ngxSmartModalService.close('myModal');
                });
            }
            else {
                // reset
                return;
            }
        });
    };
    PtpsComponent = __decorate([
        Component({
            selector: 'app-ptps',
            templateUrl: './ptps.component.html',
            styleUrls: ['./ptps.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            EcolService,
            NgxSmartModalService,
            DatePipe])
    ], PtpsComponent);
    return PtpsComponent;
}());
export { PtpsComponent };
//# sourceMappingURL=ptps.component.js.map