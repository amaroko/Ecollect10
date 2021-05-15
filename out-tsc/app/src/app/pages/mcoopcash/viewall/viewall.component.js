import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { environment } from '../../../../environments/environment';
var ViewallComponent = /** @class */ (function () {
    function ViewallComponent(http) {
        this.http = http;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model = {};
        this.modules = AllModules;
        this.columnDefs = [
            {
                field: 'LOANACCNUMBER',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return '<a  href="#" target="_blank">' + params.value + '</a>';
                    }
                    else {
                        return '<img src="assets/img/user/loading.gif">';
                    }
                },
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'CLIENTNAME',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'IDNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'ARREARS_CATEGORY',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'LOAN_TYPE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'AROCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'DISBURSALDATE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'AMOUNTDISBURSED',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100)
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    }
                    else {
                        return '';
                    }
                },
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                aggFunc: 'sum',
                resizable: true,
            },
            {
                field: 'REPAYMENTAMOUNT',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return (Math.floor(params.value * 100) / 100)
                            .toString()
                            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                    }
                    else {
                        return '';
                    }
                },
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                aggFunc: 'sum',
                resizable: true,
            },
            {
                field: 'EMPLOYER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'LASTPAYMENTDATE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'DUEDATE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'LOANSTATUS',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'ADDRESS',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'PHONENUMBER',
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
        };
        this.rowModelType = 'serverSide';
        this.cacheBlockSize = 50;
        this.maxBlocksInCache = 0;
    }
    ViewallComponent.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        var datasource = {
            getRows: function (params) {
                fetch(environment.nodeapi + '/gridmcoopcashviewall/viewall', {
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
    ViewallComponent.prototype.ServerSideDatasource = function (server) {
        return {
            getRows: function (params) {
                setTimeout(function () {
                    var response = server.getResponse(params.request);
                    if (response.success) {
                        params.successCallback(response.rows, response.lastRow);
                    }
                    else {
                        params.failCallback();
                    }
                }, 500);
            },
        };
    };
    ViewallComponent.prototype.currencyFormatter = function (params) {
        if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        else {
            return '';
        }
    };
    ViewallComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink +
            '/activitylog?accnumber=' +
            this.model.LOANACCNUMBER +
            '&custnumber=' +
            this.model.LOANACCNUMBER +
            '&username=' +
            this.username +
            '&sys=mcoopcash', '_blank');
    };
    ViewallComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
    };
    ViewallComponent.prototype.onBtnExportDataAsExcel = function () {
        var exportParams = {
            skipHeader: false,
            allColumns: true,
            fileName: 'export.csv',
        };
        var datasource = {
            getRows: function (params) {
                console.log(JSON.stringify(params.request, null, 1));
                fetch(environment.nodeapi + '/gridmcoopcashviewall/viewall', {
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
        this.gridApi.setServerSideDatasource(datasource);
        this.gridApi.exportDataAsExcel(exportParams);
    };
    ViewallComponent = __decorate([
        Component({
            selector: 'app-viewall',
            templateUrl: './viewall.component.html',
            styleUrls: ['./viewall.component.css'],
        })
    ], ViewallComponent);
    return ViewallComponent;
}());
export { ViewallComponent };
//# sourceMappingURL=viewall.component.js.map