import { __decorate, __metadata } from 'tslib';
import { Injectable } from '@angular/core';
// import {Workbook} from 'exceljs';
// import * as fs from 'file-saver';
// import * as logoFile from '../../assets/img/cooplogo.js';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

var URL = environment.api;
var ExcelService = /** @class */ (function() {
  function ExcelService(datePipe, http) {
    this.datePipe = datePipe;
    this.http = http;
  }

  ExcelService = __decorate([
    Injectable({
      providedIn: 'root'
    }),
    __metadata('design:paramtypes', [DatePipe, HttpClient])
  ], ExcelService);
  return ExcelService;
}());
export { ExcelService };
//# sourceMappingURL=excel.service.js.map
