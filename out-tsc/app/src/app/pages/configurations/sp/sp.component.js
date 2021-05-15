import { __decorate } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
var SpComponent = /** @class */ (function () {
    function SpComponent(ecolService, spinner, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.spinner = spinner;
        this.http = http;
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.memos = [];
        this.modules = AllModules;
        // Basic example
        this.columnDefs = [
            {
                headerName: 'Service Provider',
                field: 'SPTITLE',
                width: 150,
            },
            {
                headerName: 'Contact',
                field: 'CONTACTPERSON',
                width: 120,
            },
            {
                headerName: 'Telephone',
                field: 'TELEPHONE',
                width: 90,
            },
            {
                headerName: 'Startdate',
                field: 'STARTDATE',
                width: 90,
            },
            {
                headerName: 'Endofindemnity',
                field: 'ENDOFINDEMNITY',
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
            // onRowClicked: this.RowSelected,
        };
        http.get(environment.api + '/api/sptypes').subscribe(function (resp) {
            _this.rowData1 = resp;
        });
    }
    SpComponent.prototype.onRowClicked = function (event) {
        this.new = false;
        this.model = event.node.data;
        this.model.lastupdateby = this.username;
        this.model.lastupdate = new Date();
        // this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
    };
    SpComponent.prototype.onQuickFilterChanged = function ($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    };
    SpComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
    };
    SpComponent.prototype.gridReady = function (params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });
    };
    SpComponent.prototype.shownew = function () {
        this.new = true;
        this.model = {};
    };
    SpComponent.prototype.fneditSubmit = function (body) {
        var _this = this;
        this.spinner.show();
        this.ecolService.putsptype(body).subscribe(function (resp) {
            swal.fire('Success!', 'Update successful!', 'success');
            _this.getData();
            _this.spinner.hide();
        }, function (error) {
            console.log(error);
            swal.fire('Eror!', 'Update was not completed!', 'error');
            _this.spinner.hide();
        });
    };
    SpComponent.prototype.getData = function () {
        var _this = this;
        this.http.get(environment.api + '/api/sptypes').subscribe(function (resp) {
            _this.rowData1 = resp;
        });
    };
    SpComponent.prototype.editSubmit = function (form) {
        var _this = this;
        var body = {
            SPTITLE: this.model.SPTITLE,
            CONTACTPERSON: form.value.CONTACTPERSON,
            TELEPHONE: form.value.TELEPHONE,
            SPCODE: form.value.SPCODE,
            STARTDATE: moment(form.value.STARTDATE).format('DD-MMM-YYYY'),
            ACCNUMBER: form.value.ACCNUMBER,
            COVERAGE: form.value.COVERAGE,
            ADDRESS: form.value.ADDRESS,
            ENDOFINDEMNITY: form.value.ENDOFINDEMNITY,
            EMAIL: form.value.EMAIL,
            ACTIVE: 'Y',
        };
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
                _this.fneditSubmit(body);
            }
        });
    };
    SpComponent.prototype.delete = function () {
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
    SpComponent = __decorate([
        Component({
            selector: 'app-sp',
            templateUrl: './sp.component.html',
            styleUrls: ['./sp.component.css'],
        })
    ], SpComponent);
    return SpComponent;
}());
export { SpComponent };
//# sourceMappingURL=sp.component.js.map