import {animate, state, style, transition, trigger} from '@angular/animations';
import {menu} from '../../config/page-menus';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
  ViewChild
} from '@angular/core';

import pageSettings from '../../config/page-settings';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: [
    trigger('expandCollapse', [
      state('expand', style({height: '*', overflow: 'hidden', display: 'block'})),
      state('collapse', style({height: '0px', overflow: 'hidden', display: 'none'})),
      state('active', style({height: '*', overflow: 'hidden', display: 'block'})),
      transition('expand <=> collapse', animate(100)),
      transition('active => collapse', animate(100))
    ])
  ]
})

export class SidebarComponent implements AfterViewChecked {
  navProfileState = 'collapse';
  @Output() toggleSidebarMinified = new EventEmitter<boolean>();
  @Output() hideMobileSidebar = new EventEmitter<boolean>();
  @Output() setPageFloatSubMenu = new EventEmitter();
  @Input() pageSidebarTransparent;
  @Input() pageSidebarMinified;
  menuitems = menu;
  pageSettings = pageSettings;
  pageFloatSubMenu;
  pageFloatSubMenuHide;
  pageFloatSubMenuHideTime = 250;
  pageFloatSubMenuTop;
  pageFloatSubMenuLeft = '60px';
  pageFloatSubMenuRight;
  pageFloatSubMenuBottom;
  pageFloatSubMenuArrowTop;
  pageFloatSubMenuArrowBottom;
  pageFloatSubMenuLineTop;
  pageFloatSubMenuLineBottom;
  pageFloatSubMenuOffset;
  mobileMode;
  desktopMode;
  scrollTop;
  @ViewChild('sidebarScrollbar', {static: false}) private sidebarScrollbar: ElementRef;

  constructor(private eRef: ElementRef) {
    if (window.innerWidth <= 767) {
      this.mobileMode = true;
      this.desktopMode = false;
    } else {
      this.mobileMode = false;
      this.desktopMode = true;
    }
  }

  toggleNavProfile() {
    if (this.navProfileState === 'collapse') {
      this.navProfileState = 'expand';
    } else {
      this.navProfileState = 'collapse';
    }
  }

  toggleMinified() {
    this.toggleSidebarMinified.emit(true);
    this.navProfileState = 'collapse';
    this.scrollTop = 40;
  }

  calculateFloatSubMenuPosition() {
    const targetTop = this.pageFloatSubMenuOffset.top;
    const direction = document.body.style.direction;
    const windowHeight = window.innerHeight;

    setTimeout(() => {
      const targetElm = <HTMLElement>document.querySelector('.float-sub-menu-container');
      const targetSidebar = <HTMLElement>document.getElementById('sidebar');
      const targetHeight = targetElm.offsetHeight;
      this.pageFloatSubMenuRight = 'auto';
      this.pageFloatSubMenuLeft = (this.pageFloatSubMenuOffset.width + targetSidebar.offsetLeft) + 'px';

      if ((windowHeight - targetTop) > targetHeight) {
        this.pageFloatSubMenuTop = this.pageFloatSubMenuOffset.top + 'px';
        this.pageFloatSubMenuBottom = 'auto';
        this.pageFloatSubMenuArrowTop = '20px';
        this.pageFloatSubMenuArrowBottom = 'auto';
        this.pageFloatSubMenuLineTop = '20px';
        this.pageFloatSubMenuLineBottom = 'auto';
      } else {
        this.pageFloatSubMenuTop = 'auto';
        this.pageFloatSubMenuBottom = '0';

        const arrowBottom = (windowHeight - targetTop) - 21;
        this.pageFloatSubMenuArrowTop = 'auto';
        this.pageFloatSubMenuArrowBottom = arrowBottom + 'px';
        this.pageFloatSubMenuLineTop = '20px';
        this.pageFloatSubMenuLineBottom = arrowBottom + 'px';
      }
    }, 0);
  }

  showPageFloatSubMenu(menu, e) {
    if (this.pageSettings.pageSidebarMinified) {
      clearTimeout(this.pageFloatSubMenuHide);

      this.pageFloatSubMenu = menu;
      this.pageFloatSubMenuOffset = e.target.getBoundingClientRect();
      this.calculateFloatSubMenuPosition();
    }
  }

  hidePageFloatSubMenu() {
    this.pageFloatSubMenuHide = setTimeout(() => {
      this.pageFloatSubMenu = '';
    }, this.pageFloatSubMenuHideTime);
  }

  remainPageFloatSubMenu() {
    clearTimeout(this.pageFloatSubMenuHide);
  }

  expandCollapseSubmenu(currentMenu, allMenu, active) {
    for (const menu of allMenu) {
      if (menu !== currentMenu) {
        menu.state = 'collapse';
      }
    }
    if (active.isActive) {
      currentMenu.state = (currentMenu.state && currentMenu.state === 'collapse') ? 'expand' : 'collapse';
    } else {
      currentMenu.state = (currentMenu.state && currentMenu.state === 'expand') ? 'collapse' : 'expand';
    }
  }

  sidebarSearch(e: any) {
    let value = e.target.value;
    value = value.toLowerCase();

    if (value) {
      for (const menu of this.menuitems) {
        let title = menu.title;
        title = title.toLowerCase();

        if (title.search(value) > -1) {
          menu['hide'] = false;
          if (menu.submenu) {
            menu['state'] = 'expand';
          }
        } else {
          let hasSearch = false;
          if (menu.submenu) {
            for (let x = 0; x < menu.submenu.length; x++) {
              let subtitle = menu.submenu[x].title;
              subtitle = subtitle.toLowerCase();

              if (subtitle.search(value) > -1) {
                hasSearch = true;
              }
            }
          }
          if (hasSearch) {
            menu['hide'] = false;
            menu['state'] = 'expand';
          } else {
            menu['hide'] = true;
          }
        }
      }
    } else {
      for (const menu of this.menuitems) {
        menu['hide'] = '';
        menu['state'] = '';
      }
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.hideMobileSidebar.emit(true);
    }
  }

  @HostListener('scroll', ['$event'])
  onScroll(event) {
    this.scrollTop = (this.pageSettings.pageSidebarMinified) ? event.srcElement.scrollTop + 40 : 0;
    if (typeof (Storage) !== 'undefined') {
      localStorage.setItem('sidebarScroll', event.srcElement.scrollTop);
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

  ngAfterViewChecked() {
    if (typeof (Storage) !== 'undefined' && localStorage.sidebarScroll) {
      if (this.sidebarScrollbar && this.sidebarScrollbar.nativeElement) {
        this.sidebarScrollbar.nativeElement.scrollTop = localStorage.sidebarScroll;
      }
    }
  }
}
