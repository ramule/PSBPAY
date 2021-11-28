import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { OtpSessionService } from '../aggre-payment-otp-auth/otp-session.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Location, PlatformLocation } from '@angular/common';
import { PaymentService } from '../aggre-payment/agree-payment-service';

@Component({
  selector: 'app-aggre-payment-tpin-auth',
  templateUrl: './aggre-payment-tpin-auth.component.html',
  styleUrls: ['./aggre-payment-tpin-auth.component.scss']
})
export class AggrePaymentTpinAuthComponent implements OnInit {
  mobNumber:any;

  countDown: Subscription;

  counter = 120;
  tick = 1000;
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private otpSessionService : OtpSessionService,
    private storage : LocalStorageService,
    private location : Location,
    private paymentService : PaymentService,
    private platformLocation:PlatformLocation
  ) { }

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  @ViewChildren('agreePaymentTpinRow') agreePaymentTpinRows: any;

  agreeTpin = ['tpin1', 'tpin2', 'tpin3', 'tpin4','tpin5','tpin6']
  paymentDetails:any;
  tpinForm : FormGroup ;

  ngOnInit(): void {
    history.pushState(
      {},
      this.DataService.previousPageUrl,
      this.location.prepareExternalUrl(this.DataService.previousPageUrl)
    );
    history.pushState(
      {},
      'self',
      this.location.prepareExternalUrl(this.router.url)
    );
    this.paymentDetails = this.DataService.paymentDetails;
    this.mobNumber = this.commonMethod.maskMobileNumber(
      this.storage.getLocalStorage('mobileNo')
    );
    this.buildForm() ;
    this.startCounter();
    this.DataService.changeMessage(this.commonPageComponent);
    this.platformLocation.onPopState(() => {
      this.router.navigateByUrl('login?'+this.DataService.aggregatorHref)
  });
  }

  buildForm(){
    this.tpinForm = new FormGroup({
      tpin1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      tpin2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      tpin3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      tpin4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      tpin5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      tpin6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
  }

  validateForm(){
    if(this.tpinForm.invalid){
      this.tpinForm.get('tpin1').markAsTouched();
      this.tpinForm.get('tpin2').markAsTouched();
      this.tpinForm.get('tpin3').markAsTouched();
      this.tpinForm.get('tpin4').markAsTouched();
      this.tpinForm.get('tpin5').markAsTouched();
      this.tpinForm.get('tpin6').markAsTouched();
      return;
     }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  directTaxTpinSubmit(){
    if(this.tpinForm.valid){
      this.omniChannelCall()
    }else{
      this.validateForm() ;
    }
  }

  cancel(){
    var returnUrl = this.DataService.aggregatorDetails.RU
    window.open(returnUrl,"_self")
  }

  startCounter() {
    this.tick = 1000;
    this.counter = 120;
    if (this.countDown && !this.countDown.closed) {
      this.countDown.unsubscribe();
    }
    this.countDown = timer(0, this.tick).subscribe(() => {
      if (this.counter == 1) this.countDown.unsubscribe();
      --this.counter;
    });
  }

  /**
   * function to be called for omnichannel
   */
   omniChannelCall() {
    // var param = this.DataService.request;
    var param = this.paymentService.getFundTransferParam({amount:this.paymentDetails.amount,sendTo:this.DataService.aggregatorDetails.Accountnumber,remark:this.paymentDetails.remarks}, {ID:this.DataService.userDetails.customerId},this.paymentDetails.debitAccount,'self',this.DataService.otpValue);
    // this.DataService.request = neftReqParam;
    this.omniChannelApiCall(param);
  }

  getTPINValue() {
    var mpin = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.tpinForm.controls) { // 'field' is a string
      const control = this.tpinForm.get(field); // 'control' is a FormControl
      //console.log("value", control.value);
      if (!control.hasError('required')) {
        mpin += control.value;
        //console.log(mpin);
      }
    }
    return mpin;
  }
  omniChannelApiCall(param) {
    this.http.callBankingAPIService(
        param,
        this.storage.getLocalStorage('deviceId'),
        this.constant.serviceName_TRANSFERTRANSACTION
      )
      .subscribe((data) => {
        console.log(data);
        var resp = data.responseParameter;
        this.DataService.paymentDetails.opstatus = resp.opstatus;
        this.DataService.paymentDetails.remark = resp.Result;
        this.DataService.paymentDetails.returnUrl = resp.returnUrl;
        console.log(this.DataService.paymentDetails.opstatus);
        if(data.hasOwnProperty("set")){
          this.DataService.referenceNo = data.set.records[0].referenceNumber;
        }
        this.goToPage('agreePaymentReceipt');
        // if (resp.opstatus == '00') {
          // if(this.DataService.psbLoginType == 'retailBanking'){

          // }
        // } else {
        // }
      });
  }


  onSearchChange(value, inputPlace) {
    console.log(value);
    if (inputPlace == 1) {
      if (value.length == 1)
        document.getElementById("spassword2").focus();
    }
    else if (inputPlace == 2) {
      if (value.length == 1)
        document.getElementById("spassword3").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword1").focus();
    }
    else if (inputPlace == 3) {
      if (value.length == 1)
        document.getElementById("spassword4").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword2").focus();

    }
    else if (inputPlace == 4) {
      if (value.length == 1)
        document.getElementById("spassword5").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword3").focus();

    }
    else if (inputPlace == 5) {
      if (value.length == 1)
        document.getElementById("spassword6").focus();
      // else if(value.length == 0)
      else
        document.getElementById("spassword4").focus();

    }
    else if (inputPlace == 6) {
      if (value.length == 0)
        document.getElementById("spassword5").focus();

    }
  }
}
