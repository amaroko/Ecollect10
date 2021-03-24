import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import * as introJs from 'intro.js/intro.js';

const URL = environment.valor;

@Component({
  selector: 'app-guarantors',
  templateUrl: './guarantors.component.html',
  styleUrls: ['./guarantors.component.css'],
})
export class GuarantorsComponent implements OnInit {
  introJS = introJs();
  custnumber: string;
  accnumber: string;
  username: string;
  model: any = {};
  guarantors: any = [];
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';

  constructor(private route: ActivatedRoute, private ecolService: EcolService) {
    //
  }

  GuarantorSteps(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#existinguarantors',
            intro:
              'Here you will find a list of the existing guarantors for this account',
          },
          // {
          //   element: '#custnumber',
          //   intro: 'This is the 7 digit number of the customer'
          // }
          // {
          //   element: '#smsmessage',
          //   intro: 'This is where you can view the selected message template. As well as edit the message if you feel so. ' +
          //     'Keep in much that you are limited to the amount of characters that you type'
          // },
          // {
          //   element: '#callback',
          //   intro: 'Here you can put the number to which the customer can call for enquiries. You can also leave it as default'
          // },
          // {
          //   element: '#sendsms',
          //   intro: 'Pressing this button will send the message to the selected customer phone number'
          // },
          // {
          //   element: '#historysms',
          //   intro: 'Here is where the history of sent sms can be viewed in a listed format'
          // }
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
      })
      .start();
  }

  GuarantorSteps2(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#custnumber',
            intro: 'This is the 7 digit number of the customer',
          },
          {
            element: '#accnumber',
            intro: 'This is the 14 digit number of the customer',
          },
          {
            element: '#nationid',
            intro: 'This is the Nation Identification number of the guarantor',
          },
          {
            element: '#guarantorname',
            intro: 'This is the Full names of the guarantor',
          },
          {
            element: '#address',
            intro: 'This is the postal address of the guarator',
          },
          {
            element: '#postalcode',
            intro:
              'This is the postal code of the postal address provided by the guarantor',
          },
          {
            element: '#telnumber',
            intro: 'This is the telephone number ontacts of the guarantor',
          },
          {
            element: '#email',
            intro: 'Here you enter a valid email address of the guarantor',
          },
          {
            element: '#active',
            intro: 'Her you can specify if the guarantor is active or inactive',
          },
          {
            element: '#guarantorsubmit',
            intro:
              'Pressing this button will submit your details to the server. If disabled, kindly check ' +
              'to see if you have left a field unattended',
          },
          {
            element: '#reset',
            intro:
              'This button will clear your form or reset so that you could start entering ' +
              'the information again',
          },
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
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
      this.model.accnumber = queryParams.get('accnumber');
    });

    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.custnumber = queryParams.get('custnumber');
      this.model.custnumber = queryParams.get('custnumber');
    });

    // get guarantors history
    this.getGuarantors(this.accnumber);
  }

  onSubmit(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    // Loading indictor
    this.ecolService.loader();
    //
    const body = {
      nationid: form.value.nationid,
      guarantorname: form.value.guarantorname,
      accnumber: this.model.accnumber,
      custnumber: this.model.custnumber,
      address: form.value.address,
      postalcode: form.value.postalcode,
      telnumber: form.value.telnumber,
      email: form.value.email,
      active: form.value.active,
    };
    this.ecolService.submitGuarantor(body).subscribe(
      (data) => {
        swal.fire('Successful!', 'saved successfully!', 'success');
        this.getGuarantors(this.accnumber);
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'Error occurred during processing!', 'error');
      }
    );
  }

  getGuarantors(accnumber) {
    this.ecolService.guarantordetails(accnumber).subscribe(
      (data) => {
        this.guarantors = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  reset() {
    console.log('please!!!');
  }
}
