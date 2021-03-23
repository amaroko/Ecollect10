import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
import { HttpEventType } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { DataService } from '../../../services/data.service';
import * as introJs from 'intro.js/intro.js';

const URL = environment.xlsuploadapi;

@Component({
  selector: 'app-bulknotes',
  templateUrl: './bulknotes.component.html',
  styleUrls: ['./bulknotes.component.css',
})
export class BulknotesComponent implements OnInit {
  introJS = introJs();
  custnumber;
  accnumber;
  username: string;
  sys: string;
  willDownload = false;
  outdata = [];
  fileUploadProgress = 0;

  @ViewChild('myInput')
  myInputVariable: ElementRef;

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor(
    private route: ActivatedRoute,
    public dataService: DataService,
    private ecolService: EcolService
  ) {
    //
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('owner', this.username);
      form.append('custnumber', this.custnumber);
      form.append('sys', this.sys);
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      // console.log('ImageUpload:uploaded:', item, status, response);
    };
    this.uploader.onErrorItem = (item, response, status, headers) =>
      this.onErrorItem(item, response, status, headers);
    this.uploader.onSuccessItem = (item, response, status, headers) =>
      this.onSuccessItem(item, response, status, headers);
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  BulknotesSteps(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#template',
            intro:
              'Pressing this button will download, the template that is required to use to upload ' +
              'notes'
          },
          {
            element: '#input',
            intro:
              'Select here to choose your file and upload it to the server'
          }
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true
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

    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.custnumber = queryParams.get('custnumber');
    });

    this.sys = this.route.snapshot.queryParamMap.get('sys');
    this.route.queryParamMap.subscribe((queryParams) => {
      this.sys = queryParams.get('sys');
    });
  }

  onSuccessItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): any {
    const data = JSON.parse(response); // success server response
    // console.log(data);
    const bulknotes = data.notes;
    const filename = data.files[0].originalname;
    if (data.success === true) {
      if (bulknotes.length < 5000) {
        swal.fire({
          icon: 'success',
          title: 'ALL Good',
          text:
            'File: ' +
            filename +
            ' with ' +
            bulknotes.length +
            ' rows has been processed!'
        });
      } else {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'File has too many rows. Max is 2,000 rows!',
        });
      }
    } else {
      swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong with the file!'
      });
    }
  }

  onErrorItem(
    item: FileItem,
    response: string,
    status: number,
    headers: ParsedResponseHeaders
  ): any {
    const error = JSON.parse(response); // error server response
    console.log('error', error);
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong with xlxs upload!'
    });
  }

  downloadFile() {
    const template = environment.xlstemplate;
    this.ecolService.downloadFile(template).subscribe(
      (data) => {
        saveAs(data, 'ECollect_bulk_notes_upload_template.xlsx');
      },
      (error) => {
        console.log(error);
        swal.fire('Error!', ' Cannot download template  file!', 'error');
      }
    );
  }

  // xls to json
  onFileChange(ev) {
    const xfile = ev.target.files[0];
    console.log('size', xfile.size);
    console.log('type', xfile.type);

    if (xfile.size > 9000000) {
      swal.fire({
        icon: 'error',
        title: 'Empty Values',
        text: 'File too large. max is 9Mb'
      });
      this.myInputVariable.nativeElement.value = '';
      document.getElementById('output').innerHTML = '';
      return;
    }

    if (
      xfile.type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      swal.fire({
        icon: 'error',
        title: 'Empty Values',
        text: 'Wrong file format'
      });
      this.myInputVariable.nativeElement.value = '';
      document.getElementById('output').innerHTML = '';
      return;
    }

    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      // console.log('data-total', jsonData.Sheet1.length);

      if (!jsonData.Sheet1) {
        swal.fire({
          icon: 'error',
          title: 'Empty Values',
          text: 'Wrong sheet name',
        });
        this.myInputVariable.nativeElement.value = '';
        document.getElementById('output').innerHTML = '';
        return;
      }
      this.outdata = jsonData.Sheet1;

      if (!this.outdata[0].accnumber || !this.outdata[0].notemade) {
        swal.fire({
          icon: 'error',
          title: 'Empty Values',
          text: 'Wrong field name',
        });
        this.myInputVariable.nativeElement.value = '';
        document.getElementById('output').innerHTML = '';
        return;
      }

      for (let i = 0; i < jsonData.Sheet1.length; i++) {
        // check for null
        if (
          this.outdata[i].accnumber == null ||
          this.outdata[i].notemade == null ||
          typeof this.outdata[i].notemade === 'undefined' ||
          typeof this.outdata[i].accnumber === 'undefined'
        ) {
          swal.fire({
            icon: 'warning',
            title: 'Empty Values',
            text: 'data in row no: ' + i + ' is empty and will be omitted'
          });
        } else if (this.sys === 'cc') {
          this.outdata[i].owner = this.username;
          this.outdata[i].custnumber = this.outdata[i].accnumber;
          this.outdata[i].notesrc = 'uploaded a note';
        } else {
          this.outdata[i].owner = this.username;
          this.outdata[i].custnumber = this.outdata[i].accnumber.substring(
            5,
            12
          );
          this.outdata[i].notesrc = 'uploaded a note';
        }
      }

      const dataString = JSON.stringify(jsonData);
      document.getElementById('output').innerHTML = dataString
        .slice(0, 500)
        .concat('...');
      // this.setDownload(dataString);

      // post

      swal
        .fire({
          title: 'Confirmation',
          imageUrl: 'assets/img/user/coop.jpg',
          text:
            'Do you want to proceed with the upload of the ' +
            this.outdata.length +
            ' rows?',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, Upload'
        })
        .then((result) => {
          if (result.value) {
            // proceeed to post
            console.log(this.outdata);
            this.ecolService.loader();
            this.ecolService.bulknotes(this.outdata).subscribe(
              (events) => {
                if (events.type === HttpEventType.UploadProgress) {
                  this.fileUploadProgress = Math.round(
                    (events.loaded / events.total) * 100
                  );
                  console.log(this.fileUploadProgress);
                } else if (events.type === HttpEventType.Response) {
                  if (this.sys === 'cc' || this.sys === 'watchcc') {
                    //
                    this.ecolService
                      .bulktotblcardsstatic(this.outdata)
                      .subscribe(
                        (datas) => {
                          console.log(datas);
                          this.sendNotesData(this.custnumber); // updates the notes counter on view
                          swal.fire({
                            icon: 'success',
                            title: 'ALL Good',
                            text:
                              events.body.rowsAffected +
                              ' rows has been processed!'
                          });
                        },
                        (error) => {
                          console.log('bulknotes error', error);
                        }
                      );
                  } else {
                    //
                    this.ecolService.bulktotblportfolio(this.outdata).subscribe(
                      (results) => {
                        console.log(results);
                        this.sendNotesData(this.custnumber); // updates the notes counter on view
                        swal.fire({
                          icon: 'success',
                          title: 'ALL Good',
                          text:
                            events.body.rowsAffected +
                            ' rows has been processed!'
                        });
                      },
                      (error) => {
                        console.log('bulknotes error', error);
                      }
                    );
                  }
                }
              },
              (error) => {
                console.log(error);
                swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Something went wrong with xlxs upload!'
                });
              }
            );
          } else {
            this.myInputVariable.nativeElement.value = '';
            document.getElementById('output').innerHTML = '';
            swal.close();
            return;
          }
        });
    };
    reader.readAsBinaryString(file);
  }

  setDownload(data) {
    this.willDownload = true;
    setTimeout(() => {
      const el = document.querySelector('#download');
      el.setAttribute(
        'href',
        `data:text/json;charset=utf-8,${encodeURIComponent(data)}`
      );
      el.setAttribute('download', 'xlsxtojson.json');
    }, 1000);
  }

  sendNotesData(custnumber) {
    this.ecolService.totalnotes(custnumber).subscribe((data) => {
      this.dataService.pustNotesData(data[0].TOTAL);
    });
  }
}
