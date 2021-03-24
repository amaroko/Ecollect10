import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { DataService } from '../../../services/data.service';
import swal from 'sweetalert2';
import * as moment from 'moment';
var WriteoffstoryComponent = /** @class */ (function () {
    function WriteoffstoryComponent(route, ecolService, dataService) {
        this.route = route;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.data = {};
        this.account = [];
        //
    }
    WriteoffstoryComponent.prototype.currentDate = function () {
        var currentDate = new Date();
        var day = currentDate.getDate();
        var month = currentDate.getMonth() + 1;
        var year = currentDate.getFullYear();
        return day + '-' + month + '-' + year;
    };
    WriteoffstoryComponent.prototype.ngOnInit = function () {
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
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
        // update writeoffstory
        this.getwriteoffstory(this.accnumber);
    };
    WriteoffstoryComponent.prototype.getwriteoffstory = function (accnumber) {
        var _this = this;
        this.ecolService.searchwoffstory(accnumber).subscribe(function (data) {
            if (data && data.length > 0) {
                _this.data.writeoffstoryMessage = data[0].woffstory;
            }
        });
    };
    WriteoffstoryComponent.prototype.updatefunc = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        this.ecolService.loader();
        var body = {
            custnumber: this.custnumber,
            accnumber: this.accnumber,
            owner: this.username,
            woffstory: form.value.writeoffstoryMessage,
            lastupdate: this.currentDate,
        };
        this.ecolService.woffstory(body).subscribe(function (data) {
            swal.fire('Success!', 'Writeoff story updated', 'success');
            _this.addActivity(body.woffstory);
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Service currently not available', 'error');
        });
    };
    WriteoffstoryComponent.prototype.addActivity = function (msg) {
        var _this = this;
        var body = {
            collectoraction: 'REVW',
            party: '',
            ptpamount: '',
            ptp: '',
            ptpdate: this.currentDate,
            collectornote: msg,
            reviewdate: moment(this.account.reviewdate).format('DD-MMM-YYYY'),
            reason: this.account.excuse,
            cmdstatus: this.account.cmdstatus,
            route: this.account.routetostate,
            paymode: '',
            accountnumber: this.accnumber,
            custnumber: this.custnumber,
            arramount: this.account.totalarrears || 0,
            oustamount: this.account.oustbalance || 0,
            notesrc: 'added a writeoff story',
            noteimp: 'N',
            rfdother: '',
            owner: this.username,
            product: this.account.section,
        };
        // add action
        this.ecolService.postactivitylogs(body).subscribe(function (data) {
            _this.sendNotesData(_this.custnumber);
            _this.sendWoffstoryData(_this.accnumber);
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'activitylog service is currently not available', 'error');
        });
    };
    WriteoffstoryComponent.prototype.sendNotesData = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.dataService.pustNotesData(data[0].TOTAL);
        });
    };
    WriteoffstoryComponent.prototype.sendWoffstoryData = function (accnumber) {
        var _this = this;
        this.ecolService.searchwoffstory(accnumber).subscribe(function (data) {
            _this.dataService.pushWoffstoryData(data.length);
        });
    };
    WriteoffstoryComponent = __decorate([
        Component({
            selector: 'app-writeoffstory',
            templateUrl: './writeoffstory.component.html',
            styleUrls: ['./writeoffstory.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            EcolService,
            DataService])
    ], WriteoffstoryComponent);
    return WriteoffstoryComponent;
}());
export { WriteoffstoryComponent };
//# sourceMappingURL=writeoffstory.component.js.map