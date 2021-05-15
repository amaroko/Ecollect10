import { __awaiter, __decorate, __generator } from "tslib";
import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
import * as logoFile from '../../assets/img/cooplogo.js';
var ExportwoffstoryService = /** @class */ (function () {
    function ExportwoffstoryService(datePipe, http) {
        this.datePipe = datePipe;
        this.http = http;
    }
    ExportwoffstoryService.prototype.generateWoffstory = function () {
        return __awaiter(this, void 0, void 0, function () {
            var title, header, workbook, worksheet, titleRow, subTitleRow, logo, headerRow;
            return __generator(this, function (_a) {
                title = 'Write-off Story Report';
                header = [
                    'accnumber',
                    'custnumber',
                    'owner',
                    'woffstory',
                    'lastupdate',
                    'client_name',
                    'rrocode',
                    'arocode',
                    'branchname',
                ];
                workbook = new Workbook();
                worksheet = workbook.addWorksheet('Write-off Story');
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
                worksheet.addImage(logo, 'H1:I3');
                worksheet.mergeCells('A1:G2');
                // Blank Row
                worksheet.addRow([]);
                headerRow = worksheet.addRow(header);
                // Cell Style : Fill and Border
                headerRow.eachCell(function (cell, number) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'AED6F1' },
                        bgColor: { argb: 'AED6F1' },
                    };
                    cell.border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                });
                // worksheet.addRows(data);
                this.http.get(URL + '/api/writeoffstory/export').subscribe(function (resp) {
                    // Add Data and Conditional Formatting
                    var data = [];
                    var datax = [];
                    for (var x = 0; x < resp.length; x++) {
                        data.push(resp[x].ACCNUMBER, resp[x].CUSTNUMBER, resp[x].OWNER, resp[x].WOFFSTORY, resp[x].LASTUPDATE, resp[x].CLIENT_NAME, resp[x].RROCODE, resp[x].AROCODE, resp[x].BRANCHNAME);
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
                        'This report is system generated.',
                    ]);
                    footerRow.getCell(1).fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: 'AED6F1' }, // FFCCFFE5
                    };
                    // tslint:disable-next-line:max-line-length
                    footerRow.getCell(1).border = {
                        top: { style: 'thin' },
                        left: { style: 'thin' },
                        bottom: { style: 'thin' },
                        right: { style: 'thin' },
                    };
                    // Merge Cells
                    worksheet.mergeCells("A" + footerRow.number + ":I" + footerRow.number);
                    // Generate Excel File with given name
                    workbook.xlsx.writeBuffer().then(function (data) {
                        var blob = new Blob([data], {
                            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                        });
                        fs.saveAs(blob, 'Write-off Story.xlsx');
                    });
                }, function (error) {
                    //
                });
                return [2 /*return*/];
            });
        });
    };
    ExportwoffstoryService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], ExportwoffstoryService);
    return ExportwoffstoryService;
}());
export { ExportwoffstoryService };
//# sourceMappingURL=exportwoffstory.service.js.map