import { Component, OnInit } from '@angular/core';
import { EcolService } from '../../services/ecol.service';
import { environment } from '../../../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FaviconService } from '@enzedd/ng-favicon';

const ADLOGIN = environment.adlogin;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  messageCount = 0;
  valForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  fadeout = false;
  data: any;
  menuArray = ['Home'];
  menuitems: any[];
  private div: any;

  constructor(
    fb: FormBuilder,
    public ecolService: EcolService,
    public router: Router,
    private route: ActivatedRoute,
    private faviconService: FaviconService
  ) {
    this.valForm = fb.group({
      // 'email': [null, Validators.compose([Validators.required, CustomValidators.email])],
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  get f() {
    return this.valForm.controls;
  }

  submitForm($ev, value: any) {
    $ev.preventDefault();
    // console.log(value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.valForm.invalid) {
      return;
    }

    this.loading = true;
    /*for (let c in this.valForm.controls) {
        this.valForm.controls[c].markAsTouched();
    }
    if (this.valForm.valid) {
        console.log('Valid!');
        console.log(value);
    }*/
    // AD login login
    if (ADLOGIN) {
      const body = {
        username: value.username.toLowerCase(),
        password: value.password
      };
      this.ecolService.auth(body).subscribe(
        (response) => {
          if (response.auth) {
            // get user
            this.getuser(value.username, value.password);
          } else {
            this.error = 'Wrong username and/or password';
            this.fadeout = true;
            this.loading = false;
          }
        },
        (error) => {
          console.log(error);
          this.error = 'Error during login';
          this.fadeout = true;
          this.loading = false;
        }
      );
    } else {
      // local ecollect
      this.getuser(value.username.toLowerCase(), value.password);
    }
  }

  ngOnInit() {
    // reset login status
    this.ecolService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  getuser(username, password) {
    this.ecolService.login(username).subscribe(
      (user) => {
        if (user.length > 0) {
          // store user details and basic auth credentials in local storage
          // to keep user logged in between page refreshes
          // get user permissions
          this.ecolService
            .getpermissions(user[0].ROLE)
            .subscribe((permission) => {
              // console.log(permission);
              user.authdata = window.btoa(username + ':' + password);
              localStorage.setItem('currentUser', JSON.stringify(user[0]));
              localStorage.setItem(
                'userpermission',
                JSON.stringify(permission)
              );
              localStorage.setItem('profile', '1');

              sessionStorage.setItem('currentUser', JSON.stringify(user[0]));
              sessionStorage.setItem(
                'userpermission',
                JSON.stringify(permission)
              );
              sessionStorage.setItem('profile', '1');
              // this.router.navigate([this.returnUrl]);
              // this.router.navigate([this.returnUrl]);
              // this.router.navigate(['/home'], { skipLocationChange: true }).then(() => {
              //   // do whatever you need after navigation succeeds
              // });
              const currentUser: any = JSON.parse(
                localStorage.getItem('currentUser')
              );
              console.log(currentUser);
              // this.reDirectTo('home');
              // this.router.navigate(['home'], { relativeTo: this.route });
              window.location.href = 'home';

              // this.router.navigate(['/permissionsensor']).then(() => {
              //   // do whatever you need after navigation succeeds
              //   // this.router.navigate([this.returnUrl]);
              //   // this.router.navigate([this.returnUrl]);
              //   setTimeout(() => {
              //     this.router.navigate(['/home/user/coop']);
              //   }, 5000);
            });
          //
        } else {
          this.error = 'User not created on E-Collect';
          this.fadeout = true;
          this.loading = false;
        }

        // return user;
      },
      (error) => {
        console.log(error);
        if (error.statusText === 'Not Found') {
          this.error = 'User not created on E-Collect';
          this.fadeout = true;
          this.loading = false;

          // error if server not found
        } else if (error.name === 'HttpErrorResponse') {
          this.error = 'Server Error. Could Not connect to Server';
          this.loading = false;
          this.fadeout = true;
        } else {
          this.error = 'Error during login';
          this.fadeout = true;
          this.loading = false;
        }
      }
    );
  }

  reDirectTo(uri: string) {
    this.router
      .navigateByUrl('/permissionsensor', { skipLocationChange: true })
      .then(() => this.router.navigate([uri]));
  }

  incrementNotificationCount($event) {
    $event.preventDefault();
    this.messageCount++;
    this.faviconService.setNumber(this.messageCount);
  }

  restoreFavicon($event) {
    $event.preventDefault();
    this.messageCount = 0;
    this.faviconService.setDefault();
  }
}
