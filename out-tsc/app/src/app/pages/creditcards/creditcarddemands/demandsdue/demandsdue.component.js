import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import * as $ from 'jquery';
var DemandsdueComponent = /** @class */ (function () {
    function DemandsdueComponent(ecolService, http) {
        var _this = this;
        this.ecolService = ecolService;
        this.http = http;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.resizeEvent = 'resize.ag-grid';
        this.$win = $(window);
        this.new = true;
        this.model = {};
        this.columnDefs = [
            {
                headerName: 'CARDACCT',
                field: 'cardacct',
                cellRenderer: function (params) {
                    return '<a  href="#" target="_blank">' + params.value + '</a>';
                },
            },
            {
                headerName: 'CARDNUMBER',
                field: 'cardnumber',
            },
            {
                headerName: 'CARDNAME',
                field: 'cardname',
            },
            {
                headerName: 'DAYSINARREARS',
                field: 'daysinarrears',
            },
            {
                headerName: 'EXPPMNT',
                field: 'exppmnt',
                valueFormatter: this.currencyFormatter,
            },
            {
                headerName: 'OUTBALANCE',
                field: 'outbalance',
                valueFormatter: this.currencyFormatter,
            },
            {
                headerName: 'DEMANDLETTER',
                field: 'demandletter',
            },
            {
                headerName: 'CYCLE',
                field: 'cycle',
            },
            {
                headerName: 'STATUS',
                field: 'status',
            },
            {
                headerName: 'COLOFFICER',
                field: 'colofficer',
            },
        ];
        this.dataSource = {
            getRows: function (params) {
                _this.apiService(20, params.startRow).subscribe(function (response) {
                    params.successCallback(response, _this.noTotal);
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
    DemandsdueComponent.prototype.currencyFormatter = function (params) {
        return (Math.floor(params.value * 100) / 100)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    DemandsdueComponent.prototype.formatNumber = function (number) {
        // this puts commas into the number eg 1000 goes to 1,000,
        // i pulled this from stack overflow, i have no idea how it works
        return Math.floor(number)
            .toString()
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };
    DemandsdueComponent.prototype.onRowDoubleClicked = function (event) {
        this.model = event.node.data;
        // tslint:disable-next-line:max-line-length
        window.open(environment.applink +
            '/sendlettercc?cardacct=' +
            this.model.cardacct +
            '&username=' +
            this.username +
            '&demand=' +
            this.model.demandletter +
            '&id=' +
            this.model.id, '_blank');
    };
    DemandsdueComponent.prototype.onQuickFilterChanged = function ($event) {
        // this.gridOptions.api.setQuickFilter($event.target.value);
        this.searchText = $event.target.value;
    };
    DemandsdueComponent.prototype.onSearch = function () {
        var _this = this;
        if (this.model.searchText === undefined) {
            return;
        }
        this.clear();
        this.http
            .get(environment.api +
            '/api/demandsduecc/search?searchtext=' +
            this.model.searchText)
            .subscribe(function (resp) {
            //
            _this.gridApi.updateRowData({ add: resp, addIndex: 0 });
        });
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
        // location.reload();
        this.clear();
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    DemandsdueComponent.prototype.ngOnInit = function () {
        var _this = this;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.ecolService.totalcardsdue().subscribe(function (cards) {
            _this.noTotal = cards[0].TOTALVIEWALL;
        });
    };
    DemandsdueComponent.prototype.gridReady = function (params) {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
        this.gridApi.setDatasource(this.dataSource);
    };
    DemandsdueComponent.prototype.apiService = function (perPage, currentPos) {
        return this.http.get(environment.api +
            '/api/demandsduecc?filter[limit]=' +
            perPage +
            '&filter[skip]=' +
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