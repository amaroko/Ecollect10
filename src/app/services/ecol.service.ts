import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {forkJoin} from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EcolService {
  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  ifLogged() {
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
  }

  ifclosed() {
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
  }

  getptps(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber + '&filter[order]=actiondate DESC');
  }

  searchwoffstory(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/writeoffstory?filter[where][accnumber]=' + accnumber);
  }

  s_check_account_plans(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_accounts?filter[where][accnumber]=' + accnumber);
  }

  single_s_plans(planid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans/' + planid);
  }

  getpermissions(role_id: string) {
    return this.httpClient.get<any>(environment.api + '/api/permissionsettings?filter[where][role_id]=' + role_id);
  }

  getcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length/qall
    return this.httpClient.get<any>(environment.api + '/api/tcards?filter[where][cardacct]=' + cardacct);
  }

  getWatchcardAccount(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_stage?filter[where][cardacct]=' + cardacct);
  }

  totalnotes(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/notehis/total?custnumber=' + custnumber);
  }

  retrievetotalCollateral(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/notehis/total?custnumber=' + custnumber);
  }

  getfileshistory(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/uploads?filter[where][custnumber]=' + custnumber + '&filter[order]=stagedate desc');
  }

  allteles(custnumber) {
    return this.httpClient.get<any>(environment.nodeapi + '/teles/all?custnumber=' + custnumber);
  }

  totalguarantors(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/guarantordetails/total?custnumber=' + custnumber);
  }

  totalcontacts(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/teles/total?custnumber=' + custnumber);
  }

  totalcollaterals(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/deptcollateral/total?custnumber=' + custnumber);
  }

  getAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tqall?filter[include]=guarantors&filter[include]=demandsdues&filter[where][accnumber]=' + accnumber);
  }

  getmcoopcashAccount(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/mcoopcash_stage?filter[include]=mcoopcash_static&filter[where][loanaccnumber]=' + accnumber);
  }

  getwatch(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/watch_stage/' + accnumber);
  }

  login(username: string) {
    return this.httpClient.get<any>(environment.api + '/api/tblusers/search?username=' + username);
  }

  logout() {
    //  remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('accountInfo');
    localStorage.removeItem('userpermission');
    localStorage.removeItem('profile');

    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('accountInfo');
    sessionStorage.removeItem('userpermission');
    sessionStorage.removeItem('profile');
  }

  auth(body: object) {
    return this.httpClient.post<any>(environment.auth, body);
  }

  getbulknotes(cust) {
    // tslint:disable-next-line:max-line-length
    const response = this.httpClient.get<any>(environment.api + '/api/notehis?filter[where][custnumber]=' + cust + '&filter[where][notesrc]=uploaded a note' + '&filter[order]=notedate DESC');
    return forkJoin([response]);
  }

  getflaggednotes(cust) {
    // tslint:disable-next-line:max-line-length
    const response = this.httpClient.get<any>(environment.api + '/api/notehis?filter[where][custnumber]=' + cust + '&filter[where][noteimp]=Y' + '&filter[order]=notedate DESC');
    return forkJoin([response]);
  }

  getactivitylogreason(cust) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/activitylogs?filter[where][custnumber]=' + cust);
  }

  getallnotes(filter, cust) {
    //
    let url = environment.api + '/api/notehis/custnotes?custnumber=' + cust;

    if (filter !== '') {
      url = url + '&offset=' + filter.skip + '&next= ' + filter.limit;
    }
    return this.httpClient.get<any>(url);
  }

  otheraccs(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.nodeapi + '/otheraccs/all?custnumber=' + custnumber);
  }

  collaterals(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/collaterals?filter[where][accnumber]=' + accnumber);
  }

  directors(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/directors?filter[where][accnumber]=' + accnumber);
  }

  accwithid(nationid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_q_all?filter[where][nationid]=' + nationid);
  }

  ptps(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/ptps?filter[where][accnumber]=' + accnumber);
  }

  getcardwithid(nationid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_stage?filter[where][nationid]=' + nationid);
  }

  getexcuse() {
    // const url = environment.api + '/api/excuse?filter[order]=excuse ASC';
    // So that other can be the lastpostactivitylogs option
    const url = environment.api + '/api/excuse';
    return this.httpClient.get(url);
  }

  getExcuseDetails(EXCUSEID: any) {
    return this.httpClient.get<any>(environment.api + '/api/excusedetailed?filter[where][excuseid]=' + EXCUSEID);
  }

  getStaticLoans(accnumber) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_portfolio_static?filter[where][accnumber]=' + accnumber);
  }

  getWatchcardStatic(cardacct) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/cards_watch_static?filter[where][cardacct]=' + cardacct);
  }

  getcmdstatus() {
    const url = environment.api + '/api/cmdstatus';
    return this.httpClient.get(url);
  }

  getreviewers() {
    const url = environment.api + '/api/tblusers?filter[where][role]=teamleader';
    return this.httpClient.get(url);
  }

  getparty() {
    const url = environment.api + '/api/party';
    return this.httpClient.get(url);
  }

  getcollectoraction() {
    const url = environment.api + '/api/collectoraction';
    return this.httpClient.get(url);
  }

  getcure() {
    const url = environment.api + '/api/cure';
    return this.httpClient.get(url);
  }

  loader() {

    swal.fire({
      title: 'Processing ...',
      text: 'Please wait',
      showConfirmButton: false,
      /*onOpen: function () {
        swal.showLoading();
      }*/
    });
  }

  putcardwatch(data) {
    return this.httpClient.put<any>(environment.api + '/api/cards_watch_static/' + data.cardacct, data);
  }

  postactivitylogs(body) {
    const url = environment.api + '/api/activitylogs';
    return this.httpClient.post(url, body);
  }

  putwatch(data) {
    return this.httpClient.put<any>(environment.api + '/api/watch_static', data);
  }

  reviewptp(data) {
    return this.httpClient.post<any>(environment.nodeapi + '/brokenptps/review', data);
  }

  activeptps(accnumber) {
    return this.httpClient.get<any>(environment.nodeapi + '/activeptps/active?accnumber=' + accnumber);
  }

  postptps(ptps) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(environment.api + '/api/ptps', ptps);
  }

  updatenote(body) {
    const url = environment.api + '/api/notehis/updatenote';
    return this.httpClient.post(url, body);
  }

  getanote(id) {
    const url = environment.api + '/api/notehis/' + id;
    return this.httpClient.get(url);
  }

  demandshistory(data) {
    return this.httpClient.post<any>(environment.api + '/api/demandshistory', data);
  }

  getteles(custnumber) {
    return this.httpClient.get<any>(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber);
  }

  getdemandshistory(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/demandshistory?filter[where][accnumber]=' + accnumber + '&filter[order]=datesent desc');
  }

  getcustwithAccount(custnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tqall?filter[where][custnumber]=' + custnumber);
  }

  demand1history(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/demandshistory?filter[where][accnumber]=' + accnumber + '&filter[where][demand]=Demand1&filter[order]=datesent desc');
  }

  generateLetter(data) {
    return this.httpClient.post<any>(environment.letters_api + data.demand + '/download', data);
  }

  getsmsmessage(demand) {
    return this.httpClient.get<any>(environment.api + '/api/demandsettings/' + demand.toLowerCase());
  }

  demandstatus(body) {
    return this.httpClient.post<any>(environment.nodeapi + '/demandstatus/demandstatus', body);
  }

  sendDemandEmail(data) {
    return this.httpClient.post<any>(environment.emailapi, data);
  }

  sendDemandsms(data) {
    return this.httpClient.post<any>(environment.demandsmsapi, data);
  }

  generateLettercc(data) {
    return this.httpClient.post<any>(environment.letters_api + data.demand + '/download', data);
  }

  sendsms(data) {
    return this.httpClient.post<any>(environment.api + '/api/sms', data);
  }

  guarantorletters(data) {
    return this.httpClient.post<any>(environment.api + '/api/guarantorletters', data);
  }

  demanddownload(file: string) {
    const body = {filename: file};

    return this.httpClient.post(environment.demanddownload + '/filesapi/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  existsteles(custnumber, tel, email) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/teles?filter[where][custnumber]=' + custnumber + '&filter[where][telephone]=' + tel + '&filter[where][email]=' + email);
  }

  postteles(data) {
    return this.httpClient.post<any>(environment.api + '/api/teles', data);
  }

  getallteles(custnumber) {
    // return this.httpClient.get<any>(environment.api + '/api/teles/alltele?custnumber=' + custnumber);
    return this.httpClient.get<any>(environment.nodeapi + '/teles/all?custnumber=' + custnumber);
  }

  getsms(cust) {
    return this.httpClient.get<any>(environment.api + '/api/sms?filter[where][custnumber]=' + cust + '&filter[order]=stagedate desc');
  }

  getaccount(accnumber) {
    // return this.httpClient.get<any>(environment.api + '/api/tbl_q_all/' + accnumber);
    return this.httpClient.get<any>(environment.api + '/api/tqall/' + accnumber);
  }

  postsms(body) {
    return this.httpClient.post<any>(environment.api + '/api/sms/', body);
  }

  tbl_s_plans() {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plans');
  }

  s_plan_actions(planid) {
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_plan_actions?filter[where][planid]=' + planid);
  }

  s_account_plans(accnumber, planid) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/tbl_s_account_plans?filter[where][accnumber]=' + accnumber + '&filter[where][planid]=' + planid);
  }

  putaccountplan(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<any>(environment.api + '/api/tbl_s_account_plans/' + body.id, body);
  }

  saveaccountplan(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.post<any>(environment.api + '/api/tbl_s_account_plans', body);
  }

  put_s_accounts(body) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.put<any>(environment.api + '/api/tbl_s_accounts', body);
  }

  putteles(data) {
    return this.httpClient.post<any>(environment.nodeapi + '/teles/update', data);
  }

  submitCollateral(body) {
    return this.httpClient.post(environment.api + '/api/deptcollateral', body);
  }

  retrieveCollateral(custnumber) {
    return this.httpClient.get(environment.api + '/api/deptcollateral?filter[where][custnumber]=' + custnumber);
  }

  updateCollateral(id, body) {
    return this.httpClient.put(environment.api + '/api/deptcollateral/' + id, body);
  }

  submitGuarantor(body) {
    return this.httpClient.post(environment.api + '/api/guarantordetails', body);
  }

  guarantordetails(accnumber) {
    // tslint:disable-next-line:max-line-length
    return this.httpClient.get<any>(environment.api + '/api/guarantordetails?filter[where][accnumber]=' + accnumber);
  }

  uploads(data) {
    return this.httpClient.post<any>(environment.api + '/api/uploads', data);
  }

  downloadFile(file: string) {
    const body = {filename: file};
    return this.httpClient.post(environment.uploadurl + '/download', body, {
      responseType: 'blob',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  bulknotes(body) {
    const url = environment.nodeapi + '/xlsuploads/uploadbulk-test';
    return this.httpClient.post<any>(url, body, {
      reportProgress: true,
      observe: 'events'
    });
  }

  bulktotblcardsstatic(body) {
    const url = environment.api + '/api/tblcard_static/actiondate';
    return this.httpClient.post(url, body);
  }

  bulktotblportfolio(body) {
    const url = environment.api + '/api/tbl_portfolio_static/actiondate';
    return this.httpClient.post(url, body);
  }

  getthisptp(id) {
    return this.httpClient.get<any>(environment.api + '/api/ptps/' + id);
  }

  ammendptp(data) {
    return this.httpClient.post<any>(environment.nodeapi + '/ptpsammend/ammendptp', data);
  }

  woffstory(data) {
    return this.httpClient.put<any>(environment.api + '/api/writeoffstory', data);
  }
}


