import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { HttpClient} from '@angular/common/http';
import { AllModules } from '@ag-grid-enterprise/all-modules';
var AllloansComponent = /** @class */ (function () {
    function AllloansComponent() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model = {};
        this.pivotPanelShow = true;
        this.modules = AllModules;
        this.columnDefs = [
            {
                headerName: 'ACCNUMBER',
                field: 'ACCNUMBER',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return '<a  href="#" target="_blank">' + params.value + '</a>';
                    }
                    else {
                        return 'No Data Found';
                        // return ''; // <img src="assets/img/user/loading.gif">
                    }
                },
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'CUSTNUMBER',
                field: 'CUSTNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'CUSTNAME',
                field: 'CUSTNAME',
                width: 300,
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'BRANCHNAME',
                field: 'BRANCHNAME',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'BRANCHCODE',
                field: 'BRANCHCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'OUSTBALANCE',
                field: 'OUSTBALANCE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'PRODUCTCODE',
                field: 'PRODUCTCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'AROCODE',
                field: 'AROCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'NATIONID',
                field: 'NATIONID',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'EMPLOYER',
                field: 'EMPLOYER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
        ];
        this.defaultColDef = {
            width: 120,
            resizable: true,
            sortable: true,
            floatingFilter: true,
            unSortIcon: true,
            suppressResize: false,
            enableRowGroup: true,
            enablePivot: true,
            pivot: true,
        };
        this.rowModelType = 'serverSide';
        this.cacheBlockSize = 50;
        this.maxBlocksInCache = 0;
    }
    AllloansComponent.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        var datasource = {
            // tslint:disable-next-line:no-shadowed-variable
            getRows: function (params) {
                // console.log(JSON.stringify(params.request, null, 1));
                fetch(environment.nodeapi + '/gridviewallloans/viewall', {
                    // fetch(environment.api + '/api/watch_stage/gridviewall_loans', {
                    method: 'post',
                    body: JSON.stringify(params.request),
                    headers: { 'Content-Type': 'application/json; charset=utf-8' },
                })
                    .then(function (httpResponse) { return httpResponse.json(); })
                    .then(function (response) {
                    params.successCallback(response.rows, response.lastRow);
                })
                    .catch(function (error) {
                    console.error(error);
                    params.failCallback();
                });
            },
        };
        params.api.setServerSideDatasource(datasource);
    };
    AllloansComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink +
            '/activitylog?accnumber=' +
            this.model.ACCNUMBER +
            '&custnumber=' +
            this.model.CUSTNUMBER +
            '&username=' +
            this.currentUser.USERNAME +
            '&sys=watch', '_blank');
    };
    AllloansComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
    };
    AllloansComponent = __decorate([
        Component({
            selector: 'app-allloans',
            templateUrl: './allloans.component.html',
            styleUrls: ['./allloans.component.css'],
        })
    ], AllloansComponent);
    return AllloansComponent;
}());
export { AllloansComponent };
//# sourceMappingURL=allloans.component.js.map