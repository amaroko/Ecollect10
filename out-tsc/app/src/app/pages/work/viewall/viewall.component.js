import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Router } from '@angular/router';
var ViewallComponent = /** @class */ (function () {
    function ViewallComponent(router) {
        this.router = router;
        this.href = '';
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model = {};
        this.pivotPanelShow = true;
        this.modules = AllModules;
        this.columnDefs = [
            {
                field: 'ACCNUMBER',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return '<a  href="#" target="_blank">' + params.value + '</a>';
                    }
                    else {
                        return 'Record Not Found';
                        // <img src="assets/img/user/loading.gif">
                    }
                },
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'CLIENT_NAME',
                filter: 'agTextColumnFilter',
                width: 200,
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'CUSTNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'BUCKET',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'PRODUCTCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'DAYSINARR',
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'SECTION',
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'OUSTBALANCE',
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
                field: 'PRINCARREARS',
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
                resizable: true,
            },
            {
                field: 'INSTAMOUNT',
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
                resizable: true,
            },
            {
                field: 'LIMITAMOUNT',
                filter: 'agNumberColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'TOTALARREARS',
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
            },
            {
                field: 'RROCODE',
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
                field: 'BRANCHCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'BRANCHNAME',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                field: 'COLOFFICER',
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
    ViewallComponent.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        var datasource = {
            // tslint:disable-next-line:no-shadowed-variable
            getRows: function (params) {
                // console.log(JSON.stringify(params.request, null, 1));
                fetch(environment.nodeapi + '/gridviewall/viewall', {
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
            this.model.ACCNUMBER +
            '&custnumber=' +
            this.model.CUSTNUMBER +
            '&username=' +
            this.currentUser.USERNAME +
            '&sys=collections', '_blank');
    };
    ViewallComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.href = this.router.url;
        console.log(this.router.url);
    };
    ViewallComponent = __decorate([
        Component({
            selector: 'app-viewall',
            templateUrl: './viewall.component.html',
            styleUrls: ['./viewall.component.css'],
        }),
        __metadata("design:paramtypes", [Router])
    ], ViewallComponent);
    return ViewallComponent;
}());
export { ViewallComponent };
//# sourceMappingURL=viewall.component.js.map