import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
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
}


