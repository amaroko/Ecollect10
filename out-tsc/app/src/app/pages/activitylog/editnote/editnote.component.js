import { __decorate, __metadata } from 'tslib';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EcolService } from '../../../services/ecol.service';
import swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { FormBuilder } from '@angular/forms';

var URL = environment.valor;
var EditnoteComponent = /** @class */ (function() {
  function EditnoteComponent(route, ecolService, formBuilder) {
    this.route = route;
    this.ecolService = ecolService;
    this.formBuilder = formBuilder;
    this.model = {};
    this.note = [];
    this.submitted = false;
    //
  }

  Object.defineProperty(EditnoteComponent.prototype, 'f', {
    // convenience getter for easy access to form fields
    get: function() {
      return this.editnoteForm.controls;
    },
    enumerable: false,
    configurable: true
  });
  EditnoteComponent.prototype.ngOnInit = function() {
    var _this = this;
    // check if logged in
    this.ecolService.ifLogged();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.USERNAME;
    this.accnumber = this.route.snapshot.queryParamMap.get('accnumber');
    this.route.queryParamMap.subscribe(function(queryParams) {
      _this.accnumber = queryParams.get('accnumber');
      _this.model.accnumber = queryParams.get('accnumber');
    });
    /*this.username = this.route.snapshot.queryParamMap.get('username');
    this.route.queryParamMap.subscribe(queryParams => {
      this.username = queryParams.get('username');
    });*/
    this.custnumber = this.route.snapshot.queryParamMap.get('custnumber');
    this.route.queryParamMap.subscribe(function(queryParams) {
      _this.custnumber = queryParams.get('custnumber');
      _this.model.custnumber = queryParams.get('custnumber');
    });
    this.noteid = this.route.snapshot.queryParamMap.get('id');
    this.route.queryParamMap.subscribe(function(queryParams) {
      _this.noteid = queryParams.get('id');
      _this.model.id = queryParams.get('id');
    });
    // get this note
    this.getNote(this.noteid);
    this.buildForm();
  };
  EditnoteComponent.prototype.onSubmit = function() {
    // check if logged in
    this.ecolService.ifLogged();
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.username = currentUser.username;
    // Loading indictor
    this.ecolService.loader();
    //
    var body = {
      id: this.f.id.value,
      owner: this.username,
      notemade: this.f.notemade.value,
      custnumber: this.model.custnumber,
      accnumber: this.model.accnumber,
      notesrc: this.note.notesrc,
      noteimp: this.note.noteimp,
      notedate: this.note.notedate
    };
    this.ecolService.updatenote(body).subscribe(function(data) {
      console.log(body);
      swal.fire('Successful!', 'Note updated!', 'success').then(function() {
        window.history.back();
      });
      //
    }, function(error) {
      console.log(error);
      swal.fire('Error!', 'Error occurred during processing!', 'error');
    });
  };
  EditnoteComponent.prototype.getNote = function(id) {
    var _this = this;
    this.ecolService.getanote(id).subscribe(function(data) {
      _this.note = data;
      _this.buildForm();
    }, function(error) {
      console.log(error);
    });
  };
  EditnoteComponent.prototype.buildForm = function() {
    // get static data
    this.editnoteForm = this.formBuilder.group({
      id: [{ value: this.note.id, disabled: true }],
      accnumber: [{ value: this.note.accnumber, disabled: true }],
      custnumber: [{ value: this.note.custnumber, disabled: true }],
      notemade: [{ value: this.note.notemade, disabled: false }],
      notedate: [{ value: this.note.notedate, disabled: true }],
      owner: [{ value: this.note.owner, disabled: true }]
    });
  };
  EditnoteComponent.prototype.cancel = function() {
    window.history.back();
  };
  EditnoteComponent = __decorate([
    Component({
      selector: 'app-editnote',
      templateUrl: './editnote.component.html',
      styleUrls: ['./editnote.component.css']
    }),
    __metadata('design:paramtypes', [ActivatedRoute,
      EcolService,
      FormBuilder])
  ], EditnoteComponent);
  return EditnoteComponent;
}());
export { EditnoteComponent };
//# sourceMappingURL=editnote.component.js.map
