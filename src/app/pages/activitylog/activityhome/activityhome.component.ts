import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

const URL = environment.valor;

@Component({
  selector: 'app-activityhome',
  templateUrl: './activityhome.component.html',
  styleUrls: ['./activityhome.component.css'],
})
export class ActivityhomeComponent implements OnInit {
  // introJS = introJs();
  accnumber: string;
  custnumber: string;
  nationid: any;
  username: string;
  model: any = {};
  date = new Date();
  account: any;
  sys: string;
  loader = true;
  cards: any = [];
  ptps: any = [];
  otheraccs: any = [];
  collaterals: any = [];
  directors: any = [];
  accwithid: any = [];
  closeResult: string;

  constructor(
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private ecolService: EcolService
  ) {}

  open(content) {
    this.modalService.open(content).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    );
  }

  ngOnInit() {
    // check if logged!
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();

    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.accnumber = queryParams.get('accnumber');
    });

    this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.username = queryParams.get('username');
    });

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.nationid = this.route.snapshot.queryParamMap.get('nationid');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.nationid = queryParams.get('nationid');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.sys = queryParams.get('sys');
    });

    // get account details
    if (this.sys === 'cc') {
      this.getcard(this.accnumber);
    } else if (this.sys === 'watchcc') {
      this.getwatchcard(this.accnumber);
    } else if (this.sys === 'watch') {
      this.getwatch(this.accnumber);
    } else if (this.sys === 'mcoopcash') {
      this.getmcoop(this.accnumber);
    } else {
      this.getaccount(this.accnumber);
    }
  }

  // activityHomeSteps(): void {
  //   this.introJS
  //     .setOptions({
  //       steps: [
  //         {
  //           element: '#step1',
  //           intro: 'Here you will find all the information about the account; balances, arrears, branchcode, assisned RRO code etc'
  //         },
  //         {
  //           element: '#step2',
  //           intro: 'Here you will find  other accounts that the customer has with us'
  //         },
  //         {
  //           element: '#step3',
  //           intro: 'Here you will find all the information about the available collaterals held under this account'
  //         },
  //         {
  //           element: '#step4',
  //           intro: 'Here you will find info about if the account holder is mentioned as a director of a company with us'
  //         },
  //         {
  //           element: '#step5',
  //           intro: 'Here you will find the customers credit card details if available'
  //         },
  //         {
  //           element: '#step6',
  //           intro: 'Lastly, here you will find the accounts under same id number of the specified customer'
  //         }
  //       ],
  //       hidePrev: true,
  //       hideNext: false
  //     })
  //     .start();
  // }

  getaccount(accnumber) {
    this.ecolService.getAccount(accnumber).subscribe((data) => {
      this.account = data[0];
      this.loader = false;
    });
  }

  getwatch(accnumber) {
    this.ecolService.getwatch(accnumber).subscribe((data) => {
      this.account = data;
      this.loader = false;
    });
  }

  getcard(cardacct) {
    this.ecolService.getcardAccount(cardacct).subscribe((data) => {
      this.account = data[0];
      this.loader = false;
    });
  }

  getwatchcard(cardacct) {
    this.ecolService.getWatchcardAccount(cardacct).subscribe((data) => {
      this.account = data[0];
      this.loader = false;
    });
  }

  getmcoop(loanaccnumber) {
    this.ecolService.getmcoopcashAccount(loanaccnumber).subscribe((data) => {
      this.account = data[0];
      this.loader = false;
    });
  }

  beforeChange(active) {
    // console.log(active.nextId);
    const tab: string = active.nextId;
    switch (tab) {
      case 'ngb-tab-0': {
        // console.log("accountinfo");
        break;
      }
      case 'ngb-tab-1': {
        console.log('other a/cs tab ...');
        this.loadother(this.custnumber);
        break;
      }
      case 'ngb-tab-2': {
        this.loadcollateral(this.accnumber);
        break;
      }
      case 'ngb-tab-3': {
        this.loaddirectors(this.accnumber);
        break;
      }
      case 'ngb-tab-4': {
        this.loadcards(this.nationid);
        break;
      }
      case 'ngb-tab-5': {
        this.loadaccwithid(this.nationid);
        break;
      }
      default: {
        console.log('Invalid choice');
        break;
      }
    }
  }

  loadother(custnumber) {
    this.loader = true;
    this.ecolService.otheraccs(custnumber).subscribe(
      (data) => {
        // console.log(data.data);
        this.otheraccs = data.data;
        this.loader = false;
      },
      (error) => {
        console.log('loadother error ==>', error);
        alert('unable to retrieve otheraccs');
        this.loader = false;
      }
    );
  }

  loadcollateral(accnumber) {
    this.loader = true;
    this.ecolService.collaterals(accnumber).subscribe(
      (data) => {
        this.collaterals = data;
        this.loader = false;
      },
      (error) => {
        console.log('collaterals error ==>', error);
        alert('unable to retrieve collaterals');
        this.loader = false;
      }
    );
  }

  loaddirectors(accnumber) {
    this.loader = true;
    this.ecolService.directors(accnumber).subscribe(
      (data) => {
        this.directors = data;
        this.loader = false;
      },
      (error) => {
        console.log('directors error ==>', error);
        alert('unable to retrieve directors');
        this.loader = false;
      }
    );
  }

  loadaccwithid(nationid) {
    this.loader = true;
    this.ecolService.accwithid(nationid).subscribe(
      (data) => {
        this.accwithid = data;
        this.loader = false;
      },
      (error) => {
        console.log('loadaccwithid error ==>', error);
        alert('unable to retrieve accwithid');
        this.loader = false;
      }
    );
  }

  loadptps(accnumber) {
    console.log(accnumber);
    this.loader = true;
    this.ecolService.ptps(accnumber).subscribe(
      (data) => {
        console.log('ptp', data);
        this.ptps = data;
        this.loader = false;
      },
      (error) => {
        console.log('loadptps error ==>', error);
        alert('unable to retrieve ptps');
        this.loader = false;
      }
    );
  }

  loadcards(nationid) {
    this.loader = true;
    this.ecolService.getcardwithid(nationid).subscribe(
      (data) => {
        this.cards = data;
        this.loader = false;
      },
      (error) => {
        console.log('loadcards error ==>', error);
        alert('unable to retrieve cards');
        this.loader = false;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
