import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
var URL = environment.valor;
var ActivityhomeComponent = /** @class */ (function () {
    function ActivityhomeComponent(route, modalService, ecolService) {
        this.route = route;
        this.modalService = modalService;
        this.ecolService = ecolService;
        this.model = {};
        this.date = new Date();
        this.loader = true;
        this.cards = [];
        this.ptps = [];
        this.otheraccs = [];
        this.collaterals = [];
        this.directors = [];
        this.accwithid = [];
    }
    ActivityhomeComponent.prototype.open = function (content) {
        var _this = this;
        this.modalService.open(content).result.then(function (result) {
            _this.closeResult = "Closed with: " + result;
        }, function (reason) {
            _this.closeResult = "Dismissed " + _this.getDismissReason(reason);
        });
    };
    ActivityhomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged!
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        this.username = this.route.snapshot.queryParamMap.get('username');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.username = queryParams.get('username');
        });
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        this.nationid = this.route.snapshot.queryParamMap.get('nationid');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.nationid = queryParams.get('nationid');
        });
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        // get account details
        if (this.sys === 'cc') {
            this.getcard(this.accnumber);
        }
        else if (this.sys === 'watchcc') {
            this.getwatchcard(this.accnumber);
        }
        else if (this.sys === 'watch') {
            this.getwatch(this.accnumber);
        }
        else if (this.sys === 'mcoopcash') {
            this.getmcoop(this.accnumber);
        }
        else {
            this.getaccount(this.accnumber);
        }
    };
    // activityHomeSteps(): void {
    //   this.introJS
    //     .setOptions({
    //       steps: [
    //         {
    //           element: '#step1',
    //           intro: 'Here you will find all the information about the account; balances, arrears, branchcode, assisned RRO code etc'
    //         },
    //         {
    //           element: '#step2',
    //           intro: 'Here you will find  other accounts that the customer has with us'
    //         },
    //         {
    //           element: '#step3',
    //           intro: 'Here you will find all the information about the available collaterals held under this account'
    //         },
    //         {
    //           element: '#step4',
    //           intro: 'Here you will find info about if the account holder is mentioned as a director of a company with us'
    //         },
    //         {
    //           element: '#step5',
    //           intro: 'Here you will find the customers credit card details if available'
    //         },
    //         {
    //           element: '#step6',
    //           intro: 'Lastly, here you will find the accounts under same id number of the specified customer'
    //         }
    //       ],
    //       hidePrev: true,
    //       hideNext: false
    //     })
    //     .start();
    // }
    ActivityhomeComponent.prototype.getaccount = function (accnumber) {
        var _this = this;
        this.ecolService.getAccount(accnumber).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.getwatch = function (accnumber) {
        var _this = this;
        this.ecolService.getwatch(accnumber).subscribe(function (data) {
            _this.account = data;
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.getcard = function (cardacct) {
        var _this = this;
        this.ecolService.getcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.getwatchcard = function (cardacct) {
        var _this = this;
        this.ecolService.getWatchcardAccount(cardacct).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.getmcoop = function (loanaccnumber) {
        var _this = this;
        this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe(function (data) {
            _this.account = data[0];
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.beforeChange = function (active) {
        // console.log(active.nextId);
        var tab = active.nextId;
        switch (tab) {
            case 'ngb-tab-0': {
                // console.log("accountinfo");
                break;
            }
            case 'ngb-tab-1': {
                console.log('other a/cs tab ...');
                this.loadother(this.custnumber);
                break;
            }
            case 'ngb-tab-2': {
                this.loadcollateral(this.accnumber);
                break;
            }
            case 'ngb-tab-3': {
                this.loaddirectors(this.accnumber);
                break;
            }
            case 'ngb-tab-4': {
                this.loadcards(this.nationid);
                break;
            }
            case 'ngb-tab-5': {
                this.loadaccwithid(this.nationid);
                break;
            }
            default: {
                console.log('Invalid choice');
                break;
            }
        }
    };
    ActivityhomeComponent.prototype.loadother = function (custnumber) {
        var _this = this;
        this.loader = true;
        this.ecolService.otheraccs(custnumber).subscribe(function (data) {
            // console.log(data.data);
            _this.otheraccs = data.data;
            _this.loader = false;
        }, function (error) {
            console.log('loadother error ==>', error);
            alert('unable to retrieve otheraccs');
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.loadcollateral = function (accnumber) {
        var _this = this;
        this.loader = true;
        this.ecolService.collaterals(accnumber).subscribe(function (data) {
            _this.collaterals = data;
            _this.loader = false;
        }, function (error) {
            console.log('collaterals error ==>', error);
            alert('unable to retrieve collaterals');
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.loaddirectors = function (accnumber) {
        var _this = this;
        this.loader = true;
        this.ecolService.directors(accnumber).subscribe(function (data) {
            _this.directors = data;
            _this.loader = false;
        }, function (error) {
            console.log('directors error ==>', error);
            alert('unable to retrieve directors');
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.loadaccwithid = function (nationid) {
        var _this = this;
        this.loader = true;
        this.ecolService.accwithid(nationid).subscribe(function (data) {
            _this.accwithid = data;
            _this.loader = false;
        }, function (error) {
            console.log('loadaccwithid error ==>', error);
            alert('unable to retrieve accwithid');
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.loadptps = function (accnumber) {
        var _this = this;
        console.log(accnumber);
        this.loader = true;
        this.ecolService.ptps(accnumber).subscribe(function (data) {
            console.log('ptp', data);
            _this.ptps = data;
            _this.loader = false;
        }, function (error) {
            console.log('loadptps error ==>', error);
            alert('unable to retrieve ptps');
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.loadcards = function (nationid) {
        var _this = this;
        this.loader = true;
        this.ecolService.getcardwithid(nationid).subscribe(function (data) {
            _this.cards = data;
            _this.loader = false;
        }, function (error) {
            console.log('loadcards error ==>', error);
            alert('unable to retrieve cards');
            _this.loader = false;
        });
    };
    ActivityhomeComponent.prototype.getDismissReason = function (reason) {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        }
        else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        }
        else {
            return "with: " + reason;
        }
    };
    ActivityhomeComponent = __decorate([
        Component({
            selector: 'app-activityhome',
            templateUrl: './activityhome.component.html',
            styleUrls: ['./activityhome.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            NgbModal,
            EcolService])
    ], ActivityhomeComponent);
    return ActivityhomeComponent;
}());
export { ActivityhomeComponent };
//# sourceMappingURL=activityhome.component.js.map