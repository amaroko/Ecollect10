import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
var SmsComponent = /** @class */ (function () {
    function SmsComponent(ecolService, route, spinner, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.route = route;
        this.spinner = spinner;
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.memos = [];
        // Basic example
        this.columnDefs = [
            {
                headerName: 'Type',
                field: 'memogroup',
                width: 150,
            },
            {
                headerName: 'Message',
                field: 'letterid',
                width: 120,
            },
            {
                headerName: 'Daysinarr',
                field: 'daysinarr',
                width: 90,
            },
            {
                headerName: 'Lastupdateby',
                field: 'lastupdateby',
                width: 90,
            },
            {
                headerName: 'Lastupdate',
                field: 'lastupdate',
                width: 100,
            },
        ];
        this.postModel = {};
        this.postBody = [];
        // tslint:disable-next-line:max-line-length
        this.itemsDemands = ['sms1', 'sms2', 'sms3'];
        // public items: Array<string> = [];
        this.items = [];
        this.model = {};
        // Basic example
        this.gridOptions = {
            headerHeight: 40,
            columnDefs: this.columnDefs,
            rowData: null,
            enableFilter: true,
            rowSelection: 'single',
        };
        http.get(environment.api + '/api/autoletters').subscribe(function (resp) {
            _this.rowData1 = resp;
        });
    }
    SmsComponent.prototype.onRowClicked = function (event) {
        this.new = false;
        this.model = event.node.data;
        this.model.lastupdateby = this.username;
        this.model.lastupdate = new Date();
        this.model.active = event.node.data.active.toLowerCase() === 'true';
    };
    SmsComponent.prototype.onQuickFilterChanged = function ($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    };
    SmsComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        // get memos
        this.getMemos();
    };
    SmsComponent.prototype.gridReady = function (params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });
    };
    SmsComponent.prototype.shownew = function () {
        this.new = true;
        this.model = {};
    };
    SmsComponent.prototype.fneditSubmit = function (form) {
        var _this = this;
        this.spinner.show();
        this.ecolService.putautoLetter(this.model).subscribe(function (resp) {
            swal.fire('Success!', 'Update successful!', 'success');
            _this.getData();
            _this.spinner.hide();
        }, function (error) {
            console.log(error);
            swal.fire('Eror!', 'Update was not completed!', 'error');
            _this.spinner.hide();
        });
    };
    SmsComponent.prototype.getData = function () {
        var _this = this;
        this.ecolService.getautoLetter().subscribe(function (res) {
            _this.rowData1 = res;
        });
    };
    SmsComponent.prototype.getMemos = function () {
        var _this = this;
        this.ecolService.getmemo().subscribe(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                _this.items.push(res.data[i].MEMO);
            }
            console.log('Array==>', _this.items);
        });
    };
    // postautoLetter
    SmsComponent.prototype.addNew = function (form) {
        var _this = this;
        var body = {
            letterid: form.value.letterid,
            memogroup: form.value.memogroup,
            daysinarr: form.value.daysinarr,
            lastupdate: new Date(),
            lastupdateby: this.username,
            active: true,
        };
        // check duplicate
        this.ecolService.postcheckautoLetter(body).subscribe(function (resp) {
            //
            var reject = false;
            var acceptModel = [];
            var rejectModel = [];
            for (var i = 0; i < resp.length; i++) {
                if (resp[i].isduplicate === true) {
                    // add to reject
                    reject = true;
                    rejectModel[i] = resp[i];
                }
                else {
                    acceptModel[i] = resp[i];
                }
            }
            if (reject) {
                // reject request
                swal.fire('Error!', 'Request contains duplicates!', 'error');
                swal.fire({
                    icon: 'error',
                    title: 'Duplicates detected...',
                    text: JSON.stringify(rejectModel),
                    footer: '<a href>Find help on this issue?</a>',
                });
            }
            else {
                // acccepts and post
                _this.spinner.show();
                _this.ecolService.postautoLetter(acceptModel).subscribe(function (data) {
                    swal.fire('Success!', 'Successfully added!', 'success');
                    _this.spinner.hide();
                    _this.getData();
                });
            }
        }, function (error) {
            console.log(error);
            swal.fire('Error!', 'Error occurred during processing!', 'error');
        });
    };
    SmsComponent.prototype.editSubmit = function (form) {
        var _this = this;
        swal
            .fire({
            title: 'Are you sure?',
            text: 'You want to Update!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Update!',
        })
            .then(function (result) {
            if (result.value) {
                _this.fneditSubmit(form);
            }
        });
    };
    SmsComponent.prototype.delete = function () {
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
    SmsComponent = __decorate([
        Component({
            selector: 'app-sms',
            templateUrl: './sms.component.html',
            styleUrls: ['./sms.component.css'],
        }),
        __metadata("design:paramtypes", [EcolService,
            ActivatedRoute,
            NgxSpinnerService,
            HttpClient])
    ], SmsComponent);
    return SmsComponent;
}());
export { SmsComponent };
//# sourceMappingURL=sms.component.js.map