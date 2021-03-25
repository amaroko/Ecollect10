import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-accplans',
  templateUrl: './accplans.component.html',
  styleUrls: ['./accplans.component.css'],
})
export class AccplansComponent implements OnInit {
  @ViewChild('addactionForm', { static: false }) addactionForm: NgForm;
  model: any = {};
  planactions: any = [];
  actions: any = [];
  selectedLink: string;
  username: string;
  selected_plan: any;
  edit = false;

  public items: Array<any> = [];
  p = 0;
  term: string;

  constructor(
    private ecolService: EcolService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.getallplans();
    this.getallactions();
  }

  setradio(e): void {
    this.spinner.show();
    this.selected_plan = e.plantitle;
    this.getplanactions(e.planid);
    this.model.plan = e.planid;
    console.log(e);
  }

  getplanactions(planid) {
    this.ecolService.getplanactions(planid).subscribe(
      (resp) => {
        this.planactions = resp;
        console.log(resp);
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
        alert('error!');
        console.log(error);
      }
    );
  }

  getallplans() {
    this.ecolService.all_s_plans().subscribe(
      (response) => {
        this.items = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getid() {
    const possible =
      '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lengthOfCode = 7;
    this.model.planid = this.makeRandom(lengthOfCode, possible);
  }

  makeRandom(lengthOfCode: number, possible: string) {
    let text = '';
    for (let i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  getallactions() {
    this.ecolService.s_actions().subscribe(
      (response) => {
        this.actions = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  newplan(form) {
    // Loading indictor
    this.spinner.show();
    this.getid();
    //
    const body = {
      planid: this.model.planid,
      plantitle: form.plantitle,
      owner: this.username,
    };

    // check letter duplicate
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to add!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add!',
      })
      .then((result) => {
        if (result.value) {
          this.ecolService.loader();
          this.ecolService.post_s_plan(body).subscribe(
            (Response) => {
              swal.fire('Successful!', 'plan added!', 'success');
              this.getallplans();
              this.spinner.hide();
            },
            (error) => {
              console.log(error);
              this.spinner.hide();
              swal.fire('Error!', 'Error adding plan!', 'error');
            }
          );
        }
      });
  }

  addactionSubmit(form) {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to add!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, add!',
      })
      .then((result) => {
        if (result.value) {
          // get action
          console.log(form);
          this.ecolService.getanaction(form.planaction).subscribe(
            (data) => {
              // console.log(data);
              const body = {
                actionid: form.planaction,
                planid: form.plans,
                updateby: this.username,
                actiontitle: data.actiontitle,
              };
              console.log(body);

              // post to tbl_s_plan_actions
              this.ecolService.post_s_plan_actions(body).subscribe(
                (resp) => {
                  console.log(resp);
                  // refresh plan action lists
                  this.getplanactions(body.planid);
                  this.addactionForm.resetForm();
                  swal.fire('Good!', 'Plan action added!', 'success');
                },
                (error) => {
                  this.addactionForm.resetForm();
                  swal.fire('Ooops!', ':1 error saving plan action', 'error');
                }
              );
            },
            (error) => {
              console.log(error);
              this.addactionForm.resetForm();
              swal.fire('Ooops!', 'error saving plan action', 'error');
            }
          );
        }
      });
  }

  deleteaction(form) {
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
          // check if logged in
          // console.log(form);
          this.ecolService.ifLogged();
          const currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.username = currentUser.USERNAME;
          // save to db
          this.ecolService.delete_s_plan_actions(form.id).subscribe(
            (response) => {
              // console.log(response); {count: 1}
              swal.fire('Good!', 'Plan action deleted!', 'success');
              this.addactionForm.resetForm();
              this.getplanactions(form.plan);
            },
            (error) => {
              console.log(error);
              this.addactionForm.resetForm();
              swal.fire('Ooops!', 'Plan action Not deleted!', 'error');
            }
          );
        }
      });
  }

  editaction(form) {
    // check if logged in
    // console.log(form);
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.model.plan = form.planid;
    this.model.actionid = form.actionid;
    this.model.planaction = form.actiontitle;
    this.model.id = form.id;
    //
    this.edit = true;
  }

  cancel() {
    this.edit = false;
    // this.model = {};
    // this.getid();
  }
}
