import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { PanelModule } from '../../components/panel/panel.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
// import { AgmCoreModule } from '@agm/core';
import { CalendarMonthModule } from 'angular-calendar';
import { PermissionsensorComponent } from './permissionsensor/permissionsensor.component';

const routes: Routes = [
  // {path: '', redirectTo: 'home'},
  { path: '', component: HomePageComponent },
  {
    path: 'permissionsensor',
    component: PermissionsensorComponent,
    data: { title: 'PermissionChecker' }
  }
];

@NgModule({
  declarations: [HomePageComponent, PermissionsensorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PanelModule,
    PerfectScrollbarModule,
    // AgmCoreModule,
    CalendarMonthModule
  ],
  exports: [RouterModule]
})
export class HomeModule {
}

// works
