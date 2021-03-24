import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { DataService } from '../../../services/data.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader, } from '@swimlane/ng2-file-upload';
import * as introJs from 'intro.js/intro.js';
var URL = environment.filesapi;
var FilesComponent = /** @class */ (function () {
    function FilesComponent(route, ecolService, dataService) {
        var _this = this;
        this.route = route;
        this.ecolService = ecolService;
        this.dataService = dataService;
        this.introJS = introJs();
        this.fp = 1;
        this.model = {};
        this.files = [];
        this.filetype = [
            { filetype: 'Other' },
            { filetype: 'Demand Letter' },
            { filetype: 'Customer Correspondence' },
        ];
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        //
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('userdesctype', _this.model.userdesctype);
            form.append('docdesc', _this.model.docdesc);
            form.append('accnumber', _this.accnumber);
            form.append('owner', _this.username);
            form.append('custnumber', _this.custnumber);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            // refresh demad history notes
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            // success
            console.log(item);
            var obj = JSON.parse(response);
            // console.log(obj)
            // console.log(this.model)
            if (obj.success) {
                for (var i = 0; i < obj.files.length; i++) {
                    var bulk = {
                        accnumber: _this.accnumber,
                        custnumber: _this.custnumber,
                        destpath: obj.files[i].path,
                        filesize: obj.files[i].size,
                        filetype: obj.files[i].mimetype,
                        filepath: obj.files[i].path,
                        filename: obj.files[i].originalname,
                        doctype: obj.files[i].originalname,
                        docdesc: _this.model.filedesc,
                        colofficer: _this.username,
                        userdesctype: _this.model.userdesctype || 'other',
                        code: '',
                    };
                    _this.ecolService.uploads(bulk).subscribe(function (resp) {
                        _this.getfileshistory(_this.custnumber);
                        swal.fire('Good!', 'File uploaded successfully!', 'success');
                        _this.uploader.clearQueue();
                        // clear the queue on successful upload
                    }, function (error) {
                        swal.fire('Oooops!', 'File uploaded but unable to add to files history!', 'warning');
                    });
                }
            }
            else {
                swal.fire('Oooops!', 'unable to upload file!', 'error');
            }
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            swal.fire('Oooops!', 'unable to upload file!', 'error');
        };
    }
    FilesComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    FilesComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    FilesComponent.prototype.UploadedFilesSteps = function () {
        this.introJS
            .setOptions({
            steps: [
                {
                    element: '#uploadedfiles',
                    intro: 'Here you will find a list of the existing files that have been uploaded to ' +
                        'this account',
                },
            ],
            hidePrev: true,
            hideNext: true,
            showProgress: true,
        })
            .start();
    };
    FilesComponent.prototype.UploadedFilesSteps2 = function () {
        this.introJS
            .setOptions({
            steps: [
                {
                    element: '#userdesctype',
                    intro: 'Here, you get to choose the type of document that you are about to upload, ' +
                        'this helps in categoriing each documnet under its place',
                },
                {
                    element: '#filedesc',
                    intro: 'Here, you provide a description for  the document to be uploaded',
                },
                {
                    element: '#drop',
                    intro: 'This is thee drag and drop feature. You could drop files here for upload',
                },
                {
                    element: '#selmultiple',
                    intro: 'Select this option if you are uploading multiple files at the same time',
                },
                {
                    element: '#single',
                    intro: 'Select this option if you are uploading single files',
                },
                {
                    element: '#progress',
                    intro: 'Here, you can view the status and progress of your uploads',
                },
            ],
            hidePrev: true,
            hideNext: true,
            showProgress: true,
        })
            .start();
    };
    FilesComponent.prototype.ngOnInit = function () {
        var _this = this;
        /// check if logged!
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.accnumber = queryParams.get('accnumber');
        });
        this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.custnumber = queryParams.get('custnumber');
        });
        // get files
        this.getfileshistory(this.custnumber);
    };
    FilesComponent.prototype.getfileshistory = function (custnumber) {
        var _this = this;
        this.ecolService.getfileshistory(custnumber).subscribe(function (data) {
            _this.files = data;
            console.log(data[0].filesize);
            _this.dataService.pushFile(data.length);
        });
    };
    FilesComponent.prototype.downloadFile = function (filepath, filename) {
        var _this = this;
        this.loading = true;
        this.ecolService.downloadFile(filepath).subscribe(function (data) {
            saveAs(data, filename);
            swal.fire({
                icon: 'success',
                title: 'Successful',
                text: filename + '   downloaded successfully',
                // showDenyButton: true,
                // denyButtonText: 'Never Mind',
                // showCancelButton: true,
                timer: 4000,
            });
            _this.loading = false;
        }, function (error) {
            console.log(error.error);
            // swal.fire('Error!', ' Cannot download  file!', 'error');
            swal.fire({
                icon: 'error',
                title: 'Oops',
                text: 'Cannot download  file!',
                // showDenyButton: true,
                // denyButtonText: 'Never Mind',
                showCancelButton: true,
                timer: 4000,
            });
            _this.loading = false;
        });
    };
    FilesComponent.prototype.changeCity = function (e) {
        console.log(e.target);
        console.log(this.model.userdesctype);
        return this.model.userdesctype === e.target.value;
    };
    FilesComponent = __decorate([
        Component({
            selector: 'app-files',
            templateUrl: './files.component.html',
            styleUrls: ['./files.component.css'],
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            EcolService,
            DataService])
    ], FilesComponent);
    return FilesComponent;
}());
export { FilesComponent };
//# sourceMappingURL=files.component.js.map