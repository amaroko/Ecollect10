import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { DataService } from '../../../services/data.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import {
  FileItem,
  FileUploader,
  ParsedResponseHeaders
} from '@swimlane/ng2-file-upload';
import * as introJs from 'intro.js/intro.js';

const URL = environment.filesapi;

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {
  introJS = introJs();
  accnumber: string;
  custnumber: string;

  model: any = {};
  demands: any;
  files: any = [];
  username: string;
  filetype: any = [
    { filetype: 'Other' },
    { filetype: 'Demand Letter' },
    { filetype: 'Customer Correspondence' }
  ];

  public uploader: FileUploader = new FileUploader({ url: URL });
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;

  constructor(
    private route: ActivatedRoute,
    private ecolService: EcolService,
    private dataService: DataService
  ) {
    //
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('userdesctype', this.model.userdesctype);
      form.append('docdesc', this.model.docdesc);
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
      // refresh demad history notes
    };

    this.uploader.onSuccessItem = (
      item: FileItem,
      response: any,
      status: number,
      headers: ParsedResponseHeaders
    ): any => {
      // success
      console.log(item);
      const obj = JSON.parse(response);
      // console.log(obj)
      // console.log(this.model)
      if (obj.success) {
        for (let i = 0; i < obj.files.length; i++) {
          const bulk = {
            accnumber: this.accnumber,
            custnumber: this.custnumber,
            destpath: obj.files[i].path,
            filesize: obj.files[i].size,
            filetype: obj.files[i].mimetype,
            filepath: obj.files[i].path,
            filename: obj.files[i].originalname,
            doctype: obj.files[i].originalname,
            docdesc: this.model.filedesc,
            colofficer: this.username,
            userdesctype: this.model.userdesctype || 'other',
            code: ''
          };
          this.ecolService.uploads(bulk).subscribe(
            (resp) => {
              this.getfileshistory(this.custnumber);
              swal.fire('Good!', 'File uploaded successfully!', 'success');
            },
            (error) => {
              swal.fire(
                'Oooops!',
                'File uploaded but unable to add to files history!',
                'warning'
              );
            }
          );
        }
      } else {
        swal.fire('Oooops!', 'unable to upload file!', 'error');
      }
    };

    this.uploader.onErrorItem = (
      item: FileItem,
      response: string,
      status: number,
      headers: ParsedResponseHeaders
    ): any => {
      swal.fire('Oooops!', 'unable to upload file!', 'error');
    };
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  UploadedFilesSteps(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#uploadedfiles',
            intro:
              'Here you will find a list of the existing files that have been uploaded to ' +
              'this account'
          }
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true
      })
      .start();
  }

  UploadedFilesSteps2(): void {
    this.introJS
      .setOptions({
        steps: [
          {
            element: '#userdesctype',
            intro:
              'Here, you get to choose the type of document that you are about to upload, ' +
              'this helps in categoriing each documnet under its place'
          },
          {
            element: '#filedesc',
            intro:
              'Here, you provide a description for  the document to be uploaded'
          },
          {
            element: '#drop',
            intro:
              'This is thee drag and drop feature. You could drop files here for upload'
          },
          {
            element: '#selmultiple',
            intro:
              'Select this option if you are uploading multiple files at the same time'
          },
          {
            element: '#single',
            intro: 'Select this option if you are uploading single files'
          },
          {
            element: '#progress',
            intro: 'Here, you can view the status and progress of your uploads'
          }
        ],
        hidePrev: true,
        hideNext: true,
        showProgress: true
      })
      .start();
  }

  ngOnInit() {
    /// check if logged!
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();

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

    // get files
    this.getfileshistory(this.custnumber);
  }

  getfileshistory(custnumber) {
    this.ecolService.getfileshistory(custnumber).subscribe((data) => {
      this.files = data;
      this.dataService.pushFile(data.length);
    });
  }

  downloadFile(filepath, filename) {
    this.ecolService.downloadFile(filepath).subscribe(
      (data) => {
        saveAs(data, filename);
      },
      (error) => {
        console.log(error.error);
        swal.fire('Error!', ' Cannot download  file!', 'error');
      }
    );
  }

  changeCity(e) {
    console.log(e.target);
    console.log(this.model.userdesctype);
    return this.model.userdesctype === e.target.value;
  }
}
