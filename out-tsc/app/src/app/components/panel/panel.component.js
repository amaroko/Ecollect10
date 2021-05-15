import { __decorate } from "tslib";
import { Component, ViewChild } from '@angular/core';
var PanelComponent = /** @class */ (function () {
    function PanelComponent() {
        this.expand = false;
        this.reload = false;
        this.collapse = false;
        this.remove = false;
        this.showFooter = false;
    }
    PanelComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.showFooter =
                _this.panelFooter.nativeElement &&
                    _this.panelFooter.nativeElement.children.length > 0;
        });
    };
    PanelComponent.prototype.panelExpand = function () {
        this.expand = !this.expand;
    };
    PanelComponent.prototype.panelReload = function () {
        var _this = this;
        this.reload = true;
        setTimeout(function () {
            _this.reload = false;
        }, 1500);
    };
    PanelComponent.prototype.panelCollapse = function () {
        this.collapse = !this.collapse;
    };
    PanelComponent.prototype.panelRemove = function () {
        this.remove = !this.remove;
    };
    __decorate([
        ViewChild('panelFooter', { static: false })
    ], PanelComponent.prototype, "panelFooter", void 0);
    PanelComponent = __decorate([
        Component({
            selector: 'app-panel',
            inputs: [
                'title',
                'variant',
                'noBody',
                'noButton',
                'bodyClass',
                'footerClass',
                'panelClass',
            ],
            templateUrl: './panel.component.html',
        })
    ], PanelComponent);
    return PanelComponent;
}());
export { PanelComponent };
//# sourceMappingURL=panel.component.js.map