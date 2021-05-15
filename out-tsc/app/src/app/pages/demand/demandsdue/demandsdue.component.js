import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import * as $ from 'jquery';
var DemandsdueComponent = /** @class */ (function () {
    function DemandsdueComponent(ecolService, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.http = http;
        this.model = {};
        this.total = {};
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.columnDefs = [
            {
                headerName: 'ACCNUMBER',
                field: 'ACCNUMBER',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
            },
            {
                headerName: 'CLIENTNAME',
                field: 'CLIENT_NAME',
            },
            {
                headerName: 'OUSTBALANCE',
                field: 'OUSTBALANCE',
                valueFormatter: this.currencyFormatter,
            },
            {
                headerName: 'TOTALARREARS',
                field: 'TOTALARREARS',
                valueFormatter: this.currencyFormatter,
            },
            {
                headerName: 'DAYSINARR',
                field: 'DAYSINARR',
            },
            {
                headerName: 'EMAILADDRESS',
                field: 'EMAILADDRESS',
            },
            {
                headerName: 'DATEDUE',
                field: 'DATEDUE',
            },
            {
                headerName: 'DEMANDLETTER',
                field: 'DEMANDLETTER',
            },
            {
                headerName: 'COLOFFICER',
                field: 'COLOFFICER',
            },
            {
                headerName: 'STATUS',
                field: 'STATUS',
            },
        ];
        this.dataSource = {
            getRows: function (params) {
                _this.apiService(20, params.startRow).subscribe(function (response) {
                    params.successCallback(response.data, response.totalRecords);
                    if (response.data.length > 0) {
                        _this.gridOptions.api.hideOverlay();
                    }
                    else {
                        _this.gridOptions.api.showNoRowsOverlay();
                    }
                });
            },
        };
        this.gridOptions = {
            headerHeight: 40,
            pagination: true,
            rowSelection: 'single',
            rowModelType: 'infinite',
            cacheBlockSize: 20,
            paginationPageSize: 20,
        };
    }
    DemandsdueComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink +
            '/sendletter?accnumber=' +
            this.model.ACCNUMBER +
            '&custnumber=' +
            this.model.CUSTNUMBER +
            '&username=' +
            this.username +
            '&demand=' +
            this.model.DEMANDLETTER +
            '&id=' +
            this.model.ID, '_blank');
    };
    DemandsdueComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    DemandsdueComponent.prototype.currencyFormatter = function (params) {
        return (Math.floor(params.value * 100) / 100)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    DemandsdueComponent.prototype.onSearch = function () {
        var _this = this;
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.gridApi.showLoadingOverlay();
        this.dataSource = {
            getRows: function (params) {
                // Use startRow and endRow for sending pagination to Backend
                // params.startRow : Start Page
                // params.endRow : End Page
                //
                _this.apiServiceSearch(20, params.startRow).subscribe(function (response) {
                    params.successCallback(response.data, response.totalRecords);
                    if (response.data.length > 0) {
                        _this.gridOptions.api.hideOverlay();
                    }
                    else {
                        _this.gridOptions.api.showNoRowsOverlay();
                    }
                });
            },
        };
        this.gridApi.setDatasource(this.dataSource);
    };
    DemandsdueComponent.prototype.clear = function () {
        var ds = {
            getRows: function (params) {
                params.successCallback([], 0);
            },
        };
        this.gridOptions.api.setDatasource(ds);
    };
    DemandsdueComponent.prototype.reset = function () {
        var _this = this;
        this.gridApi.showLoadingOverlay();
        this.clear();
        this.dataSource = {
            getRows: function (params) {
                _this.apiService(20, params.startRow).subscribe(function (response) {
                    params.successCallback(response.data, response.totalRecords);
                    if (response.data.length > 0) {
                        _this.gridOptions.api.hideOverlay();
                    }
                    else {
                        _this.gridOptions.api.showNoRowsOverlay();
                    }
                });
            },
        };
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    DemandsdueComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.ecolService.totaldemandsdue().subscribe(function (viewall) {
            _this.noTotal = viewall[0].TOTALVIEWALL;
        });
    };
    DemandsdueComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
        this.gridOptions.api.showLoadingOverlay();
    };
    DemandsdueComponent.prototype.apiService = function (perPage, currentPos) {
        // return this.http.get<any>(environment.api + '/api/qall?filter[limit]=' + perPage + '&filter[skip]=' + currentPos);
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.nodeapi +
            '/demandsdue/all?offset=' +
            currentPos +
            '&rows=' +
            perPage);
    };
    DemandsdueComponent.prototype.apiServiceSearch = function (perPage, currentPos) {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.nodeapi +
            '/demandsdue/all_search?searchtext=' +
            this.model.searchText +
            '&rows=' +
            perPage +
            '&offset=' +
            currentPos);
    };
    DemandsdueComponent = __decorate([
        Component({
            selector: 'app-demandsdue',
            templateUrl: './demandsdue.component.html',
            styleUrls: ['./demandsdue.component.css'],
        })
    ], DemandsdueComponent);
    return DemandsdueComponent;
}());
export { DemandsdueComponent };
//# sourceMappingURL=demandsdue.component.js.map