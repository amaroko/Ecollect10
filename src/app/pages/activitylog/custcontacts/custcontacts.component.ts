import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';

import { DataService } from '../../../services/data.service';
import * as introJs from 'intro.js/intro.js';

@Component({
  selector: 'app-custcontacts',
  templateUrl: './custcontacts.component.html',
  styleUrls: ['./custcontacts.component.css'],
})
export class CustcontactsComponent implements OnInit {
  introJS = introJs();
  accnumber: string;
  custnumber: string;
  contacts: any[];
  model: any = {};
  addcontact: any = {};
  username: string;
  edit = false;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  emailPattern = '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$';
  loader = true;

  constructor(
    private route: ActivatedRoute,
    private ecolService: EcolService,
    public dataService: DataService
  ) {
    //
  }

  ContactsSteps(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#contactnumber',
            intro:
              'This is where you type in the phone number of the customer. Kindly use ' +
              'the format of 0712345678',
          },
          {
            element: '#email',
            intro:
              'This is where you input a valid email of the customer. This should follow the standard ' +
              'format of johdoe@something.com',
          },
          {
            element: '#active',
            intro:
              'Here you specify whether the phone number is active-currently in use or inactive-never available ' +
              'or out of service',
          },
          {
            element: '#contactsubmit',
            intro:
              'Pressing this button will submit the contact details and link it to the specified account',
          },
          {
            element: '#contacttable',
            intro:
              'Here you will find a list of all the manually added phone numbers, you can then edit them or ' +
              'update the contact if need be',
          },
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true,
      })
      .start();
  }

  ngOnInit() {
    /** spinner starts on init */
    // this.spinner.show();

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

    // get contacts
    this.getcontacts(this.custnumber);
  }

  savecontact(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;

    this.addcontact.custnumber = this.custnumber;
    this.addcontact.telephone = form.contactnumber;
    this.addcontact.contact = form.contactnumber;
    this.addcontact.email = form.email;
    this.addcontact.active = form.active;
    this.addcontact.owner = this.username;
    this.addcontact.updatedby = this.username;
    this.addcontact.updatedlast = new Date();
    // save to db
    this.ecolService.postteles(this.addcontact).subscribe(
      (response) => {
        swal.fire('Good!', 'Contact saved!', 'success');
        this.getcontacts(this.custnumber);
        this.dataService.pushTeles(0);
      },
      (error) => {
        console.log(error);
        swal.fire({
          title: 'Ooops!',
          text: 'Contact Not saved!',
          footer:
            '<a href="http://helpdesk.co-opbank.co.ke" target="_blank">Report issue to helpdesk?</a>',
        });
      }
    );
  }

  editcontact(contact) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.model.id = contact.id;
    this.model.custnumber = contact.custnumber;
    this.model.contactnumber = contact.telephone;
    this.model.email = contact.email;
    this.model.active = contact.active;
    this.model.owner = this.username;
    this.model.updatedby = this.username;
    this.model.updatedlast = new Date();
    //
    this.edit = true;
  }

  updatecontact(form) {
    // check if logged in
    this.ecolService.ifLogged();
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;

    this.model.id = form.id;
    this.model.custnumber = this.custnumber;
    this.model.telephone = form.contactnumber;
    this.model.email = form.email;
    this.model.active = form.active;
    this.model.owner = this.username;
    this.model.updatedby = this.username;
    this.model.updatedlast = new Date();
    // save to db
    this.ecolService.putteles(this.model).subscribe(
      (response) => {
        swal.fire('Good!', 'Contact updated!', 'success');
        this.getcontacts(this.custnumber);
      },
      (error) => {
        console.log(error);
        swal.fire('Ooops!', 'Contact Not updated!', 'error');
      }
    );
  }

  getcontacts(custnumber) {
    this.loader = true;
    this.ecolService.getteles(custnumber).subscribe(
      (data) => {
        this.contacts = data;
        this.dataService.pushContacts(data.length);
        this.dataService.pushTeles(0);
        this.loader = false;
      },
      (error) => {
        console.log(error);
        this.loader = false;
      }
    );
  }

  cancel() {
    this.edit = false;
    this.model = {};
  }
}
