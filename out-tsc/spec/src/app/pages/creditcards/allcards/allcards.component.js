import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { HttpClient} from '@angular/common/http';
import { AllModules } from '@ag-grid-enterprise/all-modules';

var AllcardsComponent = /** @class */ (function () {
  function AllcardsComponent() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model = {};
    this.pivotPanelShow = true;
    this.modules = AllModules;
    this.columnDefs = [
      {
        headerName: 'CARDACCT',
        field: 'CARDACCT',
        cellRenderer: function (params) {
          if (params.value !== undefined) {
            return '<a  href="#" target="_blank">' + params.value + '</a>';
          } else {
            return ''; // to remove the loading <img src="assets/img/user/loading.gif" alt="Loading Icon">
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
        resizable: true,
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
        resizable: true,
      },
      {
        headerName: 'EXPPMNT',
        field: 'EXPPMNT',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'OUTSTANDING BALANCE',
        field: 'OUTBALANCE',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
      },
      {
        headerName: 'LIMIT',
        field: 'LIMIT',
        filter: 'agTextColumnFilter',
        filterParams: { newRowsAction: 'keep' },
        resizable: true,
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

  AllcardsComponent.prototype.onGridReady = function (params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    var datasource = {
      // tslint:disable-next-line:no-shadowed-variable
      getRows: function (params) {
        console.log(JSON.stringify(params.request, null, 1));
        fetch(environment.nodeapi + '/gridcreditcardsviewallcards/viewall', {
          method: 'post',
          body: JSON.stringify(params.request),
          headers: { 'Content-Type': 'application/json; charset=utf-8' },
        })
          .then(function (httpResponse) {
            return httpResponse.json();
          })
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
  AllcardsComponent.prototype.currencyFormatter = function (params) {
    if (params.value !== undefined) {
      return (Math.floor(params.value * 100) / 100)
        .toString()
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    } else {
      return '';
    }
  };
  AllcardsComponent.prototype.onRowDoubleClicked = function (event) {
    this.model = event.node.data;
    // tslint:disable-next-line:max-line-length
    window.open(
      environment.applink +
        '/activitylog?accnumber=' +
        this.model.CARDACCT +
        '&custnumber=' +
        this.model.CARDACCT +
        '&username=' +
        this.username +
        '&sys=watchcc',
      '_blank'
    );
  };
  AllcardsComponent.prototype.ngOnInit = function () {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  };
  AllcardsComponent = __decorate(
    [
      Component({
        selector: 'app-allcards',
        templateUrl: './allcards.component.html',
        styleUrls: ['./allcards.component.css'],
      }),
      __metadata('design:paramtypes', []),
    ],
    AllcardsComponent
  );
  return AllcardsComponent;
})();
export { AllcardsComponent };
//# sourceMappingURL=allcards.component.js.map
