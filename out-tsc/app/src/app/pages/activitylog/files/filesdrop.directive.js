import { __decorate, __metadata } from 'tslib';
import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileUploader } from '@swimlane/ng2-file-upload';

var FilesdropDirective = /** @class */ (function() {
  function FilesdropDirective(element) {
    this.fileOver = new EventEmitter();
    this.onFileDrop = new EventEmitter();
    this.element = element;
  }

  FilesdropDirective.prototype.getOptions = function() {
    return this.uploader.options;
  };
  FilesdropDirective.prototype.getFilters = function() {
    return {};
  };
  FilesdropDirective.prototype.onDrop = function(event) {
    var transfer = this._getTransfer(event);
    if (!transfer) {
      return;
    }
    var options = this.getOptions();
    var filters = this.getFilters();
    this._preventAndStop(event);
    this.uploader.addToQueue(transfer.files, options, filters);
    this.fileOver.emit(false);
    this.onFileDrop.emit(transfer.files);
  };
  FilesdropDirective.prototype.onDragOver = function(event) {
    var transfer = this._getTransfer(event);
    if (!this._haveFiles(transfer.types)) {
      return;
    }
    transfer.dropEffect = 'copy';
    this._preventAndStop(event);
    this.fileOver.emit(true);
  };
  FilesdropDirective.prototype.onDragLeave = function(event) {
    if (event.currentTarget === this.element[0]) {
      return;
    }
    this._preventAndStop(event);
    this.fileOver.emit(false);
  };
  FilesdropDirective.prototype._getTransfer = function(event) {
    return event.dataTransfer
      ? event.dataTransfer
      : event.originalEvent.dataTransfer; // jQuery fix;
  };
  FilesdropDirective.prototype._preventAndStop = function(event) {
    event.preventDefault();
    event.stopPropagation();
  };
  FilesdropDirective.prototype._haveFiles = function(types) {
    if (!types) {
      return false;
    }
    if (types.indexOf) {
      return types.indexOf('Files') !== -1;
    } else if (types.contains) {
      return types.contains('Files');
    } else {
      return false;
    }
  };
  __decorate([
    Input(),
    __metadata('design:type', FileUploader)
  ], FilesdropDirective.prototype, 'uploader', void 0);
  __decorate([
    Output(),
    __metadata('design:type', EventEmitter)
  ], FilesdropDirective.prototype, 'fileOver', void 0);
  __decorate([
    Output(),
    __metadata('design:type', EventEmitter)
  ], FilesdropDirective.prototype, 'onFileDrop', void 0);
  __decorate([
    HostListener('drop', ['$event']),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0)
  ], FilesdropDirective.prototype, 'onDrop', null);
  __decorate([
    HostListener('dragover', ['$event']),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0)
  ], FilesdropDirective.prototype, 'onDragOver', null);
  __decorate([
    HostListener('dragleave', ['$event']),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', Object)
  ], FilesdropDirective.prototype, 'onDragLeave', null);
  FilesdropDirective = __decorate([
    Directive({
      selector: '[ng2FileDrop]'
    }),
    __metadata('design:paramtypes', [ElementRef])
  ], FilesdropDirective);
  return FilesdropDirective;
}());
export { FilesdropDirective };
//# sourceMappingURL=filesdrop.directive.js.map
