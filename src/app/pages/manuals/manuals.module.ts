import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllmanualsComponent } from './allmanuals/allmanuals.component';
import { RouterModule, Routes } from '@angular/router';
import { PanelModule } from '../../components/panel/panel.module';
import { NgMarqueeModule } from 'ng-marquee';

const routes: Routes = [
  { path: '', redirectTo: 'all' },
  { path: 'all', component: AllmanualsComponent },
];

@NgModule({
  declarations: [AllmanualsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PanelModule,
    NgMarqueeModule,
  ],
})
export class ManualsModule {}
