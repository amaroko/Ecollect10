import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Validators } from '@angular/forms';
var ADLOGIN = environment.adlogin;
var LoginComponent = /** @class */ (function () {
    function LoginComponent(fb, ecolService, router, route, faviconService) {
        this.ecolService = ecolService;
        this.router = router;
        this.route = route;
        this.faviconService = faviconService;
        this.messageCount = 0;
        this.loading = false;
        this.submitted = false;
        this.error = '';
        this.fadeout = false;
        this.menuArray = ['Home'];
        this.currentYear = new Date().getFullYear();
        this.valForm = fb.group({
            // 'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
            username: [null, Validators.required],
            password: [null, Validators.required],
        });
    }
    Object.defineProperty(LoginComponent.prototype, "f", {
        get: function () {
            return this.valForm.controls;
        },
        enumerable: false,
        configurable: true
    });
    LoginComponent.prototype.submitForm = function ($ev, value) {
        var _this = this;
        $ev.preventDefault();
        // console.log(value);
        this.submitted = true;
        // stop here if form is invalid
        if (this.valForm.invalid) {
            return;
        }
        this.loading = true;
        /*for (let c in this.valForm.controls) {
            this.valForm.controls[c].markAsTouched();
        }
        if (this.valForm.valid) {
            console.log('Valid!');
            console.log(value);
        }*/
        // AD login login
        if (ADLOGIN) {
            var body = {
                username: value.username.toLowerCase(),
                password: value.password,
            };
            this.ecolService.auth(body).subscribe(function (response) {
                if (response.auth) {
                    // get user
                    _this.getuser(value.username, value.password);
                }
                else {
                    _this.error = 'Wrong username and/or password';
                    _this.fadeout = true;
                    _this.loading = false;
                }
            }, function (error) {
                console.log(error);
                _this.error = 'Error during login';
                _this.fadeout = true;
                _this.loading = false;
            });
        }
        else {
            // local ecollect
            this.getuser(value.username.toLowerCase(), value.password);
        }
    };
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.ecolService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    };
    LoginComponent.prototype.getuser = function (username, password) {
        var _this = this;
        this.ecolService.login(username).subscribe(function (user) {
            if (user.length > 0) {
                // store user details and basic auth credentials in local storage
                // to keep user logged in between page refreshes
                // get user permissions
                _this.ecolService
                    .getpermissions(user[0].ROLE)
                    .subscribe(function (permission) {
                    // console.log(permission);
                    user.authdata = window.btoa(username + ':' + password);
                    localStorage.setItem('currentUser', JSON.stringify(user[0]));
                    localStorage.setItem('userpermission', JSON.stringify(permission));
                    localStorage.setItem('profile', '1');
                    sessionStorage.setItem('currentUser', JSON.stringify(user[0]));
                    sessionStorage.setItem('userpermission', JSON.stringify(permission));
                    sessionStorage.setItem('profile', '1');
                    // this.router.navigate([this.returnUrl]);
                    // this.router.navigate([this.returnUrl]);
                    // this.router.navigate(['/home'], { skipLocationChange: true }).then(() => {
                    //   // do whatever you need after navigation succeeds
                    // });
                    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                    console.log(currentUser);
                    // this.reDirectTo('home');
                    // this.router.navigate(['home'], { relativeTo: this.route });
                    window.location.href = 'home';
                    // this.router.navigate(['/permissionsensor']).then(() => {
                    //   // do whatever you need after navigation succeeds
                    //   // this.router.navigate([this.returnUrl]);
                    //   // this.router.navigate([this.returnUrl]);
                    //   setTimeout(() => {
                    //     this.router.navigate(['/home/user/coop']);
                    //   }, 5000);
                });
                //
            }
            else {
                _this.error = 'User not created on E-Collect';
                _this.fadeout = true;
                _this.loading = false;
            }
            // return user;
        }, function (error) {
            console.log(error);
            if (error.statusText === 'Not Found') {
                _this.error = 'User not created on E-Collect';
                _this.fadeout = true;
                _this.loading = false;
                // error if server not found
            }
            else if (error.name === 'HttpErrorResponse') {
                _this.error = 'Server Error. Could Not connect to Server';
                _this.loading = false;
                _this.fadeout = true;
            }
            else {
                _this.error = 'Error during login';
                _this.fadeout = true;
                _this.loading = false;
            }
        });
    };
    LoginComponent.prototype.incrementNotificationCount = function ($event) {
        $event.preventDefault();
        this.messageCount++;
        this.faviconService.setNumber(this.messageCount);
    };
    LoginComponent.prototype.restoreFavicon = function ($event) {
        $event.preventDefault();
        this.messageCount = 0;
        this.faviconService.setDefault();
    };
    LoginComponent = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css'],
        })
    ], LoginComponent);
    return LoginComponent;
}());
export { LoginComponent };
//# sourceMappingURL=login.component.js.map