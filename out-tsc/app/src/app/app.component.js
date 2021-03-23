import { __decorate, __metadata } from "tslib";
import { Component, HostListener, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import pageSettings from './config/page-settings';
import { BnNgIdleService } from 'bn-ng-idle';
import { FormBuilder, Validators } from '@angular/forms';
import { EcolService } from './services/ecol.service';
import { environment } from '../environments/environment';
import { NgxSmartModalService } from 'ngx-smart-modal';
var ADLOGIN = environment.adlogin;
var AppComponent = /** @class */ (function () {
    function AppComponent(titleService, route, fb, ecolService, ngxSmartModalService, router, renderer, bnIdle) {
        var _this = this;
        this.titleService = titleService;
        this.route = route;
        this.ecolService = ecolService;
        this.ngxSmartModalService = ngxSmartModalService;
        this.router = router;
        this.renderer = renderer;
        this.bnIdle = bnIdle;
        this.currentYear = new Date().getFullYear();
        this.loading = false;
        this.submitted = false;
        this.error = '';
        router.events.subscribe(function (e) {
            if (e instanceof NavigationStart) {
                if (window.innerWidth < 768) {
                    _this.pageSettings.pageMobileSidebarToggled = false;
                }
            }
        });
        this.vallForm = fb.group({
            // 'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            username: [null, Validators.required],
            password: [null, Validators.required],
        });
        // idle logout
        this.bnIdle.startWatching(7200).subscribe(function (res) {
            if (res && !localStorage.getItem('currentUser')) {
                _this.newsession();
                _this.closetimeoutModal();
            }
            else if (res && localStorage.getItem('currentUser')) {
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                _this.username = currentUser.USERNAME;
                _this.opentimeoutModal();
                localStorage.setItem('timeout', '1'); // creates timeout tracker
            }
        });
    }
    AppComponent.prototype.submitFormm = function ($ev, value) {
        var _this = this;
        $ev.preventDefault();
        // console.log(value);
        this.submitted = true;
        // stop here if form is invalid
        if (this.vallForm.invalid) {
            return;
        }
        this.loading = true;
        // AD login
        if (ADLOGIN) {
            var body = {
                username: value.username.toLowerCase(),
                password: value.password,
            };
            this.ecolService.auth(body).subscribe(function (response) {
                if (response.auth) {
                    // get user
                    _this.gettuser(value.username, value.password);
                }
                else {
                    _this.error = 'Wrong username and/or password';
                    _this.loading = false;
                }
            }, function (error) {
                console.log(error);
                _this.error = 'Error during login';
                _this.loading = false;
            });
        }
        else {
            this.gettuser(value.username.toLowerCase(), value.password);
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        // page settings
        this.pageSettings = pageSettings;
        // check if logged!
        this.onreload();
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.ecolService.ifLogged();
        this.ecolService.ifclosed();
        var currentUser = JSON.parse(localStorage.getItem('currentUser')); // to get username in localstorage..
        this.username = currentUser.USERNAME;
    };
    AppComponent.prototype.opentimeoutModal = function () {
        // open modal
        this.ngxSmartModalService.getModal('lockModal').open();
    };
    // openpersistanceModal() {
    //   // open modal
    //   this.ngxSmartModalService.getModal('lockModal').open();
    // }
    AppComponent.prototype.closetimeoutModal = function () {
        // close modal
        this.ngxSmartModalService.getModal('lockModal').close();
    };
    AppComponent.prototype.newsession = function () {
        // Logs out user when they claim the timeout page was not theirs
        this.ecolService.logout();
        this.closetimeoutModal();
        this.router.navigate(['/login']);
        localStorage.removeItem('timeout');
    };
    AppComponent.prototype.onreload = function () {
        if (localStorage.getItem('timeout')) {
            /*swal({
              title: 'You reloaded the Timeout',
              imageUrl: 'assets/img/user/notlogg.png',
              text: 'Kindly, log in to continue!',
      
              confirmButtonColor: '#7ac142',
              confirmButtonText: 'Okay'
            });*/
            this.router.navigate(['/login']);
            localStorage.removeItem('timeout');
        }
    };
    AppComponent.prototype.gettuser = function (username, password) {
        var _this = this;
        this.ecolService.login(username).subscribe(function (user) {
            if (user.length > 0 && _this.username === username) {
                // checks for correct username and username session
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                // get user permissions
                _this.ecolService
                    .getpermissions(user[0].ROLE)
                    .subscribe(function (permission) {
                    // console.log(permission);
                    user.authdata = window.btoa(username + ':' + password);
                    _this.code = localStorage.getItem('currentUser');
                    // localStorage.getItem('currentUser');
                    // localStorage.getItem('userpermission');
                    // localStorage.getItem('profile');
                    //
                    // sessionStorage.getItem('currentUser');
                    // sessionStorage.getItem('userpermission');
                    // sessionStorage.getItem('profile');
                    // this.router.navigate([this.returnUrl]);
                    _this.closetimeoutModal();
                    localStorage.removeItem('timeout'); // removes timeout tracker
                });
                //
            }
            else {
                _this.error =
                    'User not created on E-Collect or This is not your session';
                _this.loading = false;
            }
            // return user;
        }, function (error) {
            console.log(error);
            if (error.statusText === 'Not Found') {
                _this.error = 'User not created on E-Collect';
                _this.loading = false;
            }
            else {
                _this.error = 'Error during login';
                _this.loading = false;
            }
        });
    };
    AppComponent.prototype.onWindowScroll = function ($event) {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        this.pageHasScroll = top > 0;
    };
    // set page minified
    AppComponent.prototype.onToggleSidebarMinified = function (val) {
        this.pageSettings.pageSidebarMinified = !this.pageSettings
            .pageSidebarMinified;
    };
    // set page right collapse
    AppComponent.prototype.onToggleSidebarRight = function (val) {
        this.pageSettings.pageSidebarRightCollapsed = !this.pageSettings
            .pageSidebarRightCollapsed;
    };
    // hide mobile sidebar
    AppComponent.prototype.onHideMobileSidebar = function (val) {
        if (this.pageSettings.pageMobileSidebarToggled) {
            if (this.pageSettings.pageMobileSidebarFirstClicked) {
                this.pageSettings.pageMobileSidebarFirstClicked = false;
            }
            else {
                this.pageSettings.pageMobileSidebarToggled = false;
            }
        }
    };
    // toggle mobile sidebar
    AppComponent.prototype.onToggleMobileSidebar = function (val) {
        if (this.pageSettings.pageMobileSidebarToggled) {
            this.pageSettings.pageMobileSidebarToggled = false;
        }
        else {
            this.pageSettings.pageMobileSidebarToggled = true;
            this.pageSettings.pageMobileSidebarFirstClicked = true;
        }
    };
    // hide right mobile sidebar
    AppComponent.prototype.onHideMobileRightSidebar = function (val) {
        if (this.pageSettings.pageMobileRightSidebarToggled) {
            if (this.pageSettings.pageMobileRightSidebarFirstClicked) {
                this.pageSettings.pageMobileRightSidebarFirstClicked = false;
            }
            else {
                this.pageSettings.pageMobileRightSidebarToggled = false;
            }
        }
    };
    __decorate([
        HostListener('window:scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], AppComponent.prototype, "onWindowScroll", null);
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
        }),
        __metadata("design:paramtypes", [Title,
            ActivatedRoute,
            FormBuilder,
            EcolService,
            NgxSmartModalService,
            Router,
            Renderer2,
            BnNgIdleService])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map