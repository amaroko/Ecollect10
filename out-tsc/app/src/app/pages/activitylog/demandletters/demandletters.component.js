import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader, } from '@swimlane/ng2-file-upload';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { license } from '../../../../../env';
import { HttpClient } from '@angular/common/http';
import { Howl } from 'howler';
import * as introJs from 'intro.js/intro.js';
import { NgxSmartModalService } from 'ngx-smart-modal';
var URL = environment.filesapi;
var apiUrl = environment.letters_api;
var DemandlettersComponent = /** @class */ (function () {
    // DemandletternSteps(): void {
    //   this.introJS
    //     .addHints()
    //     .showHints();
    // }
    //
    // DemandletternSteps2(id): void {
    //   this.introJS
    //     .hideHint(id);
    // }
    // DemandletternSteps3(): void {
    //   this.introJS
    //     .hideHints();
    function DemandlettersComponent(route, ecolService, spinner, toasterService, httpClient, ngxSmartModalService) {
        var _this = this;
        this.route = route;
        this.ecolService = ecolService;
        this.spinner = spinner;
        this.toasterService = toasterService;
        this.httpClient = httpClient;
        this.ngxSmartModalService = ngxSmartModalService;
        this.introJS = introJs();
        this.guarantors = [];
        this.teles = [];
        this.emails = [];
        this.addresses = [];
        this.postcodes = [];
        this.model = {};
        this.bodyletter = {};
        this.letterbody = {};
        this.emaildata = {};
        this.demandhisdetails = {};
        this.guarantoremails = '';
        // tslint:disable-next-line:max-line-length
        this.itemsDemands = [
            'overduecc',
            'prelistingcc',
            'suspension',
            'Demand1',
            'Demand2',
            'Prelisting',
            'PostlistingSecured',
            'PostlistingUnsecured',
            'PostlistingUnsecuredcc',
            'Day90',
            'Day40',
            'Day30',
            'prelistingremedial',
        ];
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.config = new ToasterConfig({
            showCloseButton: { warning: true, error: false, success: true },
            tapToDismiss: false,
            preventDuplicates: true,
            newestOnTop: true,
            timeout: 0,
            positionClass: 'toast-top-right',
            animation: 'flyLeft',
            limit: ,
        });
        this.loader = true;
        //
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('demand', _this.model.demand);
            form.append('accnumber', _this.accnumber);
            form.append('owner', _this.username);
            form.append('custnumber', _this.custnumber);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            //
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            // success
            var obj = JSON.parse(response);
            for (var i = 0; i < obj.files.length; i++) {
                var bulk = {
                    accnumber: _this.accnumber,
                    custnumber: _this.custnumber,
                    address: 'none',
                    email: 'none',
                    telnumber: 'none',
                    filepath: obj.files[i].path,
                    filename: obj.files[i].originalname,
                    // datesent: new Date(),
                    owner: _this.username,
                    byemail: false,
                    byphysical: true,
                    bypost: true,
                    demand: _this.model.demand
                };
                _this.ecolService.demandshistory(bulk).subscribe(function (resp) {
                    _this.getdemandshistory(_this.accnumber);
                    swal.fire('Good!', 'Demand letter uploaded successfully!', 'success');
                }, function (error) {
                    swal.fire('Oooops!', 'Demand letter uploaded but unable to add to demands history!', 'warning');
                });
            }
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            // error server response
        };
    }
    DemandlettersComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    DemandlettersComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    DemandlettersComponent.prototype.currentDate = function () {
        var currentDate = new Date();
        var day = '' + currentDate.getDate();
        var month = '' + (currentDate.getMonth() + 1);
        var year = currentDate.getFullYear();
        if (month.length < 2) {
            month = '0' + month;
        }
        if (day.length < 2) {
            day = '0' + day;
        }
        return year + '-' + month + '-' + day;
    };
    DemandlettersComponent.prototype.Demand = function () {
        this.introJS
            .setOptions({
            steps: [
                {
                    element: '#demand',
                    position: 'left',
                    intro: 'Here you get to select the demand type that you want to send manually eg Demad letter' +
                        '1, Prelisting etc'
                },
                {
                    element: '#accnumber',
                    tooltipPosition: 'left',
                    intro: 'This is the account number of the customer. It is a 14 digit code eg 016C7184210202'
                },
                {
                    element: '#custnumber',
                    tooltipPosition: 'auto',
                    intro: 'This is 7 digit number of the customer derived from the account number eg 1842102'
                },
                {
                    element: '#addressline1',
                    position: 'left',
                    intro: 'This is the P. O Box address provided by the customer. It is vital especially' +
                        'when sending a letter by mail box. In some cases you may have to fill it manually if it\'s not available'
                },
                {
                    element: '#postcode',
                    position: 'top',
                    intro: 'This is the standard postal code that accompanies a mail box number to understand its destination ' +
                        'In some cases you may have to fill it manually if it\'s not available'
                },
                {
                    element: '#emailaddress',
                    position: 'left',
                    intro: 'This is the customer email address. It should follow the standard email format i.e ' +
                        'janedoe@somethingmail.com otherwise the e-mail will not be delivered In ' +
                        'some cases you may have to fill it manually if it\'s not available'
                },
                {
                    element: '#celnumber',
                    position: 'left',
                    intro: 'This is the mobile number of the customer. In some cases you may have to fill it manually if it\'s not available'
                },
                {
                    element: '#savecontacts',
                    position: 'left',
                    intro: 'Here you may decide to save the cell number that you enteredd in the previous field. This  ' +
                        'number will be linked to this customer'
                },
                {
                    element: '#showlogofooter',
                    position: 'left',
                    intro: 'Check this box if you want to generate a letter that has the default Co-operative Bank of Kenya ' +
                        'logo and footer'
                },
                {
                    element: '#generateword',
                    intro: 'Check this box if you want to generate a word document. This is the recommended format if you want to ' +
                        'download and edit the letter. Keep in mind, Word documents are not sent to customers'
                },
                {
                    element: '#generatepdf',
                    intro: 'Check this box, to generate a pdf document that will be sent to the customer as per the provided details ' +
                        'in the above fields'
                },
                {
                    element: '#previewtosend',
                    intro: 'Check this box if you do not want the system to send the letter. ' +
                        'This means the letter will be generated and downloaded ' +
                        'to your computer for you to take further steps'
                },
                {
                    element: '#previewletter',
                    intro: 'Press this button to preview the letter that is to be sent. This button does not ' +
                        'send the letter but instead downloads the letter to your computer so that you can ' +
                        'confirm the details before sending to customer'
                },
                {
                    element: '#sendemailinput',
                    intro: 'Check this box if you want to send the letter via email. The email address should be available and valid'
                },
                {
                    element: '#sendpostal',
                    intro: 'Check this box, to queue the letter for physical sending via the mail box. The postal address ' +
                        'and postal code should be available'
                },
                {
                    element: '#sendbysms',
                    intro: 'Check this box, to send a link of the letter to the customers phone number. The customer ' +
                        'then follows the link to view the letter'
                },
                {
                    element: '#generateandsend',
                    intro: 'This is the final step. After confirming that all details are correct, this button sends the ' +
                        'letter as per the provided details'
                }
            ],
            hidePrev: true,
            hideNext: true,
            showProgress: true,
            // tooltipPosition: 'auto',
            showStepNumbers: true,
            showBullets: true,
            scrollToElement: true,
            exitOnOverlayClick: false
        })
            .start();
    };
    DemandlettersComponent.prototype.ngOnInit = function () {
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
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        // get account details
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
        this.getdemandshistory(this.accnumber);
        this.getteles(this.custnumber);
    };
    DemandlettersComponent.prototype.getteles = function (cust) {
        var _this = this;
        this.ecolService.getteles(cust).subscribe(function (data_teles) {
            _this.loader = false;
            _this.teles = data_teles;
            _this.emails = data_teles;
            _this.postcodes = data_teles;
            _this.addresses = data_teles;
        });
    };
    DemandlettersComponent.prototype.openLetterReadyPreviewModal = function () {
        // open modal
        this.ngxSmartModalService.getModal('demandsending').open();
    };
    DemandlettersComponent.prototype.getaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            console.log(data[0].nationid);
            _this.accountdetails = data[0];
            _this.natid = data[0].nationid;
            _this.guarantors = data[0].guarantors;
            _this.model.accnumber = data[0].accnumber;
            _this.model.custnumber = data[0].custnumber;
            _this.model.addressline1 = data[0].addressline1;
            _this.model.postcode = data[0].postcode;
            _this.model.emailaddress = data[0].emailaddress;
            _this.model.celnumber = data[0].celnumber;
            _this.section = data[0].section;
            // tslint:disable-next-line:max-line-length
            _this.autodial_telnumber =
                _this.accountdetails.cellnumber ||
                    _this.accountdetails.mobile ||
                    _this.accountdetails.phonenumber ||
                    _this.accountdetails.telnumber ||
                    _this.accountdetails.celnumber;
            if (_this.guarantors || _this.guarantors.length > 0) {
                // loop
                for (var i = 0; i < _this.guarantors.length; i++) {
                    _this.guarantoremails += _this.guarantors[i].email + ',';
                }
            }
            // hide spinner
            _this.spinner.hide();
            _this.loader = false;
        });
    };
    DemandlettersComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.loader = false;
            _this.accountdetails = data;
            _this.guarantors = data.guarantors;
            _this.model.accnumber = data.accnumber;
            _this.model.custnumber = data.custnumber;
            _this.model.addressline1 = data.addressline1;
            _this.model.postcode = data.postcode;
            _this.model.emailaddress = data.emailaddress;
            _this.model.celnumber = data.celnumber;
        });
    };
    DemandlettersComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.loader = false;
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].cardacct;
            _this.model.custnumber = data[0].cardacct;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].rpcode;
            _this.model.emailaddress = data[0].email;
            _this.model.celnumber = data[0].mobile;
        });
    };
    DemandlettersComponent.prototype.getdemandshistory = function (accnumber) {
        var _this = this;
        // console.log('getdemandshistory called ...');
        this.ecolService.getdemandshistory(accnumber).subscribe(function (data) {
            _this.loader = false;
            _this.demands = data;
            console.log(_this.demands);
        });
    };
    DemandlettersComponent.prototype.generate_choose = function () {
        if (this.sys === 'cc') {
            this.generatecc();
        }
        else {
            this.generate();
        }
    };
    DemandlettersComponent.prototype.generate = function () {
        this.ecolService.loader();
        this.processletter(this.model, this.model.accnumber, this.model.emailaddress);
        this.getdemandshistory(this.accnumber);
    };
    DemandlettersComponent.prototype.generatecc = function () {
        this.ecolService.loader();
        this.processlettercc(this.model.demand, this.model.accnumber, this.model.emailaddress);
        this.getdemandshistory(this.accnumber);
    };
    DemandlettersComponent.prototype.openletter_choose = function (inletter) {
        if (this.sys === 'cc') {
            this.openlettercc(inletter);
        }
        else {
            this.openletter(inletter);
        }
    };
    DemandlettersComponent.prototype.popsuccessToast = function (msg) {
        this.toasterService.pop('success', 'Success', msg);
        this.audio();
    };
    DemandlettersComponent.prototype.poperrorToast = function (error) {
        this.toasterService.pop('error', 'Error', error);
        this.audio();
    };
    DemandlettersComponent.prototype.popinfoToast = function (info) {
        this.toasterService.pop('info', 'Info', info);
        this.audio();
    };
    DemandlettersComponent.prototype.openletter = function (letter) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.ecolService.loader();
        this.ecolService.getAccount(this.accnumber).subscribe(function (data) {
            // if account is there
            if (data && data.length > 0) {
                _this.bodyletter.demand = letter.demand;
                _this.bodyletter.showlogo = letter.showlogo;
                _this.bodyletter.format = letter.format;
                _this.bodyletter.cust = data[0].custnumber;
                _this.bodyletter.acc = data[0].accnumber;
                _this.bodyletter.custname = data[0].client_name;
                _this.bodyletter.address = letter.addressline1;
                _this.bodyletter.postcode = letter.postcode;
                _this.bodyletter.arocode = data[0].arocode;
                _this.bodyletter.branchname = data[0].branchname;
                _this.bodyletter.branchcode = data[0].branchcode;
                _this.bodyletter.manager = data[0].manager;
                _this.bodyletter.ccy = data[0].currency;
                _this.bodyletter.demand1date = null;
                _this.bodyletter.guarantors = data[0].guarantors;
                _this.bodyletter.nationalid = data[0].nationalid;
                // Get all cust accounts
                _this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(function (accounts) {
                    // add accounts to the array
                    // console.log('accounts=>', accounts);
                    _this.bodyletter.accounts = accounts;
                    // get demand1 date
                    _this.ecolService.demand1history(_this.accnumber).subscribe(function (dd1date) {
                        if (dd1date && dd1date.length > 0) {
                            _this.bodyletter.demand1date = dd1date[0].datesent;
                        }
                        // call generate letter api
                        _this.ecolService.generateLetter(_this.bodyletter).subscribe(function (generateletterdata) {
                            // sucess
                            // modalDialog
                            if (generateletterdata.result === 'success') {
                                _this.url = generateletterdata.message;
                                swal.fire('Good!', generateletterdata.message, 'success');
                                // check if preview to send
                                if (_this.model.previewtosend) {
                                    // add to his
                                    _this.demandhisdetails = {
                                        accnumber: _this.model.accnumber,
                                        custnumber: _this.model.custnumber,
                                        address: _this.model.addressline1,
                                        email: _this.model.emailaddress,
                                        telnumber: _this.model.telnumber,
                                        filepath: generateletterdata.message,
                                        filename: generateletterdata.filename,
                                        // datesent: moment(),
                                        // datesent: new Date(),,
                                        owner: _this.username,
                                        byemail: 'N',
                                        byphysical: 'Y',
                                        bypost: 'N',
                                        demand: letter.demand,
                                        customeremail: _this.model.emailaddress,
                                        status: 'sent',
                                        reissued: 'N',
                                        guarantorsno: _this.guarantors.length || [],
                                        guarantorsemail: _this.guarantoremails,
                                        sendemail: letter.branchemail ||
                                            'Customer Service <Customerservice@co-opbank.co.ke>'
                                    };
                                    // console.log('to history ', this.demandhisdetails);
                                    _this.demandshistory(_this.demandhisdetails);
                                    // send sms
                                    _this.ecolService
                                        .getsmsmessage(letter.demand)
                                        .subscribe(function (respo) {
                                        var sms = respo.smstemplate;
                                        _this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + _this.model.emailaddress);
                                        var smsdata = {
                                            demand: letter.demand,
                                            custnumber: _this.model.custnumber,
                                            accnumber: _this.model.accnumber,
                                            telnumber: _this.model.celnumber,
                                            owner: _this.username,
                                            message: _this.smsMessage
                                        };
                                        // console.log(smsdata);
                                        // this.sendsms(smsdata);
                                    }, function (error) {
                                        console.log(error);
                                    });
                                    // update status
                                    var status_1 = {
                                        id: _this.demandid,
                                        from: 'loans',
                                        datesent: _this.currentDate(),
                                        sentby: _this.username
                                    };
                                    _this.ecolService.demandstatus(status_1).subscribe(function (ddstatusdata) {
                                        console.log(_this.demandid + ' status updated ');
                                    }, function (error) {
                                        console.log(error);
                                    });
                                }
                                _this.popsuccessToast('Letter ready for preview');
                                _this.downloadDemand(generateletterdata.message, generateletterdata.filename);
                            }
                            else {
                                swal.fire('Error!', 'Error occured during letter generation!', 'error');
                            }
                            //
                        }, function (error) {
                            console.log('error==>', error);
                            swal.fire('Error!', 'Error occured during letter generation!', 'error');
                        });
                    }, function (error) {
                        console.log('demand1history==>', error);
                        swal.fire('Error!', 'Error generating previous demand date!', 'error');
                    });
                }, function (error) {
                    console.log('error==>', error);
                    swal.fire('Error!', 'unable to retrieve customer accounts!', 'error');
                });
            }
            else {
                swal.fire('None!', letter.accnumber + ' not found!', 'warning');
            }
        }, function (error) {
            console.log('error==>', error);
            swal.fire('Error!', 'account info missing!', 'error');
        });
    };
    DemandlettersComponent.prototype.openlettercc = function (letter) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.ecolService.loader();
        this.ecolService.getcardAccount(this.accnumber).subscribe(function (carddata) {
            // console.log(carddata[0]);
            // if cardacct
            if (carddata && carddata.length > 0) {
                (_this.letterbody.demand = letter.demand),
                    (_this.letterbody.showlogo = letter.showlogo),
                    (_this.letterbody.format = letter.format),
                    (_this.letterbody.cardacct = _this.accnumber),
                    (_this.letterbody.cardnumber = carddata[0].cardnumber),
                    (_this.letterbody.cardname = carddata[0].cardname),
                    (_this.letterbody.address = letter.addressline1),
                    (_this.letterbody.rpcode = letter.postcode),
                    (_this.letterbody.city = letter.city),
                    (_this.letterbody.EXP_PMNT = carddata[0].exppmnt),
                    (_this.letterbody.OUT_BALANCE = carddata[0].outbalance),
                    (_this.letterbody.demand1date = new Date());
                // console.log('letterbody', this.letterbody);
                // call generate letter api
                _this.ecolService.generateLetter(_this.letterbody).subscribe(function (data) {
                    // sucess
                    if (data.result === 'success') {
                        swal.fire('Good!', data.message, 'success');
                        _this.downloadDemand(data.message, data.filename);
                    }
                    else {
                        swal.fire('Error!', 'Error occured during letter generation!', 'error');
                    }
                    //
                }, function (error) {
                    console.log('error==>', error);
                    swal.fire('Error!', 'Error occured during letter generation!', 'error');
                });
            }
            else {
                swal.fire('None!', letter.accnumber + ' not found!', 'warning');
            }
        }, function (error) {
            //
            console.log(error);
            swal.fire('Error!', 'account info missing!', 'error');
        });
    };
    DemandlettersComponent.prototype.processletter = function (letter, accnumber, emailaddress) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            if (data && data.length > 0) {
                _this.bodyletter.demand = letter.demand;
                _this.bodyletter.showlogo = true;
                _this.bodyletter.format = 'pdf';
                _this.bodyletter.cust = data[0].custnumber;
                _this.bodyletter.acc = data[0].accnumber;
                _this.bodyletter.custname = data[0].client_name;
                _this.bodyletter.address = letter.addressline1;
                _this.bodyletter.postcode = letter.postcode;
                _this.bodyletter.arocode = data[0].arocode;
                _this.bodyletter.branchname = data[0].branchname;
                _this.bodyletter.branchcode = data[0].branchcode;
                _this.bodyletter.manager = data[0].manager;
                _this.bodyletter.branchemail =
                    data[0].branchemail ||
                        'Customer Service <Customerservice@co-opbank.co.ke>';
                _this.bodyletter.ccy = data[0].currency;
                _this.bodyletter.demand1date = new Date();
                _this.bodyletter.guarantors = data[0].guarantors;
                _this.bodyletter.settleaccno = data[0].settleaccno || '00000000000000';
                _this.bodyletter.section = _this.section;
                _this.bodyletter.kbbr = data[0].kbbr;
                _this.bodyletter.instamount = data[0].instamount;
                _this.bodyletter.oustbalance = data[0].oustbalance;
                _this.bodyletter.currency = data[0].currency;
                // Get all cust accounts
                _this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(function (accounts) {
                    _this.bodyletter.accounts = accounts;
                    _this.emaildata = {
                        name: data[0].client_name,
                        email: emailaddress,
                        branchemail: _this.bodyletter.branchemail ||
                            'Customer Service <Customerservice@co-opbank.co.ke>',
                        title: letter.demand,
                        guarantor: _this.bodyletter.guarantors || 0
                    };
                    // console.log('emaildata...', this.emaildata);
                    // generate letter
                    _this.generateletter(_this.bodyletter);
                }, function (error) {
                    console.log('getcustwithAccount error==>', error);
                    swal.fire('Error!', 'unable to retrieve customer accounts!', 'error');
                });
            }
            else {
                swal.fire('None!', letter.accnumber + ' not found!', 'warning');
            }
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'exception occured!', 'error');
        });
    };
    DemandlettersComponent.prototype.generateletter = function (letter) {
        return __awaiter(this, void 0, void 0, function () {
            var uploaddata, smsbody;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // swal.close();
                        this.popinfoToast('Letter in queue');
                        return [4 /*yield*/, this.httpClient
                                .post(apiUrl + letter.demand + '/download', letter)
                                .toPromise()];
                    case 1:
                        uploaddata = _a.sent();
                        // console.log("Data: " + JSON.stringify(uploaddata));
                        // console.log("Data: ", uploaddata.result);
                        if (uploaddata.result === 'success') {
                            this.popsuccessToast('Letter generated ...');
                            // save to history
                            this.demandhisdetails = {
                                accnumber: this.model.accnumber,
                                custnumber: this.model.custnumber,
                                address: this.model.addressline1,
                                email: this.model.emailaddress,
                                telnumber: this.model.telnumber,
                                filepath: uploaddata.message,
                                filename: uploaddata.filename,
                                // datesent: new Date(),
                                owner: this.username,
                                byemail: this.model.sendemail,
                                byphysical: this.model.sendphysical,
                                bypost: this.model.sendpostal,
                                demand: letter.demand,
                                customeremail: this.model.emailaddress,
                                status: 'queued',
                                reissued: 'N',
                                guarantorsno: this.guarantors.length || [],
                                guarantorsemail: this.guarantoremails,
                                sendemail: letter.branchemail ||
                                    'Customer Service <Customerservice@co-opbank.co.ke>'
                            };
                            //
                            this.emaildata.file = uploaddata.message;
                            // use uploaded fie on email
                            if (this.model.uploadedfile) {
                                this.emaildata.file = this.uploadedfilepath;
                            }
                            // send demandbyemail
                            if (this.model.sendemail) {
                                this.ecolService
                                    .sendDemandEmail(this.emaildata)
                                    .subscribe(function (response) {
                                    if (response.result === 'fail') {
                                        swal.close();
                                        _this.poperrorToast('Letter not sent on email!');
                                    }
                                    else {
                                        _this.demandshistory(_this.demandhisdetails);
                                        _this.getdemandshistory(_this.accnumber);
                                        // send sms
                                        _this.ecolService.getsmsmessage(letter.demand).subscribe(function (respo) {
                                            var sms = respo.smstemplate;
                                            _this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + _this.model.emailaddress);
                                            var smsdata = {
                                                demand: letter.demand,
                                                custnumber: _this.model.custnumber,
                                                accnumber: _this.model.accnumber,
                                                telnumber: _this.model.celnumber,
                                                owner: _this.username,
                                                message: _this.smsMessage
                                            };
                                            _this.sendsms(smsdata);
                                        }, function (error) {
                                            console.log(error);
                                        });
                                        swal.close();
                                        _this.popsuccessToast('Letter sent on email!');
                                    }
                                }); // end
                            } // end send demandbyemail
                            // send demandbysms
                            if (this.model.sendbysms) {
                                smsbody = {
                                    accountSid: license.accountSid,
                                    authToken: license.authToken,
                                    to: this.model.celnumber,
                                    from: license.from,
                                    body: 'Dear Customer,\nPlease download your ' +
                                        this.model.demand +
                                        ' from this link: https://bit.ly/2OfHuEh\n\nCo-op Bank\nCredit Department '
                                };
                                this.ecolService.sendDemandsms(smsbody).subscribe(function (response) {
                                    console.log(response);
                                    if (response.result === 'OK') {
                                        // add to history
                                        _this.demandshistory(_this.demandhisdetails);
                                        _this.getdemandshistory(_this.accnumber);
                                        swal.close();
                                        _this.popsuccessToast('Letter sent on sms!');
                                    }
                                    else {
                                        swal.close();
                                        _this.poperrorToast(response.response.message);
                                    }
                                });
                            } // end demandbysms
                        }
                        return [2 /*return*/];
                }
            });
        });
    }; // end generateletter
    DemandlettersComponent.prototype.processlettercc = function (demand, cardacct, emailaddress) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.loader = false;
            if (data.length > 0) {
                var letter = {
                    demand: demand.toLowerCase(),
                    cardacct: data[0].cardacct,
                    cardname: data[0].cardname,
                    showlogo: true,
                    format: 'pdf',
                    address: _this.model.addressline1,
                    postcode: _this.model.postcode,
                    exp_pmnt: data[0].exppmnt,
                    out_balance: data[0].exppmnt,
                    manager: 'ROSE KARAMBU'
                };
                var emaildata = {
                    name: data[0].cardname,
                    email: emailaddress,
                    title: demand,
                    branchemail: 'Contact Centre Team <ContactCentreTeam@co-opbank.co.ke>'
                };
                // generate letter
                _this.generatelettercc(letter, emaildata);
            }
            else {
                swal.fire('None!', cardacct + ' not found!', 'warning');
            }
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'exception occured!', 'error');
        });
    };
    DemandlettersComponent.prototype.generatelettercc = function (letter, emaildata) {
        var _this = this;
        swal.close();
        this.loader = false;
        this.popinfoToast('Letter Queued to be sent');
        // this.audio();
        this.ecolService.generateLettercc(letter).subscribe(function (uploaddata) {
            if (uploaddata.result === 'success') {
                //
                // swal('Success!', 'Letter generated!', 'success');
                _this.popsuccessToast('Letter generated and queued to be sent');
                // save to history
                _this.demandhisdetails = {
                    accnumber: _this.model.accnumber,
                    custnumber: _this.model.custnumber,
                    address: _this.model.addressline1,
                    email: _this.model.emailaddress,
                    telnumber: _this.model.telnumber,
                    filepath: uploaddata.message,
                    filename: uploaddata.filename,
                    // datesent: new Date(),
                    owner: _this.username,
                    byemail: _this.model.sendemail,
                    byphysical: _this.model.sendphysical,
                    bypost: _this.model.sendpostal,
                    demand: letter.demand,
                    customeremail: _this.model.emailaddress,
                    status: 'queued',
                    reissued: 'N',
                    guarantorsno: _this.guarantors.length || [],
                    guarantorsemail: _this.guarantoremails,
                    sendemail: letter.branchemail ||
                        'Customer Service <Customerservice@co-opbank.co.ke>'
                };
                //
                emaildata.file = uploaddata.message;
                // use uploaded fie on email
                if (_this.model.uploadedfile) {
                    emaildata.file = _this.uploadedfilepath;
                }
                // send demandbyemail
                if (_this.model.sendemail) {
                    _this.ecolService
                        .sendDemandEmail(emaildata)
                        .subscribe(function (response) {
                        if (response.result === 'fail') {
                            swal.close();
                            _this.loader = false;
                            _this.poperrorToast('Letter not sent on email!');
                        }
                        else {
                            // add to history
                            _this.demandshistory(_this.demandhisdetails);
                            _this.getdemandshistory(_this.accnumber);
                            // send sms
                            _this.smsMessage =
                                'Dear Customer, We have sent a Loan Repayment  Demand  Notice to your address. To enquire call  0711049000';
                            var smsdata = {
                                demand: letter.demand,
                                custnumber: _this.model.custnumber,
                                accnumber: _this.model.accnumber,
                                telnumber: _this.model.celnumber,
                                owner: _this.username,
                                message: _this.smsMessage
                            };
                            _this.sendsms(smsdata);
                            swal.close();
                            _this.loader = false;
                            _this.popsuccessToast('Letter sent on email!');
                        }
                    }); // end
                }
                // send demandbysms
                if (_this.model.sendbysms) {
                    var smsbody = {
                        accountSid: license.accountSid,
                        authToken: license.authToken,
                        to: _this.model.celnumber,
                        from: license.from,
                        body: 'Dear Customer,\nPlease download your ' +
                            _this.model.demand +
                            ' from this link: https://bit.ly/2OfHuEh\n\nCo-op Bank\nCredit Department '
                    };
                    //
                    // console.log(smsbody);
                    _this.ecolService.sendDemandsms(smsbody).subscribe(function (response) {
                        console.log(response);
                        if (response.result === 'OK') {
                            // add to history
                            _this.demandshistory(_this.demandhisdetails);
                            _this.getdemandshistory(_this.accnumber);
                            swal.close();
                            _this.popsuccessToast('Letter sent on sms!');
                        }
                        else {
                            swal.close();
                            _this.poperrorToast(response.response.message);
                        }
                    });
                }
            }
            else {
                // error in letter generation
                swal.fire('Error!', 'Error generating letter!', 'error');
            }
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Cannot generate letter!', 'error');
        });
    }; // end generateletter
    DemandlettersComponent.prototype.sendsms = function (smsdata) {
        this.ecolService.sendsms(smsdata).subscribe(function (result) {
            swal.fire('Successful!', 'Demand letter sent!', 'success');
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Error occurred during sending email!', 'error');
        });
    };
    DemandlettersComponent.prototype.demandshistory = function (body) {
        var _this = this;
        // console.log('demandshistory', body);
        this.ecolService.demandshistory(body).subscribe(function (data) {
            _this.getdemandshistory(_this.accnumber);
        });
    };
    DemandlettersComponent.prototype.guarantorletter = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    DemandlettersComponent.prototype.sms = function (body) {
        this.ecolService.guarantorletters(body).subscribe(function (data) { });
    };
    DemandlettersComponent.prototype.downloadDemand = function (filepath, filename) {
        this.ecolService.demanddownload(filepath).subscribe(function (data) {
            saveAs(data, filename);
        }, function (error) {
            console.log(error.error);
            swal.fire('Error!', ' Cannot download  file!', 'error');
        });
    };
    DemandlettersComponent.prototype.resend = function (filepath) {
        swal
            .fire({
            title: 'confirm email address',
            // title: 'confirm email address',
            input: 'text',
            showCancelButton: true,
            confirmButtonText: 'Send Email',
            showLoaderOnConfirm: true,
            preConfirm: function (email) { },
            allowOutsideClick: function () { return !swal.isLoading(); }
        })
            .then(function (result) {
            if (result.value !== null) {
                swal.fire('Sent!', 'Email has been sent', 'success');
            }
        });
    };
    DemandlettersComponent.prototype.savecontacts = function (model) {
        var _this = this;
        this.spinner.show();
        // save contact
        this.ecolService
            .existsteles(this.custnumber, model.celnumber, model.emailaddress)
            .subscribe(function (contact) {
            if (contact.length > 0) {
                swal.fire('Warning!', 'Contact already exists', 'info');
                _this.spinner.hide();
                _this.loader = false;
            }
            else {
                // save
                var telesbody = {
                    custnumber: _this.custnumber,
                    telephone: model.celnumber,
                    email: model.emailaddress,
                    active: 'Yes',
                    owner: _this.username,
                    updatedby: _this.username,
                    updatedlast: new Date(),
                    address: model.addressline1,
                    postcode: model.postcode
                };
                _this.ecolService.postteles(telesbody).subscribe(function (teles) {
                    _this.spinner.hide();
                    _this.loader = false;
                    _this.getteles(_this.custnumber);
                    swal.fire('Good!', 'Contact has been added', 'success');
                });
            }
        }, function (error) {
            console.log('error-existsteles', error);
            _this.spinner.hide();
            _this.loader = false;
            swal.fire('Ooops!', 'Something went wrong', 'error');
        });
    };
    DemandlettersComponent.prototype.audio = function () {
        var sound = new Howl({
            src: 'assets/sound.wav'
        });
        sound.play();
    };
    DemandlettersComponent = __decorate([
        Component({
            selector: 'app-demandletters',
            templateUrl: './demandletters.component.html',
            styleUrls: ['./demandletters.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            EcolService,
            NgxSpinnerService,
            ToasterService,
            HttpClient,
            NgxSmartModalService])
    ], DemandlettersComponent);
    return DemandlettersComponent;
}());
export { DemandlettersComponent };
//# sourceMappingURL=demandletters.component.js.map