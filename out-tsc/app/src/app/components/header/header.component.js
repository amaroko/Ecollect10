import { __decorate, __metadata } from 'tslib';
import { Component, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import pageSettings from '../../config/page-settings';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { EcolService } from '../../services/ecol.service';

var HeaderComponent = /** @class */ (function() {
  function HeaderComponent(renderer, ecolService, router) {
    var _this = this;
    this.renderer = renderer;
    this.ecolService = ecolService;
    this.router = router;
    this.toggleSidebarRightCollapsed = new EventEmitter();
    this.toggleMobileSidebar = new EventEmitter();
    this.toggleMobileRightSidebar = new EventEmitter();
    this.pageSettings = pageSettings;
    setInterval(function() {
      _this.clock = new Date(); // shows clock on header
      _this.getGreetings(); // greeting text
    }, 1000); // sync time and greeting text in real time
    this.userdata = JSON.parse(localStorage.getItem('currentUser'));
    this.userperm = JSON.parse(localStorage.getItem('userpermission'));
    this.user = {
      picture: 'assets/img/user/coop.jpg',
      username: this.userdata.USERNAME,
      division: this.userdata.TEAM,
      role: this.userdata.ROLE,
      firstname: this.userdata.FIRSTNAME,
      surname: this.userdata.SURNAME
    };
  }

  HeaderComponent.prototype.getGreetings = function() {
    var data = [
      [0, 11, 'Good Morning'],
      [12, 16, 'Good Afternoon'],
      [17, 24, 'Good Evening']
    ], hr = new Date().getHours();
    for (var i = 0; i < data.length; i++) {
      if (hr >= data[i][0] && hr <= data[i][1]) {
        this.time = JSON.stringify(data[i][2]);
        this.time2 = JSON.parse(this.time);
        // console.log(JSON.parse(this.time));
      }
    }
  };
  HeaderComponent.prototype.mobileSidebarToggle = function() {
    this.toggleMobileSidebar.emit(true);
  };
  HeaderComponent.prototype.mobileRightSidebarToggle = function() {
    this.toggleMobileRightSidebar.emit(true);
  };
  HeaderComponent.prototype.toggleSidebarRight = function() {
    this.toggleSidebarRightCollapsed.emit(true);
  };
  HeaderComponent.prototype.mobileTopMenuToggle = function() {
    this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings
      .pageMobileTopMenuToggled;
  };
  HeaderComponent.prototype.mobileMegaMenuToggle = function() {
    this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings
      .pageMobileMegaMenuToggled;
  };
  HeaderComponent.prototype.ngOnDestroy = function() {
    this.pageSettings.pageMobileTopMenuToggled = false;
    this.pageSettings.pageMobileMegaMenuToggled = false;
  };
  HeaderComponent.prototype.logout = function() {
    var _this = this;
    swal
      .fire({
        title: this.user.firstname.toUpperCase() + ', are you sure?',
        imageUrl: 'assets/img/user/coop.jpg',
        text: 'You want to logout!',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Logout!'
      })
      .then(function(result) {
        if (result.value) {
          _this.ecolService.logout();
          _this.router.navigate(['/login']);
        }
      });
  };
  __decorate([
    Input(),
    __metadata('design:type', Object)
  ], HeaderComponent.prototype, 'pageSidebarTwo', void 0);
  __decorate([
    Output(),
    __metadata('design:type', Object)
  ], HeaderComponent.prototype, 'toggleSidebarRightCollapsed', void 0);
  __decorate([
    Output(),
    __metadata('design:type', Object)
  ], HeaderComponent.prototype, 'toggleMobileSidebar', void 0);
  __decorate([
    Output(),
    __metadata('design:type', Object)
  ], HeaderComponent.prototype, 'toggleMobileRightSidebar', void 0);
  HeaderComponent = __decorate([
    Component({
      selector: 'app-header',
      templateUrl: './header.component.html'
    }),
    __metadata('design:paramtypes', [Renderer2,
      EcolService,
      Router])
  ], HeaderComponent);
  return HeaderComponent;
}());
export { HeaderComponent };
//# sourceMappingURL=header.component.js.map
