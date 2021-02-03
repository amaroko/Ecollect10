import {Component, EventEmitter, Input, OnDestroy, Output, Renderer2} from '@angular/core';
import pageSettings from '../../config/page-settings';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {EcolService} from '../../services/ecol.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy {
  @Input() pageSidebarTwo;
  @Output() toggleSidebarRightCollapsed = new EventEmitter<boolean>();
  @Output() toggleMobileSidebar = new EventEmitter<boolean>();
  @Output() toggleMobileRightSidebar = new EventEmitter<boolean>();
  pageSettings = pageSettings;
  clock;
  time: any;
  time2: any;
  userdata: any;
  userperm: any;
  user: any;


  constructor(private renderer: Renderer2,
              public ecolService: EcolService,
              public router: Router) {
    setInterval(() => {
      this.clock = new Date(); // shows clock on header
      this.getGreetings();  // greeting text
    }, 1000);    // sync time and greeting text in real time
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

  getGreetings() {
    const data = [
        [0, 11, 'Good Morning'],          // Store messages in an array
        [12, 16, 'Good Afternoon'],
        [17, 24, 'Good Evening']
      ],
      hr = new Date().getHours();

    for (let i = 0; i < data.length; i++) {
      if (hr >= data[i][0] && hr <= data[i][1]) {
        this.time = JSON.stringify(data[i][2]);
        this.time2 = JSON.parse(this.time);

        // console.log(JSON.parse(this.time));
      }
    }
  }

  mobileSidebarToggle() {
    this.toggleMobileSidebar.emit(true);
  }

  mobileRightSidebarToggle() {
    this.toggleMobileRightSidebar.emit(true);
  }

  toggleSidebarRight() {
    this.toggleSidebarRightCollapsed.emit(true);
  }

  mobileTopMenuToggle() {
    this.pageSettings.pageMobileTopMenuToggled = !this.pageSettings.pageMobileTopMenuToggled;
  }

  mobileMegaMenuToggle() {
    this.pageSettings.pageMobileMegaMenuToggled = !this.pageSettings.pageMobileMegaMenuToggled;
  }

  ngOnDestroy() {
    this.pageSettings.pageMobileTopMenuToggled = false;
    this.pageSettings.pageMobileMegaMenuToggled = false;
  }

  logout() {
    swal.fire({
      title: (this.user.firstname).toUpperCase() + ', are you sure?',
      imageUrl: 'assets/img/user/coop.jpg',
      text: 'You want to logout!',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout!'
    }).then((result) => {
      if (result.value) {
        this.ecolService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
