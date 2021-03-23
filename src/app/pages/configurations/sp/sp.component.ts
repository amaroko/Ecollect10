import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { GridOptions } from '@ag-grid-community/all-modules';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { EcolService } from '../../../services/ecol.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-sp',
  templateUrl: './sp.component.html',
  styleUrls: ['./sp.component.css'],
})
export class SpComponent implements OnInit {
  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];

  gridOptions: GridOptions;
  modules = AllModules;

  // Basic example
  columnDefs = [
    {
      headerName: 'Service Provider',
      field: 'SPTITLE',
      width: 150,
    },
    {
      headerName: 'Contact',
      field: 'CONTACTPERSON',
      width: 120,
    },
    {
      headerName: 'Telephone',
      field: 'TELEPHONE',
      width: 90,
    },
    {
      headerName: 'Startdate',
      field: 'STARTDATE',
      width: 90,
    },
    {
      headerName: 'Endofindemnity',
      field: 'ENDOFINDEMNITY',
      width: 100,
    },
  ];
  rowData1: any;
  // tslint:disable-next-line:max-line-length
  username: string;
  postModel: any = {};
  postBody: any = [];
  public singleData;

  // tslint:disable-next-line:max-line-length
  public itemsDemands: Array<string> = ['sms1', 'sms2', 'sms3'];
  // public items: Array<string> = [];
  public items: Array<string> = [];
  model: any = {};
  dataList: any;

  constructor(
    private ecolService: EcolService,
    private spinner: NgxSpinnerService,
    private http: HttpClient
  ) {
    // Basic example
    this.gridOptions = <GridOptions>{
      headerHeight: 40,
      columnDefs: this.columnDefs,
      rowData: null,
      enableFilter: true,
      rowSelection: 'single',
      // onRowClicked: this.RowSelected,
    };

    http.get<any>(environment.api + '/api/sptypes').subscribe((resp) => {
      this.rowData1 = resp;
    });
  }

  onRowClicked(event: any) {
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    this.model.lastupdate = new Date();
    // this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
  }

  gridReady(params) {
    params.api.sizeColumnsToFit();
    this.$win.on(this.resizeEvent, () => {
      setTimeout(() => {
        params.api.sizeColumnsToFit();
      });
    });
  }

  shownew() {
    this.new = true;
    this.model = {};
  }

  fneditSubmit(body) {
    this.spinner.show();
    this.ecolService.putsptype(body).subscribe(
      (resp) => {
        swal.fire('Success!', 'Update successful!', 'success');
        this.getData();
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        swal.fire('Eror!', 'Update was not completed!', 'error');
        this.spinner.hide();
      }
    );
  }

  getData() {
    this.http.get<any>(environment.api + '/api/sptypes').subscribe((resp) => {
      this.rowData1 = resp;
    });
  }

  editSubmit(form) {
    const body = {
      SPTITLE: this.model.SPTITLE,
      CONTACTPERSON: form.value.CONTACTPERSON,
      TELEPHONE: form.value.TELEPHONE,
      SPCODE: form.value.SPCODE,
      STARTDATE: moment(form.value.STARTDATE).format('DD-MMM-YYYY'),
      ACCNUMBER: form.value.ACCNUMBER,
      COVERAGE: form.value.COVERAGE,
      ADDRESS: form.value.ADDRESS,
      ENDOFINDEMNITY: form.value.ENDOFINDEMNITY,
      EMAIL: form.value.EMAIL,
      ACTIVE: 'Y',
    };
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to Update!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Update!',
      })
      .then((result) => {
        if (result.value) {
          this.fneditSubmit(body);
        }
      });
  }

  delete() {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to DELETE!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete!',
      })
      .then((result) => {
        if (result.value) {
          //
        }
      });
  }
}
