import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../services/ecol.service';
import { DataService } from '../../services/data.service';
import { environment } from '../../../environments/environment';
// import {NgxSpinnerService} from 'ngx-spinner';
var URL = environment.valor;
var ActivitylogComponent = /** @class */ (function () {
    function ActivitylogComponent(route, ecolService, dataService // private spinner: NgxSpinnerService
    ) {
        var _this = this;
        this.route = route;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.lat = 40.7143528;
        this.lng = -74.0059731;
        this.ptp = 0;
        this.model = {};
        this.bodyletter = {};
        this.date = new Date();
        this.collateralmenu = true;
        this.guarantorsmenu = true;
        this.demandlettersmenu = true;
        this.files = [];
        this.teles = [];
        this.plan = 'NONE';
        this.loader = true;
        this.tabs = {
            postTab: true,
            aboutTab: false,
            photoTab: false,
            videoTab: false,
            friendTab: fals,
        };
        // test service
        dataService.getTestData().subscribe(function (data) {
            _this.ptp = data;
        });
        dataService.getNotesData().subscribe(function (data) {
            _this.notes = data;
        });
        dataService.getCollateral().subscribe(function (data) {
            _this.totalcollaterals1 = data;
        });
        dataService.getContacts().subscribe(function (data) {
            _this.totalcontacts = data;
        });
        dataService.getGuarantors().subscribe(function (data) {
            _this.totalguarantors = data;
        });
        dataService.getFiles().subscribe(function (data) {
            _this.totalfiles = data;
        });
        dataService.getPtps().subscribe(function (data) {
            _this.totalPtps = data;
        });
        dataService.getWoffstoryData().subscribe(function (data) {
            _this.totalwoffstory = data;
        });
    }
    ActivitylogComponent.prototype.showTab = function (e) {
        for (var key in this.tabs) {
            if (key === e) {
                this.tabs[key] = true;
            }
            else {
                this.tabs[key] = false;
            }
        }
    };
    ActivitylogComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        /* this.username = this.route.snapshot.queryParamMap.get('username');
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
        // this.data.currentMessage.subscribe(message => this.message = message)
        // get account details
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
            this.demandlettersmenu = false;
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoopcashaccount(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = false;
            this.demandlettersmenu = false;
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
            this.collateralmenu = false;
            this.guarantorsmenu = true;
            this.demandlettersmenu = false;
        }
        else {
            this.getaccount(this.accnumber);
        }
        // get files
        this.getfileshistory(this.custnumber);
        // notes
        this.getNotes(this.custnumber);
        // collateral
        this.getCollateral(this.custnumber);
        // contacts
        this.getContacts(this.custnumber);
        // guarantors
        this.getGuarantors(this.custnumber);
        this.getTeles(this.custnumber);
        this.getptps(this.accnumber);
        this.planexists(this.accnumber);
        this.getwoffstory(this.accnumber);
    };
    ActivitylogComponent.prototype.getptps = function (accnumber) {
        var _this = this;
        this.ecolService.getptps(accnumber).subscribe(function (data) {
            _this.totalPtps = data.length;
            _this.loader = false;
        }, function (error) {
            console.log(error);
        });
    };
    ActivitylogComponent.prototype.getwoffstory = function (accnumber) {
        var _this = this;
        this.ecolService.searchwoffstory(accnumber).subscribe(function (data) {
            _this.totalwoffstory = data.length;
            _this.loader = false;
        }, function (error) {
            console.log(error);
        });
    };
    ActivitylogComponent.prototype.planexists = function (accnumber) {
        var _this = this;
        this.ecolService.s_check_account_plans(accnumber).subscribe(function (data) {
            // check if there if a plan
            if (data && data.length) {
                _this.ecolService
                    .single_s_plans(data[0].planid)
                    .subscribe(function (plandata) {
                    _this.plan = plandata.plantitle;
                });
            }
            _this.loader = false;
        }, function (error) {
            console.log(error);
        });
    };
    ActivitylogComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.loader = true;
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].cardacct;
            _this.model.custnumber = data[0].cardacct;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].rpcode;
            _this.model.emailaddress = data[0].emailaddress;
            _this.model.celnumber = data[0].celnumber;
            // tslint:disable-next-line:max-line-length
            _this.autodial_telnumber =
                _this.accountdetails.cellnumber ||
                    _this.accountdetails.mobile ||
                    _this.accountdetails.phonenumber ||
                    _this.accountdetails.telnumber ||
                    _this.accountdetails.celnumber;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.loader = true;
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].cardacct;
            _this.model.custnumber = data[0].cardacct;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].rpcode;
            _this.model.emailaddress = data[0].emailaddress;
            _this.model.celnumber = data[0].celnumber;
            // tslint:disable-next-line:max-line-length
            _this.autodial_telnumber =
                _this.accountdetails.cellnumber ||
                    _this.accountdetails.mobile ||
                    _this.accountdetails.phonenumber ||
                    _this.accountdetails.telnumber ||
                    _this.accountdetails.celnumber;
            _this.loader = false;
        }, function (error) {
            //
        });
    };
    ActivitylogComponent.prototype.getTeles = function (custnumber) {
        var _this = this;
        this.ecolService.allteles(custnumber).subscribe(function (response) {
            _this.teles = response.data;
            _this.totalTeles = response.data.length;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getNotes = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.notes = data[0].TOTAL;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getfileshistory = function (custnumber) {
        var _this = this;
        this.ecolService.getfileshistory(custnumber).subscribe(function (data) {
            _this.files = data;
            _this.totalfiles = data.length;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getGuarantors = function (custnumber) {
        var _this = this;
        this.ecolService.totalguarantors(custnumber).subscribe(function (data) {
            _this.totalguarantors = data[0].TOTAL;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getContacts = function (custnumber) {
        var _this = this;
        this.ecolService.totalcontacts(custnumber).subscribe(function (data) {
            _this.totalcontacts = data[0].TOTAL;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getCollateral = function (custnumber) {
        var _this = this;
        this.ecolService.totalcollaterals(custnumber).subscribe(function (data) {
            _this.totalcollaterals1 = data[0].TOTAL;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getaccount = function (accnumber) {
        // this.spinner.show();
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            _this.loader = true;
            _this.accountdetails = data[0];
            _this.guarantors = data[0].guarantors;
            _this.model.accnumber = data[0].accnumber;
            _this.model.custnumber = data[0].custnumber;
            _this.model.addressline1 = data[0].addressline1;
            _this.model.postcode = data[0].postcode;
            _this.model.emailaddress = data[0].emailaddress;
            _this.model.celnumber = data[0].celnumber;
            // tslint:disable-next-line:max-line-length
            _this.autodial_telnumber =
                _this.accountdetails.cellnumber ||
                    _this.accountdetails.mobile ||
                    _this.accountdetails.phonenumber ||
                    _this.accountdetails.telnumber ||
                    _this.accountdetails.celnumber;
            _this.loader = false;
            // this.spinner.hide();
        });
    };
    ActivitylogComponent.prototype.getmcoopcashaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(accnumber).subscribe(function (data) {
            _this.loader = true;
            _this.accountdetails = data[0];
            _this.model.accnumber = data[0].loanaccnumber;
            _this.model.custnumber = data[0].loanaccnumber;
            _this.model.addressline1 = data[0].address;
            _this.model.postcode = data[0].postcode;
            _this.model.celnumber = data[0].phonenumber;
            // tslint:disable-next-line:max-line-length
            _this.autodial_telnumber =
                _this.accountdetails.cellnumber ||
                    _this.accountdetails.mobile ||
                    _this.accountdetails.phonenumber ||
                    _this.accountdetails.telnumber ||
                    _this.accountdetails.celnumber;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.loader = true;
            _this.accountdetails = data;
            _this.guarantors = data.guarantors;
            _this.model.accnumber = data.accnumber;
            _this.model.custnumber = data.custnumber;
            _this.model.addressline1 = data.addressline1;
            _this.model.postcode = data.postcode;
            _this.model.emailaddress = data.emailaddress;
            _this.model.celnumber = data.celnumber;
            _this.loader = false;
        });
    };
    ActivitylogComponent.prototype.changeAutodialNumber = function (telnumber) {
        this.autodial_telnumber = telnumber;
        this.loader = false;
    };
    // returns phone number
    ActivitylogComponent.prototype.num = function () {
        this.loader = false;
        return this.autodial_telnumber;
    };
    ActivitylogComponent.prototype.refreshTeles = function () {
        this.getTeles(this.custnumber);
        alert('contacts refreshed!!');
    };
    ActivitylogComponent.prototype.dialAvaya = function () {
        alert('avaya integration in progress!!!');
    };
    // Changes colour of Account Plan Background, if None, will be red, if not none, will be Green
    ActivitylogComponent.prototype.getColor = function () {
        return this.plan !== 'NONE' ? '#7ac142' : '#bc3d3d';
    };
    ActivitylogComponent.prototype.copyText = function (val) {
        var selBox = document.createElement('textarea');
        selBox.style.position = 'fixed';
        selBox.style.left = '0';
        selBox.style.top = '0';
        selBox.style.opacity = '0';
        selBox.value = val;
        document.body.appendChild(selBox);
        selBox.focus();
        selBox.select();
        document.execCommand('copy');
        document.body.removeChild(selBox);
    };
    ActivitylogComponent = __decorate([
        Component({
            selector: 'app-activitylog',
            templateUrl: './activitylog.component.html',
            styleUrls: ['./activitylog.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            EcolService,
            DataService // private spinner: NgxSpinnerService
        ])
    ], ActivitylogComponent);
    return ActivitylogComponent;
}());
export { ActivitylogComponent };
//# sourceMappingURL=activitylog.component.js.map