import { Component, OnInit } from '@angular/core';
import { GridOptions } from '@ag-grid-community/all-modules';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import swal from 'sweetalert2';
import * as _ from 'lodash';
import { AllModules } from '@ag-grid-enterprise/all-modules';

declare var $: any;

@Component({
  selector: 'app-automation',
  templateUrl: './automation.component.html',
  styleUrls: ['./automation.component.css'],
})
export class AutomationComponent implements OnInit {
  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];
  modules = AllModules;
  gridOptions: GridOptions;

  // Basic example
  columnDefs = [
    /*{
      headerName: '',
      field: 'memogroup',
      cellRenderer: params => {
        return `<input type='checkbox' ${params.value ? 'checked' : 'true'} />`
      }
    },*/
    {
      headerName: 'Memo Group',
      field: 'memogroup',
      width: 150,
    },
    {
      headerName: 'Demand Letter',
      field: 'letterid',
      width: 120,
    },
    {
      headerName: 'Daysinarr',
      field: 'daysinarr',
      width: 90,
    },
    {
      headerName: 'Lastupdateby',
      field: 'lastupdateby',
      width: 90,
    },
    {
      headerName: 'Lastupdate',
      field: 'lastupdate',
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
  // public items: Array<string> = [];
  public items: Array<string> = [];
  model: any = {};
  dataList: any;

  constructor(
    private ecolService: EcolService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    http: HttpClient
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

    http.get<any>(environment.api + '/api/autoletters').subscribe((resp) => {
      this.rowData1 = resp;
    });
  }

  onRowClicked(event: any) {
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    this.model.lastupdate = new Date();
    this.model.active =
      event.node.data.active.toLowerCase() === 'true' ? true : false;
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // get memos
    this.getMemos();
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

  fneditSubmit(form) {
    this.spinner.show();
    this.ecolService.putautoLetter(this.model).subscribe(
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
    this.ecolService.getautoLetter().subscribe((res) => {
      this.rowData1 = res;
    });
  }

  getMemos() {
    this.ecolService.getmemo().subscribe((res) => {
      if (res.data && res.data.length > 0) {
        for (let i = 0; i < res.data.length; i++) {
          this.items.push(res.data[i].MEMO);
        }
      }
    });
  }

  // postautoLetter

  addNew(form) {
    const body = {
      letterid: form.value.letterid,
      memogroup: form.value.memogroup,
      daysinarr: form.value.daysinarr,
      lastupdate: new Date(),
      lastupdateby: this.username,
      active: true,
    };
    // check duplicate
    this.ecolService.postcheckautoLetter(body).subscribe(
      (resp) => {
        //
        let reject = false;
        const acceptModel = [];
        const rejectModel = [];
        for (let i = 0; i < resp.length; i++) {
          if (resp[i].isduplicate === true) {
            // add to reject
            reject = true;
            rejectModel[i] = resp[i];
          } else {
            acceptModel[i] = resp[i];
          }
        }
        if (reject) {
          // reject request
          swal.fire('Error!', 'Request contains duplicates!', 'error');
          swal.fire({
            icon: 'error',
            title: 'Duplicates detected...',
            text: JSON.stringify(rejectModel),
            footer: '<a href>Find help on this issue?</a>',
          });
        } else {
          // acccepts and post
          this.spinner.show();
          this.ecolService.postautoLetter(acceptModel).subscribe((data) => {
            swal.fire('Success!', 'Successfully added!', 'success');
            this.spinner.hide();
            this.getData();
          });
        }
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'Error occurred during processing!', 'error');
      }
    );
  }

  editSubmit(form) {
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
          this.fneditSubmit(form);
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
