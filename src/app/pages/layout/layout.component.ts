import { Component, HostListener, OnInit } from '@angular/core';
import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  pageSettings: any;
  pageHasScroll;

  constructor() {}

  ngOnInit() {
    this.pageSettings = pageSettings;
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const doc = document.documentElement;
    const top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
    this.pageHasScroll = top > 0;
  }

  // set page minified
  onToggleSidebarMinified(val: boolean): void {
    this.pageSettings.pageSidebarMinified = !this.pageSettings
      .pageSidebarMinified;
  }

  // set page right collapse
  onToggleSidebarRight(val: boolean): void {
    this.pageSettings.pageSidebarRightCollapsed = !this.pageSettings
      .pageSidebarRightCollapsed;
  }

  // hide mobile sidebar
  onHideMobileSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileSidebarToggled) {
      if (this.pageSettings.pageMobileSidebarFirstClicked) {
        this.pageSettings.pageMobileSidebarFirstClicked = false;
      } else {
        this.pageSettings.pageMobileSidebarToggled = false;
      }
    }
  }

  // toggle mobile sidebar
  onToggleMobileSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileSidebarToggled) {
      this.pageSettings.pageMobileSidebarToggled = false;
    } else {
      this.pageSettings.pageMobileSidebarToggled = true;
      this.pageSettings.pageMobileSidebarFirstClicked = true;
    }
  }

  // hide right mobile sidebar
  onHideMobileRightSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileRightSidebarToggled) {
      if (this.pageSettings.pageMobileRightSidebarFirstClicked) {
        this.pageSettings.pageMobileRightSidebarFirstClicked = false;
      } else {
        this.pageSettings.pageMobileRightSidebarToggled = false;
      }
    }
  }

  // toggle right mobile sidebar
  onToggleMobileRightSidebar(val: boolean): void {
    if (this.pageSettings.pageMobileRightSidebarToggled) {
      this.pageSettings.pageMobileRightSidebarToggled = false;
    } else {
      this.pageSettings.pageMobileRightSidebarToggled = true;
      this.pageSettings.pageMobileRightSidebarFirstClicked = true;
    }
  }
}
