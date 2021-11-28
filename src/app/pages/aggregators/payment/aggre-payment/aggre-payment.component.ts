import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { Location, PlatformLocation } from '@angular/common';
import { LoginService } from 'src/app/pages/pre-login/login/login.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-aggre-payment',
  templateUrl: './aggre-payment.component.html',
  styleUrls: ['./aggre-payment.component.scss']
})
export class AggrePaymentComponent implements OnInit {
  accountList =[]
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethods: CommonMethods,
    private http: HttpRestApiService,
    private location:Location,
    private customcurrencyPipe : CustomCurrencyPipe,
    private platformLocation: PlatformLocation,
    private loginService: LoginService,
    private storage : LocalStorageService,
  ) { }
  amountDetails="";
  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }
  amount:any='';
  aggreePaymentForm : FormGroup
  payTo:any;
  ngOnInit(): void {

    this.payTo = this.DataService.aggregatorDetails.MerchantName ? this.DataService.aggregatorDetails.MerchantName : '-'
    this.buildForm() ;

    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.accountList = this.DataService.customerOperativeAccList;
    this.DataService.changeMessage(this.commonPageComponent);
    this.amount = this.customcurrencyPipe.transform(this.DataService.aggregatorDetails.AMT,'symbol');
    console.log('isReceivedAccMatched: ', this.DataService.isReceivedAccMatched);
    if(this.DataService.isReceivedAccMatched) {
      this.aggreePaymentForm.patchValue({
        debitAccount: this.DataService.aggregatorDetails.AccNo
        // debitAccount: '00291000101809'
      });
    }
    // this.platformLocation.onPopState(() => {
    //   this.DataService.routeParam = "";
    // });
  }

  buildForm(){
    this.aggreePaymentForm = new FormGroup({
      debitAccount: new FormControl('', [Validators.required]),
      remarks: new FormControl('', [Validators.required]),
    });
  }

  validateForm(){
    if(this.aggreePaymentForm.invalid){
      this.aggreePaymentForm.get('debitAccount').markAsTouched();
      this.aggreePaymentForm.get('remarks').markAsTouched();
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  aggreePaymentSubmit(){
    console.log(this.aggreePaymentForm.value);
    if(this.aggreePaymentForm.valid){
      this.DataService.paymentDetails = this.aggreePaymentForm.value;
      this.DataService.paymentDetails.maskedAccountNo = this.getMaskedAccountNo().sbAccount;
      this.DataService.paymentDetails.amount = this.DataService.aggregatorDetails.AMT;
      this.DataService.paymentDetails.transDate = moment(new Date()).format('DD MMM yyyy h:mm a')
      this.goToPage('agreePaymentOverview') ;
    }else{
      this.validateForm() ;
    }
  }

  cancelPayment(){
    this.getCancelPgPayment();
    // var returnUrl = this.DataService.aggregatorDetails.RU
    // window.open(returnUrl,"_self");
  }

  onAccountChange(value) {
  }

  getMaskedAccountNo(){
    if(this.accountList.length > 0){
      return this.accountList.find((accountDetails) => { return accountDetails.accountNo == this.aggreePaymentForm.value.debitAccount });
    }
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
