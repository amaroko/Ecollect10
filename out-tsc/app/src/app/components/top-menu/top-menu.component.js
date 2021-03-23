import { __decorate, __metadata } from "tslib";
import { Component, HostListener, ViewChild, } from '@angular/core';
import pageSettings from '../../config/page-settings';
import { menu } from '../../config/page-menus';
var TopMenuComponent = /** @class */ (function () {
    function TopMenuComponent() {
        this.menuitems = menu;
        this.navControlLeft = false;
        this.navControlRight = false;
        this.navWidth = 0;
        this.navMarginLeft = 0;
        this.navMarginRight = 0;
        this.pageSettings = pageSettings;
        this.mobileMode = window.innerWidth <= 767 ? true : false;
        this.desktopMode = window.innerWidth <= 767 ? false : true;
    }
    TopMenuComponent.prototype.controlLeft = function () {
        var widthLeft = this.navMarginLeft;
        var containerWidth = this.topMenuContainer.nativeElement.clientWidth;
        var finalScrollWidth = 0;
        if (widthLeft <= containerWidth) {
            finalScrollWidth = 0;
            this.navControlLeft = false;
        }
        else {
            finalScrollWidth = widthLeft - containerWidth + 88;
        }
        if (!document.body.classList.contains('rtl-mode')) {
            this.navMarginLeft = finalScrollWidth;
            this.navMarginRight = 0;
            this.navControlRight = true;
        }
        else {
            this.navMarginRight = finalScrollWidth;
            this.navMarginLeft = 0;
            this.navControlRight = true;
        }
    };
    TopMenuComponent.prototype.controlRight = function () {
        var containerWidth = this.topMenuContainer.nativeElement.clientWidth - 88;
        var widthLeft = this.navWidth + -this.navMarginLeft - containerWidth;
        var finalScrollWidth = 0;
        if (widthLeft <= containerWidth) {
            finalScrollWidth = widthLeft - -this.navMarginLeft + 128;
            this.navControlRight = false;
        }
        else {
            finalScrollWidth = containerWidth - -this.navMarginLeft - 128;
        }
        if (finalScrollWidth !== 0) {
            if (!document.body.classList.contains('rtl-mode')) {
                this.navMarginLeft = finalScrollWidth;
                this.navMarginRight = 0;
            }
            else {
                this.navMarginRight = finalScrollWidth;
                this.navMarginLeft = 0;
            }
            this.navControlLeft = true;
        }
    };
    TopMenuComponent.prototype.onResize = function (event) {
        if (window.innerWidth <= 767) {
            this.mobileMode = true;
            this.desktopMode = false;
        }
        else {
            this.mobileMode = false;
            this.desktopMode = true;
        }
    };
    TopMenuComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            var windowWidth = _this.topMenuContainer.nativeElement.clientWidth - 128;
            var listFullWidth = 0;
            var listPrevWidth = 0;
            var listActive = false;
            var navList = Array.from(document.querySelectorAll('.top-menu .nav > li'));
            navList.forEach(function (list) {
                var elm = list;
                listFullWidth += elm.offsetWidth;
                listPrevWidth += !listActive ? elm.offsetWidth : 0;
                listActive = elm.classList.contains('active') ? true : listActive;
            });
            _this.navWidth = listFullWidth;
            listPrevWidth = !listActive ? 0 : listPrevWidth;
            if (listPrevWidth >= windowWidth) {
                var finalScrollWidth = listPrevWidth - windowWidth + 128;
                if (!document.body.classList.contains('rtl-mode')) {
                    _this.navMarginLeft = finalScrollWidth;
                    _this.navMarginRight = 0;
                }
                else {
                    _this.navMarginRight = finalScrollWidth;
                    _this.navMarginLeft = 0;
                }
            }
            _this.navControlRight =
                listPrevWidth != listFullWidth && listFullWidth >= windowWidth
                    ? true
                    : false;
            _this.navControlLeft =
                listPrevWidth >= windowWidth && listFullWidth >= windowWidth
                    ? true
                    : false;
        });
    };
    TopMenuComponent.prototype.expandCollapseSubmenu = function (currentMenu, allMenu, active) {
        if (currentMenu.state == 'expand' ||
            (active.isActive && !currentMenu.state)) {
            currentMenu.state = 'collapse';
        }
        else {
            currentMenu.state = 'expand';
        }
    };
    __decorate([
        ViewChild('topMenuContainer', { static: true }),
        __metadata("design:type", Object)
    ], TopMenuComponent.prototype, "topMenuContainer", void 0);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], TopMenuComponent.prototype, "onResize", null);
    TopMenuComponent = __decorate([
        Component({
            selector: 'app-top-menu',
            templateUrl: './top-menu.component.html,
        })
    ], TopMenuComponent);
    return TopMenuComponent;
}());
export { TopMenuComponent };
//# sourceMappingURL=top-menu.component.js.map