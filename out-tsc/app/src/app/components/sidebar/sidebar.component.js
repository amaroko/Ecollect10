import { __decorate, __metadata, __values } from "tslib";
import { animate, state, style, transition, trigger, } from '@angular/animations';
import { menu } from '../../config/page-menus';
import { Component, ElementRef, EventEmitter, HostListener, Input, Output, } from '@angular/core';
import pageSettings from '../../config/page-settings';
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(eRef) {
        this.eRef = eRef;
        this.navProfileState = 'collapse';
        this.toggleSidebarMinified = new EventEmitter();
        this.hideMobileSidebar = new EventEmitter();
        this.setPageFloatSubMenu = new EventEmitter();
        this.menuitems = menu;
        this.pageSettings = pageSettings;
        this.pageFloatSubMenuHideTime = 250;
        this.pageFloatSubMenuLeft = '60px';
        if (window.innerWidth <= 767) {
            this.mobileMode = true;
            this.desktopMode = false;
        }
        else {
            this.mobileMode = false;
            this.desktopMode = true;
        }
    }
    SidebarComponent.prototype.toggleNavProfile = function () {
        if (this.navProfileState === 'collapse') {
            this.navProfileState = 'expand';
        }
        else {
            this.navProfileState = 'collapse';
        }
    };
    SidebarComponent.prototype.toggleMinified = function () {
        this.toggleSidebarMinified.emit(true);
        this.navProfileState = 'collapse';
        this.scrollTop = 40;
    };
    SidebarComponent.prototype.calculateFloatSubMenuPosition = function () {
        var _this = this;
        var targetTop = this.pageFloatSubMenuOffset.top;
        var direction = document.body.style.direction;
        var windowHeight = window.innerHeight;
        setTimeout(function () {
            var targetElm = (document.querySelector('.float-sub-menu-container'));
            var targetSidebar = document.getElementById('sidebar');
            var targetHeight = targetElm.offsetHeight;
            _this.pageFloatSubMenuRight = 'auto';
            _this.pageFloatSubMenuLeft =
                _this.pageFloatSubMenuOffset.width + targetSidebar.offsetLeft + 'px';
            if (windowHeight - targetTop > targetHeight) {
                _this.pageFloatSubMenuTop = _this.pageFloatSubMenuOffset.top + 'px';
                _this.pageFloatSubMenuBottom = 'auto';
                _this.pageFloatSubMenuArrowTop = '20px';
                _this.pageFloatSubMenuArrowBottom = 'auto';
                _this.pageFloatSubMenuLineTop = '20px';
                _this.pageFloatSubMenuLineBottom = 'auto';
            }
            else {
                _this.pageFloatSubMenuTop = 'auto';
                _this.pageFloatSubMenuBottom = '0';
                var arrowBottom = windowHeight - targetTop - 21;
                _this.pageFloatSubMenuArrowTop = 'auto';
                _this.pageFloatSubMenuArrowBottom = arrowBottom + 'px';
                _this.pageFloatSubMenuLineTop = '20px';
                _this.pageFloatSubMenuLineBottom = arrowBottom + 'px';
            }
        }, 0);
    };
    SidebarComponent.prototype.showPageFloatSubMenu = function (menu, e) {
        if (this.pageSettings.pageSidebarMinified) {
            clearTimeout(this.pageFloatSubMenuHide);
            this.pageFloatSubMenu = menu;
            this.pageFloatSubMenuOffset = e.target.getBoundingClientRect();
            this.calculateFloatSubMenuPosition();
        }
    };
    SidebarComponent.prototype.hidePageFloatSubMenu = function () {
        var _this = this;
        this.pageFloatSubMenuHide = setTimeout(function () {
            _this.pageFloatSubMenu = '';
        }, this.pageFloatSubMenuHideTime);
    };
    SidebarComponent.prototype.remainPageFloatSubMenu = function () {
        clearTimeout(this.pageFloatSubMenuHide);
    };
    SidebarComponent.prototype.expandCollapseSubmenu = function (currentMenu, allMenu, active) {
        var e_1, _a;
        try {
            for (var allMenu_1 = __values(allMenu), allMenu_1_1 = allMenu_1.next(); !allMenu_1_1.done; allMenu_1_1 = allMenu_1.next()) {
                var menu_1 = allMenu_1_1.value;
                if (menu_1 !== currentMenu) {
                    menu_1.state = 'collapse';
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (allMenu_1_1 && !allMenu_1_1.done && (_a = allMenu_1.return)) _a.call(allMenu_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (active.isActive) {
            currentMenu.state =
                currentMenu.state && currentMenu.state === 'collapse'
                    ? 'expand'
                    : 'collapse';
        }
        else {
            currentMenu.state =
                currentMenu.state && currentMenu.state === 'expand'
                    ? 'collapse'
                    : 'expand';
        }
    };
    SidebarComponent.prototype.sidebarSearch = function (e) {
        var e_2, _a, e_3, _b;
        var value = e.target.value;
        value = value.toLowerCase();
        if (value) {
            try {
                for (var _c = __values(this.menuitems), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var menu_2 = _d.value;
                    var title = menu_2.title;
                    title = title.toLowerCase();
                    if (title.search(value) > -1) {
                        menu_2['hide'] = false;
                        if (menu_2.submenu) {
                            menu_2['state'] = 'expand';
                        }
                    }
                    else {
                        var hasSearch = false;
                        if (menu_2.submenu) {
                            for (var x = 0; x < menu_2.submenu.length; x++) {
                                var subtitle = menu_2.submenu[x].title;
                                subtitle = subtitle.toLowerCase();
                                if (subtitle.search(value) > -1) {
                                    hasSearch = true;
                                }
                            }
                        }
                        if (hasSearch) {
                            menu_2['hide'] = false;
                            menu_2['state'] = 'expand';
                        }
                        else {
                            menu_2['hide'] = true;
                        }
                    }
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_2) throw e_2.error; }
            }
        }
        else {
            try {
                for (var _e = __values(this.menuitems), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var menu_3 = _f.value;
                    menu_3['hide'] = '';
                    menu_3['state'] = '';
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
    };
    SidebarComponent.prototype.clickout = function (event) {
        if (!this.eRef.nativeElement.contains(event.target)) {
            this.hideMobileSidebar.emit(true);
        }
    };
    SidebarComponent.prototype.onScroll = function (event) {
        this.scrollTop = this.pageSettings.pageSidebarMinified
            ? event.srcElement.scrollTop + 40
            : 0;
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('sidebarScroll', event.srcElement.scrollTop);
        }
    };
    SidebarComponent.prototype.onResize = function (event) {
        if (window.innerWidth <= 767) {
            this.mobileMode = true;
            this.desktopMode = false;
        }
        else {
            this.mobileMode = false;
            this.desktopMode = true;
        }
    };
    SidebarComponent.prototype.ngAfterViewChecked = function () {
        if (typeof Storage !== 'undefined' && localStorage.sidebarScroll) {
            if (this.sidebarScrollbar && this.sidebarScrollbar.nativeElement) {
                this.sidebarScrollbar.nativeElement.scrollTop =
                    localStorage.sidebarScroll;
            }
        }
    };
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "toggleSidebarMinified", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "hideMobileSidebar", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "setPageFloatSubMenu", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "pageSidebarTransparent", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], SidebarComponent.prototype, "pageSidebarMinified", void 0);
    __decorate([
        ViewChild('sidebarScrollbar', { static: false }),
        __metadata("design:type", ElementRef)
    ], SidebarComponent.prototype, "sidebarScrollbar", void 0);
    __decorate([
        HostListener('document:click', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarComponent.prototype, "clickout", null);
    __decorate([
        HostListener('scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarComponent.prototype, "onScroll", null);
    __decorate([
        HostListener('window:resize', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], SidebarComponent.prototype, "onResize", null);
    SidebarComponent = __decorate([
        Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            animations: [
                trigger('expandCollapse', [
                    state('expand', style({ height: '*', overflow: 'hidden', display: 'block' })),
                    state('collapse', style({ height: '0px', overflow: 'hidden', display: 'none' })),
                    state('active', style({ height: '*', overflow: 'hidden', display: 'block' })),
                    transition('expand <=> collapse', animate(100)),
                    transition('active => collapse', animate(100)),
                ]),
            ],
        }),
        __metadata("design:paramtypes", [ElementRef])
    ], SidebarComponent);
    return SidebarComponent;
}());
export { SidebarComponent };
//# sourceMappingURL=sidebar.component.js.map