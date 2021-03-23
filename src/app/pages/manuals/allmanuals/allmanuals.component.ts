import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { EcolService } from '../../../services/ecol.service';
import { environment } from '../../../../environments/environment';

declare var $: any;
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-allmanuals',
  templateUrl: './allmanuals.component.html',
  styleUrls: ['./allmanuals.component.css'],
})
export class AllmanualsComponent implements OnInit {
  constructor(private ecolService: EcolService) {
    //
  }

  ngOnInit() {}

  open(manualpath, filename) {
    this.downloadDemand(environment.manuals_path + manualpath, filename);
  }

  downloadDemand(filepath, filename) {
    this.ecolService.downloadFile(filepath).subscribe(
      (data) => {
        saveAs(data, filename);
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', ' Cannot download  file!', 'error');
      }
    );
  }
}
