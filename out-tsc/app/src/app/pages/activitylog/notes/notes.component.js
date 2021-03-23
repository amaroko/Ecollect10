import { __decorate, __metadata } from "tslib";
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import { isNullOrUndefined } from 'util';
// import {NgxSpinnerService} from 'ngx-spinner';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { ExcelService } from '../../../services/excel.service';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
// import * as introJs from 'intro.js/intro.js';
import pageSettings from '../../../config/page-settings';
var NotesComponent = /** @class */ (function () {
    function NotesComponent(ecolservice, route, rout, datePipe, 
    // private spinner: NgxSpinnerService,
    ecolService, excelService, http) {
        var _this = this;
        this.ecolservice = ecolservice;
        this.route = route;
        this.rout = rout;
        this.datePipe = datePipe;
        this.ecolService = ecolService;
        this.excelService = excelService;
        this.http = http;
        this.lightMode = true;
        this.darkMode = false;
        this.modules = AllModules;
        this.expand = false;
        this.pivotPanelShow = true;
        this.noteData = [];
        this.notesreason = [];
        this.individualnotes = {};
        this.notes = [];
        this.custnotes = {};
        this.bulknote = [];
        this.flaggedNotes = [];
        this.bulknotelength = 0;
        this.flaggedlength = 0;
        this.model = {};
        this.p = 1;
        this.bp = 1;
        this.download_disabled = true;
        this.currentDate = new Date();
        this.pageSettings = pageSettings;
        this.lat = 40.7143528;
        this.lng = -74.0059731;
        // }
        this.tabs = {
            collectornotes: true,
            Bulknotes: false,
            flaggednotes: false,
            allNotes: false,
            friendTab: false,
        };
        this.selectedLink = 'collector';
        this.loader = true;
        // download() {
        //   this.excelService.generateExcel(this.cust);
        this.collectornoteslength = 0;
        this.pageSettings.pageContentFullWidth = true;
        this.gridOptions = {
            // suppressCellSelection: true,
            // domLayout: 'autoHeight',
            rowSelection: 'multiple',
            // rowModelType: 'client side',
            // rowModelType: 'infinite', serverSide
            pagination: true,
            paginationPageSize: 50,
            onGridReady: function (params) {
                _this.gridApi = params.api;
                _this.gridColumnApi = params.columnApi;
                // params.api.sizeColumnsToFit();
                // this.gridApi.setDatasource(this.dataSource);
                // environment.api + '/api/tqall/paged/myallocation?colofficer=' + this.username
                _this.http
                    .get(environment.api +
                    '/api/notehis/allcustnotes?custnumber=' +
                    _this.cust)
                    .subscribe(function (resp) {
                    console.log(typeof resp); // to check whether object or array
                    _this.str = JSON.stringify(resp, null, 4);
                    var obj = JSON.parse(_this.str);
                    params.api.setRowData(obj);
                });
            },
        };
        this.columnDefs = [
            {
                field: 'ACCNUMBER',
                // cellRenderer: function (params) {
                //   if (params.value !== undefined) {
                //     return '<a  href="#" target="_blank">' + params.value + '</a>';
                //   } else {
                //     return ''; // <img src="assets/img/user/loading.gif" alt="Loading Icon">
                //   }
                // },
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
                floatingFilter: true,
            },
            {
                field: 'CUSTNUMBER',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
                floatingFilter: tru,
            },
            {
                field: 'NOTEMADE',
                autoHeight: true,
                width: 220,
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
                floatingFilter: true,
            },
            {
                field: 'NOTEDATE',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep', browserDatePicker: true },
                valueFormatter: this.dateFormatter,
                floatingFilter: tru,
            },
            {
                field: 'NOTEIMP',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
                floatingFilter: true,
            },
            {
                field: 'NOTESRC',
                filter: 'agTextColumnFilter',
                filterParams: { newRowsAction: 'keep' },
                resizable: true,
                floatingFilter: true,
            },
        ];
        this.sortingOrder = ['desc', 'asc', null];
        this.defaultColDef = {
            cellStyle: { 'white-space': 'normal' },
            width: 120,
            resizable: true,
            sortable: true,
            unSortIcon: true,
            suppressResize: false,
            autoHeight: true,
            enableRowGroup: true,
            enablePivot: true,
            pivot: tue,
        };
        this.rowHeight = 275;
        this.statusBar = {
            statusPanels: [
                {
                    statusPanel: 'agTotalAndFilteredRowCountComponent',
                    align: 'left',
                },
                {
                    statusPanel: 'agTotalRowCountComponent',
                    align: 'center',
                },
                { statusPanel: 'agFilteredRowCountComponent' },
                { statusPanel: 'agSelectedRowCountComponent' },
                { statusPanel: 'agAggregationComponent' },
            ],
        };
    }
    NotesComponent.prototype.widgetLightMode = function () {
        this.lightMode = true;
        this.darkMode = false;
    };
    NotesComponent.prototype.widgetDarkMode = function () {
        this.darkMode = true;
        this.lightMode = false;
    };
    NotesComponent.prototype.onColumnResized = function () {
        this.gridApi.resetRowHeights();
    };
    // NotesSteps(): void {
    //   this.introJS
    //     .setOptions({
    //       steps: [
    //         {
    //           element: '#step1',
    //           intro: 'This is the number counter for bulk uploaded notes'
    //         },
    //         {
    //           element: '#step2',
    //           intro: 'This is the number counter for notes written by the collector'
    //         },
    //         {
    //           element: '#step3',
    //           intro: 'This is the number counter for notes that have been flagged as important'
    //         },
    //         {
    //           element: '#step4',
    //           intro: 'Here you will find all the notes of the customer in a grid, you can search, filter with words, date etc'
    //         },
    //         {
    //           element: '#step5',
    //           intro: 'This button will download the entire notes for the customer in an excel document'
    //         }
    //       ],
    //       hidePrev: true,
    //       hideNext: false,
    //       showProgress: true
    //     })
    //     .start();
    // }
    NotesComponent.prototype.ngOnDestroy = function () {
        this.pageSettings.pageContentFullWidth = false;
    };
    NotesComponent.prototype.ngOnInit = function () {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.route.queryParams.subscribe(function (params) {
            _this.cust = params['custnumber'];
        });
        // this.data.currentMessage.subscribe(message => this.message = message)
        this.getAll(this.cust);
        this.getbulknotes(this.cust);
        this.getNotes(this.cust);
        this.getflagged(this.cust);
        this.getNotesReason(this.cust);
        this.getcollectormadenotes(this.cust);
        this.model.noteselector = 'collector';
    };
    NotesComponent.prototype.getbulknotes = function (cust) {
        var _this = this;
        this.ecolservice.getbulknotes(cust).subscribe(function (data) {
            _this.bulknote = data[0];
            _this.bulknotelength = data[0].length || 0;
            _this.loader = false;
        });
    };
    NotesComponent.prototype.getcollectormadenotes = function (cust) {
        var _this = this;
        this.ecolservice.totalcollectornotes(cust).subscribe(function (data) {
            console.log(data);
            _this.collectornoteslength = data[0].TOTAL;
            _this.loader = false;
        });
    };
    NotesComponent.prototype.getflagged = function (cust) {
        var _this = this;
        this.ecolservice.getflaggednotes(cust).subscribe(function (data) {
            _this.flaggedNotes = data[0];
            _this.flaggedlength = data[0].length || 0;
            _this.loader = false;
        });
    };
    NotesComponent.prototype.panelExpand = function () {
        this.expand = !this.expand;
    };
    NotesComponent.prototype.getNotes = function (custnumber) {
        var _this = this;
        this.ecolService.totalnotes(custnumber).subscribe(function (data) {
            _this.noteslength = data[0].TOTAL;
            // all notes counter
            if (data[0].TOTAL && data[0].TOTAL > 0) {
                _this.download_disabled = false;
                console.log(data);
            }
            _this.loader = false;
        });
    };
    NotesComponent.prototype.getNotesReason = function (cust) {
        var _this = this;
        this.ecolService.getactivitylogreason(cust).subscribe(function (data) {
            _this.notesreason = data;
            _this.notesreason = _this.notesreason.concat(data);
            // this.reason = data[0].reason;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                console.log(_this.notesreason[i].rfdother);
            }
            _this.loader = false;
            // console.log(this.custnotes);
        });
    };
    NotesComponent.prototype.getAll = function (cust) {
        var _this = this;
        this.ecolservice.getallnotes(cust).subscribe(function (data) {
            console.log(data);
            _this.notes = data;
            // enable notes download button
            if (data && data.length > 0) {
                _this.download_disabled = false;
            }
            // this.noteslength = data.length;
            for (var i = 0; i < data.length; i++) {
                // tslint:disable-next-line:max-line-length
                _this.notes[i].showedit =
                    _this.notes[i].OWNER === _this.username &&
                        _this.datePipe
                            .transform(_this.currentDate, 'dd-MMM-yy')
                            .toUpperCase() ===
                            _this.datePipe
                                .transform(_this.notes[i].NOTEDATE, 'dd-MMM-yy')
                                .toUpperCase();
            }
            // append posts
            if (!isNullOrUndefined(data) && _this.notes.length) {
                _this.noteData = _this.noteData.concat(data);
                console.log(data);
            }
            else {
                // this.pager.reachedend = true;
            }
            _this.loader = false;
        }, function (err) {
            console.log(err);
        });
    };
    NotesComponent.prototype.editnote = function (note) {
        // tslint:disable-next-line:max-line-length
        this.rout
            .navigateByUrl('/activitylog/editnote?id=' +
            note.ID +
            '&accnumber=' +
            note.ACCNUMBER +
            '&custnumber=' +
            note.CUSTNUMBER +
            '&username=' +
            note.OWNER +
            '&sys=watch')
            .then(function (e) {
            if (e) {
                console.log('Navigation is successful!');
            }
            else {
                console.log('Navigation has failed!');
            }
        });
    };
    NotesComponent.prototype.handleChange = function (e) {
        this.selectedLink = e;
    };
    NotesComponent.prototype.dateFormatter = function (params) {
        return moment(params.value).format('MM/DD/YYYY HH:mm');
    };
    NotesComponent.prototype.isSelected = function (name) {
        if (!this.selectedLink) {
            // if no radio button is selected, always return false so every nothing is shown
            return false;
        }
        return this.selectedLink === name; // if current radio button is selected, return true, else return false
    };
    NotesComponent.prototype.showTab = function (e) {
        for (var key in this.tabs) {
            if (key === e) {
                this.tabs[key] = true;
            }
            else {
                this.tabs[key] = false;
            }
        }
    };
    NotesComponent = __decorate([
        Component({
            selector: 'app-notes',
            templateUrl: './notes.component.html',
            styleUrls: ['./notes.component.css'],
        }),
        __metadata("design:paramtypes", [EcolService,
            ActivatedRoute,
            Router,
            DatePipe,
            EcolService,
            ExcelService,
            HttpClient])
    ], NotesComponent);
    return NotesComponent;
}());
export { NotesComponent };
//# sourceMappingURL=notes.component.js.map