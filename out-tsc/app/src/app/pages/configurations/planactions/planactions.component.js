import { __decorate } from "tslib";
import { Component } from '@angular/core';
import swal from 'sweetalert2';
var PlanactionsComponent = /** @class */ (function () {
    function PlanactionsComponent(ecolService) {
        this.ecolService = ecolService;
        this.model = {};
        this.planactions = [];
        this.edit = false;
    }
    PlanactionsComponent.prototype.ngOnInit = function () {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.getplanactions();
        this.getid();
    };
    PlanactionsComponent.prototype.getid = function () {
        var possible = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var lengthOfCode = 7;
        this.model.actioncode = this.makeRandom(lengthOfCode, possible);
    };
    PlanactionsComponent.prototype.makeRandom = function (lengthOfCode, possible) {
        var text = '';
        for (var i = 0; i < lengthOfCode; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    };
    PlanactionsComponent.prototype.getplanactions = function () {
        var _this = this;
        this.ecolService.s_actions().subscribe(function (response) {
            _this.planactions = response;
        }, function (error) {
            console.log(error);
        });
    };
    PlanactionsComponent.prototype.saveplanaction = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.model.actionid = form.actioncode;
        this.model.actiontitle = form.actiontitle;
        this.model.updateby = this.username;
        // save to db
        this.ecolService.post_s_actions(this.model).subscribe(function (response) {
            swal.fire('Good!', 'Action saved!', 'success');
            _this.getplanactions();
            _this.model = {};
            _this.getid();
        }, function (error) {
            console.log(error);
            swal.fire({
                title: 'Ooops!',
                text: 'Plan action Not saved!',
                icon: 'error',
                footer: '<a href="http://helpdesk.co-opbank.co.ke" target="_blank">Report issue to helpdesk?</a>',
            });
        });
    };
    PlanactionsComponent.prototype.editaction = function (form) {
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.model.actioncode = form.actionid;
        this.model.actiontitle = form.actiontitle;
        //
        this.edit = true;
    };
    PlanactionsComponent.prototype.updateaction = function (form) {
        var _this = this;
        // check if logged in
        this.ecolService.ifLogged();
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.model.actionid = form.actioncode;
        this.model.actiontitle = form.actiontitle;
        this.model.updateby = this.username;
        // save to db
        this.ecolService.put_s_actions(this.model).subscribe(function (response) {
            swal.fire('Good!', 'Plan action updated!', 'success');
            _this.getplanactions();
        }, function (error) {
            console.log(error);
            swal.fire('Ooops!', 'Plan action Not updated!', 'error');
        });
    };
    PlanactionsComponent.prototype.cancel = function () {
        this.edit = false;
        this.model = {};
        this.getid();
    };
    PlanactionsComponent.prototype.delete = function () {
        swal
            .fire({
            title: 'Are you sure?',
            text: 'You want to DELETE!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete!',
        })
            .then(function (result) {
            if (result.value) {
                //
            }
        });
    };
    PlanactionsComponent = __decorate([
        Component({
            selector: 'app-planactions',
            templateUrl: './planactions.component.html',
            styleUrls: ['./planactions.component.css'],
        })
    ], PlanactionsComponent);
    return PlanactionsComponent;
}());
export { PlanactionsComponent };
//# sourceMappingURL=planactions.component.js.map