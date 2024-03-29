import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { EcolService } from 'app/services/ecol.service';

@Component({
  selector: 'app-editguarantor',
  templateUrl: './editguarantor.component.html',
  styleUrls: ['./editguarantor.component.css'],
})
export class EditguarantorComponent implements OnInit {
  model: any = {
    custnumber: null,
  };

  constructor(
    private ecolService: EcolService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    // do something with the parameters
    this.getguarantor(this.activeRoute.snapshot.params.id);
  }

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

    this.ecolService
      .updateGuarantor(this.activeRoute.snapshot.params.id, body)
      .subscribe(
        (data) => {
          swal.fire('Successful!', 'saved successfully!', 'success');
        },
        (error) => {
          console.log(error);
          swal.fire('Error!', 'Error occurred during processing!', 'error');
        }
      );
  }

  getguarantor(id) {
    this.ecolService.retrieve_a_Guarantor(id).subscribe(
      (data) => {
        this.model = data[0];
      },
      (error) => {
        console.log(error);
      }
    );
  }

  cancel() {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/list']);
  }
}
