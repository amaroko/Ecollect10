import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-accplan',
  templateUrl: './accplan.component.html',
  styleUrls: ['./accplan.component.css'],
})
export class AccplanComponent implements OnInit {
  custnumber;
  accnumber;
  username;
  currentplan: any = [];
  allplans: any = [];
  model: any = {};
  update = false;
  plan: any = {};
  plansdata: any;

  constructor(
    private route: ActivatedRoute,
    private ecolService: EcolService,
    private dataService: DataService
  ) {
    //
  }

  ngOnInit() {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.accnumber = queryParams.get('accnumber');
    });

    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.getallplans();
    this.planexists(this.accnumber);
  }

  openaccplan() {
    // tslint:disable-next-line:max-line-length
    window.open(
      environment.accplanlink +
        '/?accnumber=' +
        this.accnumber +
        '&custnumber=' +
        this.custnumber +
        '&username=' +
        this.username +
        '&nationid=00',
      '_blank'
    );
  }

  getallplans() {
    this.ecolService.tbl_s_plans().subscribe((data) => {
      this.allplans = data;
    });
  }

  planexists(accnumber) {
    this.ecolService.s_check_account_plans(accnumber).subscribe(
      (data) => {
        // check if there if a plan
        if (data && data.length) {
          this.changeAction(data[0].planid);
          this.model.plan = data[0].planid;
          this.ecolService.single_s_plans(data[0].planid).subscribe((data) => {
            this.plan = data;
            this.plansdata = data.plantitle;
            this.dataService.pushAccountPlanData(data.plantitle);
          });
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeAction(planid) {
    // build planactions

    if (planid) {
      this.currentplan = [];
      // retrieve plan actions
      this.ecolService.s_plan_actions(planid).subscribe(
        (resp) => {
          // console.log(resp);
          // tbl_s_account_plans
          this.ecolService.s_account_plans(this.accnumber, planid).subscribe(
            (data) => {
              // console.log('tbl_s_account_plans', data);
              if (data && data.length > 0) {
                this.update = true;
                for (let i = 0; i < data.length; i++) {
                  const body = {
                    id: data[i].id,
                    accnumber: this.accnumber,
                    planid: planid,
                    actionid: data[i].actionid,
                    actiontitle: data[i].actiontitle,
                    completed: data[i].completed.toLowerCase() === 'true',
                    updateby: data[i].updateby,
                    datecompleted: new Date(data[i].datecompleted),
                  };
                  this.currentplan.push(body);
                }
              } else {
                for (let i = 0; i < resp.length; i++) {
                  const body = {
                    accnumber: this.accnumber,
                    planid: planid,
                    actionid: resp[i].actionid,
                    actiontitle: resp[i].actiontitle,
                    completed: false,
                    updateby: '',
                    datecompleted: '',
                  };
                  this.currentplan.push(body);
                }
              }
            },
            (error) => {
              console.log(error);
            }
          );

          // console.log(this.currentplan);
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      this.currentplan = [];
    }
  }

  saveplan() {
    swal
      .fire({
        title: 'Are you sure?',
        text: 'You want to save plan!',
        // type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, save!',
      })
      .then((result) => {
        if (result.value) {
          for (let i = 0; i < this.currentplan.length; i++) {
            this.currentplan[i].datecompleted = moment(
              this.currentplan[i].datecompleted
            ).format('YYYY-MM-DD');
            this.currentplan[i].updateby = this.username;
          }
          if (this.update) {
            // updating
            // console.log('this.currentplan', this.currentplan);
            const acc = {
              accnumber: this.currentplan[0].accnumber,
              planid: this.currentplan[0].planid,
              dateupdated: moment(new Date()).format('YYYY-MM-DD'),
              updateby: this.username,
            };
            for (let i = 0; i < this.currentplan.length; i++) {
              this.ecolService.putaccountplan(this.currentplan[i]).subscribe(
                (data) => {
                  console.log(data);
                },

                (error) => {
                  console.log(error);
                }
              );
            }
            this.update_s_accounts(acc);
            this.changeAction(this.currentplan[0].planid);
            this.planexists(this.accnumber);

            // alert('plan updated!');
            swal.fire('Successful!', 'plan updated!', 'success');
          } else {
            // adding new
            // console.log('this.currentplan', this.currentplan);
            // console.log(acc);
            this.ecolService.saveaccountplan(this.currentplan).subscribe(
              (newdataplan) => {
                console.log(newdataplan);
                // alert('plan saved');

                const acc = {
                  accnumber: this.accnumber,
                  planid: newdataplan[0].planid,
                  dateupdated: moment(new Date()).format('YYYY-MM-DD'),
                  updateby: this.username,
                };
                this.update_s_accounts(acc);
                this.changeAction(this.currentplan[0].planid);
                this.planexists(this.accnumber);
                swal.fire('Successful!', 'plan saved!', 'success');
              },
              (error) => {
                console.log(error);
              }
            );
          }
        }
      });
  }

  // update tbl_s_accounts
  update_s_accounts(body) {
    this.ecolService.put_s_accounts(body).subscribe(
      (data) => {
        console.log(data);
      },
      (error) => {
        console.log('put_s_accounts error', error);
      }
    );
  }
}
