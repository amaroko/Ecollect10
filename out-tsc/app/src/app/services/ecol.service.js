import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { forkJoin } from 'rxjs';
import swal from 'sweetalert2';
var EcolService = /** @class */ (function () {
    function EcolService(httpClient, router) {
        this.httpClient = httpClient;
        this.router = router;
    }
    EcolService.prototype.ifLogged = function () {
        if (!localStorage.getItem('currentUser')) {
            /*swal({
              title: 'You\'re Not Logged In',
              imageUrl: 'assets/img/user/notlogg.png',
              text: 'Kindly, log in to continue!',
      
              confirmButtonColor: '#7ac142',
              confirmButtonText: 'Okay'
            });*/
            this.router.navigate(['/login']);
            return false;
        }
    };
    EcolService.prototype.ifclosed = function () {
        if (!sessionStorage.getItem('currentUser')) {
            /*swal({
              title: 'You\'re Not Logged In',
              imageUrl: 'assets/img/user/notlogg.png',
              text: 'Kindly, log in to continue!',
      
              confirmButtonColor: '#7ac142',
              confirmButtonText: 'Okay'
            });*/
            this.router.navigate(['/login']);
            return false;
        }
    };
    EcolService.prototype.getptps = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/ptps?filter[where][accnumber]=' +
            accnumber +
            '&filter[order]=actiondate DESC');
    };
    EcolService.prototype.searchwoffstory = function (accnumber) {
        return this.httpClient.get(environment.api +
            '/api/writeoffstory?filter[where][accnumber]=' +
            accnumber);
    };
    EcolService.prototype.s_check_account_plans = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/tbl_s_accounts?filter[where][accnumber]=' +
            accnumber);
    };
    EcolService.prototype.single_s_plans = function (planid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_s_plans/' + planid);
    };
    EcolService.prototype.getpermissions = function (role_id) {
        return this.httpClient.get(environment.api +
            '/api/permissionsettings?filter[where][role_id]=' +
            role_id);
    };
    EcolService.prototype.getcardAccount = function (cardacct) {
        // tslint:disable-next-line:max-line-length/qall
        return this.httpClient.get(environment.api + '/api/tcards?filter[where][cardacct]=' + cardacct);
    };
    EcolService.prototype.getWatchcardAccount = function (cardacct) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/cards_watch_stage?filter[where][cardacct]=' +
            cardacct);
    };
    EcolService.prototype.totalnotes = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/notehis/total?custnumber=' + custnumber);
    };
    EcolService.prototype.totalcollectornotes = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/notehis/commenttotal?custnumber=' + custnumber);
    };
    EcolService.prototype.retrieveGuarantors = function (accnumber) {
        return this.httpClient.get(environment.api +
            '/api/guarantordetails?filter[where][accnumber]=' +
            accnumber);
    };
    EcolService.prototype.getplanactions = function (planid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/tbl_s_plan_actions?filter[where][planid]=' +
            planid);
    };
    EcolService.prototype.s_actions = function () {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_s_actions');
    };
    EcolService.prototype.getanaction = function (actionid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_s_actions/' + actionid);
    };
    EcolService.prototype.delete_s_plan_actions = function (id) {
        return this.httpClient.delete(environment.api + '/api/tbl_s_plan_actions/' + id);
    };
    EcolService.prototype.delete_s_planmemos = function (id) {
        return this.httpClient.delete(environment.api + '/api/tbl_s_planmemos/' + id);
    };
    EcolService.prototype.getplanmemos = function () {
        var url = environment.api + '/api/tbl_s_planmemos';
        return this.httpClient.get(url);
    };
    EcolService.prototype.putsptype = function (body) {
        var url = environment.api + '/api/sptypes';
        return this.httpClient.put(url, body);
    };
    EcolService.prototype.postplanmemo = function (data) {
        return this.httpClient.post(environment.api + '/api/tbl_s_planmemos', data);
    };
    EcolService.prototype.planmemo = function (planid) {
        return this.httpClient.get(environment.api + '/api/tbl_s_plans/' + planid);
    };
    EcolService.prototype.getallplans = function () {
        // return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
        return this.httpClient.get(environment.api + '/api/tbl_s_plans');
    };
    EcolService.prototype.put_s_actions = function (data) {
        return this.httpClient.put(environment.api + '/api/tbl_s_actions/' + data.actionid, data);
    };
    EcolService.prototype.post_s_actions = function (action) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post(environment.api + '/api/tbl_s_actions', action);
    };
    EcolService.prototype.post_s_plan_actions = function (body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post(environment.api + '/api/tbl_s_plan_actions', body);
    };
    EcolService.prototype.post_s_plan = function (body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post(environment.api + '/api/tbl_s_plans', body);
    };
    EcolService.prototype.all_s_plans = function () {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_s_plans?filter[order]=plantitle asc');
        // + '&filter[order]=stagedate desc'
    };
    EcolService.prototype.retrieve_a_Guarantor = function (id) {
        return this.httpClient.get(environment.api + '/api/guarantordetails?filter[where][id]=' + id);
    };
    EcolService.prototype.totalcardsdue = function () {
        return this.httpClient.get(environment.api + '/api/demandsduecc/total');
    };
    EcolService.prototype.totaldemandsdue = function () {
        return this.httpClient.get(environment.api + '/api/demandsdue/total');
    };
    EcolService.prototype.updateGuarantor = function (id, body) {
        return this.httpClient.put(environment.api + '/api/guarantordetails/' + id, body);
    };
    EcolService.prototype.retrievetotalCollateral = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/notehis/total?custnumber=' + custnumber);
    };
    EcolService.prototype.getfileshistory = function (custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/uploads?filter[where][custnumber]=' +
            custnumber +
            '&filter[order]=stagedate desc');
    };
    EcolService.prototype.allteles = function (custnumber) {
        return this.httpClient.get(environment.nodeapi + '/teles/all?custnumber=' + custnumber);
    };
    EcolService.prototype.totalguarantors = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/guarantordetails/total?custnumber=' + custnumber);
    };
    EcolService.prototype.totalcontacts = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/teles/total?custnumber=' + custnumber);
    };
    EcolService.prototype.totalcollaterals = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/deptcollateral/total?custnumber=' + custnumber);
    };
    EcolService.prototype.getAccount = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/tqall?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' +
            accnumber);
    };
    EcolService.prototype.getmcoopcashAccount = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/mcoopcash_stage?filter[include]=mcoopcash_static&filter[where][loanaccnumber]=' +
            accnumber);
    };
    EcolService.prototype.getwatch = function (accnumber) {
        return this.httpClient.get(environment.api + '/api/watch_stage/' + accnumber);
    };
    EcolService.prototype.login = function (username) {
        return this.httpClient.get(environment.api + '/api/tblusers/search?username=' + username);
    };
    EcolService.prototype.logout = function () {
        //  remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('accountInfo');
        localStorage.removeItem('userpermission');
        localStorage.removeItem('profile');
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('accountInfo');
        sessionStorage.removeItem('userpermission');
        sessionStorage.removeItem('profile');
    };
    EcolService.prototype.auth = function (body) {
        return this.httpClient.post(environment.auth, body);
    };
    EcolService.prototype.getbulknotes = function (cust) {
        // tslint:disable-next-line:max-line-length
        var response = this.httpClient.get(environment.api +
            '/api/notehis?filter[where][custnumber]=' +
            cust +
            '&filter[where][notesrc]=uploaded a note' +
            '&filter[order]=notedate DESC');
        return forkJoin([response]);
    };
    EcolService.prototype.getflaggednotes = function (cust) {
        // tslint:disable-next-line:max-line-length
        var response = this.httpClient.get(environment.api +
            '/api/notehis?filter[where][custnumber]=' +
            cust +
            '&filter[where][noteimp]=Y' +
            '&filter[order]=notedate DESC');
        return forkJoin([response]);
    };
    EcolService.prototype.getactivitylogreason = function (cust) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/activitylogs?filter[where][custnumber]=' + cust);
    };
    EcolService.prototype.getallnotes = function (cust) {
        return this.httpClient.get(environment.api + '/api/notehis/custnotes?custnumber=' + cust);
    };
    EcolService.prototype.otheraccs = function (custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.nodeapi + '/otheraccs/all?custnumber=' + custnumber);
    };
    EcolService.prototype.collaterals = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/collaterals?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.directors = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/directors?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.accwithid = function (nationid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_q_all?filter[where][nationid]=' + nationid);
    };
    EcolService.prototype.ptps = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber);
    };
    EcolService.prototype.getcardwithid = function (nationid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/cards_stage?filter[where][nationid]=' + nationid);
    };
    EcolService.prototype.getexcuse = function () {
        // const url = environment.api + '/api/excuse?filter[order]=excuse ASC';
        // So that other can be the lastpostactivitylogs option
        var url = environment.api + '/api/excuse';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getExcuseDetails = function (EXCUSEID) {
        return this.httpClient.get(environment.api +
            '/api/excusedetailed?filter[where][excuseid]=' +
            EXCUSEID);
    };
    EcolService.prototype.getStaticLoans = function (accnumber) {
        return this.httpClient.get(environment.api +
            '/api/tbl_portfolio_static?filter[where][accnumber]=' +
            accnumber);
    };
    EcolService.prototype.getWatchcardStatic = function (cardacct) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/cards_watch_static?filter[where][cardacct]=' +
            cardacct);
    };
    EcolService.prototype.getcmdstatus = function () {
        var url = environment.api + '/api/cmdstatus';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getreviewers = function () {
        var url = environment.api + '/api/tblusers?filter[where][role]=teamleader';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getparty = function () {
        var url = environment.api + '/api/party';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getcollectoraction = function () {
        var url = environment.api + '/api/collectoraction';
        return this.httpClient.get(url);
    };
    EcolService.prototype.getcure = function () {
        var url = environment.api + '/api/cure';
        return this.httpClient.get(url);
    };
    EcolService.prototype.loader = function () {
        swal.fire({
            title: 'Processing ...',
            text: 'Please wait',
            showConfirmButton: false,
            /*onOpen: function () {
              swal.showLoading();
            }*/
        });
    };
    EcolService.prototype.putcardwatch = function (data) {
        return this.httpClient.put(environment.api + '/api/cards_watch_static/' + data.cardacct, data);
    };
    EcolService.prototype.postactivitylogs = function (body) {
        var url = environment.api + '/api/activitylogs';
        return this.httpClient.post(url, body);
    };
    EcolService.prototype.putwatch = function (data) {
        return this.httpClient.put(environment.api + '/api/watch_static', data);
    };
    EcolService.prototype.reviewptp = function (data) {
        return this.httpClient.post(environment.nodeapi + '/brokenptps/review', data);
    };
    EcolService.prototype.activeptps = function (accnumber) {
        return this.httpClient.get(environment.nodeapi + '/activeptps/active?accnumber=' + accnumber);
    };
    EcolService.prototype.postptps = function (ptps) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post(environment.api + '/api/ptps', ptps);
    };
    EcolService.prototype.updatenote = function (body) {
        var url = environment.api + '/api/notehis/updatenote';
        return this.httpClient.post(url, body);
    };
    EcolService.prototype.getanote = function (id) {
        var url = environment.api + '/api/notehis/' + id;
        return this.httpClient.get(url);
    };
    EcolService.prototype.demandshistory = function (data) {
        return this.httpClient.post(environment.api + '/api/demandshistory', data);
    };
    EcolService.prototype.getteles = function (custnumber) {
        return this.httpClient.get(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber);
    };
    EcolService.prototype.getdemandshistory = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/demandshistory?filter[where][accnumber]=' +
            accnumber +
            '&filter[order]=datesent desc');
    };
    EcolService.prototype.getcustwithAccount = function (custnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tqall?filter[where][custnumber]=' + custnumber);
    };
    EcolService.prototype.demand1history = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/demandshistory?filter[where][accnumber]=' +
            accnumber +
            '&filter[where][demand]=Demand1&filter[order]=datesent desc');
    };
    EcolService.prototype.generateLetter = function (data) {
        return this.httpClient.post(environment.letters_api + data.demand + '/download', data);
    };
    EcolService.prototype.getsmsmessage = function (demand) {
        return this.httpClient.get(environment.api + '/api/demandsettings/' + demand.toLowerCase());
    };
    EcolService.prototype.demandstatus = function (body) {
        return this.httpClient.post(environment.nodeapi + '/demandstatus/demandstatus', body);
    };
    EcolService.prototype.sendDemandEmail = function (data) {
        return this.httpClient.post(environment.emailapi, data);
    };
    EcolService.prototype.sendDemandsms = function (data) {
        return this.httpClient.post(environment.demandsmsapi, data);
    };
    EcolService.prototype.generateLettercc = function (data) {
        return this.httpClient.post(environment.letters_api + data.demand + '/download', data);
    };
    EcolService.prototype.sendsms = function (data) {
        return this.httpClient.post(environment.api + '/api/sms', data);
    };
    EcolService.prototype.guarantorletters = function (data) {
        return this.httpClient.post(environment.api + '/api/guarantorletters', data);
    };
    EcolService.prototype.demanddownload = function (file) {
        var body = { filename: file };
        return this.httpClient.post(environment.demanddownload + '/filesapi/download', body, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json'),
        });
    };
    EcolService.prototype.existsteles = function (custnumber, tel, email) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/teles?filter[where][custnumber]=' +
            custnumber +
            '&filter[where][telephone]=' +
            tel +
            '&filter[where][email]=' +
            email);
    };
    EcolService.prototype.postteles = function (data) {
        return this.httpClient.post(environment.api + '/api/teles', data);
    };
    EcolService.prototype.getallteles = function (custnumber) {
        // return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
        return this.httpClient.get(environment.nodeapi + '/teles/all?custnumber=' + custnumber);
    };
    EcolService.prototype.getsms = function (cust) {
        return this.httpClient.get(environment.api +
            '/api/sms?filter[where][custnumber]=' +
            cust +
            '&filter[order]=stagedate desc');
    };
    EcolService.prototype.getaccount = function (accnumber) {
        // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
        return this.httpClient.get(environment.api + '/api/tqall/' + accnumber);
    };
    EcolService.prototype.postsms = function (body) {
        return this.httpClient.post(environment.api + '/api/sms/', body);
    };
    EcolService.prototype.tbl_s_plans = function () {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api + '/api/tbl_s_plans');
    };
    EcolService.prototype.s_plan_actions = function (planid) {
        return this.httpClient.get(environment.api +
            '/api/tbl_s_plan_actions?filter[where][planid]=' +
            planid);
    };
    EcolService.prototype.s_account_plans = function (accnumber, planid) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/tbl_s_account_plans?filter[where][accnumber]=' +
            accnumber +
            '&filter[where][planid]=' +
            planid);
    };
    EcolService.prototype.putaccountplan = function (body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.put(environment.api + '/api/tbl_s_account_plans/' + body.id, body);
    };
    EcolService.prototype.saveaccountplan = function (body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.post(environment.api + '/api/tbl_s_account_plans', body);
    };
    EcolService.prototype.put_s_accounts = function (body) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.put(environment.api + '/api/tbl_s_accounts', body);
    };
    EcolService.prototype.putteles = function (data) {
        return this.httpClient.post(environment.nodeapi + '/teles/update', data);
    };
    EcolService.prototype.submitCollateral = function (body) {
        return this.httpClient.post(environment.api + '/api/deptcollateral', body);
    };
    EcolService.prototype.retrieveCollateral = function (custnumber) {
        return this.httpClient.get(environment.api +
            '/api/deptcollateral?filter[where][custnumber]=' +
            custnumber);
    };
    EcolService.prototype.updateCollateral = function (id, body) {
        return this.httpClient.put(environment.api + '/api/deptcollateral/' + id, body);
    };
    EcolService.prototype.submitGuarantor = function (body) {
        return this.httpClient.post(environment.api + '/api/guarantordetails', body);
    };
    EcolService.prototype.guarantordetails = function (accnumber) {
        // tslint:disable-next-line:max-line-length
        return this.httpClient.get(environment.api +
            '/api/guarantordetails?filter[where][accnumber]=' +
            accnumber);
    };
    EcolService.prototype.uploads = function (data) {
        return this.httpClient.post(environment.api + '/api/uploads', data);
    };
    EcolService.prototype.getLetter = function (letter) {
        return this.httpClient.get(environment.api + '/api/demandsettings/' + letter);
    };
    EcolService.prototype.putautoLetter = function (letter) {
        return this.httpClient.put(environment.api + '/api/autoletters', letter);
    };
    EcolService.prototype.putcustomersuspensions = function (data) {
        return this.httpClient.put(environment.api + '/api/customersuspensions', data);
    };
    EcolService.prototype.getcustomersuspensions = function () {
        return this.httpClient.get(environment.api + '/api/customersuspensions');
    };
    EcolService.prototype.getautoLetter = function () {
        return this.httpClient.get(environment.api + '/api/autoletters');
    };
    EcolService.prototype.postautoLetter = function (letter) {
        return this.httpClient.post(environment.api + '/api/autoletters', letter);
    };
    EcolService.prototype.getmemo = function () {
        return this.httpClient.get(environment.nodeapi + '/loans/memos');
    };
    EcolService.prototype.postcheckautoLetter = function (data) {
        return this.httpClient.post(environment.api + '/api/autoletters/checkduplicate', data);
    };
    EcolService.prototype.global = function (body) {
        return this.httpClient.put(environment.api + '/api/global_letter_settings', body);
    };
    EcolService.prototype.getglobal = function () {
        return this.httpClient.get(environment.api + '/api/global_letter_settings');
    };
    EcolService.prototype.putLetter = function (letter) {
        return this.httpClient.put(environment.api + '/api/demandsettings', letter);
    };
    EcolService.prototype.downloadFile = function (file) {
        var body = { filename: file };
        return this.httpClient.post(environment.uploadurl + '/download', body, {
            responseType: 'blob',
            headers: new HttpHeaders().append('Content-Type', 'application/json'),
        });
    };
    EcolService.prototype.bulknotes = function (body) {
        var url = environment.nodeapi + '/xlsuploads/uploadbulk-test';
        return this.httpClient.post(url, body, {
            reportProgress: true,
            observe: 'events',
        });
    };
    EcolService.prototype.bulktotblcardsstatic = function (body) {
        var url = environment.api + '/api/tblcard_static/actiondate';
        return this.httpClient.post(url, body);
    };
    EcolService.prototype.bulktotblportfolio = function (body) {
        var url = environment.api + '/api/tbl_portfolio_static/actiondate';
        return this.httpClient.post(url, body);
    };
    EcolService.prototype.getthisptp = function (id) {
        return this.httpClient.get(environment.api + '/api/ptps/' + id);
    };
    EcolService.prototype.ammendptp = function (data) {
        return this.httpClient.post(environment.nodeapi + '/ptpsammend/ammendptp', data);
    };
    EcolService.prototype.woffstory = function (data) {
        return this.httpClient.put(environment.api + '/api/writeoffstory', data);
    };
    EcolService = __decorate([
        Injectable({
            providedIn: 'root',
        })
    ], EcolService);
    return EcolService;
}());
export { EcolService };
//# sourceMappingURL=ecol.service.js.map