import { NgModule } from '@angular/core';
import { ActivityhomeComponent } from './activityhome/activityhome.component';
import { RouterModule, Routes } from '@angular/router';
import { PanelModule } from '../../components/panel/panel.module';
import { NotesComponent } from './notes/notes.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgGridModule } from '@ag-grid-community/angular';
import { DataService } from '../../services/data.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ActivityactionComponent } from './activityaction/activityaction.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { HighlightJsModule } from 'ngx-highlight-js';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditnoteComponent } from './editnote/editnote.component';
import { DemandlettersComponent } from './demandletters/demandletters.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { FileUploadModule } from '@swimlane/ng2-file-upload';
import { SmsComponent } from './sms/sms.component';
import { AccplanComponent } from './accplan/accplan.component';
import { CustcontactsComponent } from './custcontacts/custcontacts.component';
import { CollateralsComponent } from './collaterals/collaterals.component';
import { GuarantorsComponent } from './guarantors/guarantors.component';
import { FilesComponent } from './files/files.component';
import { BulknotesComponent } from './bulknotes/bulknotes.component';
import { PtpsComponent } from './ptps/ptps.component';
import { WriteoffstoryComponent } from './writeoffstory/writeoffstory.component';
import { NgxPrettyDateModule } from 'ngx-pretty-date';
import { MomentModule } from 'ngx-moment';
import { PdfJsViewerModule } from 'ng2-pdfjs-viewer';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

const routes: Routes = [{ path: '', component: NotesComponent }];

@NgModule({
  declarations: [
    ActivityhomeComponent,
    NotesComponent,
    ActivityactionComponent,
    EditnoteComponent,
    DemandlettersComponent,
    SmsComponent,
    AccplanComponent,
    CustcontactsComponent,
    CollateralsComponent,
    GuarantorsComponent,
    FilesComponent,
    BulknotesComponent,
    PtpsComponent,
    WriteoffstoryComponent,
  ],
  imports: [
    PanelModule,
    CommonModule,
    NgbModule,
    RouterModule.forRoot(routes),
    AgGridModule,
    NgxSkeletonLoaderModule.forRoot(),
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    NgSelectModule,
    NgxSpinnerModule,
    NgxSmartModalModule.forRoot(),
    FormsModule,
    NgxPaginationModule,
    HighlightJsModule,
    ToasterModule.forRoot(),
    FileUploadModule,
    NgxPrettyDateModule,
    MomentModule,
    PdfJsViewerModule,
    NgxDocViewerModul,
  ],
  exports: [RouterModule],
  providers: [DataService, DatePipe, ToasterService,
})
export class ActivitylogModule {}

// entryss
