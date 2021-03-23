import { __awaiter, __decorate, __generator, __metadata } from "tslib";
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from '../../assets/img/cooplogo.js';
import { DatePipe } from '@angular/common';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
var URL = environment.api;
var ExcelService = /** @class */ (function () {
    function ExcelService(datePipe, http) {
        this.datePipe = datePipe;
        this.http = http;
    }
    ExcelService.prototype.generateExcel = function (cust) {
        return __awaiter(this, void 0, void 0, function () {
            var title, header, workbook, worksheet, titleRow, subTitleRow, logo, headerRow;
            return __generator(this, function (_a) {
                title = 'Notes Report';
                header = [
                    'id',
                    'accnumber',
                    'custnumber',
                    'notemade',
                    'owner',
                    'noteimp',
                    'notesrc',
                    'notedate',
                ];
                workbook = new Workbook();
                worksheet = workbook.addWorksheet('Notes Data');
                titleRow = worksheet.addRow([title]);
                titleRow.font = {
                    name: 'Comic Sans MS',
                    family: 4,
                    size: 16,
                    underline: 'double',
                    bold: true,
                };
                worksheet.addRow([]);
                subTitleRow = worksheet.addRow([
                    'Date : ' + this.datePipe.transform(new Date(), 'medium'),
                ]);
                logo = workbook.addImage({
                    base64: logoFile.logoBase64,
                    extension: 'png',
                });
                worksheet.addImage(logo, 'G1:H3');
                worksheet.mergeCells('A1:F2');
                // Blank Row
                worksheet.addRow([]);
                headerRow = worksheet.addRow(header);
                // Cell Style : Fill and Border
                headerRow.eachCell(function (cell, number) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFFFFF00' },
                        bgColor: { argb: 'FF0000FF' },
                    };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
                // worksheet.addRows(data);
                this.http
                    .get(URL + '/api/notehis?filter[where][custnumber]=' + cust)
                    .subscribe(function (resp) {
                    // Add Data and Conditional Formatting
                    var data = [];
                    var datax = [];
                    for (var x = 0; x < resp.length; x++) {
                        data.push(resp[x].id, resp[x].accnumber, resp[x].custnumber, resp[x].notemade, resp[x].owner, resp[x].noteimp, resp[x].notesrc, resp[x].notedate);
                        datax.push(data);
                        data = [];
                    }
                    datax.forEach(function (d) {
                        worksheet.addRow(d);
                    });
                    worksheet.getColumn(4).width = 100;
                    worksheet.addRow([]);
                    // Footer Row
                    var footerRow = worksheet.addRow([
                        'This is system generated excel sheet.',
                    ]);
                    footerRow.getCell(1).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'FFCCFFE5' },
                    };
                    // tslint:disable-next-line:max-line-length
                    footerRow.getCell(1).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    // Merge Cells
                    worksheet.mergeCells("A" + footerRow.number + ":H" + footerRow.number);
                    // Generate Excel File with given name
                    workbook.xlsx.writeBuffer().then(function (data) {
                        var blob = new Blob([data], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        });
                        fs.saveAs(blob, cust + 'Notes.xlsx');
                    });
                }, function (error) {
                    //
                });
                return [2 /*return*/];
            });
        });
    };
    ExcelService = __decorate([
        Injectable({
            providedIn: 'root',
        }),
        __metadata("design:paramtypes", [DatePipe, HttpClient])
    ], ExcelService);
    return ExcelService;
}());
export { ExcelService };
// this
//# sourceMappingURL=excel.service.js.map