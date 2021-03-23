import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-demandhis',
  templateUrl: './demandhis.component.html',
  styleUrls: ['./demandhis.component.css'],
})
export class DemandhisComponent implements OnInit {
  model: any = {};
  demands: any;

  constructor(private ecolService: EcolService) {}

  ngOnInit() {}

  Search(accnumber) {
    this.ecolService.loader();
    this.ecolService.getdemandshistory(accnumber.value).subscribe(
      (data) => {
        if (data.length > 0) {
          this.demands = data;
          swal.fire('Successful!', 'Historical letters generated!', 'success');
        } else {
          this.demands = [];
          swal.fire('Warning!', 'No demand Letter was found!', 'warning');
        }
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', 'Error occurred letter generation!', 'error');
      }
    );
  }

  downloadFile(filepath) {
    this.ecolService.downloadFile(filepath).subscribe(
      (data) => {
        saveAs(data, 'filename');
      },
      (error) => {
        console.log(error.error);
        swal.fire('Error!', ' Cannot download  file!', 'error');
      }
    );
  }
}
