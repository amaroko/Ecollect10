import { __decorate } from "tslib";
import { Component, HostListener } from '@angular/core';
import pageSettings from '../../config/page-settings';
var LayoutComponent = /** @class */ (function () {
    function LayoutComponent() {
    }
    LayoutComponent.prototype.ngOnInit = function () {
        this.pageSettings = pageSettings;
    };
    LayoutComponent.prototype.onWindowScroll = function ($event) {
        var doc = document.documentElement;
        var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
        this.pageHasScroll = top > 0;
    };
    // set page minified
    LayoutComponent.prototype.onToggleSidebarMinified = function (val) {
        this.pageSettings.pageSidebarMinified = !this.pageSettings
            .pageSidebarMinified;
    };
    // set page right collapse
    LayoutComponent.prototype.onToggleSidebarRight = function (val) {
        this.pageSettings.pageSidebarRightCollapsed = !this.pageSettings
            .pageSidebarRightCollapsed;
    };
    // hide mobile sidebar
    LayoutComponent.prototype.onHideMobileSidebar = function (val) {
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
    LayoutComponent.prototype.onToggleMobileSidebar = function (val) {
        if (this.pageSettings.pageMobileSidebarToggled) {
            this.pageSettings.pageMobileSidebarToggled = false;
        }
        else {
            this.pageSettings.pageMobileSidebarToggled = true;
            this.pageSettings.pageMobileSidebarFirstClicked = true;
        }
    };
    // hide right mobile sidebar
    LayoutComponent.prototype.onHideMobileRightSidebar = function (val) {
        if (this.pageSettings.pageMobileRightSidebarToggled) {
            if (this.pageSettings.pageMobileRightSidebarFirstClicked) {
                this.pageSettings.pageMobileRightSidebarFirstClicked = false;
            }
            else {
                this.pageSettings.pageMobileRightSidebarToggled = false;
            }
        }
    };
    // toggle right mobile sidebar
    LayoutComponent.prototype.onToggleMobileRightSidebar = function (val) {
        if (this.pageSettings.pageMobileRightSidebarToggled) {
            this.pageSettings.pageMobileRightSidebarToggled = false;
        }
        else {
            this.pageSettings.pageMobileRightSidebarToggled = true;
            this.pageSettings.pageMobileRightSidebarFirstClicked = true;
        }
    };
    __decorate([
        HostListener('window:scroll', ['$event'])
    ], LayoutComponent.prototype, "onWindowScroll", null);
    LayoutComponent = __decorate([
        Component({
            selector: 'app-layout',
            templateUrl: './layout.component.html',
            styleUrls: ['./layout.component.css'],
        })
    ], LayoutComponent);
    return LayoutComponent;
}());
export { LayoutComponent };
//# sourceMappingURL=layout.component.js.map