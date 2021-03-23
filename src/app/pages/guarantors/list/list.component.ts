import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  guarantors: any;

  constructor(private ecolService: EcolService, private router: Router) {}

  ngOnInit() {}

  getguarantors(accnumber) {
    this.ecolService.loader();
    this.ecolService.retrieveGuarantors(accnumber).subscribe(
      (data) => {
        this.guarantors = data;
        swal.fire('Success!', 'Retrieved guarantors!', 'success');
        swal.hideLoading();
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'Error retrieving guarantors!', 'error');
      }
    );
  }

  update(id) {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/editguarantor/' + id]);
  }

  addnew() {
    // redirect to ListComponent
    this.router.navigate(['/guarantors/newguarantor']);
  }
}
