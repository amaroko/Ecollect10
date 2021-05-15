import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { Validators } from '@angular/forms';
import * as moment from 'moment';
import { environment } from '../../../../environments/environment';
import { NgbDateAdapter, NgbDateNativeAdapter, } from '@ng-bootstrap/ng-bootstrap';
var ActivityactionComponent = /** @class */ (function () {
    function ActivityactionComponent(el, route, formBuilder, ecolService, dataService, ngxSmartModalService) {
        this.el = el;
        this.route = route;
        this.formBuilder = formBuilder;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.ngxSmartModalService = ngxSmartModalService;
        // introJS = introJs();
        this.bsValue = new Date();
        this.expand = false;
        this.year = parseInt(moment().format('YYYY'));
        this.month = parseInt(moment().format('MM'));
        this.day = parseInt(moment().format('DD'));
        this.model = {};
        this.bodyletter = {};
        this.savebody = {};
        this.submitted = false;
        this.cmdstatus = [];
        this.party = [];
        this.cure = [];
        this.excuse = [];
        this.capture = true;
        this.ptps = [];
        this.static = [];
        this.ptp_m = {};
        this.ptpmultiple = {};
        this.en_ptp = {};
        this.edit = false;
        this.isptptosave = false;
        this.p = 1;
        this.ptpid = 0;
        this.collectoraction = [
            { collectoractionid: 'OC', collectoraction: 'OUTGOING CALL' },
            { collectoractionid: 'IC', collectoraction: 'INCOMING CALL' },
            { collectoractionid: 'MET', collectoraction: 'DEBTOR VISITED' },
            { collectoractionid: 'REVW', collectoraction: 'ACCOUNT REVIEW' },
            { collectoractionid: 'EMPVISIT', collectoraction: 'EMPLOYER VISIT' },
            { collectoractionid: 'SC', collectoraction: 'SENT CORRESPONDENCE' },
            { collectoractionid: 'RC', collectoraction: 'RECEIVED CORRESPONDENCE' },
            { collectoractionid: 'RR', collectoraction: 'ROUTE FOR REVIEW' },
            { collectoractionid: 'OA', collectoraction: 'ASSIGN OUTSIDE AGENCY' },
            { collectoractionid: 'RF', collectoraction: 'RECEIVED FILE' },
            { collectoractionid: 'FT', collectoraction: 'FUND TRANSFER' },
            { collectoractionid: 'NFA', collectoraction: 'NEW FILE ALLOCATION' },
        ];
        this.reviewers = [];
        this.account = [];
        this.sys = 'collections';
        this.ptp = [
            { id: 'No', name: 'No' },
            { id: 'Yes', name: 'Yes' },
        ];
        // ... subReason: any = {};
        this.subReason = [];
        this.mainReason = [];
        this.models = [];
        this.loader = false;
        this.minDate = { year: this.year, month: this.month, day: this.day };
        this.minxDate = new Date();
        this.minxDate.setDate(this.minxDate.getDate() - 1);
    }
    Object.defineProperty(ActivityactionComponent.prototype, "f", {
        // convenience getter for easy access to form fields
        get: function () {
            return this.actionForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    ActivityactionComponent.prototype.currentDate = function () {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        return day + '-' + month + '-' + year;
    };
    // CollectoractionSteps(): void {
    //   this.introJS
    //     .setOptions({
    //       steps: [
    //         {
    //           element: '#collectoraction',
    //           intro: 'Here you are to select the action that you want to do. Keep in mind that ' +
    //             'fields will show according to the selected option'
    //         },
    //         {
    //           element: '#reason',
    //           intro: 'This is a mandatory field. This means that you cannot submit the form without saying ' +
    //             'the reason why the customer defaulted'
    //         },
    //         {
    //           element: '#cmdstatus',
    //           intro: 'This is the collections status of the account'
    //         },
    //         {
    //           element: '#route',
    //           intro: 'This enables you to escalate an account to your superior. The names of available supervisors ' +
    //             'are listed. The supervisor will then have the account on their queue'
    //         },
    //         {
    //           element: '#review',
    //           intro: 'This is the date of your next review of the account in action'
    //         },
    //         {
    //           element: '#collectornote',
    //           intro: 'This is where you write down the comment or note about the account. This ' +
    //             'information will show up in the notes history'
    //         },
    //         {
    //           element: '#flag',
    //           intro: 'Here you are able to mark the comment as important. This is important especially when you ' +
    //             'come back to review the account'
    //         },
    //         {
    //           element: '#submit',
    //           intro: 'This button will submit all the recorded information to the server'
    //         },
    //         {
    //           element: '#reset',
    //           intro: 'This button will clear your form. This is vital especially when you have made an error ' +
    //             'and want to begin again'
    //         }
    //       ],
    //       hidePrev: true,
    //       hideNext: true,
    //       showProgress: true
    //     })
    //     .start();
    // }
    ActivityactionComponent.prototype.ngOnInit = function () {
        // check if logged!
        var _this = this;
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.loader = true;
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
        this.ptpid = this.route.snapshot.queryParamMap.get('ptpid');
        // build form
        this.buildForm();
        //
        this.getcmdstatus();
        this.getreviewers();
        this.getparty();
        // this.getcollectoraction();
        // gets the MAin Reason
        this.getexcuse();
        // gets the main reason
        this.ecolService.getexcuse().subscribe(function (data) { return (_this.mainReason = data); });
        //
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoop(this.accnumber);
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
    };
    ActivityactionComponent.prototype.onChangeExcuse = function (excuseid) {
        var _this = this;
        if (JSON.stringify(excuseid.reason)) {
            this.ecolService
                .getExcuseDetails(JSON.stringify(excuseid.reason[0].id))
                .subscribe(function (data) {
                _this.subReason = data;
                console.log(data);
            });
        }
        else {
            this.subReason = null;
        }
    };
    ActivityactionComponent.prototype.getaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            _this.account = data[0];
            // tslint:disable-next-line:max-line-length
            _this.autodial_telnumber =
                _this.account.cellnumber ||
                    _this.account.mobile ||
                    _this.account.phonenumber ||
                    _this.account.telnumber ||
                    _this.account.celnumber;
            _this.model.emailaddress = data[0].emailaddress;
            _this.getstatic(_this.accnumber);
        });
    };
    ActivityactionComponent.prototype.getstatic = function (accnumber) {
        var _this = this;
        this.ecolService.getStaticLoans(accnumber).subscribe(function (data) {
            if (data && data.length > 0) {
                _this.account.reviewdate = data[0].reviewdate;
                _this.account.excuse = data[0].excuse;
                _this.account.cmdstatus = data[0].cmdstatus;
                _this.account.routetostate = data[0].routetostate;
                _this.account.excuse_other = data[0].excuse_other;
            }
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.loader = false;
        });
    };
    ActivityactionComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.account = data;
            if (data.watch) {
                (_this.account.reviewdate = data.watch.reviewdate || ''),
                    (_this.account.excuse = data.watch.excuse || ''),
                    (_this.account.cmdstatus = data.watch.cmdstatus || ''),
                    (_this.account.routetostate =
                        data.watch.routetostate || 'ACTIVE COLLECTIONS'),
                    (_this.account.excuse_other = data.watch.rfdother);
            }
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.loader = false;
        });
    };
    ActivityactionComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            _this.getwatchcardstatic(cardacct);
        });
    };
    ActivityactionComponent.prototype.getwatchcardstatic = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardStatic(cardacct).subscribe(function (data) {
            if (data && data.length > 0) {
                _this.account.reviewdate = data[0].reviewdate;
                _this.account.excuse = data[0].excuse;
                _this.account.cmdstatus = data[0].cmdstatus;
                _this.account.routetostate = data[0].routetostate;
                _this.account.excuse_other = data[0].rfdother;
            }
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.loader = false;
        });
    };
    ActivityactionComponent.prototype.panelExpand = function () {
        this.expand = !this.expand;
    };
    ActivityactionComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            // build form
            _this.buildForm();
            if (swal.isVisible) {
                swal.close();
            }
            _this.loader = false;
        });
    };
    ActivityactionComponent.prototype.getmcoop = function (loanaccnumber) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityactionComponent.prototype.getcmdstatus = function () {
        var _this = this;
        this.ecolService.getcmdstatus().subscribe(function (cmdstatus) {
            _this.cmdstatus = cmdstatus;
        });
    };
    ActivityactionComponent.prototype.getreviewers = function () {
        var _this = this;
        this.ecolService.getreviewers().subscribe(function (data) {
            _this.reviewers = data;
        });
    };
    ActivityactionComponent.prototype.getparty = function () {
        var _this = this;
        this.ecolService.getparty().subscribe(function (party) {
            _this.party = party;
        });
    };
    ActivityactionComponent.prototype.getcollectoraction = function () {
        var _this = this;
        this.ecolService.getcollectoraction().subscribe(function (collectoraction) {
            _this.collectoraction = collectoraction;
        });
    };
    ActivityactionComponent.prototype.getexcuse = function () {
        var _this = this;
        this.ecolService.getexcuse().subscribe(function (data) {
            _this.excuse = data;
            _this.mappedexcuse = Array.from(new Set(_this.excuse.map(function (_a) {
                var EXCUSE = _a.EXCUSE;
                return EXCUSE;
            })));
            _this.mappedid = Array.from(new Set(_this.excuse.map(function (_a) {
                var ID = _a.ID;
                return ID;
            })));
            _this.mappedexcusedetails = Array.from(new Set(_this.excuse.map(function (_a) {
                var EXCUSEDETAILS = _a.EXCUSEDETAILS;
                return EXCUSEDETAILS;
            })));
            console.log(_this.mappedexcuse);
            console.log(_this.excuse);
            console.log(_this.mappedexcusedetails);
        });
    };
    ActivityactionComponent.prototype.getcure = function () {
        var _this = this;
        this.ecolService.getcure().subscribe(function (cure) {
            _this.cure = cure;
        });
    };
    ActivityactionComponent.prototype.buildForm = function () {
        // get static data..
        this.actionForm = this.formBuilder.group({
            collectoraction: ['', Validators.required],
            party: [{ value: null, disabled: true }, [Validators.required]],
            ptpamount: [{ value: 0, disabled: true }],
            ptpemail: [{ value: '', disabled: true }],
            toemail: [{ value: this.model.emailaddress, disabled: true }],
            ptpsms: [{ value: '', disabled: true }],
            ptpsmsnumber: [{ value: this.autodial_telnumber, disabled: true }],
            ptp: [{ value: null, disabled: true }],
            ptptype: [{ value: '', disabled: true }],
            ptpdate: [{ value: '', disabled: true }],
            collectornote: ['', [Validators.required, Validators.minLength(5)]],
            reviewdate: [''],
            reason: [null, Validators.required],
            reasondetails: [{ value: '', disabled: false }, [Validators.required]],
            cmdstatus: [null],
            flag: [false],
            route: [null],
            paymode: [{ value: null, disabled: true }],
            rfdother: [{ value: null, disabled: true }, [Validators.required]],
        });
    };
    ActivityactionComponent.prototype.onSubmit = function () {
        var _this = this;
        this.expand = false;
        this.submitted = true;
        // stop here if form is invalid
        if (this.actionForm.invalid) {
            alert('Please fill all required fields');
            return;
        }
        /*if (this.f.ptpemail.value && this.f.toemail.value == '') {
          alert('Please fill Customer email');
          return;
        }*/
        // tslint:disable-next-line:triple-equals
        if (this.f.ptpsms.value && this.f.ptpsmsnumber.value == '') {
            alert('Please fill Customer Mobile number');
            return;
        }
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        // post data
        this.ecolService.loader();
        this.savebody = {
            collectoraction: this.f.collectoraction.value,
            party: this.f.party.value[0].exd,
            ptpamount: this.f.ptpamount.value,
            ptp: this.f.ptp.value,
            ptpdate: moment(this.f.ptpdate.value).format('YYYY-MMM-DD'),
            ptpemail: this.f.ptpemail.value,
            toemail: this.f.toemail.value,
            ptpsms: this.f.ptpsms.value,
            ptpsmsnumber: this.f.ptpsmsnumber.value,
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:max-line-length + '   Reason details: ' + this.f.rfdother.value + '   Reason for default: ' + this.f.reason.value
            collectornote: this.f.collectornote.value,
            reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
            reason: this.f.reason.value[0].ex,
            reasondetails: this.f.reasondetails.value[0].exd,
            cmdstatus: this.f.cmdstatus.value,
            route: this.f.route.value,
            paymode: this.f.paymode.value,
            accountnumber: this.accnumber,
            custnumber: this.custnumber,
            arramount: this.account.totalarrears || 0,
            oustamount: this.account.oustbalance || 0,
            notesrc: 'made a note',
            noteimp: 'N',
            rfdother: this.f.rfdother.value,
            owner: this.username,
            product: this.account.section,
        };
        if (this.f.flag.value) {
            this.savebody.noteimp = 'Y';
        }
        // resolves the invalid date issue in db
        if (moment(this.f.ptpdate.value).format('DD-MMM-YYYY') === 'Invalid date') {
            this.savebody.ptpdate = '';
        }
        if (this.f.ptpemail.value) {
            // send ptp reminder email
            var ptpemailbody = {
                toemail: '',
                ccemail: this.username,
                ptpamount: 0,
                ptpdate: '',
            };
        }
        // add action
        this.ecolService.postactivitylogs(this.savebody).subscribe(function (data) {
            console.log(_this.savebody);
            _this.sendNotesData(_this.custnumber);
            _this.sendPtpsData(_this.accnumber);
            // watch stream put watch_static
            if (_this.sys === 'watchcc') {
                var watchccbody = {
                    rfdother: _this.f.rfdother.value,
                    cardacct: _this.accnumber,
                    cmdstatus: _this.f.cmdstatus.value,
                    excuse: _this.f.reason.value,
                    lastactiondate: new Date(),
                    reviewdate: moment(_this.f.reviewdate.value).format('DD-MMM-YYYY'),
                    routetostate: _this.f.route.value,
                };
                _this.ecolService.putcardwatch(watchccbody).subscribe(function (resp) {
                    //
                }, function (error) {
                    console.log(error);
                });
            }
            //
            if (_this.sys === 'watch') {
                var watchbody = {
                    rfdother: _this.f.rfdother.value,
                    accnumber: _this.accnumber,
                    cmdstatus: _this.f.cmdstatus.value,
                    excuse: _this.f.reason.value,
                    lastactiondate: new Date(),
                    reviewdate: moment(_this.f.reviewdate.value).format('DD-MMM-YYYY'),
                    routetostate: _this.f.route.value,
                };
                _this.ecolService.putwatch(watchbody).subscribe(function (resp) { }, function (error) {
                    console.log(error);
                });
            }
            if (_this.sys === 'ptp') {
                var ptpbody = {
                    id: _this.ptpid,
                    comment: _this.f.collectornote.value,
                    reviewdate: moment().format('DD-MMM-YYYY'),
                    owner: _this.username,
                };
                _this.ecolService.reviewptp(ptpbody).subscribe(function (resp) { }, function (error) {
                    console.log(error);
                });
            }
            // close windows
            _this.expand = false;
            swal
                .fire({
                title: 'Activity successfully saved',
                imageUrl: 'assets/img/user/coop.jpg',
                text: 'Close activity windows?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Close!',
            })
                .then(function (result) {
                if (result.value) {
                    // close tab
                    window.close();
                }
                else {
                    // reset
                    _this.reset();
                }
            });
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'activitylog service is currently not available', 'error');
        });
    };
    ActivityactionComponent.prototype.sendNotesData = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.dataService.pustNotesData(data[0].TOTAL);
        });
    };
    ActivityactionComponent.prototype.sendPtpsData = function (accnumber) {
        var _this = this;
        this.ecolService.getptps(accnumber).subscribe(function (data) {
            _this.dataService.pushPtps(data.length);
        });
    };
    ActivityactionComponent.prototype.changeFn = function (val) {
        console.log('Dropdown selection:', val);
    };
    ActivityactionComponent.prototype.reset = function () {
        this.loader = true;
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoop(this.accnumber);
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
    };
    ActivityactionComponent.prototype.changeAction = function (value) {
        if (value === 'OC' || value === 'IC' || value === 'MET') {
            this.actionForm.controls.party.enable();
            this.actionForm.controls.party.setValue(null);
        }
        else {
            this.actionForm.controls.party.disable();
            this.actionForm.controls.party.setValue(null);
        }
    };
    ActivityactionComponent.prototype.changeParty = function (form) {
        if (form.party[0].id === 1 ||
            form.party[0].id === 4 ||
            form.party[0].id === 5) {
            this.actionForm.controls.ptp.enable();
            // this.actionForm.controls.paymode.enable();
            // JSON.stringify(excuseid.reason[0].id)
        }
        else {
            this.actionForm.controls.ptp.disable();
            // this.actionForm.controls.paymode.disable();
            this.actionForm.controls.ptp.setValue(null);
        }
    };
    ActivityactionComponent.prototype.changeReason = function (value) {
        if (value === 'Other') {
            this.actionForm.controls.rfdother.enable();
        }
        else {
            this.actionForm.controls.rfdother.disable();
        }
    };
    ActivityactionComponent.prototype.changePtp = function (value) {
        var _this = this;
        if (value === 'Yes') {
            // check if ptp exists
            this.ecolService.activeptps(this.accnumber).subscribe(function (activedata) {
                if (activedata && activedata.data.length > 0) {
                    swal
                        .fire({
                        // type: 'error',
                        title: 'Oops...',
                        text: 'a/c already has a running promise to pay. Check under Promises to pay menu',
                    })
                        .then(function (result) {
                        _this.actionForm.controls.ptp.setValue(null);
                    });
                }
            });
            this.actionForm.controls.ptptype.enable();
            this.actionForm.controls.ptpemail.enable();
            this.actionForm.controls.toemail.enable();
            this.actionForm.controls.ptpsms.enable();
            this.actionForm.controls.ptpsmsnumber.enable();
            this.actionForm.controls.paymode.enable();
        }
        else {
            this.actionForm.controls.ptpamount.disable();
            this.actionForm.controls.paymode.disable();
            this.actionForm.controls.ptpdate.disable();
            this.actionForm.controls.ptptype.disable();
            this.actionForm.controls.ptpamount.setValue(0);
            this.actionForm.controls.ptpdate.setValue('');
            this.actionForm.controls.ptptype.setValue('');
            this.actionForm.controls.ptpemail.setValue('');
            this.actionForm.controls.ptpemail.disable();
            // this.actionForm.controls.ptpsmsnumber.setValue('');
            this.actionForm.controls.ptpsmsnumber.disable();
            this.actionForm.controls.ptpsms.setValue('');
            this.actionForm.controls.ptpsms.disable();
            // this.actionForm.controls.toemail.setValue('');
            this.actionForm.controls.toemail.disable();
        }
    };
    ActivityactionComponent.prototype.handleChange = function (ptptype) {
        if (ptptype === 'single') {
            this.capture = true;
            this.actionForm.controls.ptpamount.enable();
            this.actionForm.controls.ptpdate.enable();
        }
        else {
            // this.capture = false;
            this.actionForm.controls.ptpamount.disable();
            this.actionForm.controls.ptpdate.disable();
            this.actionForm.controls.ptpamount.setValue(0);
            this.actionForm.controls.ptpdate.setValue('');
            this.openptpModal();
        }
    };
    ActivityactionComponent.prototype.multiplecapturefnc = function () {
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink +
            '/multipleptp?accnumber=' +
            this.accnumber +
            '&custnumber=' +
            this.custnumber +
            '&username=' +
            this.username +
            '&sys=collections', '_blank');
    };
    ActivityactionComponent.prototype.openptpModal = function () {
        // open modal
        this.ngxSmartModalService.getModal('myModal').open();
    };
    ActivityactionComponent.prototype.deleteptp = function (form) {
        var index = this.ptps.indexOf(form);
        if (index !== -1) {
            this.ptps.splice(index, 1);
            if (this.ptps.length === 0) {
                this.isptptosave = false;
            }
        }
    };
    ActivityactionComponent.prototype.ptpfunc = function (form) {
        var ptpamount = form.value.ptpamount;
        var ptpdate = moment(form.value.ptpdate)
            .format('DD-MMM-YYYY')
            .toUpperCase();
        var owner = this.username;
        var accnumber = this.accnumber;
        this.ptps.push({
            ptpdate: ptpdate,
            ptpamount: ptpamount,
            owner: owner,
            accnumber: accnumber,
        });
        this.ptpmultiple = {};
        this.isptptosave = true;
    };
    ActivityactionComponent.prototype.saveallptps = function () {
        this.ecolService.postptps(this.ptps).subscribe(function (resp) {
            swal
                .fire('Successful!', 'Mupltiple ptp saved!', 'success')
                .then(function () {
                this.ngxSmartModalService.getModal('myModal').close();
            });
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Error occurred during processing!', 'error');
        });
    };
    ActivityactionComponent.prototype.selectInput = function () { };
    ActivityactionComponent.prototype.onKey = function (event) {
        var inputValue = event.target.value;
        console.log(event.target.value);
    };
    __decorate([
        ViewChild('reason')
    ], ActivityactionComponent.prototype, "inputOne", void 0);
    ActivityactionComponent = __decorate([
        Component({
            selector: 'app-activityaction',
            templateUrl: './activityaction.component.html',
            styleUrls: ['./activityaction.component.css'],
            providers: [{ provide: NgbDateAdapter, useClass: NgbDateNativeAdapter }],
        })
    ], ActivityactionComponent);
    return ActivityactionComponent;
}());
export { ActivityactionComponent };
//# sourceMappingURL=activityaction.component.js.map