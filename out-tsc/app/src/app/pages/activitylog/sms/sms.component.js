import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { DataService } from '../../../services/data.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
import * as introJs from 'intro.js/intro.js';
var SmsComponent = /** @class */ (function () {
    function SmsComponent(route, ecolService, dataService) {
        this.route = route;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.introJS = introJs();
        this.model = {};
        this.sms = [];
        this.teles = [];
        this.dataSms = {};
        this.account = [];
        this.charactersRemaining = 0;
        this.iscard = false;
        this.p = 1;
        //
    }
    SmsComponent.prototype.currentDate = function () {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        return day + '-' + month + '-' + year;
    };
    SmsComponent.prototype.SmsSteps = function () {
        this.introJS
            .setOptions({
            steps: [
                {
                    element: '#mobile',
                    intro: 'This is where you select the mobile phone number of the customer. The ' +
                        'numbers will be listed here',
                },
                {
                    element: '#template',
                    intro: 'Here you have to select the sms template according to the Status',
                },
                {
                    element: '#smsmessage',
                    intro: 'This is where you can view the selected message template. As well as edit the message if you feel so. ' +
                        'Keep in much that you are limited to the amount of characters that you type',
                },
                {
                    element: '#callback',
                    intro: 'Here you can put the number to which the customer can call for enquiries. You can also leave it as default',
                },
                {
                    element: '#sendsms',
                    intro: 'Pressing this button will send the message to the selected customer phone number',
                },
                {
                    element: '#historysms',
                    intro: 'Here is where the history of sent sms can be viewed in a listed format',
                },
            ],
            hidePrev: true,
            hideNext: true,
            showProgress: true,
        })
            .start();
    };
    SmsComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged!
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
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
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        this.getsms();
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
            this.iscard = true;
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
            this.iscard = true;
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoopcashaccount(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
        this.getteles(this.custnumber);
    };
    SmsComponent.prototype.getteles = function (cust) {
        var _this = this;
        this.ecolService.getallteles(cust).subscribe(function (data_teles) {
            _this.teles = data_teles.data;
        });
    };
    SmsComponent.prototype.getsms = function () {
        var _this = this;
        this.ecolService.getsms(this.custnumber).subscribe(function (data) {
            _this.sms = data;
        }, function (error) {
            console.log(error);
        });
    };
    SmsComponent.prototype.gettemplate = function (template) {
        if (template === 'LOAN') {
            // tslint:disable-next-line:max-line-length
            this.dataSms.smsMessage =
                'Dear Customer, Your loan payment is late by ' +
                    this.account.daysinarr +
                    ' days. Amount in arrears is Kes. ' +
                    Math.round(this.account.instamount) +
                    '. Please pay within seven days. ';
            this.dataSms.smsCallback = ' Enquire details on 0711049000';
        }
        else if (template === 'LOANOD') {
            this.dataSms.smsMessage =
                'Dear Customer, Your account is overdrawn by  ' +
                    this.account.currency +
                    '. ' +
                    Math.round(this.account.oustbalance) +
                    '. Please regularize within seven days.';
            this.dataSms.smsCallback = ' Enquire details on 0711049000';
        }
        else if (template === 'CC') {
            this.dataSms.smsMessage =
                'Dear Customer, Your Credit Card payment is late by ' +
                    this.account.daysinarrears +
                    ' days. The Expected amount is Kes. ' +
                    Math.round(this.account.exppmnt) +
                    '. Please pay within seven days. ';
            this.dataSms.smsCallback = ' Enquire details on 0711049000.';
        }
        else if (template === 'watch') {
            this.dataSms.smsMessage =
                'Dear Customer, Your loan payment is due on ' +
                    this.account.repaymentdate +
                    // tslint:disable-next-line:max-line-length
                    ' .Amount to be paid is ' +
                    this.account.currency +
                    ' ' +
                    Math.round(this.account.repaymentamount) +
                    '. To make deposit, visit our branch, agent or M-Pesa PayBill 400200.';
            this.dataSms.smsCallback = ' Enquire details on 0711049000.';
        }
    };
    SmsComponent.prototype.changetemplate = function ($event) {
        this.gettemplate($event.target.value);
    };
    SmsComponent.prototype.getaccount = function (account) {
        var _this = this;
        this.ecolService.getaccount(account).subscribe(function (data) {
            _this.account = data;
        });
    };
    SmsComponent.prototype.getmcoopcashaccount = function (loanaccaccount) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(loanaccaccount).subscribe(function (data) {
            _this.account = data;
        });
    };
    SmsComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
        });
    };
    SmsComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
        });
    };
    SmsComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            console.log(data);
            _this.account = data;
        });
    };
    SmsComponent.prototype.sendsmsfunc = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.ecolService.loader();
        var body = {
            custnumber: this.custnumber,
            accnumber: this.accnumber,
            owner: this.username,
            message: form.value.smsMessage + form.value.smsCallback,
            arrears: this.account.totalarrears,
            datesent: new Date(),
            telnumber: form.value.smsNumber,
        };
        this.ecolService.postsms(body).subscribe(function (data) {
            swal.fire('Success!', 'sms sent', 'success');
            form.value.message = '';
            _this.getsms();
            _this.addActivity(body.message);
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'sms service currently not available', 'error');
        });
    };
    SmsComponent.prototype.addActivity = function (sms) {
        var _this = this;
        var body = {
            collectoraction: 'SMS',
            party: '',
            ptpamount: '',
            ptp: '',
            ptpdate: this.currentDate,
            collectornote: sms,
            reviewdate: moment(this.account.reviewdate).format('DD-MMM-YYYY'),
            reason: this.account.excuse,
            cmdstatus: this.account.cmdstatus,
            route: this.account.routetostate,
            paymode: '',
            accountnumber: this.accnumber,
            custnumber: this.custnumber,
            arramount: this.account.totalarrears || 0,
            oustamount: this.account.oustbalance || 0,
            notesrc: 'sent sms',
            noteimp: 'N',
            rfdother: '',
            owner: this.username,
            product: this.account.section,
        };
        // add action
        this.ecolService.postactivitylogs(body).subscribe(function (data) {
            _this.sendNotesData(_this.custnumber);
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'activitylog ::: service is currently not available', 'error');
        });
    };
    SmsComponent.prototype.sendNotesData = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.dataService.pustNotesData(data[0].TOTAL);
        });
    };
    SmsComponent = __decorate([
        Component({
            selector: 'app-sms',
            templateUrl: './sms.component.html',
            styleUrls: ['./sms.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            EcolService,
            DataService])
    ], SmsComponent);
    return SmsComponent;
}());
export { SmsComponent };
//# sourceMappingURL=sms.component.js.map