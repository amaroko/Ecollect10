import { AfterViewInit, Component, ViewChild } from '@angular/core';

@Component({
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
export class PanelComponent implements AfterViewInit {
  @ViewChild('panelFooter', { static: false }) panelFooter;
  expand = false;
  reload = false;
  collapse = false;
  remove = false;
  showFooter = false;
  panelClass;
  variant;
  title: any;
  noButton: any;
  noBody: any;
  bodyClass: Boolean;
  footerClass: Boolean;

  ngAfterViewInit() {
    setTimeout(() => {
      this.showFooter =
        this.panelFooter.nativeElement &&
        this.panelFooter.nativeElement.children.length > 0;
    });
  }

  panelExpand() {
    this.expand = !this.expand;
  }

  panelReload() {
    this.reload = true;

    setTimeout(() => {
      this.reload = false;
    }, 1500);
  }

  panelCollapse() {
    this.collapse = !this.collapse;
  }

  panelRemove() {
    this.remove = !this.remove;
  }
}
