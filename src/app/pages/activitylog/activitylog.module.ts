import {NgModule} from '@angular/core';
import {ActivityhomeComponent} from './activityhome/activityhome.component';
import {RouterModule, Routes} from '@angular/router';
import {PanelModule} from '../../components/panel/panel.module';
import {NotesComponent} from './notes/notes.component';
import {CommonModule, DatePipe} from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AgGridModule} from '@ag-grid-community/angular';
import {DataService} from '../../services/data.service';
import {NgxSkeletonLoaderModule} from 'ngx-skeleton-loader';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { ActivityactionComponent } from './activityaction/activityaction.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxSpinnerModule} from 'ngx-spinner';
import {NgxSmartModalModule} from 'ngx-smart-modal';
import {HighlightJsModule} from "ngx-highlight-js";
import {NgxPaginationModule} from "ngx-pagination";

const routes: Routes = [
  {path: '', component: NotesComponent},
];

@NgModule({
  declarations: [ActivityhomeComponent, NotesComponent, ActivityactionComponent],
    imports: [
        PanelModule,
        CommonModule,
        NgbModule,
        RouterModule.forRoot(routes),
        AgGridModule,
        NgxSkeletonLoaderModule,
        ReactiveFormsModule,
        BsDatepickerModule.forRoot(),
        NgSelectModule,
        NgxSpinnerModule,
        NgxSmartModalModule.forRoot(),
        FormsModule,
      NgxPaginationModule,
        HighlightJsModule,
    ],
  exports: [
    RouterModule
  ],
  providers: [
    DataService,
    DatePipe
  ],
})
export class ActivitylogModule {

}
