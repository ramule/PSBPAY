import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { OtpSessionService } from './otp-session.service';
import { Location, PlatformLocation } from '@angular/common';
import { PaymentService } from '../aggre-payment/agree-payment-service';
import { LoginService } from 'src/app/pages/pre-login/login/login.service';
declare var showToastMessage: any;


@Component({
  selector: 'app-aggre-payment-otp-auth',
  templateUrl: './aggre-payment-otp-auth.component.html',
  styleUrls: ['./aggre-payment-otp-auth.component.scss']
})
export class AggrePaymentOtpAuthComponent implements OnInit {
  otpSessionForm: FormGroup;
  mobNumber: any;
  countDown: Subscription;
  paymentDetails:any;
  invalidOtp = false;
  counter = 120;
  tick = 1000;
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private otpSessionService: OtpSessionService,
    private location: Location,
    private platformLocation : PlatformLocation,
    private paymentService : PaymentService,
    private loginService: LoginService
  ) { }

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  @ViewChildren('aggreePaymentOtpRow') aggreePaymentOtpRows: any;

  aggreePaymentOtp = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']


  ngOnInit(): void {
    this.paymentDetails = this.DataService.paymentDetails;
    // history.pushState(
    //   {},
    //   this.DataService.previousPageUrl,
    //   this.location.prepareExternalUrl(this.DataService.previousPageUrl)
    // );
    // history.pushState(
    //   {},
    //   'self',
    //   this.location.prepareExternalUrl(this.router.url)
    // );

    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.mobNumber = this.commonMethod.maskMobileNumber(
      this.storage.getLocalStorage('mobileNo')
    );
    this.buildForm();
    this.DataService.changeMessage(this.commonPageComponent);
    this.resendOTP(1);
  //   this.platformLocation.onPopState(() => {
  //     this.router.navigateByUrl('login?'+this.DataService.aggregatorHref)
  // });
  } /**
  * OTP form build
  */
  buildForm() {
    if (this.DataService.otplength == 4) {
      this.otpSessionForm = new FormGroup({
        otp1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    } else {
      this.otpSessionForm = new FormGroup({
        otp1: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp2: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp3: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp4: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp5: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
        otp6: new FormControl('', [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(1),
        ]),
      });
    }
  }


  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  directTaxOtpSubmit() {
    if (this.otpSessionForm.valid) {
      this.DataService.otpValue =this.getOTPValue()
      this.omniChannelCall();
      // this.goToPage('agreePaymentTpinAuth')
      // this.goToPage('agreePaymentReceipt') ;
    } else {
      // this.validateForm() ;
    }
  }


  goToPreviousPage() {
    this.getCancelPgPayment();
    //this.location.back();
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

  /**
   * function to be called for omnichannel
   */
  omniChannelCall() {
    this.DataService.otpValue =this.getOTPValue()
    var param = this.paymentService.getFundTransferParam({amount:this.paymentDetails.amount,sendTo:this.DataService.aggregatorDetails.Accountnumber,remark:this.paymentDetails.remarks}, {ID:this.DataService.userDetails.customerId},this.paymentDetails.debitAccount,'self',this.DataService.otpValue);
    this.omniChannelApiCall(param);
  }

  omniChannelApiCall(param) {
    this.http.callBankingAPIService(
        param,
        this.storage.getLocalStorage('deviceId'),
        this.constant.serviceName_TRANSFERTRANSACTION
      )
      .subscribe((data) => {
        var resp = data.responseParameter;
        this.otpSessionForm.reset();
        switch (resp.opstatus) {
          // case this.constant.val_InvalidOTP:
          //   break;
          case "00":
            var resp = data.responseParameter;
            this.DataService.paymentDetails.opstatus = resp.opstatus;
            this.DataService.paymentDetails.remark = resp.Result;
            this.DataService.paymentDetails.returnUrl = resp.returnUrl;
            console.log(this.DataService.paymentDetails.opstatus);
            if(data.hasOwnProperty("set")){
              this.DataService.referenceNo = data.set.records[0].referenceNumber;
            }
            this.goToPage('agreePaymentReceipt');
            break;
          case this.constant.val_InvalidCredentials:
            break;
          case "03":
            this.DataService.isOTPMaxAttempts = true;
            break;
          case "11":
            //invaild otp
            this.invalidOtp = true;
            break;
          case "12":
            //otp attempt expired
            this.DataService.isOTPMaxAttempts = true;
            this.commonMethod.openPopup('div.popup-bottom.otp-attempt-expired');
            break;
          default:
            break;
        }
      });
  }


  /**
   * call function for resend function
   */
  resendOTP(numCount?: any) {
    this.otpSessionForm.reset();
    var resendOTPReq = this.otpSessionService.getResendOTPSessionReq('AGGREFATORPAYMENT');
    this.http
      .callBankingAPIService(
        resendOTPReq,
        this.storage.getLocalStorage(this.constant.storage_deviceId),
        this.constant.serviceName_RESENDOTPSESSION
      )
      .subscribe((data) => {
        if (data.responseParameter.opstatus == '00') {
          this.startCounter();
          if (numCount == 2)
            showToastMessage(data.responseParameter.Result, 'success');
        }
      });
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

  getOTPValue() {
    var otp = "";
    //console.log(this.MPINForm.controls);
    for (const field in this.otpSessionForm.controls) { // 'field' is a string
      const control = this.otpSessionForm.get(field); // 'control' is a FormControl
      //console.log("value", control.value);
      if (!control.hasError('required')) {
        otp += control.value;
        //console.log(mpin);
      }
    }
    return otp;
  }


  closePopup(popup){
    this.commonMethod.closePopup(popup);
  }

}
