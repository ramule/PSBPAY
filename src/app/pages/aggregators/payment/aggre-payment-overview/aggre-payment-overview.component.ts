import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import * as moment from 'moment';
import { PaymentService } from '../aggre-payment/agree-payment-service';
import { Location, PlatformLocation } from '@angular/common';
import { LoginService } from 'src/app/pages/pre-login/login/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-aggre-payment-overview',
  templateUrl: './aggre-payment-overview.component.html',
  styleUrls: ['./aggre-payment-overview.component.scss']
})
export class AggrePaymentOverviewComponent implements OnInit {
  paymentDetails:any;
  transDate:any;
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethods: CommonMethods,
    private http: HttpRestApiService,
    private location : Location,
    private paymentService : PaymentService,
    private platformLocation: PlatformLocation,
    private loginService: LoginService,
    private storage : LocalStorageService,
  ) { }

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }
  payTo:any;
  ngOnInit(): void {
    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.payTo = this.DataService.aggregatorDetails.MerchantName ? this.DataService.aggregatorDetails.MerchantName:'-';
    this.transDate = moment(new Date()).format('DD MMM yyyy');
    this.paymentDetails = this.DataService.paymentDetails;
    this.DataService.changeMessage(this.commonPageComponent);
  //   this.platformLocation.onPopState(() => {
  //     this.router.navigateByUrl('login?'+this.DataService.aggregatorHref)
  // });
  }

  goToPage(routeName){
    this.DataService.endPoint = this.constant.serviceName_TRANSFERTRANSACTION
    this.router.navigateByUrl('/'+routeName);
  }

  cancel(){
    this.getCancelPgPayment();
    // var returnUrl = this.DataService.aggregatorDetails.RU
    // window.open(returnUrl,"_self")
  }

  getCancelPgPayment(){
    var param = this.loginService.getCancelPgPaymentCall();
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_CANCELPGPAYMENTREQUEST).subscribe(data => {
      console.log(data);
      if(data.responseParameter){
        var returnUrl = data.responseParameter.returnUrl
        window.open(returnUrl,"_self")
      }
    });
  }

}
