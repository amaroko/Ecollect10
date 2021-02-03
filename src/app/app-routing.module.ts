import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
// Home
import {LoginComponent} from './pages/login/login.component';
import {LayoutComponent} from './pages/layout/layout.component';
import {ActivitylogComponent} from './pages/activitylog/activitylog.component';
import {AuthGuard} from './auth.guard';
import {NotesComponent} from './pages/activitylog/notes/notes.component';
import {ActivitylogModule} from './pages/activitylog/activitylog.module';
import {ActivityhomeComponent} from './pages/activitylog/activityhome/activityhome.component';
import {ActivityactionComponent} from './pages/activitylog/activityaction/activityaction.component';

export const routes: Routes = [
  // {path: '', redirectTo: '/home', pathMatch: 'full'},

  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],

        // canActivateChild: [AuthGuard],
        children: [
          {path: '', redirectTo: 'login', pathMatch: 'full'},
          {path: 'home', loadChildren: './pages/home/home.module#HomeModule', data: {title: 'Home'}},
          {path: 'work', loadChildren: './pages/work/work.module#WorkModule', data: {title: 'Work Queue'}},
          {
            path: 'reminders',
            loadChildren: './pages/reminders/reminders.module#RemindersModule',
            data: {title: 'Reminders'}
          },
          {
            path: 'mcoopcash',
            loadChildren: './pages/mcoopcash/mcoopcash.module#McoopcashModule',
            data: {title: 'Mcoopcash'}
          },
          {
            path: 'creditcards',
            loadChildren: './pages/creditcards/creditcards.module#CreditcardsModule',
            data: {title: 'Creditcards'}
          },
          {path: 'watch', loadChildren: './pages/watch/watch.module#WatchModule', data: {title: 'Watch'}},
          {path: '', loadChildren: './pages/home/home.module#HomeModule', data: {title: 'Home'}}
        ]

  },
  {
    path: 'activitylog',
    component: ActivitylogComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          // {path: '', redirectTo: 'notes', pathMatch: 'full'},
          {path: 'notes', component: NotesComponent, data: {title: 'Activitylog | Notes'}},
          {path: 'activityhome', component: ActivityhomeComponent, data: {title: 'Activitylog | Home'}},
          {path: 'activityaction', component: ActivityactionComponent, data: {title: 'Activitylog | Action'}},
          {path: '**', redirectTo: 'notes'}
        ]
      }
    ]
  },
  {path: 'login', component: LoginComponent, data: {title: 'login'}},
  // {path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes),
    ActivitylogModule],
  declarations: [],
  exports: [RouterModule]
})


export class AppRoutingModule {
}
