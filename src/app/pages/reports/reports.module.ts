import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllreportsComponent } from './allreports/allreports.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DashboardsComponent } from './dashboards/dashboards.component';
import { PanelModule } from '../../components/panel/panel.module';

const routes: Routes = [
  { path: '', redirectTo: 'allreports' },
  {
    path: 'allreports',
    component: AllreportsComponent,
    data: { title: 'AllReports' },
  },
  {
    path: 'dashboards',
    component: DashboardsComponent,
    data: { title: 'Dashboards' },
  },
];

@NgModule({
  declarations: [AllreportsComponent, DashboardsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    PanelModule,
  ],
})
export class ReportsModule {}
