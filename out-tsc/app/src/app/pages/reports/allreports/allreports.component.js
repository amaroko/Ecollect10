import { __decorate, __metadata, __read, __spread } from 'tslib';
import { Component } from '@angular/core';
import { environment } from '../../../../environments/environment';
// import { ExportProductsService } from '../../services/exportproductsstory.service';
import { ExportwoffstoryService } from '../../../services/exportwoffstory.service';

var AllreportsComponent = /** @class */ (function () {
  // public transform(value, keys: string, term: string) {
  //
  //     if (!term) return value;
  //     return (value || []).filter(item => keys.split(',').some(key =>
  //     item.hasOwnProperty(key) && new RegExp(term, 'gi').test(item[key])));
  //
  // }
  function AllreportsComponent(
    exportWoffstoryservice // private exportProductsService: ExportProductsService
  ) {
    this.exportWoffstoryservice = exportWoffstoryservice;
    this.report = null;
    this.reports = [
      {
        link:
          '/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity Report',
        name: ' Collector activity',
        icon: 'fas fa-address-book fa-fw',
      },
      {
        link:
          '/frameset?__report=collector_activity_raw.rptdesign&__title=Activity Report Raw',
        name: ' Collector activity (Raw)',
        icon: 'fas fa-percent fa-fw',
      },
      {
        link:
          '/frameset?__report=amountcollectedtest.rptdesign&__title=Amount Collected',
        name: ' Amount Collected',
        icon: 'fas fa-dollar-sign fa-fw',
      },
      {
        link: '/frameset?__report=sms.rptdesign&__title=SMS Sent Report',
        name: ' SMS Report',
        icon: 'fas fa-comment-alt fa-fw',
      },
      {
        link: '/frameset?__report=notes.rptdesign&__title=Notes',
        name: ' Daily Notes report',
        icon: 'fas fa-calendar-check fa-fw',
      },
      {
        link: '/frameset?__report=bulk_notes.rptdesign&__title=Bulk Notes',
        name: ' Bulk notes report',
        icon: 'fas fa-comments fa-fw',
      },
      {
        link:
          '/frameset?__report=unactioned.rptdesign&__title=Unactioned report - all Loans',
        name: ' Unactioned report',
        icon: 'fas fa-eye-slash fa-fw',
      },
      {
        link:
          '/frameset?__report=unactionedcc.rptdesign&__title=Unactioned report - credit cards',
        name: ' Unactioned report - credit cards',
        icon: 'fas fa-id-card fa-fw',
      },
      {
        link:
          '/frameset?__report=unactionedmcoopcash.rptdesign&__title=Unactioned Report Unactioned report - Ecredit',
        name: ' Unactioned report - Ecredit',
        icon: 'fas fa-newspaper fa-fw',
      },
      {
        link:
          '/frameset?__report=payingaccounts.rptdesign&__title=Unactioned report CMD',
        name: ' Paying Accounts with History of Default',
        icon: 'fas fa-street-view fa-fw',
      },
      {
        link:
          '/frameset?__report=portfoliomovt.rptdesign&__title=Portfolio Movement Report',
        name: ' Portfolio movement',
        icon: 'fas fa-tag fa-fw',
      },
      {
        link:
          '/frameset?__report=portfoliomovt_cc_test.rptdesign&__title=Portfolio Movement Report',
        name: ' Portfolio movement Credit cards',
        icon: 'fas fa-tags fa-fw',
      },
      {
        link:
          '/frameset?__report=file_analysis_test.rptdesign&__title=Relegation Analysis',
        name: ' Relegation Analysis',
        icon: 'fa fa-chart-pie fa-fw',
      },
      {
        link:
          '/frameset?__report=expiredindemnity.rptdesign&__title=Expired indemnity',
        name: ' Service providers Expired Indemnity report',
        icon: 'fa fa-chart-line fa-fw',
      },
      {
        link:
          '/frameset?__report=summary_allocation_report.rptdesign&__title=Allocation Summary',
        name: ' Allocation summary',
        icon: 'fas fa-sitemap fa-fw',
      },
      {
        link:
          '/frameset?__report=accountswithplan_details.rptdesign&__title=Allocation Summary',
        name: ' Account plan report (Remedial)',
        icon: 'fas fa-suitcase fa-fw',
      },
      {
        link:
          '/frameset?__report=demands.rptdesign&__title=Demand Letters Status Report - Loans',
        name: ' Demand Letters Status Report - Loans',
        icon: 'fas fa-gavel fa-fw',
      },
      {
        link:
          '/frameset?__report=demandscc.rptdesign&__title=Demand Letters Status Report - Credit Cards',
        name: ' Demand Letters Status Report - Cards',
        icon: 'fas fa-window-restore fa-fw',
      },
      {
        link:
          '/frameset?__report=utilization.rptdesign&__title=Daily Utilization Report',
        name: ' E-Collect utilization Report',
        icon: 'fa fa-database fa-fw',
      },
      {
        link:
          '/frameset?__report=accplan_simple.rptdesign&__title=Account Plan Report - Simple',
        name: ' Account plan Report - Simple',
        icon: 'fas fa-chart-area fa-fw',
      },
      {
        link: '/frameset?__report=ptps.rptdesign&__title=Promises to Pay',
        name: ' Promises to Pay',
        icon: 'fa fa-flag fa-fw',
      },
      {
        link:
          '/frameset?__report=notes_for_customer.rptdesign&__title=Customer Notes Report',
        name: ' Customer Notes Report',
        icon: 'fas fa-list-ol fa-fw',
      },
      {
        link:
          '/frameset?__report=remedial_offerings.rptdesign&__title=Remedial Report',
        name: ' Remedial Offering Report',
        icon: 'fas fa-indent fa-fw',
      },
      {
        link:
          '/frameset?__report=relegation_overdue.rptdesign&__title=Relegation Overdue Accounts Report',
        name: ' Relegation Overdue Accounts Report',
        icon: 'fa fa-chart-bar fa-fw',
      },
      {
        link:
          '/frameset?__report=relegated.rptdesign&__title=Relegated accounts',
        name: ' Relegated Accounts Report',
        icon: 'fas fa-chart-line fa-fw',
      },
      {
        link:
          '/frameset?__report=repossessions.rptdesign&__title=Asset Finance Repossessions',
        name: ' Asset Finance Repossessions',
        icon: 'fas fa-certificate fa-fw',
      },
      {
        link:
          '/frameset?__report=ipfcancellation.rptdesign&__title=IPF Cancellations',
        name: ' IPF Cancellations',
        icon: 'fas fa- exclamation-triangle fa-fw',
      },
    ];
    this.filteredArray = __spread(this.reports);
  }

  AllreportsComponent.prototype.onEvent = function (msg) {
    console.log(msg);
  };
  AllreportsComponent.prototype.ngOnInit = function () {};
  AllreportsComponent.prototype.filterArray = function () {
    var _this = this;
    // Ensures  empty list.
    if (!this.reports.length) {
      this.filteredArray = [];
      return;
    }
    // if no search is detected, the list remains in view.
    if (!this.searchText) {
      this.filteredArray = __spread(this.reports); // keep your reports immutable
      return;
    }
    var list = __spread(this.reports); // keep list immutable
    var properties = Object.keys(list[0]); // get list properties
    // check all properties for each list and return data if matching to searchText
    this.filteredArray = list.filter(function (listdata) {
      return properties.find(function (property) {
        var valueString = listdata[property].toString().toLowerCase();
        return valueString.includes(_this.searchText.toLowerCase());
      })
        ? listdata
        : null;
    });
  };
  AllreportsComponent.prototype.onNavigate = function (reportname) {
    window.open('activitydash?report=' + reportname, '_blank');
  };
  AllreportsComponent.prototype.openactivityrpt = function () {
    window.open(
      environment.birt +
        '/frameset?__report=collectoractivity_test2.rptdesign&__title=Activity Report',
      '_blank'
    );
  };
  AllreportsComponent.prototype.open = function (report) {
    window.open(environment.birt + report, '_blank');
  };
  AllreportsComponent.prototype.kibanaopenaccplan = function () {
    this.report = environment.accplanreport;
    window.open(this.report, '_blank');
  };
  AllreportsComponent.prototype.kibanaopenptp = function () {
    this.report = environment.ptpreport;
    window.open(this.report, '_blank');
  };
  AllreportsComponent.prototype.exportwoffstory = function () {
    this.exportWoffstoryservice.generateWoffstory();
  };
  AllreportsComponent = __decorate(
    [
      Component({
        selector: 'app-allreports',
        templateUrl: './allreports.component.html',
        styleUrls: ['./allreports.component.css'],
      }),
      __metadata('design:paramtypes', [
        ExportwoffstoryService, // private exportProductsService: ExportProductsService
      ]),
    ],
    AllreportsComponent
  );
  return AllreportsComponent;
})();
export { AllreportsComponent };
//# sourceMappingURL=allreports.component.js.map
