import {
  AfterViewInit,
  Component,
  HostListener,
  ViewChild,
} from '@angular/core';
import pageSettings from '../../config/page-settings';
import { menu } from '../../config/page-menus';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
})
export class TopMenuComponent implements AfterViewInit {
  @ViewChild('topMenuContainer', { static: true }) topMenuContainer;

  menuitems = menu;
  navControlLeft = false;
  navControlRight = false;
  navWidth = 0;
  navMarginLeft = 0;
  navMarginRight = 0;
  pageSettings = pageSettings;
  mobileMode = window.innerWidth <= 767;
  desktopMode = window.innerWidth > 767;

  controlLeft() {
    const widthLeft = this.navMarginLeft;
    const containerWidth = this.topMenuContainer.nativeElement.clientWidth;
    let finalScrollWidth = 0;

    if (widthLeft <= containerWidth) {
      finalScrollWidth = 0;
      this.navControlLeft = false;
    } else {
      finalScrollWidth = widthLeft - containerWidth + 88;
    }

    if (!document.body.classList.contains('rtl-mode')) {
      this.navMarginLeft = finalScrollWidth;
      this.navMarginRight = 0;
      this.navControlRight = true;
    } else {
      this.navMarginRight = finalScrollWidth;
      this.navMarginLeft = 0;
      this.navControlRight = true;
    }
  }

  controlRight() {
    const containerWidth = this.topMenuContainer.nativeElement.clientWidth - 88;
    const widthLeft = this.navWidth + -this.navMarginLeft - containerWidth;
    let finalScrollWidth = 0;

    if (widthLeft <= containerWidth) {
      finalScrollWidth = widthLeft - -this.navMarginLeft + 128;
      this.navControlRight = false;
    } else {
      finalScrollWidth = containerWidth - -this.navMarginLeft - 128;
    }

    if (finalScrollWidth !== 0) {
      if (!document.body.classList.contains('rtl-mode')) {
        this.navMarginLeft = finalScrollWidth;
        this.navMarginRight = 0;
      } else {
        this.navMarginRight = finalScrollWidth;
        this.navMarginLeft = 0;
      }
      this.navControlLeft = true;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth <= 767) {
      this.mobileMode = true;
      this.desktopMode = false;
    } else {
      this.mobileMode = false;
      this.desktopMode = true;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const windowWidth = this.topMenuContainer.nativeElement.clientWidth - 128;
      let listFullWidth = 0;
      let listPrevWidth = 0;
      let listActive = false;

      const navList = Array.from(
        document.querySelectorAll('.top-menu .nav > li')
      );
      navList.forEach(function (list) {
        const elm = list as any;
        listFullWidth += elm.offsetWidth;
        listPrevWidth += !listActive ? elm.offsetWidth : 0;
        listActive = elm.classList.contains('active') ? true : listActive;
      });

      this.navWidth = listFullWidth;

      listPrevWidth = !listActive ? 0 : listPrevWidth;

      if (listPrevWidth >= windowWidth) {
        const finalScrollWidth = listPrevWidth - windowWidth + 128;
        if (!document.body.classList.contains('rtl-mode')) {
          this.navMarginLeft = finalScrollWidth;
          this.navMarginRight = 0;
        } else {
          this.navMarginRight = finalScrollWidth;
          this.navMarginLeft = 0;
        }
      }

      this.navControlRight =
        listPrevWidth !== listFullWidth && listFullWidth >= windowWidth;
      this.navControlLeft =
        listPrevWidth >= windowWidth && listFullWidth >= windowWidth;
    });
  }

  expandCollapseSubmenu(currentMenu, allMenu, active) {
    if (
      currentMenu.state === 'expand' ||
      (active.isActive && !currentMenu.state)
    ) {
      currentMenu.state = 'collapse';
    } else {
      currentMenu.state = 'expand';
    }
  }
}
