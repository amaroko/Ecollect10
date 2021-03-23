import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrls: ['./dashboards.component.css'],
})
export class DashboardsComponent implements OnInit {
  constructor() {}

  public ngOnInit(): void {}

  onNavigate(reportname) {
    window.open('activitydash?report=' + reportname, '_blank');
  }

  openactivityrpt() {
    window.open(environment.kibana, '_blank');
  }
}
