import { __decorate, __metadata } from 'tslib';
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
          .get(
            environment.api +
              '/api/tqall/paged/myallocation?colofficer=' +
              _this.username
          )
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
        headerName: 'ACCNUMBER',
        field: 'accnumber',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">
          }
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'CUSTNUMBER',
        field: 'custnumber',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'CUST_NAME',
        field: 'client_name',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'DAYSINARREARS',
        field: 'daysinarr',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
        cellStyle: function (params) {
          if (params.value < '30') {
            return { color: 'red' };
          } else if (params.value > '90') {
            return { color: 'red' };
          } else {
            return null;
          }
        },
      },
      {
        headerName: 'TOTALARREARS',
        field: 'instamount',
        valueFormatter: this.currencyFormatter,
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'OUSTBALANCE',
        field: 'oustbalance',
        valueFormatter: this.currencyFormatter,
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'BUCKET',
        field: 'bucket',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'AROCODE',
        field: 'arocode',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'SECTION',
        field: 'section',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'COLOFFICER',
        field: 'colofficer',
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
      pivot: true,
    };
  }

  /*dataSource: IDatasource = {
    getRows: (params: IGetRowsParams) => {
      // Use startRow and endRow for sending pagination to Backend
      // params.startRow : Start Page
      // params.endRow : End Page
      //
      this.apiService(20, params.startRow).subscribe(response => {
        params.successCallback(
          response.data, response.totalRecords
        );
      });
    }
  };*/
  MyworklistComponent.prototype.ngOnInit = function () {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  };
  MyworklistComponent.prototype.currencyFormatter = function (params) {
    if (params.value !== undefined) {
      return (Math.floor(params.value * 100) / 100)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return '';
    }
  };
  MyworklistComponent.prototype.onRowDoubleClicked = function (event) {
    this.model = event.node.data;
    // console.log(this.model);
    // tslint:disable-next-line:max-line-length
    window.open(
      environment.applink +
        '/activitylog?accnumber=' +
        this.model.ACCNUMBER +
        '&custnumber=' +
        this.model.CUSTNUMBER +
        '&username=' +
        this.currentUser.USERNAME +
        '&sys=collections',
      '_blank'
    );
  };
  MyworklistComponent = __decorate(
    [
      Component({
        selector: 'app-myworklist',
        templateUrl: './myworklist.component.html',
        styleUrls: ['./myworklist.component.css'],
      }),
      __metadata('design:paramtypes', [HttpClient]),
    ],
    MyworklistComponent
  );
  return MyworklistComponent;
})();
export { MyworklistComponent };
//# sourceMappingURL=myworklist.component.js.map
