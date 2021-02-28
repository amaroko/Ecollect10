// Core Module
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, Title } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import { FAVICON_CONFIG, FaviconModule } from '@enzedd/ng-favicon';
// Main Component
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { FooterComponent } from './components/footer/footer.component';

// Component Module
// import { AgmCoreModule } from '@agm/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TrendModule } from 'ngx-trend';
import { HighlightJsModule } from 'ngx-highlight-js';
import { CountdownModule } from 'ngx-countdown';
import { NgChartjsModule } from 'ng-chartjs';
import { TagInputModule } from 'ngx-chips';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import 'd3';
// import 'nvd3';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
} from 'ngx-perfect-scrollbar';
// Pages
import { LayoutComponent } from './pages/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { filter, map } from 'rxjs/operators';
import { ActivitylogComponent } from './pages/activitylog/activitylog.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { RolesensorComponent } from './pages/rolesensor/rolesensor.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,

    TopMenuComponent,
    FooterComponent,
    // PanelComponent,

    // HomePageComponent,
    LayoutComponent,
    LoginComponent,
    ActivitylogComponent,
    RolesensorComponent
  ],
  imports: [
    AppRoutingModule,
    FaviconModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyC5gJ5x8Yw7qP_DqvNq3IdZi2WUSiDjskk',
    // }),
    BrowserAnimationsModule,
    BrowserModule,
    NgxSkeletonLoaderModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    CountdownModule,
    // LoadingBarHttpClientModule,
    NgChartjsModule,
    FullCalendarModule,
    FormsModule,
    HighlightJsModule,
    LoadingBarRouterModule,
    NgbModule,
    // NvD3Module,
    NgxChartsModule,
    CommonModule,
    NgxDatatableModule,
    HttpClientModule,
    NgxDaterangepickerMd.forRoot(),
    PerfectScrollbarModule,
    ReactiveFormsModule,
    SweetAlert2Module.forRoot(),
    TagInputModule,
    TrendModule
  ],
  providers: [
    Title,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: FAVICON_CONFIG,
      useValue: {
        color: '#fff', // favicon notification text color
        bgColor: '#ff0000' // favicon notification background color
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    private router: Router,
    private titleService: Title,
    private routee: ActivatedRoute
  ) {
    // router.events.subscribe((e) => {
    //   if (e instanceof NavigationEnd) {
    //     const title = 'E-collect | ' + this.route.snapshot.firstChild.data['title'];
    //     this.titleService.setTitle(title);
    //   }

    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this.routee.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return 'E-collect | ' + child.snapshot.data['title'];
          }
          return appTitle;
        })
      )
      .subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }
}
