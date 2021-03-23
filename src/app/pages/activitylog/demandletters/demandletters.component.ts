import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import {
  FileItem,
  FileUploader,
  ParsedResponseHeaders,
} from '@swimlane/ng2-file-upload';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterConfig, ToasterService } from 'angular2-toaster';
import { license } from '../../../../../env';
import { HttpClient } from '@angular/common/http';
import { Howl } from 'howler';
import * as introJs from 'intro.js/intro.js';
import * as moment from 'moment';
import { NgxSmartModalService } from 'ngx-smart-modal';

const URL = environment.filesapi;
const apiUrl = environment.letters_api;

@Component({
  selector: 'app-demandletters',
  templateUrl: './demandletters.component.html',
  styleUrls: ['./demandletters.component.css'],
})
export class DemandlettersComponent implements OnInit {
  url: any;
  introJS = introJs();
  accnumber: string;
  demandid: string;
  custnumber: string;
  accountdetails: any;
  guarantors: any = [];
  teles: any = [];
  emails: any = [];
  addresses: any = [];
  postcodes: any = [];
  model: any = {};
  bodyletter: any = {};
  letterbody: any = {};
  emaildata: any = {};
  demandhisdetails = {};
  filepath: string;
  demands: any;
  file: string;
  smsMessage: string;
  username: string;
  sys: string;
  section: string;
  autodial_telnumber: string;
  uploadedfilepath: string;
  demandtosend: string;
  guarantoremails = '';
  // tslint:disable-next-line:max-line-length
  itemsDemands: Array<string> = [
    'overduecc',
    'prelistingcc',
    'suspension',
    'Demand1',
    'Demand2',
    'Prelisting',
    'PostlistingSecured',
    'PostlistingUnsecured',
    'PostlistingUnsecuredcc',
    'Day90',
    'Day40',
    'Day30',
    'prelistingremedial',
  ];
  natid: any;
  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  public config: ToasterConfig = new ToasterConfig({
    showCloseButton: { warning: true, error: false, success: true },
    tapToDismiss: false,
    preventDuplicates: true,
    newestOnTop: true,
    timeout: 0,
    positionClass: 'toast-top-right',
    animation: 'flyLeft',
    limit: ,
    // closeHtml: '<button class="btn btn-danger">Close</button>'
  });
  loader = true;
  // }
  private modalDialog: any;

  // DemandletternSteps(): void {
  //   this.introJS
  //     .addHints()
  //     .showHints();
  // }
  //
  // DemandletternSteps2(id): void {
  //   this.introJS
  //     .hideHint(id);
  // }
  // DemandletternSteps3(): void {
  //   this.introJS
  //     .hideHints();

  constructor(
    private route: ActivatedRoute,
    private ecolService: EcolService,
    private spinner: NgxSpinnerService,
    public toasterService: ToasterService,
    private httpClient: HttpClient,
    public ngxSmartModalService: NgxSmartModalService
  ) {
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('demand', this.model.demand);
      form.append('accnumber', this.accnumber);
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      //
    };

    this.uploader.onSuccessItem = (
      item: FileItem,
      response: any,
      status: number,
      headers: ParsedResponseHeaders
    ): any => {
      // success
      const obj = JSON.parse(response);
      for (let i = 0; i < obj.files.length; i++) {
        const bulk = {
          accnumber: this.accnumber,
          custnumber: this.custnumber,
          address: 'none',
          email: 'none',
          telnumber: 'none',
          filepath: obj.files[i].path,
          filename: obj.files[i].originalname,
          // datesent: new Date(),
          owner: this.username,
          byemail: false,
          byphysical: true,
          bypost: true,
          demand: this.model.demand
        };
        this.ecolService.demandshistory(bulk).subscribe(
          (resp) => {
            this.getdemandshistory(this.accnumber);
            swal.fire(
              'Good!',
              'Demand letter uploaded successfully!',
              'success'
            );
          },
          (error) => {
            swal.fire(
              'Oooops!',
              'Demand letter uploaded but unable to add to demands history!',
              'warning'
            );
          }
        );
      }
    };

