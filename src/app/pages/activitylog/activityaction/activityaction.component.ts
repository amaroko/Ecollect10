import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import swal from 'sweetalert2';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {EcolService} from '../../../services/ecol.service';
import {DataService} from '../../../services/data.service';
import * as moment from 'moment';
import {environment} from '../../../../environments/environment';
import {NgOption} from '@ng-select/ng-select';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {NgxSmartModalService} from 'ngx-smart-modal';
import {NgxSpinnerService} from 'ngx-spinner';


@Component({
  selector: 'app-activityaction',
  templateUrl: './activityaction.component.html',
  styleUrls: ['./activityaction.component.css'],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class ActivityactionComponent implements OnInit {
  @ViewChild('reason') inputOne: ElementRef;
  // introJS = introJs();
  bsValue = new Date();
  public minDate: NgbDateStruct;
  minxDate: Date;
  year = parseInt(moment().format('YYYY'));
  month = parseInt(moment().format('MM'));
  day = parseInt(moment().format('DD'));

  accnumber: string;
  custnumber: string;
  accountdetails: any;
  guarantors: [];
  model: any = {};
  bodyletter: any = {};
  filepath: string;
  demands: any;
  file: string;
  smsMessage: string;
  username: string;
  savebody: any = {};
  actionForm: FormGroup;
  submitted = false;
  cmdstatus: any = [];
  party: any = [];
  cure: any = [];
  excuse: any = [];
  capture = true;
  ptps: any = [];
  static: any = [];
  ptp_m: any = {};
  ptpmultiple: any = {};
  en_ptp: any = {};
  edit = false;
  isptptosave = false;
  p = 1;
  autodial_telnumber: string;
  ptpid: any = 0;
  mappedexcuse: string [];
  MainReasonID: string [];
  mappedexcusedetails: string [];
  excusedetails: string [];
  mappedid: string [];
  collectoraction: any = [
    {collectoractionid: 'OC', collectoraction: 'OUTGOING CALL'},
    {collectoractionid: 'IC', collectoraction: 'INCOMING CALL'},
    {collectoractionid: 'MET', collectoraction: 'DEBTOR VISITED'},
    {collectoractionid: 'REVW', collectoraction: 'ACCOUNT REVIEW'},
    {collectoractionid: 'EMPVISIT', collectoraction: 'EMPLOYER VISIT'},
    {collectoractionid: 'SC', collectoraction: 'SENT CORRESPONDENCE'},
    {collectoractionid: 'RC', collectoraction: 'RECEIVED CORRESPONDENCE'},
    {collectoractionid: 'RR', collectoraction: 'ROUTE FOR REVIEW'},
    {collectoractionid: 'OA', collectoraction: 'ASSIGN OUTSIDE AGENCY'},
    {collectoractionid: 'RF', collectoraction: 'RECEIVED FILE'},
    {collectoractionid: 'FT', collectoraction: 'FUND TRANSFER'},
    {collectoractionid: 'NFA', collectoraction: 'NEW FILE ALLOCATION'}
  ];

  message: string;

  reviewers: any = [];
  account: any = [];
  sys = 'collections';

  ptp: NgOption[] = [
    {id: 'No', name: 'No'},
    {id: 'Yes', name: 'Yes'},
  ];

  // subReason: any = {};
  subReason: any = [];
  mainReason: any = [];
  models: any = [];
  selectedtext: string;

  constructor(
    private el: ElementRef,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private ecolService: EcolService,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    public ngxSmartModalService: NgxSmartModalService,
  ) {
    this.minDate = {year: this.year, month: this.month, day: this.day};
    this.minxDate = new Date();
    this.minxDate.setDate(this.minxDate.getDate() - 1);
  }

  // convenience getter for easy access to form fields

  get f() {
    return this.actionForm.controls;
  }

  currentDate() {
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    return day + '-' + month + '-' + year;
  }

  // CollectoractionSteps(): void {
  //   this.introJS
  //     .setOptions({
  //       steps: [
  //         {
  //           element: '#collectoraction',
  //           intro: 'Here you are to select the action that you want to do. Keep in mind that ' +
  //             'fields will show according to the selected option'
  //         },
  //         {
  //           element: '#reason',
  //           intro: 'This is a mandatory field. This means that you cannot submit the form without saying ' +
  //             'the reason why the customer defaulted'
  //         },
  //         {
  //           element: '#cmdstatus',
  //           intro: 'This is the collections status of the account'
  //         },
  //         {
  //           element: '#route',
  //           intro: 'This enables you to escalate an account to your superior. The names of available supervisors ' +
  //             'are listed. The supervisor will then have the account on their queue'
  //         },
  //         {
  //           element: '#review',
  //           intro: 'This is the date of your next review of the account in action'
  //         },
  //         {
  //           element: '#collectornote',
  //           intro: 'This is where you write down the comment or note about the account. This ' +
  //             'information will show up in the notes history'
  //         },
  //         {
  //           element: '#flag',
  //           intro: 'Here you are able to mark the comment as important. This is important especially when you ' +
  //             'come back to review the account'
  //         },
  //         {
  //           element: '#submit',
  //           intro: 'This button will submit all the recorded information to the server'
  //         },
  //         {
  //           element: '#reset',
  //           intro: 'This button will clear your form. This is vital especially when you have made an error ' +
  //             'and want to begin again'
  //         }
  //       ],
  //       hidePrev: true,
  //       hideNext: true,
  //       showProgress: true
  //     })
  //     .start();
  // }

  ngOnInit() {

    // check if logged!

    this.ecolService.ifLogged();
    this.ecolService.ifclosed();

    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.spinner.show();
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.accnumber = queryParams.get('accnumber');
    });

    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(queryParams => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe(queryParams => {
      this.sys = queryParams.get('sys');
    });

    this.ptpid = this.route.snapshot.queryParamMap.get('ptpid');

    // build form
    this.buildForm();

    //
    this.getcmdstatus();
    this.getreviewers();
    this.getparty();
    // this.getcollectoraction();
    // gets the MAin Reason
    this.getexcuse();
    // gets the main reason
    this.ecolService.getexcuse().subscribe(
      data => this.mainReason = data
    );
    //
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else if (this.sys === 'watchcc') {
      this.getwatchcard(this.accnumber);
    } else if (this.sys === 'mcoopcash') {
      this.getmcoop(this.accnumber);
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else {
      this.getaccount(this.accnumber);

    }

  }

  onChangeExcuse(excuseid: any) {
    if (JSON.stringify(excuseid.reason)) {
      this.ecolService.getExcuseDetails(JSON.stringify(excuseid.reason[0].id)).subscribe(
        data => {
          this.subReason = data;
          console.log(data);
        }
      );
    } else {
      this.subReason = null;
    }
  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe(data => {
      this.account = data[0];
      // tslint:disable-next-line:max-line-length
      this.autodial_telnumber = this.account.cellnumber || this.account.mobile || this.account.phonenumber || this.account.telnumber || this.account.celnumber;
      this.model.emailaddress = data[0].emailaddress;
      this.getstatic(this.accnumber);

    });
  }

  getstatic(accnumber) {
    this.ecolService.getStaticLoans(accnumber).subscribe(data => {

      if (data && data.length > 0) {
        this.account.reviewdate = data[0].reviewdate;
        this.account.excuse = data[0].excuse;
        this.account.cmdstatus = data[0].cmdstatus;
        this.account.routetostate = data[0].routetostate;
        this.account.excuse_other = data[0].excuse_other;
      }
      // build form
      this.buildForm();
      if (swal.isVisible) {
        swal.close();
      }
      this.spinner.hide();
    });
  }

  getwatch(accnumber) {
    this.ecolService.getwatch(accnumber).subscribe(data => {
      this.account = data;
      if (data.watch) {
        this.account.reviewdate = data.watch.reviewdate || '',
          this.account.excuse = data.watch.excuse || '',
          this.account.cmdstatus = data.watch.cmdstatus || '',
          this.account.routetostate = data.watch.routetostate || 'ACTIVE COLLECTIONS',
          this.account.excuse_other = data.watch.rfdother;
      }

      // build form
      this.buildForm();
      if (swal.isVisible) {
        swal.close();
      }
      this.spinner.hide();
    });
  }

  getwatchcard(cardacct) {
    this.ecolService.getWatchcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
      this.getwatchcardstatic(cardacct);
    });
  }

  getwatchcardstatic(cardacct) {
    this.ecolService.getWatchcardStatic(cardacct).subscribe(data => {

      if (data && data.length > 0) {
        this.account.reviewdate = data[0].reviewdate;
        this.account.excuse = data[0].excuse;
        this.account.cmdstatus = data[0].cmdstatus;
        this.account.routetostate = data[0].routetostate;
        this.account.excuse_other = data[0].rfdother;
      }

      // build form
      this.buildForm();
      if (swal.isVisible) {
        swal.close();
      }
      this.spinner.hide();
    });
  }

  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe(data => {
      this.account = data[0];
      // build form
      this.buildForm();
      if (swal.isVisible) {
        swal.close();
      }
      this.spinner.hide();
    });
  }


  getmcoop(loanaccnumber) {
    this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe(data => {
      this.account = data[0];
      this.spinner.hide();
    });
  }

  getcmdstatus() {
    this.ecolService.getcmdstatus().subscribe(cmdstatus => {
      this.cmdstatus = cmdstatus;
    });
  }

  getreviewers() {
    this.ecolService.getreviewers().subscribe(data => {
      this.reviewers = data;
    });
  }

  getparty() {
    this.ecolService.getparty().subscribe(party => {
      this.party = party;
    });
  }

  getcollectoraction() {
    this.ecolService.getcollectoraction().subscribe(collectoraction => {
      this.collectoraction = collectoraction;
    });
  }

  getexcuse() {
    this.ecolService.getexcuse().subscribe(data => {
      this.excuse = data;
      this.mappedexcuse = Array.from(new Set(this.excuse.map(({EXCUSE}) => EXCUSE)));
      this.mappedid = Array.from(new Set(this.excuse.map(({ID}) => ID)));
      this.mappedexcusedetails = Array.from(new Set(this.excuse.map(({EXCUSEDETAILS}) => EXCUSEDETAILS)));
      console.log(this.mappedexcuse);
      console.log(this.excuse);
      console.log(this.mappedexcusedetails);
    });
  }

  getcure() {
    this.ecolService.getcure().subscribe(cure => {
      this.cure = cure;
    });
  }

  buildForm() {
    // get static data..
    this.actionForm = this.formBuilder.group({
      collectoraction: ['', Validators.required],
      party: [{value: null, disabled: true}, [Validators.required]],
      ptpamount: [{value: 0, disabled: true}],
      ptpemail: [{value: '', disabled: true}],
      toemail: [{value: this.model.emailaddress, disabled: true}],
      ptpsms: [{value: '', disabled: true}],
      ptpsmsnumber: [{value: this.autodial_telnumber, disabled: true}],
      ptp: [{value: null, disabled: true}],
      ptptype: [{value: '', disabled: true}],
      ptpdate: [{value: '', disabled: true}],
      collectornote: ['', [Validators.required, Validators.minLength(5)]],
      reviewdate: [''],
      reason: [null, Validators.required],
      reasondetails: [{value: '', disabled: false}, [Validators.required]],
      cmdstatus: [null],
      flag: [false],
      route: [null],
      paymode: [{value: null, disabled: true}],
      rfdother: [{value: null, disabled: true}, [Validators.required]]
    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.actionForm.invalid) {
      alert('Please fill all required fields');
      return;
    }

    /*if (this.f.ptpemail.value && this.f.toemail.value == '') {
      alert('Please fill Customer email');
      return;
    }*/

    // tslint:disable-next-line:triple-equals
    if (this.f.ptpsms.value && this.f.ptpsmsnumber.value == '') {
      alert('Please fill Customer Mobile number');
      return;
    }

    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    this.username = currentUser.USERNAME;

    // post data
    this.ecolService.loader();
    this.savebody = {
      collectoraction: this.f.collectoraction.value,
      party: this.f.party.value[0].exd,
      ptpamount: this.f.ptpamount.value,
      ptp: this.f.ptp.value,
      ptpdate: moment(this.f.ptpdate.value).format('YYYY-MMM-DD'),
      ptpemail: this.f.ptpemail.value,
      toemail: this.f.toemail.value,
      ptpsms: this.f.ptpsms.value,
      ptpsmsnumber: this.f.ptpsmsnumber.value,
      // tslint:disable-next-line:max-line-length
      // tslint:disable-next-line:max-line-length + '   Reason details: ' + this.f.rfdother.value + '   Reason for default: ' + this.f.reason.value
      collectornote: this.f.collectornote.value,
      reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
      reason: this.f.reason.value[0].ex,
      reasondetails: this.f.reasondetails.value[0].exd,
      cmdstatus: this.f.cmdstatus.value,
      route: this.f.route.value,
      paymode: this.f.paymode.value,
      accountnumber: this.accnumber,
      custnumber: this.custnumber,
      arramount: this.account.totalarrears || 0,
      oustamount: this.account.oustbalance || 0,
      notesrc: 'made a note',
      noteimp: 'N',
      rfdother: this.f.rfdother.value,
      owner: this.username,
      product: this.account.section
    };
    if (this.f.flag.value) {
      this.savebody.noteimp = 'Y';
    }
    // resolves the invalid date issue in db
    if (moment(this.f.ptpdate.value).format('DD-MMM-YYYY') === 'Invalid date') {
      this.savebody.ptpdate = '';
    }

    if (this.f.ptpemail.value) {
      // send ptp reminder email
      const ptpemailbody = {
        toemail: '',
        ccemail: this.username,
        ptpamount: 0,
        ptpdate: ''
      };
    }


    // add action
    this.ecolService.postactivitylogs(this.savebody).subscribe(data => {
      console.log(this.savebody);
      this.sendNotesData(this.custnumber);
      this.sendPtpsData(this.accnumber);
      // watch stream put watch_static
      if (this.sys === 'watchcc') {
        const watchccbody = {
          rfdother: this.f.rfdother.value,
          cardacct: this.accnumber,
          cmdstatus: this.f.cmdstatus.value,
          excuse: this.f.reason.value,
          lastactiondate: new Date(),
          reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
          routetostate: this.f.route.value
        };

        this.ecolService.putcardwatch(watchccbody).subscribe(resp => {
          //
        }, error => {
          console.log(error);
        });
      }
      //
      if (this.sys === 'watch') {
        const watchbody = {
          rfdother: this.f.rfdother.value,
          accnumber: this.accnumber,
          cmdstatus: this.f.cmdstatus.value,
          excuse: this.f.reason.value,
          lastactiondate: new Date(),
          reviewdate: moment(this.f.reviewdate.value).format('DD-MMM-YYYY'),
          routetostate: this.f.route.value
        };

        this.ecolService.putwatch(watchbody).subscribe(resp => {
        }, error => {
          console.log(error);
        });
      }

      if (this.sys === 'ptp') {
        const ptpbody = {
          id: this.ptpid,
          comment: this.f.collectornote.value,
          reviewdate: moment().format('DD-MMM-YYYY'),
          owner: this.username
        };

        this.ecolService.reviewptp(ptpbody).subscribe(resp => {
        }, error => {
          console.log(error);
        });
      }

      // close windows
      swal.fire({
        title: 'Activity successfully saved',
        imageUrl: 'assets/img/user/coop.jpg',
        text: 'Close activity windows?',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Close!'
      }).then((result) => {
        if (result.value) {
          // close tab
          window.close();
        } else {
          // reset
          this.reset();
        }
      });
    }, error => {
      console.log(error);
      swal.fire('Error!', 'activitylog service is currently not available', 'error');
    });
  }

  sendNotesData(custnumber) {
    this.ecolService.totalnotes(custnumber).subscribe(data => {
      this.dataService.pustNotesData(data[0].TOTAL);
    });
  }

  sendPtpsData(accnumber) {
    this.ecolService.getptps(accnumber).subscribe(data => {
      this.dataService.pushPtps(data.length);
    });
  }

  changeFn(val: any) {
    console.log('Dropdown selection:', val);
  }

  reset() {
    this.spinner.show();
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else if (this.sys === 'watchcc') {
      this.getwatchcard(this.accnumber);
    } else if (this.sys === 'mcoopcash') {
      this.getmcoop(this.accnumber);
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }
  }

  changeAction(value) {
    if (value === 'OC' || value === 'IC' || value === 'MET') {
      this.actionForm.controls.party.enable();
      this.actionForm.controls.party.setValue(null);
    } else {
      this.actionForm.controls.party.disable();
      this.actionForm.controls.party.setValue(null);
    }
  }

  changeParty(form) {
    if (form.party[0].id === 1 || form.party[0].id === 4 || form.party[0].id === 5) {
      this.actionForm.controls.ptp.enable();
      // this.actionForm.controls.paymode.enable();
      // JSON.stringify(excuseid.reason[0].id)
    } else {
      this.actionForm.controls.ptp.disable();
      // this.actionForm.controls.paymode.disable();
      this.actionForm.controls.ptp.setValue(null);
    }
  }

  changeReason(value) {
    if (value === 'Other') {
      this.actionForm.controls.rfdother.enable();
    } else {
      this.actionForm.controls.rfdother.disable();
    }
  }

  changePtp(value) {
    if (value === 'Yes') {
      // check if ptp exists
      this.ecolService.activeptps(this.accnumber).subscribe(activedata => {
        if (activedata && activedata.data.length > 0) {
          swal.fire({
            // type: 'error',
            title: 'Oops...',
            text: 'a/c already has a running promise to pay. Check under Promises to pay menu'
          }).then((result) => {
            this.actionForm.controls.ptp.setValue(null);
          });
        }
      });

      this.actionForm.controls.ptptype.enable();
      this.actionForm.controls.ptpemail.enable();
      this.actionForm.controls.toemail.enable();
      this.actionForm.controls.ptpsms.enable();
      this.actionForm.controls.ptpsmsnumber.enable();
      this.actionForm.controls.paymode.enable();
    } else {
      this.actionForm.controls.ptpamount.disable();
      this.actionForm.controls.paymode.disable();
      this.actionForm.controls.ptpdate.disable();
      this.actionForm.controls.ptptype.disable();
      this.actionForm.controls.ptpamount.setValue(0);
      this.actionForm.controls.ptpdate.setValue('');
      this.actionForm.controls.ptptype.setValue('');
      this.actionForm.controls.ptpemail.setValue('');
      this.actionForm.controls.ptpemail.disable();
      // this.actionForm.controls.ptpsmsnumber.setValue('');
      this.actionForm.controls.ptpsmsnumber.disable();
      this.actionForm.controls.ptpsms.setValue('');
      this.actionForm.controls.ptpsms.disable();
      // this.actionForm.controls.toemail.setValue('');
      this.actionForm.controls.toemail.disable();
    }
  }

  handleChange(ptptype) {
    if (ptptype === 'single') {
      this.capture = true;
      this.actionForm.controls.ptpamount.enable();
      this.actionForm.controls.ptpdate.enable();
    } else {
      // this.capture = false;
      this.actionForm.controls.ptpamount.disable();
      this.actionForm.controls.ptpdate.disable();
      this.actionForm.controls.ptpamount.setValue(0);
      this.actionForm.controls.ptpdate.setValue('');

      this.openptpModal();
    }
  }

  multiplecapturefnc() {
    // tslint:disable-next-line:max-line-length
    window.open(environment.applink + '/multipleptp?accnumber=' + this.accnumber + '&custnumber=' + this.custnumber + '&username=' + this.username + '&sys=collections', '_blank');
  }

  openptpModal() {
    // open modal
    this.ngxSmartModalService.getModal('myModal').open();
  }

  deleteptp(form) {
    const index: number = this.ptps.indexOf(form);
    if (index !== -1) {
      this.ptps.splice(index, 1);
      if (this.ptps.length === 0) {
        this.isptptosave = false;
      }
    }
  }

  ptpfunc(form) {
    const ptpamount = form.value.ptpamount;
    const ptpdate = (moment(form.value.ptpdate).format('DD-MMM-YYYY')).toUpperCase();
    const owner = this.username;
    const accnumber = this.accnumber;

    this.ptps.push({ptpdate: ptpdate, ptpamount: ptpamount, owner: owner, accnumber: accnumber});
    this.ptpmultiple = {};
    this.isptptosave = true;
  }

  saveallptps() {
    this.ecolService.postptps(this.ptps).subscribe(resp => {
      swal.fire('Successful!', 'Mupltiple ptp saved!', 'success').then(function () {
        this.ngxSmartModalService.getModal('myModal').close()
      });
    }, error => {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  }

  selectInput() {

  }

  onKey(event) {
    const inputValue = event.target.value;
    console.log(event.target.value);
  }
}

