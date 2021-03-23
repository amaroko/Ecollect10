import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
// import { EcolService } from '../../../services/ecol.ervice';
import { AllModules } from '@ag-grid-enterprise/all-modules';
var MyworklistComponent = /** @class */ (function () {
    function MyworklistComponent(http) {
        var _this = this;
        this.http = http;
        this.model = {};
        this.modules = AllModules;
        this.pivotPanelShow = true;
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.gridOptions = {
            // suppressCellSelection: true,
            // domLayout: 'autoHeight',
            rowSelection: 'single',
            // rowModelType: 'normal',
            // rowModelType: 'infinite',
            pagination: true,
            paginationPageSize: 20,
            onGridReady: function (params) {
                _this.gridApi = params.api;
                _this.gridColumnApi = params.columnApi;
                // params.api.sizeColumnsToFit();
                // this.gridApi.setDatasource(this.dataSource);
                // environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username
                _this.http
                    .get(environment.api +
                    '/api/tcards/myallocations?colofficer=' +
                    _this.username)
                    .subscribe(function (resp) {
                    console.log(typeof resp); // to check whether object or array
                    _this.str = JSON.stringify(resp, null, 4);
                    var obj = JSON.parse(_this.str);
                    params.api.setRowData(obj.rows);
                });
            },
        };
        this.columnDefs = [
            {
                headerName: 'CARDACCT',
                field: 'CARDACCT',
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return '<a  href="#" target="_blank">' + params.value + '</a>';
                    }
                    else {
                        return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">
                    }
                },
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'CARDNUMBER',
                field: 'CARDNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
            },
            {
                headerName: 'CARDNAME',
                field: 'CARDNAME',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'DAYSINARREARS',
                field: 'DAYSINARREARS',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
            },
            {
                headerName: 'EXPPMNT',
                field: 'EXPPMNT',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'OUTBALANCE',
                field: 'OUTBALANCE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
            },
            {
                headerName: 'CYCLE',
                field: 'CYCLE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'COLOFFICER',
                field: 'COLOFFICER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
        ];
        this.sortingOrder = ['desc', 'asc', null];
        this.defaultColDef = {
            width: 120,
            resizable: true,
            sortable: true,
            floatingFilter: true,
            unSortIcon: true,
            suppressResize: false,
            enableRowGroup: true,
            enablePivot: true,
            pivot: tue,
        };
    }
    MyworklistComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
    };
    MyworklistComponent.prototype.currencyFormatter = function (params) {
        if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        else {
            return '';
        }
    };
    MyworklistComponent.prototype.onRowDoubleClicked = function (event) {
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
    MyworklistComponent = __decorate([
        Component({
            selector: 'app-myworklist',
            templateUrl: './myworklist.component.html',
            styleUrls: ['./myworklist.component.css'],
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], MyworklistComponent);
    return MyworklistComponent;
}());
export { MyworklistComponent };
//# sourceMappingURL=myworklist.component.js.map