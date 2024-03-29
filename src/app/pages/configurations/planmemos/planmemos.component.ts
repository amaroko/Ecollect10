import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { GridOptions } from '@ag-grid-community/all-modules';
import { EcolService } from '../../../services/ecol.service';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

declare var $: any;

@Component({
  selector: 'app-planmemos',
  templateUrl: './planmemos.component.html',
  styleUrls: ['./planmemos.component.css'],
})
export class PlanmemosComponent implements OnInit {
  resizeEvent = 'resize.ag-grid';
  $win = $(window);
  new = true;
  memos: any = [];
  accplans: any = [];

  gridOptions: GridOptions;

  // Basic example
  columnDefs = [
    {
      headerName: 'planid',
      field: 'planid',
      width: 90,
    },
    {
      headerName: 'plantitle',
      field: 'plantitle',
      width: 150,
    },
    {
      headerName: 'memogroup',
      field: 'memogroup',
      width: 120,
    },
    {
      headerName: 'updatedby',
      field: 'updateby',
      width: 90,
    },
  ];
  rowData1: any;
  // tslint:disable-next-line:max-line-length
  username: string;
  postModel: any = {};
  postBody: any = [];
  public singleData;
  // public items: Array<string> = [];
  public items: Array<any> = [];
  model: any = {};
  dataList: any;
  memogroups: any = [];
  term: string;

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

    http
      .get<any>(environment.api + '/api/tbl_s_planmemos')
      .subscribe((resp) => {
        this.rowData1 = resp;
      });
  }

  onRowClicked(event: any) {
    this.new = false;
    this.model = event.node.data;
    this.model.lastupdateby = this.username;
    // this.model.active = (event.node.data.active).toLowerCase() === 'true' ? true : false;
  }

  deleteplanmemos(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.model.planid = form.planid;
    this.model.memogroup = form.memogroup;
    this.model.plantitle = form.plantitle;
    swal
      .fire({
        title: 'Are you sure?',
        text:
          'You want to Delete Memogroup ' +
          form.memogroup +
          ' from Plan ' +
          form.plantitle,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
      })
      .then((result) => {
        if (result.value) {
          this.fndeleteSubmit(form);
        }
      });
  }

  onQuickFilterChanged($event) {
    this.gridOptions.api.setQuickFilter($event.target.value);
  }

  public ngOnInit(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    // get memos
    this.getMemos();
    this.getplans();
    this.getData();
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

  fndeleteSubmit(form) {
    this.spinner.show();
    this.ecolService.delete_s_planmemos(form.id).subscribe(
      (resp) => {
        swal.fire('Success!', 'Delete successful!', 'success');
        this.getData();
        this.spinner.hide();
      },
      (error) => {
        console.log(error);
        swal.fire('Eror!', 'Delete was not completed!', 'error');
        this.spinner.hide();
      }
    );
  }

  getData() {
    this.ecolService.getplanmemos().subscribe((res) => {
      this.rowData1 = res;
      console.log(res);
    });
  }

  getplans() {
    this.ecolService.getallplans().subscribe((res) => {
      this.accplans = res;
    });
  }

  getMemos() {
    this.ecolService.getmemo().subscribe((res) => {
      for (let i = 0; i < res.data.length; i++) {
        this.items.push(res.data[i].MEMO);
        this.memogroups = res.data[i];
        console.log(res.data[i]);
      }
    });
  }

  addNew(form) {
    const postArray = [];
    // get plantitle
    this.ecolService.planmemo(form.planid).subscribe(
      (resp) => {
        //
        for (let i = 0; i < form.memogroup.length; i++) {
          const body = {
            planid: form.planid,
            plantitle: resp.plantitle,
            memogroup: form.memogroup[i],
            updateby: this.username,
          };
          postArray.push(body);
        }
        console.log(postArray);

        this.spinner.show();
        this.ecolService.postplanmemo(postArray).subscribe(
          (data) => {
            swal.fire('Success!', 'Plan-memo Successfully added!', 'success');
            this.spinner.hide();
            this.getData();
          },
          (error) => {
            console.log(error);
            swal.fire('Error!', 'Error occurred during processing!', 'error');
            this.spinner.hide();
          }
        );
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteSubmit(form) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to Delete!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Delete!',
      })
      .then((result) => {
        if (result.value) {
          this.fndeleteSubmit(form);
        }
      });
  }
}
