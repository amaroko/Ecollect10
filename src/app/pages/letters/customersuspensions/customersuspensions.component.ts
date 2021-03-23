import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { GridOptions } from '@ag-grid-community/all-modules';

declare var $: any;

@Component({
  selector: 'app-customersuspensions',
  templateUrl: './customersuspensions.component.html',
  styleUrls: ['./customersuspensions.component.css'],
})
export class CustomersuspensionsComponent implements OnInit {
  username: string;
  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;

  gridOptions: GridOptions;

  columnDefs = [
    /*{
      headerName: '',
      field: 'memogroup',
      cellRenderer: params => {
        return `<input type='checkbox' ${params.value ? 'checked' : 'true'} />`
      }
    },*/
    {
      headerName: 'Custnumber',
      field: 'custnumber',
      width: 90,
    },
    {
      headerName: 'demand1',
      field: 'demand1',
      width: 90,
    },
    {
      headerName: 'demand2',
      field: 'demand2',
      width: 90,
    },
    {
      headerName: 'prelisting',
      field: 'prelisting',
      width: 90,
    },
    {
      headerName: 'overduecc',
      field: 'overduecc',
      width: 100,
    },
    {
      headerName: 'prelistingcc',
      field: 'prelistingcc',
      width: 90,
    },
    {
      headerName: 'suspension',
      field: 'suspension',
      width: 90,
    },
    /*{
      headerName: 'PostlistingUnsecuredcc',
      field: 'PostlistingUnsecuredcc',
      width: 100
    }, {
      headerName: 'PostlistingSecured',
      field: 'PostlistingSecured',
      width: 90
    }, {
      headerName: 'PostlistingUnsecured',
      field: 'PostlistingUnsecured',
      width: 90
    }, {
      headerName: 'Day90',
      field: 'Day90',
      width: 100
    }, {
      headerName: 'Day40',
      field: 'Day40',
      width: 90
    }, {
      headerName: 'Day30',
      field: 'Day30',
      width: 90
    },*/
    {
      headerName: 'prelistingremedial',
      field: 'prelistingremedial',
      width: 100,
    },
  ];
  rowData1: any;
  postModel: any = {};
  postBody: any = [];
  public singleData;

  // tslint:disable-next-line:max-line-length
  public itemsDemands: Array<string> = [
    'demand1',
    'demand2',
    'prelisting',
    'PostlistingSecured',
    'PostlistingUnsecured',
    'Day90',
    'Day40',
    'Day30',
    'prelistingremedial',
    'overduecc',
    'prelistingcc',
    'suspension',
    'PostlistingUnsecuredcc',
  ];

  model: any = {};
  dataList: any;

  constructor(
    private ecolService: EcolService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    http: HttpClient
  ) {
    this.gridOptions = <GridOptions>{
      headerHeight: 40,
      columnDefs: this.columnDefs,
      rowData: null,
      enableFilter: true,
      rowSelection: 'single',
      // onRowClicked: this.RowSelected,
    };

    http
      .get<any>(environment.api + '/api/customersuspensions')
      .subscribe((resp) => {
        this.rowData1 = resp;
      });
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
    this.model.owner = currentUser.username;
  }

  gridReady(params) {
    params.api.sizeColumnsToFit();
    this.$win.on(this.resizeEvent, () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
  }

  putSuspension(form) {
    console.log(form);
    this.spinner.show();
    this.ecolService.putcustomersuspensions(form).subscribe(
      (cust) => {
        swal.fire('Success!', 'Update successful!', 'success');
        this.getData();
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getData() {
    this.ecolService.getcustomersuspensions().subscribe((res) => {
      this.rowData1 = res;
    });
  }

  onRowClicked(event: any) {
    this.model.custnumber = event.node.data.custnumber;
    this.model.demand1 = event.node.data.demand1 === 'true';
    this.model.demand2 = event.node.data.demand2 === 'true';
    this.model.prelisting = event.node.data.prelisting === 'true';
    this.model.overduecc = event.node.data.overduecc === 'true';
    this.model.prelistingcc = event.node.data.prelistingcc === 'true';
    this.model.prelistingremedial =
      event.node.data.prelistingremedial === 'true';
    this.model.day30 = event.node.data.day30 === 'true';
    this.model.day40 = event.node.data.day40 === 'true';
    this.model.day90 = event.node.data.day90 === 'true';
    this.model.suspension = event.node.data.suspension === 'true';
    this.model.postlistingsecured =
      event.node.data.postlistingsecured === 'true';
    this.model.postlistingunsecured =
      event.node.data.postlistingunsecured === 'true';
    this.model.postlistingunsecuredcc =
      event.node.data.postlistingunsecuredcc === 'true';
  }
}
