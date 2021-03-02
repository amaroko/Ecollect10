import { __decorate, __metadata } from 'tslib';
import { Component, HostListener, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import pageSettings from './config/page-settings';

var AppComponent = /** @class */ (function() {
  function AppComponent(titleService, router, renderer) {
    var _this = this;
    this.titleService = titleService;
    this.router = router;
    this.renderer = renderer;
    router.events.subscribe(function(e) {
      if (e instanceof NavigationStart) {
        if (window.innerWidth < 768) {
          _this.pageSettings.pageMobileSidebarToggled = false;
        }
      }
    });
  }

  AppComponent.prototype.ngOnInit = function() {
    // page settings
    this.pageSettings = pageSettings;
  };
  AppComponent.prototype.onWindowScroll = function($event) {
    var doc = document.documentElement;
    var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    if (top > 0) {
      this.pageHasScroll = true;
    } else {
      this.pageHasScroll = false;
    }
  };
  // set page minified
  AppComponent.prototype.onToggleSidebarMinified = function(val) {
    if (this.pageSettings.pageSidebarMinified) {
      this.pageSettings.pageSidebarMinified = false;
    } else {
      this.pageSettings.pageSidebarMinified = true;
    }
  };
  // set page right collapse
  AppComponent.prototype.onToggleSidebarRight = function(val) {
    if (this.pageSettings.pageSidebarRightCollapsed) {
      this.pageSettings.pageSidebarRightCollapsed = false;
    } else {
      this.pageSettings.pageSidebarRightCollapsed = true;
    }
  };
  // hide mobile sidebar
  AppComponent.prototype.onHideMobileSidebar = function(val) {
    if (this.pageSettings.pageMobileSidebarToggled) {
      if (this.pageSettings.pageMobileSidebarFirstClicked) {
        this.pageSettings.pageMobileSidebarFirstClicked = false;
      } else {
        this.pageSettings.pageMobileSidebarToggled = false;
      }
    }
  };
  // toggle mobile sidebar
  AppComponent.prototype.onToggleMobileSidebar = function(val) {
    if (this.pageSettings.pageMobileSidebarToggled) {
      this.pageSettings.pageMobileSidebarToggled = false;
    } else {
      this.pageSettings.pageMobileSidebarToggled = true;
      this.pageSettings.pageMobileSidebarFirstClicked = true;
    }
  };
  // hide right mobile sidebar
  AppComponent.prototype.onHideMobileRightSidebar = function(val) {
    if (this.pageSettings.pageMobileRightSidebarToggled) {
      if (this.pageSettings.pageMobileRightSidebarFirstClicked) {
        this.pageSettings.pageMobileRightSidebarFirstClicked = false;
      } else {
        this.pageSettings.pageMobileRightSidebarToggled = false;
      }
    }
  };
  __decorate([
    HostListener('window:scroll', ['$event']),
    __metadata('design:type', Function),
    __metadata('design:paramtypes', [Object]),
    __metadata('design:returntype', void 0)
  ], AppComponent.prototype, 'onWindowScroll', null);
  AppComponent = __decorate([
    Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    }),
    __metadata('design:paramtypes', [Title,
      Router,
      Renderer2])
  ], AppComponent);
  return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map