    this.uploader.onErrorItem = (
      item: FileItem,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ): any => {
      // error server response
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  currentDate() {
    const currentDate = new Date();
    let day = '' + currentDate.getDate();
    let month = '' + (currentDate.getMonth() + 1);
    const year = currentDate.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return year + '-' + month + '-' + day;
  }

  Demand(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#demand',
            position: 'left',
            intro:
              'Here you get to select the demand type that you want to send manually eg Demad letter' +
              '1, Prelisting etc'
          },
          {
            element: '#accnumber',
            tooltipPosition: 'left',
            intro:
              'This is the account number of the customer. It is a 14 digit code eg 016C7184210202'
          },
          {
            element: '#custnumber',
            tooltipPosition: 'auto',
            intro:
              'This is 7 digit number of the customer derived from the account number eg 1842102'
          },
          {
            element: '#addressline1',
            position: 'left',
            intro:
              'This is the P. O Box address provided by the customer. It is vital especially' +
              'when sending a letter by mail box. In some cases you may have to fill it manually if it\'s not available'
          },
          {
            element: '#postcode',
            position: 'top',
            intro:
              'This is the standard postal code that accompanies a mail box number to understand its destination ' +
              'In some cases you may have to fill it manually if it\'s not available'
          },
          {
            element: '#emailaddress',
            position: 'left',
            intro:
              'This is the customer email address. It should follow the standard email format i.e ' +
              'janedoe@somethingmail.com otherwise the e-mail will not be delivered In ' +
              'some cases you may have to fill it manually if it\'s not available'
          },
          {
            element: '#celnumber',
            position: 'left',
            intro:
              'This is the mobile number of the customer. In some cases you may have to fill it manually if it\'s not available'
          },
          {
            element: '#savecontacts',
            position: 'left',
            intro:
              'Here you may decide to save the cell number that you enteredd in the previous field. This  ' +
              'number will be linked to this customer'
          },
          {
            element: '#showlogofooter',
            position: 'left',
            intro:
              'Check this box if you want to generate a letter that has the default Co-operative Bank of Kenya ' +
              'logo and footer'
          },
          {
            element: '#generateword',
            intro:
              'Check this box if you want to generate a word document. This is the recommended format if you want to ' +
              'download and edit the letter. Keep in mind, Word documents are not sent to customers'
          },
          {
            element: '#generatepdf',
            intro:
              'Check this box, to generate a pdf document that will be sent to the customer as per the provided details ' +
              'in the above fields'
          },
          {
            element: '#previewtosend',
            intro:
              'Check this box if you do not want the system to send the letter. ' +
              'This means the letter will be generated and downloaded ' +
              'to your computer for you to take further steps'
          },
          {
            element: '#previewletter',
            intro:
              'Press this button to preview the letter that is to be sent. This button does not ' +
              'send the letter but instead downloads the letter to your computer so that you can ' +
              'confirm the details before sending to customer'
          },
          {
            element: '#sendemailinput',
            intro:
              'Check this box if you want to send the letter via email. The email address should be available and valid'
          },
          {
            element: '#sendpostal',
            intro:
              'Check this box, to queue the letter for physical sending via the mail box. The postal address ' +
              'and postal code should be available'
          },
          {
            element: '#sendbysms',
            intro:
              'Check this box, to send a link of the letter to the customers phone number. The customer ' +
              'then follows the link to view the letter'
          },
          {
            element: '#generateandsend',
            intro:
              'This is the final step. After confirming that all details are correct, this button sends the ' +
              'letter as per the provided details'
          }
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
        // tooltipPosition: 'auto',
        showStepNumbers: true,
        showBullets: true,
        scrollToElement: true,
        exitOnOverlayClick: false
      })
      .start();
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

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.sys = queryParams.get('sys');
    });

    // get account details
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }
    this.getdemandshistory(this.accnumber);
    this.getteles(this.custnumber);
  }

  getteles(cust) {
    this.ecolService.getteles(cust).subscribe((data_teles) => {
      this.loader = false;
      this.teles = data_teles;
      this.emails = data_teles;
      this.postcodes = data_teles;
      this.addresses = data_teles;
    });
  }

  openLetterReadyPreviewModal() {
    // open modal
    this.ngxSmartModalService.getModal('demandsending').open();
  }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe((data) => {
      console.log(data[0].nationid);
      this.accountdetails = data[0];
      this.natid = data[0].nationid;
      this.guarantors = data[0].guarantors;
      this.model.accnumber = data[0].accnumber;
      this.model.custnumber = data[0].custnumber;
      this.model.addressline1 = data[0].addressline1;
      this.model.postcode = data[0].postcode;
      this.model.emailaddress = data[0].emailaddress;
      this.model.celnumber = data[0].celnumber;
      this.section = data[0].section;
      // tslint:disable-next-line:max-line-length
      this.autodial_telnumber =
        this.accountdetails.cellnumber ||
        this.accountdetails.mobile ||
        this.accountdetails.phonenumber ||
        this.accountdetails.telnumber ||
        this.accountdetails.celnumber;

      if (this.guarantors || this.guarantors.length > 0) {
        // loop
        for (let i = 0; i < this.guarantors.length; i++) {
          this.guarantoremails += this.guarantors[i].email + ',';
        }
      }

      // hide spinner
      this.spinner.hide();
      this.loader = false;
    });
  }

  getwatch(accnumber) {
    this.ecolService.getwatch(accnumber).subscribe((data) => {
      this.loader = false;
      this.accountdetails = data;
      this.guarantors = data.guarantors;
      this.model.accnumber = data.accnumber;
      this.model.custnumber = data.custnumber;
      this.model.addressline1 = data.addressline1;
      this.model.postcode = data.postcode;
      this.model.emailaddress = data.emailaddress;
      this.model.celnumber = data.celnumber;
    });
  }

  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe((data) => {
      this.loader = false;
      this.accountdetails = data[0];
      this.model.accnumber = data[0].cardacct;
      this.model.custnumber = data[0].cardacct;
      this.model.addressline1 = data[0].address;
      this.model.postcode = data[0].rpcode;
      this.model.emailaddress = data[0].email;
      this.model.celnumber = data[0].mobile;
    });
  }

  getdemandshistory(accnumber) {
    // console.log('getdemandshistory called ...');
    this.ecolService.getdemandshistory(accnumber).subscribe((data) => {
      this.loader = false;
      this.demands = data;
      console.log(this.demands);
    });
  }

  generate_choose() {
    if (this.sys === 'cc') {
      this.generatecc();
    } else {
      this.generate();
    }
  }

  generate() {
    this.ecolService.loader();
    this.processletter(
      this.model,
      this.model.accnumber,
      this.model.emailaddress
    );
    this.getdemandshistory(this.accnumber);
  }

  generatecc() {
    this.ecolService.loader();
    this.processlettercc(
      this.model.demand,
      this.model.accnumber,
      this.model.emailaddress
    );
    this.getdemandshistory(this.accnumber);
  }

  openletter_choose(inletter) {
    if (this.sys === 'cc') {
      this.openlettercc(inletter);
    } else {
      this.openletter(inletter);
    }
  }

  popsuccessToast(msg) {
    this.toasterService.pop('success', 'Success', msg);
    this.audio();
  }

  poperrorToast(error) {
    this.toasterService.pop('error', 'Error', error);
    this.audio();
  }

  popinfoToast(info) {
    this.toasterService.pop('info', 'Info', info);
    this.audio();
  }

  openletter(letter) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.ecolService.loader();
    this.ecolService.getAccount(this.accnumber).subscribe(
      (data) => {
        // if account is there
        if (data && data.length > 0) {
          this.bodyletter.demand = letter.demand;
          this.bodyletter.showlogo = letter.showlogo;
          this.bodyletter.format = letter.format;
          this.bodyletter.cust = data[0].custnumber;
          this.bodyletter.acc = data[0].accnumber;
          this.bodyletter.custname = data[0].client_name;
          this.bodyletter.address = letter.addressline1;
          this.bodyletter.postcode = letter.postcode;
          this.bodyletter.arocode = data[0].arocode;
          this.bodyletter.branchname = data[0].branchname;
          this.bodyletter.branchcode = data[0].branchcode;
          this.bodyletter.manager = data[0].manager;
          this.bodyletter.ccy = data[0].currency;
          this.bodyletter.demand1date = null;
          this.bodyletter.guarantors = data[0].guarantors;
          this.bodyletter.nationalid = data[0].nationalid;

          // Get all cust accounts
          this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(
            (accounts) => {
              // add accounts to the array
              // console.log('accounts=>', accounts);
              this.bodyletter.accounts = accounts;
              // get demand1 date
              this.ecolService.demand1history(this.accnumber).subscribe(
                (dd1date) => {
                  if (dd1date && dd1date.length > 0) {
                    this.bodyletter.demand1date = dd1date[0].datesent;
                  }
                  // call generate letter api
                  this.ecolService.generateLetter(this.bodyletter).subscribe(
                    (generateletterdata) => {
                      // sucess
                      // modalDialog
                      if (generateletterdata.result === 'success') {
                        this.url = generateletterdata.message;
                        swal.fire(
                          'Good!',
                          generateletterdata.message,
                          'success'
                        );

                        // check if preview to send
                        if (this.model.previewtosend) {
                          // add to his
                          this.demandhisdetails = {
                            accnumber: this.model.accnumber,
                            custnumber: this.model.custnumber,
                            address: this.model.addressline1,
                            email: this.model.emailaddress,
                            telnumber: this.model.telnumber,
                            filepath: generateletterdata.message,
                            filename: generateletterdata.filename,
                            // datesent: moment(),
                            // datesent: new Date(),,
                            owner: this.username,
                            byemail: 'N',
                            byphysical: 'Y',
                            bypost: 'N',
                            demand: letter.demand,
                            customeremail: this.model.emailaddress,
                            status: 'sent',
                            reissued: 'N',
                            guarantorsno: this.guarantors.length || [],
                            guarantorsemail: this.guarantoremails,
                            sendemail:
                              letter.branchemail ||
                              'Customer Service <Customerservice@co-opbank.co.ke>'
                          };

                          // console.log('to history ', this.demandhisdetails);
                          this.demandshistory(this.demandhisdetails);
                          // send sms
                          this.ecolService
                            .getsmsmessage(letter.demand)
                            .subscribe(
                              (respo) => {
                                const sms = respo.smstemplate;
                                this.smsMessage = sms.replace(
                                  '[emailaddressxxx]',
                                  'email address ' + this.model.emailaddress
                                );
                                const smsdata = {
                                  demand: letter.demand,
                                  custnumber: this.model.custnumber,
                                  accnumber: this.model.accnumber,
                                  telnumber: this.model.celnumber,
                                  owner: this.username,
                                  message: this.smsMessage
                                };
                                // console.log(smsdata);
                                // this.sendsms(smsdata);
                              },
                              (error) => {
                                console.log(error);
                              }
                            );

                          // update status
                          const status = {
                            id: this.demandid,
                            from: 'loans',
                            datesent: this.currentDate(),
                            sentby: this.username
                          };
                          this.ecolService.demandstatus(status).subscribe(
                            (ddstatusdata) => {
                              console.log(this.demandid + ' status updated ');
                            },
                            (error) => {
                              console.log(error);
                            }
                          );
                        }
                        this.popsuccessToast('Letter ready for preview');
                        this.downloadDemand(
                          generateletterdata.message,
                          generateletterdata.filename
                        );
                      } else {
                        swal.fire(
                          'Error!',
                          'Error occured during letter generation!',
                          'error'
                        );
                      }
                      //
                    },
                    (error) => {
                      console.log('error==>', error);
                      swal.fire(
                        'Error!',
                        'Error occured during letter generation!',
                        'error'
                      );
                    }
                  );
                },
                (error) => {
                  console.log('demand1history==>', error);
                  swal.fire(
                    'Error!',
                    'Error generating previous demand date!',
                    'error'
                  );
                }
              );
            },
            (error) => {
              console.log('error==>', error);
              swal.fire(
                'Error!',
                'unable to retrieve customer accounts!',
                'error'
              );
            }
          );
        } else {
          swal.fire('None!', letter.accnumber + ' not found!', 'warning');
        }
      },
      (error) => {
        console.log('error==>', error);
        swal.fire('Error!', 'account info missing!', 'error');
      }
    );
  }

  openlettercc(letter) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.ecolService.loader();
    this.ecolService.getcardAccount(this.accnumber).subscribe(
      (carddata) => {
        // console.log(carddata[0]);
        // if cardacct
        if (carddata && carddata.length > 0) {
          (this.letterbody.demand = letter.demand),
            (this.letterbody.showlogo = letter.showlogo),
            (this.letterbody.format = letter.format),
            (this.letterbody.cardacct = this.accnumber),
            (this.letterbody.cardnumber = carddata[0].cardnumber),
            (this.letterbody.cardname = carddata[0].cardname),
            (this.letterbody.address = letter.addressline1),
            (this.letterbody.rpcode = letter.postcode),
            (this.letterbody.city = letter.city),
            (this.letterbody.EXP_PMNT = carddata[0].exppmnt),
            (this.letterbody.OUT_BALANCE = carddata[0].outbalance),
            (this.letterbody.demand1date = new Date());

          // console.log('letterbody', this.letterbody);
          // call generate letter api
          this.ecolService.generateLetter(this.letterbody).subscribe(
            (data) => {
              // sucess
              if (data.result === 'success') {
                swal.fire('Good!', data.message, 'success');
                this.downloadDemand(data.message, data.filename);
              } else {
                swal.fire(
                  'Error!',
                  'Error occured during letter generation!',
                  'error'
                );
              }
              //
            },
            (error) => {
              console.log('error==>', error);
              swal.fire(
                'Error!',
                'Error occured during letter generation!',
                'error'
              );
            }
          );
        } else {
          swal.fire('None!', letter.accnumber + ' not found!', 'warning');
        }
      },
      (error) => {
        //
        console.log(error);
        swal.fire('Error!', 'account info missing!', 'error');
      }
    );
  }

  processletter(letter: any, accnumber, emailaddress) {
    this.ecolService.getAccount(accnumber).subscribe(
      (data) => {
        if (data && data.length > 0) {
          this.bodyletter.demand = letter.demand;
          this.bodyletter.showlogo = true;
          this.bodyletter.format = 'pdf';
          this.bodyletter.cust = data[0].custnumber;
          this.bodyletter.acc = data[0].accnumber;
          this.bodyletter.custname = data[0].client_name;
          this.bodyletter.address = letter.addressline1;
          this.bodyletter.postcode = letter.postcode;
          this.bodyletter.arocode = data[0].arocode;
          this.bodyletter.branchname = data[0].branchname;
          this.bodyletter.branchcode = data[0].branchcode;
          this.bodyletter.manager = data[0].manager;
          this.bodyletter.branchemail =
            data[0].branchemail ||
            'Customer Service <Customerservice@co-opbank.co.ke>';
          this.bodyletter.ccy = data[0].currency;
          this.bodyletter.demand1date = new Date();
          this.bodyletter.guarantors = data[0].guarantors;
          this.bodyletter.settleaccno = data[0].settleaccno || '00000000000000';
          this.bodyletter.section = this.section;
          this.bodyletter.kbbr = data[0].kbbr;
          this.bodyletter.instamount = data[0].instamount;
          this.bodyletter.oustbalance = data[0].oustbalance;
          this.bodyletter.currency = data[0].currency;
          // Get all cust accounts
          this.ecolService.getcustwithAccount(data[0].custnumber).subscribe(
            (accounts) => {
              this.bodyletter.accounts = accounts;
              this.emaildata = {
                name: data[0].client_name,
                email: emailaddress,
                branchemail:
                  this.bodyletter.branchemail ||
                  'Customer Service <Customerservice@co-opbank.co.ke>',
                title: letter.demand,
                guarantor: this.bodyletter.guarantors || 0
              };
              // console.log('emaildata...', this.emaildata);
              // generate letter
              this.generateletter(this.bodyletter);
            },
            (error) => {
              console.log('getcustwithAccount error==>', error);
              swal.fire(
                'Error!',
                'unable to retrieve customer accounts!',
                'error'
              );
            }
          );
        } else {
          swal.fire('None!', letter.accnumber + ' not found!', 'warning');
        }
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'exception occured!', 'error');
      }
    );
  }

  async generateletter(letter) {
    // swal.close();
    this.popinfoToast('Letter in queue');
    // this.audio();
    // await letter generation
    const uploaddata = await this.httpClient
      .post<any>(apiUrl + letter.demand + '/download', letter)
      .toPromise();
    // console.log("Data: " + JSON.stringify(uploaddata));
    // console.log("Data: ", uploaddata.result);
    if (uploaddata.result === 'success') {
      this.popsuccessToast('Letter generated ...');
      // save to history
      this.demandhisdetails = {
        accnumber: this.model.accnumber,
        custnumber: this.model.custnumber,
        address: this.model.addressline1,
        email: this.model.emailaddress,
        telnumber: this.model.telnumber,
        filepath: uploaddata.message,
        filename: uploaddata.filename,
        // datesent: new Date(),
        owner: this.username,
        byemail: this.model.sendemail,
        byphysical: this.model.sendphysical,
        bypost: this.model.sendpostal,
        demand: letter.demand,
        customeremail: this.model.emailaddress,
        status: 'queued',
        reissued: 'N',
        guarantorsno: this.guarantors.length || [],
        guarantorsemail: this.guarantoremails,
        sendemail:
          letter.branchemail ||
          'Customer Service <Customerservice@co-opbank.co.ke>'
      };
      //
      this.emaildata.file = uploaddata.message;
      // use uploaded fie on email
      if (this.model.uploadedfile) {
        this.emaildata.file = this.uploadedfilepath;
      }

      // send demandbyemail
      if (this.model.sendemail) {
        this.ecolService
          .sendDemandEmail(this.emaildata)
          .subscribe((response) => {
            if (response.result === 'fail') {
              swal.close();
              this.poperrorToast('Letter not sent on email!');
            } else {
              this.demandshistory(this.demandhisdetails);
              this.getdemandshistory(this.accnumber);
              // send sms
              this.ecolService.getsmsmessage(letter.demand).subscribe(
                (respo) => {
                  const sms = respo.smstemplate;
                  this.smsMessage = sms.replace(
                    '[emailaddressxxx]',
                    'email address ' + this.model.emailaddress
                  );
                  const smsdata = {
                    demand: letter.demand,
                    custnumber: this.model.custnumber,
                    accnumber: this.model.accnumber,
                    telnumber: this.model.celnumber,
                    owner: this.username,
                    message: this.smsMessage
                  };
                  this.sendsms(smsdata);
                },
                (error) => {
                  console.log(error);
                }
              );

              swal.close();
              this.popsuccessToast('Letter sent on email!');
            }
          }); // end
      } // end send demandbyemail

      // send demandbysms
      if (this.model.sendbysms) {
        const smsbody = {
          accountSid: license.accountSid,
          authToken: license.authToken,
          to: this.model.celnumber,
          from: license.from,
          body:
            'Dear Customer,\nPlease download your ' +
            this.model.demand +
            ' from this link: https://bit.ly/2OfHuEh\n\nCo-op Bank\nCredit Department '
        };
        this.ecolService.sendDemandsms(smsbody).subscribe((response) => {
          console.log(response);
          if (response.result === 'OK') {
            // add to history
            this.demandshistory(this.demandhisdetails);
            this.getdemandshistory(this.accnumber);

            swal.close();
            this.popsuccessToast('Letter sent on sms!');
          } else {
            swal.close();
            this.poperrorToast(response.response.message);
          }
        });
      } // end demandbysms
    }

    /*this.ecolService.generateLetter(letter).subscribe(uploaddata => {
      if (uploaddata.result === 'success') {

        this.popsuccessToast('Letter generated ...');
        // save to history
        this.demandhisdetails = {
          'accnumber': this.model.accnumber,
          'custnumber': this.model.custnumber,
          'address': this.model.addressline1,
          'email': this.model.emailaddress,
          'telnumber': this.model.telnumber,
          'filepath': uploaddata.message,
          'filename': uploaddata.filename,
          'datesent': new Date(),
          'owner': this.username,
          'byemail': this.model.sendemail,
          'byphysical': this.model.sendphysical,
          'bypost': this.model.sendpostal,
          'demand': letter.demand,
          'customeremail': this.model.emailaddress,
          'status': 'queued',
          'reissued': 'N',
          'guarantorsno': this.guarantors.length || [],
          'guarantorsemail': this.guarantoremails,
          'sendemail': letter.branchemail || 'Customer Service <Customerservice@co-opbank.co.ke>'
        };
        //
        this.emaildata.file = uploaddata.message;
        // use uploaded fie on email
        if (this.model.uploadedfile) {
          this.emaildata.file = this.uploadedfilepath;
        }

        // send demandbyemail
        if (this.model.sendemail) {
          this.ecolService.sendDemandEmail(this.emaildata).subscribe(response => {
            if (response.result === 'fail') {
              swal.close();
              this.poperrorToast('Letter not sent on email!');
            } else {
              // add to history
              // console.log('to history ', this.demandhisdetails)
              this.demandshistory(this.demandhisdetails);
              this.getdemandshistory(this.accnumber);
              // send sms
              this.ecolService.getsmsmessage(letter.demand).subscribe(respo => {
                const sms = respo.smstemplate;
                this.smsMessage = sms.replace('[emailaddressxxx]', 'email address ' + this.model.emailaddress);
                const smsdata = {
                  'demand': letter.demand,
                  'custnumber': this.model.custnumber,
                  'accnumber': this.model.accnumber,
                  'telnumber': this.model.celnumber,
                  'owner': this.username,
                  'message': this.smsMessage,
                };
                this.sendsms(smsdata);
              }, error => {
                console.log(error);
              });

              swal.close();
              this.popsuccessToast('Letter sent on email!');
            }
          }); // end
        }

        // send demandbysms
        if (this.model.sendbysms) {
          const smsbody = {
            "accountSid": license.accountSid,
            "authToken": license.authToken,
            "to": this.model.celnumber,
            "from": license.from,
            // tslint:disable-next-line:max-line-length
            // tslint:disable-next-line:max-line-length
            "body": "Dear Customer,\nPlease download your " + this.model.demand + " from this link: https://bit.ly/2OfHuEh\n\nCo-op Bank\nCredit Department "
          }
          this.ecolService.sendDemandsms(smsbody).subscribe(response => {
            console.log(response);
            if (response.result === 'OK') {
              // add to history
              this.demandshistory(this.demandhisdetails);
              this.getdemandshistory(this.accnumber);

              swal.close();
              this.popsuccessToast('Letter sent on sms!');
            } else {
              swal.close();
              this.poperrorToast(response.response.message);
            }
          });
        }
      } else {
        // error in letter generation
        swal('Error!', 'Error generating letter!', 'error');
      }
    }, error => {
      console.log(error);
      swal('Error!', 'Cannot generate letter!', 'error');
    });*/
  } // end generateletter

  processlettercc(demand, cardacct, emailaddress) {
    this.ecolService.getcardAccount(cardacct).subscribe(
      (data) => {
        this.loader = false;
        if (data.length > 0) {
          const letter = {
            demand: demand.toLowerCase(),
            cardacct: data[0].cardacct,
            cardname: data[0].cardname,
            showlogo: true,
            format: 'pdf',
            address: this.model.addressline1,
            postcode: this.model.postcode,
            exp_pmnt: data[0].exppmnt,
            out_balance: data[0].exppmnt,
            manager: 'ROSE KARAMBU'
          };
          const emaildata = {
            name: data[0].cardname,
            email: emailaddress,
            title: demand,
            branchemail:
              'Contact Centre Team <ContactCentreTeam@co-opbank.co.ke>'
          };
          // generate letter
          this.generatelettercc(letter, emaildata);
        } else {
          swal.fire('None!', cardacct + ' not found!', 'warning');
        }
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'exception occured!', 'error');
      }
    );
  }

  generatelettercc(letter, emaildata: any) {
    swal.close();
    this.loader = false;
    this.popinfoToast('Letter Queued to be sent');
    // this.audio();
    this.ecolService.generateLettercc(letter).subscribe(
      (uploaddata) => {
        if (uploaddata.result === 'success') {
          //
          // swal('Success!', 'Letter generated!', 'success');
          this.popsuccessToast('Letter generated and queued to be sent');
          // save to history
          this.demandhisdetails = {
            accnumber: this.model.accnumber,
            custnumber: this.model.custnumber,
            address: this.model.addressline1,
            email: this.model.emailaddress,
            telnumber: this.model.telnumber,
            filepath: uploaddata.message,
            filename: uploaddata.filename,
            // datesent: new Date(),
            owner: this.username,
            byemail: this.model.sendemail,
            byphysical: this.model.sendphysical,
            bypost: this.model.sendpostal,
            demand: letter.demand,
            customeremail: this.model.emailaddress,
            status: 'queued',
            reissued: 'N',
            guarantorsno: this.guarantors.length || [],
            guarantorsemail: this.guarantoremails,
            sendemail:
              letter.branchemail ||
              'Customer Service <Customerservice@co-opbank.co.ke>'
          };
          //
          emaildata.file = uploaddata.message;
          // use uploaded fie on email
          if (this.model.uploadedfile) {
            emaildata.file = this.uploadedfilepath;
          }

          // send demandbyemail
          if (this.model.sendemail) {
            this.ecolService
              .sendDemandEmail(emaildata)
              .subscribe((response) => {
                if (response.result === 'fail') {
                  swal.close();
                  this.loader = false;
                  this.poperrorToast('Letter not sent on email!');
                } else {
                  // add to history
                  this.demandshistory(this.demandhisdetails);
                  this.getdemandshistory(this.accnumber);
                  // send sms
                  this.smsMessage =
                    'Dear Customer, We have sent a Loan Repayment  Demand  Notice to your address. To enquire call  0711049000';
                  const smsdata = {
                    demand: letter.demand,
                    custnumber: this.model.custnumber,
                    accnumber: this.model.accnumber,
                    telnumber: this.model.celnumber,
                    owner: this.username,
                    message: this.smsMessage
                  };
                  this.sendsms(smsdata);

                  swal.close();
                  this.loader = false;
                  this.popsuccessToast('Letter sent on email!');
                }
              }); // end
          }

          // send demandbysms
          if (this.model.sendbysms) {
            const smsbody = {
              accountSid: license.accountSid,
              authToken: license.authToken,
              to: this.model.celnumber,
              from: license.from,
              body:
                'Dear Customer,\nPlease download your ' +
                this.model.demand +
                ' from this link: https://bit.ly/2OfHuEh\n\nCo-op Bank\nCredit Department '
            };
            //
            // console.log(smsbody);
            this.ecolService.sendDemandsms(smsbody).subscribe((response) => {
              console.log(response);
              if (response.result === 'OK') {
                // add to history
                this.demandshistory(this.demandhisdetails);
                this.getdemandshistory(this.accnumber);

                swal.close();
                this.popsuccessToast('Letter sent on sms!');
              } else {
                swal.close();
                this.poperrorToast(response.response.message);
              }
            });
          }
        } else {
          // error in letter generation
          swal.fire('Error!', 'Error generating letter!', 'error');
        }
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'Cannot generate letter!', 'error');
      }
    );
  } // end generateletter

  sendsms(smsdata) {
    this.ecolService.sendsms(smsdata).subscribe(
      (result) => {
        swal.fire('Successful!', 'Demand letter sent!', 'success');
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'Error occurred during sending email!', 'error');
      }
    );
  }

  demandshistory(body) {
    // console.log('demandshistory', body);
    this.ecolService.demandshistory(body).subscribe((data) => {
      this.getdemandshistory(this.accnumber);
    });
  }

  guarantorletter(body) {
    this.ecolService.guarantorletters(body).subscribe((data) => {});
  }

  sms(body) {
    this.ecolService.guarantorletters(body).subscribe((data) => {});
  }

  downloadDemand(filepath, filename) {
    this.ecolService.demanddownload(filepath).subscribe(
      (data) => {
        saveAs(data, filename);
      },
      (error) => {
        console.log(error.error);
        swal.fire('Error!', ' Cannot download  file!', 'error');
      }
    );
  }

  resend(filepath) {
    swal
      .fire({
        title: 'confirm email address',
        // title: 'confirm email address',
        input: 'text',
        showCancelButton: true,
        confirmButtonText: 'Send Email',
        showLoaderOnConfirm: true,
        preConfirm: (email) => {},
        allowOutsideClick: () => !swal.isLoading()
      })
      .then((result) => {
        if (result.value !== null) {
          swal.fire('Sent!', 'Email has been sent', 'success');
        }
      });
  }

  savecontacts(model) {
    this.spinner.show();

    // save contact
    this.ecolService
      .existsteles(this.custnumber, model.celnumber, model.emailaddress)
      .subscribe(
        (contact) => {
          if (contact.length > 0) {
            swal.fire('Warning!', 'Contact already exists', 'info');
            this.spinner.hide();
            this.loader = false;
          } else {
            // save
            const telesbody = {
              custnumber: this.custnumber,
              telephone: model.celnumber,
              email: model.emailaddress,
              active: 'Yes',
              owner: this.username,
              updatedby: this.username,
              updatedlast: new Date(),
              address: model.addressline1,
              postcode: model.postcode
            };

            this.ecolService.postteles(telesbody).subscribe((teles) => {
              this.spinner.hide();
              this.loader = false;
              this.getteles(this.custnumber);
              swal.fire('Good!', 'Contact has been added', 'success');
            });
          }
        },
        (error) => {
          console.log('error-existsteles', error);
          this.spinner.hide();
          this.loader = false;
          swal.fire('Ooops!', 'Something went wrong', 'error');
        }
      );
  }

  audio() {
    const sound = new Howl({
      src: 'assets/sound.wav'
    });

    sound.play();
  }
}
