import { __decorate } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
var PlanmemosComponent = /** @class */ (function () {
    function PlanmemosComponent(ecolService, route, spinner, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.route = route;
        this.spinner = spinner;
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.memos = [];
        this.accplans = [];
        // Basic example
        this.columnDefs = [
            {
                headerName: 'planid',
                field: 'planid',
                width: 90,
            },
            {
                headerName: 'plantitle',
                field: 'plantitle',
                width: 150,
            },
            {
                headerName: 'memogroup',
                field: 'memogroup',
                width: 120,
            },
            {
                headerName: 'updatedby',
                field: 'updateby',
                width: 90,
            },
        ];
        this.postModel = {};
        this.postBody = [];
        // public items: Array<string> = [];
        this.items = [];
        this.model = {};
        this.memogroups = [];
        // Basic example
        this.gridOptions = {
            headerHeight: 40,
            columnDefs: this.columnDefs,
            rowData: null,
            enableFilter: true,
            rowSelection: 'single',
            // onRowClicked: this.RowSelected,
        };
        http
            .get(environment.api + '/api/tbl_s_planmemos')
            .subscribe(function (resp) {
            _this.rowData1 = resp;
        });
    }
    PlanmemosComponent.prototype.onRowClicked = function (event) {
        this.new = false;
        this.model = event.node.data;
        this.model.lastupdateby = this.username;
        // this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
    };
    PlanmemosComponent.prototype.deleteplanmemos = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.model.planid = form.planid;
        this.model.memogroup = form.memogroup;
        this.model.plantitle = form.plantitle;
        swal
            .fire({
            title: 'Are you sure?',
            text: 'You want to Delete Memogroup ' +
                form.memogroup +
                ' from Plan ' +
                form.plantitle,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!',
        })
            .then(function (result) {
            if (result.value) {
                _this.fndeleteSubmit(form);
            }
        });
    };
    PlanmemosComponent.prototype.onQuickFilterChanged = function ($event) {
        this.gridOptions.api.setQuickFilter($event.target.value);
    };
    PlanmemosComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        // get memos
        this.getMemos();
        this.getplans();
        this.getData();
    };
    PlanmemosComponent.prototype.gridReady = function (params) {
        params.api.sizeColumnsToFit();
        this.$win.on(this.resizeEvent, function () {
            setTimeout(function () {
                params.api.sizeColumnsToFit();
            });
        });
    };
    PlanmemosComponent.prototype.shownew = function () {
        this.new = true;
        this.model = {};
    };
    PlanmemosComponent.prototype.fndeleteSubmit = function (form) {
        var _this = this;
        this.spinner.show();
        this.ecolService.delete_s_planmemos(form.id).subscribe(function (resp) {
            swal.fire('Success!', 'Delete successful!', 'success');
            _this.getData();
            _this.spinner.hide();
        }, function (error) {
            console.log(error);
            swal.fire('Eror!', 'Delete was not completed!', 'error');
            _this.spinner.hide();
        });
    };
    PlanmemosComponent.prototype.getData = function () {
        var _this = this;
        this.ecolService.getplanmemos().subscribe(function (res) {
            _this.rowData1 = res;
            console.log(res);
        });
    };
    PlanmemosComponent.prototype.getplans = function () {
        var _this = this;
        this.ecolService.getallplans().subscribe(function (res) {
            _this.accplans = res;
        });
    };
    PlanmemosComponent.prototype.getMemos = function () {
        var _this = this;
        this.ecolService.getmemo().subscribe(function (res) {
            for (var i = 0; i < res.data.length; i++) {
                _this.items.push(res.data[i].MEMO);
                _this.memogroups = res.data[i];
                console.log(res.data[i]);
            }
        });
    };
    PlanmemosComponent.prototype.addNew = function (form) {
        var _this = this;
        var postArray = [];
        // get plantitle
        this.ecolService.planmemo(form.planid).subscribe(function (resp) {
            //
            for (var i = 0; i < form.memogroup.length; i++) {
                var body = {
                    planid: form.planid,
                    plantitle: resp.plantitle,
                    memogroup: form.memogroup[i],
                    updateby: _this.username,
                };
                postArray.push(body);
            }
            console.log(postArray);
            _this.spinner.show();
            _this.ecolService.postplanmemo(postArray).subscribe(function (data) {
                swal.fire('Success!', 'Plan-memo Successfully added!', 'success');
                _this.spinner.hide();
                _this.getData();
            }, function (error) {
                console.log(error);
                swal.fire('Error!', 'Error occurred during processing!', 'error');
                _this.spinner.hide();
            });
        }, function (error) {
            console.log(error);
        });
    };
    PlanmemosComponent.prototype.deleteSubmit = function (form) {
        var _this = this;
        swal
            .fire({
            title: 'Are you sure?',
            text: 'You want to Delete!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Delete!',
        })
            .then(function (result) {
            if (result.value) {
                _this.fndeleteSubmit(form);
            }
        });
    };
    PlanmemosComponent = __decorate([
        Component({
            selector: 'app-planmemos',
            templateUrl: './planmemos.component.html',
            styleUrls: ['./planmemos.component.css'],
        })
    ], PlanmemosComponent);
    return PlanmemosComponent;
}());
export { PlanmemosComponent };
//# sourceMappingURL=planmemos.component.js.map