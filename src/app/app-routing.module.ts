import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
// Home
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { ActivitylogComponent } from './pages/activitylog/activitylog.component';
import { AuthGuard } from './auth.guard';
import { NotesComponent } from './pages/activitylog/notes/notes.component';
import { ActivitylogModule } from './pages/activitylog/activitylog.module';
import { ActivityhomeComponent } from './pages/activitylog/activityhome/activityhome.component';
import { ActivityactionComponent } from './pages/activitylog/activityaction/activityaction.component';
import { RolesensorComponent } from './pages/rolesensor/rolesensor.component';
import { EditnoteComponent } from './pages/activitylog/editnote/editnote.component';
import { DemandlettersComponent } from './pages/activitylog/demandletters/demandletters.component';
import { SmsComponent } from './pages/activitylog/sms/sms.component';
import { AccplanComponent } from './pages/activitylog/accplan/accplan.component';
import { CustcontactsComponent } from './pages/activitylog/custcontacts/custcontacts.component';
import { CollateralsComponent } from './pages/activitylog/collaterals/collaterals.component';
import { GuarantorsComponent } from './pages/activitylog/guarantors/guarantors.component';
import { FilesComponent } from './pages/activitylog/files/files.component';
import { BulknotesComponent } from './pages/activitylog/bulknotes/bulknotes.component';
import { PtpsComponent } from './pages/activitylog/ptps/ptps.component';
import { WriteoffstoryComponent } from './pages/activitylog/writeoffstory/writeoffstory.component';
import { HomeModule } from './pages/home/home.module';
import { WorkModule } from './pages/work/work.module';
import { RemindersModule } from './pages/reminders/reminders.module';
import { McoopcashModule } from './pages/mcoopcash/mcoopcash.module';
import { CreditcardsModule } from './pages/creditcards/creditcards.module';
import { WatchModule } from './pages/watch/watch.module';
import { LettersModule } from './pages/letters/letters.module';
import { ReportsModule } from './pages/reports/reports.module';
import { GuarantorsModule } from './pages/guarantors/guarantors.module';
import { DemandModule } from './pages/demand/demand.module';
import { ConfigurationsModule } from './pages/configurations/configurations.module';
import { ManualsModule } from './pages/manuals/manuals.module';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      {
        path: 'home',
        loadChildren: () => HomeModule,
        // loadChildren: './pages/home/home.module#HomeModule',
        data: { title: 'Home' },
      },
      {
        path: 'work',
        loadChildren: () => WorkModule,
        // loadChildren: './pages/work/work.module#WorkModule',
        data: { title: 'Work Queue' },
      },
      {
        path: 'reminders',
        loadChildren: () => RemindersModule,
        // loadChildren: './pages/reminders/reminders.module#RemindersModule',
        data: { title: 'Reminders' },
      },
      {
        path: 'mcoopcash',
        loadChildren: () => McoopcashModule,
        // loadChildren: './pages/mcoopcash/mcoopcash.module#McoopcashModule',
        data: { title: 'Mcoopcash' },
      },
      {
        path: 'creditcards',
        loadChildren: () => CreditcardsModule,
        // loadChildren:
        //   './pages/creditcards/creditcards.module#CreditcardsModule',
        data: { title: 'Creditcards' },
      },
      {
        path: 'watch',
        loadChildren: () => WatchModule,
        // loadChildren: './pages/watch/watch.module#WatchModule',
        data: { title: 'Watch' },
      },
      {
        path: 'letters',
        loadChildren: () => LettersModule,
        data: { title: 'Letters' },
      },
      {
        path: 'reports',
        loadChildren: () => ReportsModule,
        data: { title: 'Reports' },
      },
      {
        path: 'guarantors',
        loadChildren: () => GuarantorsModule,
        data: { title: 'Guarantors' },
      },
      {
        path: 'demand',
        loadChildren: () => DemandModule,
        data: { title: 'Demands' },
      },
      {
        path: 'configurations',
        loadChildren: () => ConfigurationsModule,
        data: { title: 'Configurations' },
      },
      {
        path: 'manuals',
        loadChildren: () => ManualsModule,
        data: { title: 'All Manuals' },
      },
    ],
  },
  // not lazy loaded
  {
    path: 'activitylog',
    component: ActivitylogComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'notes', pathMatch: 'full' },
      {
        path: 'notes',
        component: NotesComponent,
        data: { title: 'Activitylog | Notes' },
      },
      {
        path: 'activityhome',
        component: ActivityhomeComponent,
        data: { title: 'Activitylog | Home' },
      },
      {
        path: 'activityaction',
        component: ActivityactionComponent,
        data: { title: 'Activitylog | Action' },
      },
      {
        path: 'editnote',
        component: EditnoteComponent,
        data: { title: 'Activitylog | EditNote' },
      },
      {
        path: 'demandletters',
        component: DemandlettersComponent,
        data: { title: 'Activitylog | DemandLetters' },
      },
      {
        path: 'sms',
        component: SmsComponent,
        data: { title: 'Activitylog | Sms' },
      },
      {
        path: 'accplan',
        component: AccplanComponent,
        data: { title: 'Activitylog | AccountPlan' },
      },
      {
        path: 'contacts',
        component: CustcontactsComponent,
        data: { title: 'Activitylog | Contacts' },
      },
      {
        path: 'remedialcollaterals',
        component: CollateralsComponent,
        data: { title: 'Activitylog | Collaterals' },
      },
      {
        path: 'guarantors',
        component: GuarantorsComponent,
        data: { title: 'Activitylog | Guarantors' },
      },
      {
        path: 'files',
        component: FilesComponent,
        data: { title: 'Activitylog | SingleFileUploads' },
      },
      {
        path: 'bulknotes',
        component: BulknotesComponent,
        data: { title: 'Activitylog | BulkNotes Upload' },
      },
      {
        path: 'ptps',
        component: PtpsComponent,
        data: { title: 'Activitylog | Ptps' },
      },
      {
        path: 'writeoffstory',
        component: WriteoffstoryComponent,
        data: { title: 'Activitylog | WriteOffStory' },
      },
      { path: '**', redirectTo: 'notes' },
    ],
  },

  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  {
    path: 'rolesensor',
    component: RolesensorComponent,
    data: { title: 'RoleSensor' },
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes), ActivitylogModule],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
