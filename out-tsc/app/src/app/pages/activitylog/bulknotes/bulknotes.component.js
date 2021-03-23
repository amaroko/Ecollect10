import { __decorate, __metadata } from "tslib";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { saveAs } from 'file-saver';
import { environment } from '../../../../environments/environment';
import { FileUploader, } from '@swimlane/ng2-file-upload';
import { HttpEventType } from '@angular/common/http';
import * as XLSX from 'xlsx';
import { DataService } from '../../../services/data.service';
import * as introJs from 'intro.js/intro.js';
var URL = environment.xlsuploadapi;
var BulknotesComponent = /** @class */ (function () {
    function BulknotesComponent(route, dataService, ecolService) {
        var _this = this;
        this.route = route;
        this.dataService = dataService;
        this.ecolService = ecolService;
        this.introJS = introJs();
        this.willDownload = false;
        this.outdata = [];
        this.fileUploadProgress = 0;
        this.uploader = new FileUploader({ url: URL });
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        //
        //
        this.uploader.onBuildItemForm = function (item, form) {
            form.append('owner', _this.username);
            form.append('custnumber', _this.custnumber);
            form.append('sys', _this.sys);
        };
        this.uploader.onCompleteItem = function (item, response, status, headers) {
            // console.log('ImageUpload:uploaded:', item, status, response);
        };
        this.uploader.onErrorItem = function (item, response, status, headers) {
            return _this.onErrorItem(item, response, status, headers);
        };
        this.uploader.onSuccessItem = function (item, response, status, headers) {
            return _this.onSuccessItem(item, response, status, headers);
        };
    }
    BulknotesComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    BulknotesComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    BulknotesComponent.prototype.BulknotesSteps = function () {
        this.introJS
            .setOptions({
            steps: [
                {
                    element: '#template',
                    intro: 'Pressing this button will download, the template that is required to use to upload ' +
                        'notes'
                },
                {
                    element: '#input',
                    intro: 'Select here to choose your file and upload it to the server'
                }
            ],
            hidePrev: true,
            hideNext: true,
            showProgress: true
        })
            .start();
    };
    BulknotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
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
        this.sys = this.route.snapshot.queryParamMap.get('sys');
        this.route.queryParamMap.subscribe(function (queryParams) {
            _this.sys = queryParams.get('sys');
        });
    };
    BulknotesComponent.prototype.onSuccessItem = function (item, response, status, headers) {
        var data = JSON.parse(response); // success server response
        // console.log(data);
        var bulknotes = data.notes;
        var filename = data.files[0].originalname;
        if (data.success === true) {
            if (bulknotes.length < 5000) {
                swal.fire({
                    icon: 'success',
                    title: 'ALL Good',
                    text: 'File: ' +
                        filename +
                        ' with ' +
                        bulknotes.length +
                        ' rows has been processed!'
                });
            }
            else {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'File has too many rows. Max is 2,000 rows!',
                });
            }
        }
        else {
            swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong with the file!'
            });
        }
    };
    BulknotesComponent.prototype.onErrorItem = function (item, response, status, headers) {
        var error = JSON.parse(response); // error server response
        console.log('error', error);
        swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong with xlxs upload!'
        });
    };
    BulknotesComponent.prototype.downloadFile = function () {
        var template = environment.xlstemplate;
        this.ecolService.downloadFile(template).subscribe(function (data) {
            saveAs(data, 'ECollect_bulk_notes_upload_template.xlsx');
        }, function (error) {
            console.log(error);
            swal.fire('Error!', ' Cannot download template  file!', 'error');
        });
    };
    // xls to json
    BulknotesComponent.prototype.onFileChange = function (ev) {
        var _this = this;
        var xfile = ev.target.files[0];
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
        if (xfile.type !==
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            swal.fire({
                icon: 'error',
                title: 'Empty Values',
                text: 'Wrong file format'
            });
            this.myInputVariable.nativeElement.value = '';
            document.getElementById('output').innerHTML = '';
            return;
        }
        var workBook = null;
        var jsonData = null;
        var reader = new FileReader();
        var file = ev.target.files[0];
        reader.onload = function (event) {
            var data = reader.result;
            workBook = XLSX.read(data, { type: 'binary' });
            jsonData = workBook.SheetNames.reduce(function (initial, name) {
                var sheet = workBook.Sheets[name];
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
                _this.myInputVariable.nativeElement.value = '';
                document.getElementById('output').innerHTML = '';
                return;
            }
            _this.outdata = jsonData.Sheet1;
            if (!_this.outdata[0].accnumber || !_this.outdata[0].notemade) {
                swal.fire({
                    icon: 'error',
                    title: 'Empty Values',
                    text: 'Wrong field name',
                });
                _this.myInputVariable.nativeElement.value = '';
                document.getElementById('output').innerHTML = '';
                return;
            }
            for (var i = 0; i < jsonData.Sheet1.length; i++) {
                // check for null
                if (_this.outdata[i].accnumber == null ||
                    _this.outdata[i].notemade == null ||
                    typeof _this.outdata[i].notemade === 'undefined' ||
                    typeof _this.outdata[i].accnumber === 'undefined') {
                    swal.fire({
                        icon: 'warning',
                        title: 'Empty Values',
                        text: 'data in row no: ' + i + ' is empty and will be omitted'
                    });
                }
                else if (_this.sys === 'cc') {
                    _this.outdata[i].owner = _this.username;
                    _this.outdata[i].custnumber = _this.outdata[i].accnumber;
                    _this.outdata[i].notesrc = 'uploaded a note';
                }
                else {
                    _this.outdata[i].owner = _this.username;
                    _this.outdata[i].custnumber = _this.outdata[i].accnumber.substring(5, 12);
                    _this.outdata[i].notesrc = 'uploaded a note';
                }
            }
            var dataString = JSON.stringify(jsonData);
            document.getElementById('output').innerHTML = dataString
                .slice(0, 500)
                .concat('...');
            // this.setDownload(dataString);
            // post
            swal
                .fire({
                title: 'Confirmation',
                imageUrl: 'assets/img/user/coop.jpg',
                text: 'Do you want to proceed with the upload of the ' +
                    _this.outdata.length +
                    ' rows?',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Upload'
            })
                .then(function (result) {
                if (result.value) {
                    // proceeed to post
                    console.log(_this.outdata);
                    _this.ecolService.loader();
                    _this.ecolService.bulknotes(_this.outdata).subscribe(function (events) {
                        if (events.type === HttpEventType.UploadProgress) {
                            _this.fileUploadProgress = Math.round((events.loaded / events.total) * 100);
                            console.log(_this.fileUploadProgress);
                        }
                        else if (events.type === HttpEventType.Response) {
                            if (_this.sys === 'cc' || _this.sys === 'watchcc') {
                                //
                                _this.ecolService
                                    .bulktotblcardsstatic(_this.outdata)
                                    .subscribe(function (datas) {
                                    console.log(datas);
                                    _this.sendNotesData(_this.custnumber); // updates the notes counter on view
                                    swal.fire({
                                        icon: 'success',
                                        title: 'ALL Good',
                                        text: events.body.rowsAffected +
                                            ' rows has been processed!'
                                    });
                                }, function (error) {
                                    console.log('bulknotes error', error);
                                });
                            }
                            else {
                                //
                                _this.ecolService.bulktotblportfolio(_this.outdata).subscribe(function (results) {
                                    console.log(results);
                                    _this.sendNotesData(_this.custnumber); // updates the notes counter on view
                                    swal.fire({
                                        icon: 'success',
                                        title: 'ALL Good',
                                        text: events.body.rowsAffected +
                                            ' rows has been processed!'
                                    });
                                }, function (error) {
                                    console.log('bulknotes error', error);
                                });
                            }
                        }
                    }, function (error) {
                        console.log(error);
                        swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong with xlxs upload!'
                        });
                    });
                }
                else {
                    _this.myInputVariable.nativeElement.value = '';
                    document.getElementById('output').innerHTML = '';
                    swal.close();
                    return;
                }
            });
        };
        reader.readAsBinaryString(file);
    };
    BulknotesComponent.prototype.setDownload = function (data) {
        this.willDownload = true;
        setTimeout(function () {
            var el = document.querySelector('#download');
            el.setAttribute('href', "data:text/json;charset=utf-8," + encodeURIComponent(data));
            el.setAttribute('download', 'xlsxtojson.json');
        }, 1000);
    };
    BulknotesComponent.prototype.sendNotesData = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.dataService.pustNotesData(data[0].TOTAL);
        });
    };
    __decorate([
        ViewChild('myInput'),
        __metadata("design:type", ElementRef)
    ], BulknotesComponent.prototype, "myInputVariable", void 0);
    BulknotesComponent = __decorate([
        Component({
            selector: 'app-bulknotes',
            templateUrl: './bulknotes.component.html',
            styleUrls: ['./bulknotes.component.css',]
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            DataService,
            EcolService])
    ], BulknotesComponent);
    return BulknotesComponent;
}());
export { BulknotesComponent };
//# sourceMappingURL=bulknotes.component.js.map