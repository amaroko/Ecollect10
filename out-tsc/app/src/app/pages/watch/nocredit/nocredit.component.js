import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { HttpClient} from '@angular/common/http';
import { AllModules } from '@ag-grid-enterprise/all-modules';
var NocreditComponent = /** @class */ (function () {
    function NocreditComponent() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.model = {};
        this.pivotPanelShow = true;
        this.modules = AllModules;
        this.columnDefs = [
            {
                headerName: 'ACCNUMBER',
                field: 'ACCNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
                cellRenderer: function (params) {
                    if (params.value !== undefined) {
                        return '<a  href="#" target="_blank">' + params.value + '</a>';
                    }
                    else {
                        return ''; // <img src="assets/img/user/loading.gif">
                    }
                },
            },
            {
                headerName: 'CUSTNUMBER',
                field: 'CUSTNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
            },
            {
                headerName: 'CUSTNAME',
                field: 'CUSTNAME',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'OUSTBALANCE',
                field: 'OUSTBALANCE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
            },
            {
                headerName: 'PRODUCTCODE',
                field: 'PRODUCTCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'BRANCHCODE',
                field: 'BRANCHCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
            },
            {
                headerName: 'AROCODE',
                field: 'AROCODE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
            },
            {
                headerName: 'REPAYMENTAMOUNT',
                field: 'REPAYMENTAMOUNT',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
            },
            {
                headerName: 'SETTLEACCBAL',
                field: 'SETTLEACCBAL',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: tru,
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
            pivot: true
        };
        this.rowModelType = 'serverSide';
        this.cacheBlockSize = 50;
        this.maxBlocksInCache = 0;
    }
    NocreditComponent.prototype.onGridReady = function (params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        var datasource = {
            // tslint:disable-next-line:no-shadowed-variable
            getRows: function (params) {
                console.log(JSON.stringify(params.request, null, 1));
                fetch(environment.nodeapi + '/gridnocreditbuild/viewall', {
                    method: 'post',
                    body: JSON.stringify(params.request),
                    headers: { 'Content-Type': 'application/json; charset=utf-8' }
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
    NocreditComponent.prototype.currencyFormatter = function (params) {
        if (params.value !== undefined) {
            return (Math.floor(params.value * 100) / 100)
                .toString()
                .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        }
        else {
            return '';
        }
    };
    NocreditComponent.prototype.onRowDoubleClicked = function (event) {
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
    NocreditComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
    };
    NocreditComponent = __decorate([
        Component({
            selector: 'app-nocredit',
            templateUrl: './nocredit.component.html',
            styleUrls: ['./nocredit.component.css'],
        }),
        __metadata("design:paramtypes", [])
    ], NocreditComponent);
    return NocreditComponent;
}());
export { NocreditComponent };
//# sourceMappingURL=nocredit.component.js.map