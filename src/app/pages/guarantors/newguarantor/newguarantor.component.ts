import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';

@Component({
  selector: 'app-newguarantor',
  templateUrl: './newguarantor.component.html',
  styleUrls: ['./newguarantor.component.css'],
})
export class NewguarantorComponent implements OnInit {
  model: any = {};

  constructor(private ecolService: EcolService, private router: Router) {}

  ngOnInit() {}

  onSubmit(form) {
    // console.log(form.value);
    // Loading indictor
    this.ecolService.loader();
    //
    const body = {
      nationid: form.value.nationid,
      guarantorname: form.value.guarantorname,
      accnumber: form.value.accnumber,
      custnumber: form.value.custnumber,
      address: form.value.address,
      postalcode: form.value.postalcode,
      telnumber: form.value.telnumber,
      email: form.value.email,
      active: form.value.active,
    };
    this.ecolService.submitGuarantor(body).subscribe(
      (data) => {
        swal.fire('Successful!', 'saved successfully!', 'success');
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'Error occurred during processing!', 'error');
      }
    );
  }

  cancel() {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/list']);
  }
}
