import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
var ViewallComponent = /** @class */ (function () {
    function ViewallComponent(http) {
        this.http = http;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model = {};
        this.pivotPanelShow = true;
        this.modules = AllModules;
        this.columnDefs = [
            {
                headerName: 'CARDACCT',
                field: 'CARDACCT',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
                width: 90,
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'CARDNUMBER',
                field: 'CARDNUMBER',
                width: 90,
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'CARDNAME',
                field: 'CARDNAME',
                width: 90,
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'DAYSINARREARS',
                field: 'DAYSINARREARS',
                width: 90,
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'EXPPMNT',
                field: 'EXPPMNT',
                width: 90,
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'OUTSTANDING BALANCE',
                field: 'OUTBALANCE',
                width: 90,
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'LIMIT',
                field: 'LIMIT',
                width: 90,
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'CYCLE',
                field: 'CYCLE',
                width: 90,
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
            },
            {
                headerName: 'COLOFFICER',
                field: 'COLOFFICER',
                width: 90,
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
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
        //
        this.overlayLoadingTemplate =
            // tslint:disable-next-line:max-line-length
            '<span class="ag-overlay-loading-center" style="padding: 10px; border: 1px solid #444; background: blue;">Please wait while your rows are loading</span>';
        this.overlayNoRowsTemplate =
            '<span style="padding: 10px; border: 1px solid #444; background: blue;">There are \'no rows\' </span>';
    }
    ViewallComponent.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        var datasource = {
            getRows: function (params) {
                console.log(JSON.stringify(params.request, null, 1));
                fetch(environment.nodeapi + '/gridcardsviewall/viewall', {
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
        // console.log(this.model);
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink +
            '/activitylog?accnumber=' +
            this.model.CARDACCT +
            '&custnumber=' +
            this.model.CARDACCT +
            '&username=' +
            this.username +
            '&sys=cc', '_blank');
    };
    ViewallComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
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