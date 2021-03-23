import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import pageSettings from './config/page-settings';
import { BnNgIdleService } from 'bn-ng-idle';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EcolService } from './services/ecol.service';
import { environment } from '../environments/environment';
import { NgxSmartModalService } from 'ngx-smart-modal';

const ADLOGIN = environment.adlogin;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentYear: number = new Date().getFullYear();
  pageSettings;
  // window scroll
  pageHasScroll;
  username: string | '';
  // USERNAME: '';
  vallForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  data: any;
  code: any;

  constructor(
    private titleService: Title,
    private route: ActivatedRoute,
    fb: FormBuilder,
    public ecolService: EcolService,
    public ngxSmartModalService: NgxSmartModalService,
    private router: Router,
    private renderer: Renderer2,
    private bnIdle: BnNgIdleService
  ) {
    router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        if (window.innerWidth < 768) {
          this.pageSettings.pageMobileSidebarToggled = false;
        }
      }
    });

    this.vallForm = fb.group({
      // 'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      username: [null, Validators.required],
      password: [null, Validators.required],
    });

    // idle logout
    this.bnIdle.startWatching(7200).subscribe((res) => {
      if (res && !localStorage.getItem('currentUser')) {
        this.newsession();
        this.closetimeoutModal();
      } else if (res && localStorage.getItem('currentUser')) {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.USERNAME;
        this.opentimeoutModal();
        localStorage.setItem('timeout', '1'); // creates timeout tracker
      }
    });
  }

  submitFormm($ev, value: any) {
    $ev.preventDefault();
    // console.log(value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.vallForm.invalid) {
      return;
    }

    this.loading = true;
    // AD login
    if (ADLOGIN) {
      const body = {
        username: value.username.toLowerCase(),
        password: value.password,
      };
      this.ecolService.auth(body).subscribe(
        (response) => {
          if (response.auth) {
            // get user
            this.gettuser(value.username, value.password);
          } else {
            this.error = 'Wrong username and/or password';
            this.loading = false;
          }
        },
        (error) => {
          console.log(error);
          this.error = 'Error during login';
          this.loading = false;
        }
      );
    } else {
      this.gettuser(value.username.toLowerCase(), value.password);
    }
  }

  ngOnInit() {
    // page settings
    this.pageSettings = pageSettings;
    // check if logged!
    this.onreload();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.ecolService.ifLogged();
    this.ecolService.ifclosed();
    const currentUser = JSON.parse(localStorage.getItem('currentUser')); // to get username in localstorage..
    this.username = currentUser.USERNAME;
  }

  opentimeoutModal() {
    // open modal
    this.ngxSmartModalService.getModal('lockModal').open();
  }

  // openpersistanceModal() {
  //   // open modal
  //   this.ngxSmartModalService.getModal('lockModal').open();
  // }

  closetimeoutModal() {
    // close modal
    this.ngxSmartModalService.getModal('lockModal').close();
  }

  newsession() {
    // Logs out user when they claim the timeout page was not theirs
    this.ecolService.logout();
    this.closetimeoutModal();
    this.router.navigate(['/login']);
    localStorage.removeItem('timeout');
  }

  onreload() {
    if (localStorage.getItem('timeout')) {
      /*swal({
        title: 'You reloaded the Timeout',
        imageUrl: 'assets/img/user/notlogg.png',
        text: 'Kindly, log in to continue!',

        confirmButtonColor: '#7ac142',
        confirmButtonText: 'Okay'
      });*/
      this.router.navigate(['/login']);
      localStorage.removeItem('timeout');
    }
  }

  gettuser(username, password) {
    this.ecolService.login(username).subscribe(
      (user) => {
        if (user.length > 0 && this.username === username) {
          // checks for correct username and username session
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          // get user permissions
          this.ecolService
            .getpermissions(user[0].ROLE)
            .subscribe((permission) => {
              // console.log(permission);
              user.authdata = window.btoa(username + ':' + password);
              this.code = localStorage.getItem('currentUser');
              // localStorage.getItem('currentUser');
              // localStorage.getItem('userpermission');
              // localStorage.getItem('profile');
              //
              // sessionStorage.getItem('currentUser');
              // sessionStorage.getItem('userpermission');
              // sessionStorage.getItem('profile');
              // this.router.navigate([this.returnUrl]);
              this.closetimeoutModal();
              localStorage.removeItem('timeout'); // removes timeout tracker
            });
          //
        } else {
          this.error =
            'User not created on E-Collect or This is not your session';
          this.loading = false;
        }

        // return user;
      },
      (error) => {
        console.log(error);
        if (error.statusText === 'Not Found') {
          this.error = 'User not created on E-Collect';
          this.loading = false;
        } else {
          this.error = 'Error during login';
          this.loading = false;
        }
      }
    );
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
}
