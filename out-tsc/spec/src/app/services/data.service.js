import { __decorate, __metadata } from 'tslib';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

var DataService = /** @class */ (function () {
  function DataService() {
    this.dataSubject = new BehaviorSubject(0);
    this.notesSubject = new BehaviorSubject(0);
    this.Subject = new BehaviorSubject(0);
    this.reminderSubject = new BehaviorSubject(0);
    this.woffstorySubject = new BehaviorSubject(0);
    this.guarantorsSubject = new BehaviorSubject(0);
    this.contactsSubject = new BehaviorSubject(0);
    this.collateralSubject = new BehaviorSubject(0);
    this.filesSubject = new BehaviorSubject(0);
    this.telesSubject = new BehaviorSubject(0);
    this.ptpsSubject = new BehaviorSubject(0);
    this.timeSubject = new BehaviorSubject(0);
    this.reminderalertsSubject = new BehaviorSubject(0);
  }

  DataService.prototype.getTestData = function () {
    return this.dataSubject.asObservable();
  };
  DataService.prototype.getReminderalert = function () {
    return this.reminderalertsSubject.asObservable();
  };
  DataService.prototype.getTimeData = function () {
    return this.timeSubject.asObservable();
  };
  DataService.prototype.getNotesData = function () {
    return this.notesSubject.asObservable();
  };
  DataService.prototype.getReminderData = function () {
    return this.reminderSubject.asObservable();
  };
  DataService.prototype.getWoffstoryData = function () {
    return this.woffstorySubject.asObservable();
  };
  DataService.prototype.getCollateral = function () {
    return this.collateralSubject.asObservable();
  };
  DataService.prototype.getContacts = function () {
    return this.contactsSubject.asObservable();
  };
  DataService.prototype.getGuarantors = function () {
    return this.guarantorsSubject.asObservable();
  };
  DataService.prototype.getFiles = function () {
    return this.filesSubject.asObservable();
  };
  DataService.prototype.getTeles = function () {
    return this.telesSubject.asObservable();
  };
  DataService.prototype.getPtps = function () {
    return this.ptpsSubject.asObservable();
  };
  DataService.prototype.pustPtpData = function (dataToPush) {
    this.dataSubject.next(dataToPush);
  };
  DataService.prototype.pustNotesData = function (dataToPush) {
    this.notesSubject.next(dataToPush);
  };
  DataService.prototype.pushReminderData = function (dataToPush) {
    this.reminderSubject.next(dataToPush);
  };
  DataService.prototype.pushReminderAlertData = function (dataToPush) {
    this.reminderalertsSubject.next(dataToPush);
  };
  DataService.prototype.pushWoffstoryData = function (dataToPush) {
    this.woffstorySubject.next(dataToPush);
  };
  DataService.prototype.pushContacts = function (dataToPush) {
    this.contactsSubject.next(dataToPush);
  };
  DataService.prototype.pushReminder = function (dataToPush) {
    this.reminderSubject.next(dataToPush);
  };
  DataService.prototype.pushGuarantors = function (dataToPush) {
    this.guarantorsSubject.next(dataToPush);
  };
  DataService.prototype.pushCollateral = function (dataToPush) {
    this.collateralSubject.next(dataToPush);
  };
  DataService.prototype.pushFile = function (totalFiles) {
    this.filesSubject.next(totalFiles);
  };
  DataService.prototype.pushTeles = function (totalTeles) {
    this.telesSubject.next(totalTeles);
  };
  DataService.prototype.pushPtps = function (totalPtps) {
    this.ptpsSubject.next(totalPtps);
  };
  DataService = __decorate(
    [
      Injectable({
        providedIn: 'root',
      }),
      __metadata('design:paramtypes', []),
    ],
    DataService
  );
  return DataService;
})();
export { DataService };
// services
//# sourceMappingURL=data.service.js.map
