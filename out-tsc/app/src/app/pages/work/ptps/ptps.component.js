import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AllModules } from '@ag-grid-enterprise/all-modules';

var PtpsComponent = /** @class */ (function() {
  function PtpsComponent() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model = {};
    this.pivotPanelShow = true;
    this.modules = AllModules;
    this.columnDefs = [
      {
        headerName: 'ACCNUMBER',
        field: 'ACCNUMBER',
        cellRenderer: function(params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">
          }
        },
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'STATUS',
        field: 'MET',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'CUST_NAME',
        field: 'CLIENT_NAME',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'PTPAMOUNT',
        field: 'PTPAMOUNT',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'PTPDATE',
        field: 'PTPDATE',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'ACTIONDATE',
        field: 'ACTIONDATE',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'PAYMETHOD',
        field: 'PAYMETHOD',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      },
      {
        headerName: 'OWNER',
        field: 'OWNER',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true
      }
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

  PtpsComponent.prototype.onGridReady = function(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var datasource = {
      // tslint:disable-next-line:no-shadowed-variable
      getRows: function(params) {
        console.log(JSON.stringify(params.request, null, 1));
        fetch(environment.nodeapi + '/gridbrokenptps/viewall', {
          method: 'post',
          body: JSON.stringify(params.request),
          headers: { 'Content-Type': 'application/json; charset=utf-8' }
        })
          .then(function(httpResponse) {
            return httpResponse.json();
          })
          .then(function(response) {
            params.successCallback(response.rows, response.lastRow);
          })
          .catch(function(error) {
            console.error(error);
            params.failCallback();
          });
      }
    };
    params.api.setServerSideDatasource(datasource);
  };
  PtpsComponent.prototype.currencyFormatter = function(params) {
    return (Math.floor(params.value * 100) / 100)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };
  PtpsComponent.prototype.onRowDoubleClicked = function(event) {
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
      '&sys=ptp', '_blank');
  };
  PtpsComponent.prototype.ngOnInit = function() {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  };
  PtpsComponent = __decorate([
    Component({
      selector: 'app-ptps',
      templateUrl: './ptps.component.html',
      styleUrls: ['./ptps.component.css']
    }),
    __metadata('design:paramtypes', [])
  ], PtpsComponent);
  return PtpsComponent;
}());
export { PtpsComponent };
//# sourceMappingURL=ptps.component.js.map
