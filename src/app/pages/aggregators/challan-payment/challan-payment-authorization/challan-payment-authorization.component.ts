import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Subscription, timer } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OtpSessionService } from '../../payment/aggre-payment-otp-auth/otp-session.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from './../../payment/aggre-payment/agree-payment-service'
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { Location } from '@angular/common';
declare var showToastMessage: any;

@Component({
  selector: 'app-challan-payment-authorization',
  templateUrl: './challan-payment-authorization.component.html',
  styleUrls: ['./challan-payment-authorization.component.scss']
})
export class ChallanPaymentAuthorizationComponent implements OnInit {
  countDown: Subscription;
  overviewObject: any;
  counter = 120;
  tick = 1000;
  tempDecryptedReq: any;
  mobNumber: any;
  invalidOtp: boolean = false;
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private otpSessionService: OtpSessionService,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private location: Location,
    private agreePaymentService: PaymentService,
    private encryptDecryptService: EncryptDecryptService,
  ) { }

  @ViewChildren('otpRow') OTPRows: any;
  otpInput = ['otp1', 'otp2', 'otp3', 'otp4', 'otp5', 'otp6']

  otpForm: FormGroup;

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  ngOnInit(): void {
    this.buildForm();
    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.mobNumber = this.storage.getLocalStorage('mobileNo');
    this.resendOTP(1);
    this.DataService.changeMessage(this.commonPageComponent);
    this.overviewObject = this.DataService.challanTaxOverviewDetails;
  }

  buildForm(){
    this.otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required, Validators.maxLength(1)]),
    });
  }

  validateForm(){
    if (this.otpForm.invalid) {
      this.otpForm.get('otp1').markAsTouched();
      this.otpForm.get('otp2').markAsTouched();
      this.otpForm.get('otp3').markAsTouched();
      this.otpForm.get('otp4').markAsTouched();
      this.otpForm.get('otp5').markAsTouched();
      this.otpForm.get('otp6').markAsTouched();
      return ;
    }
  }
  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  otpSubmit(){
    if(this.otpForm.valid){
      // this.goToPage('challanPaymentSuccess') ;
      let otpValue =
      this.otpForm.value.otp1 +
      this.otpForm.value.otp2 +
      this.otpForm.value.otp3 +
      this.otpForm.value.otp4 +
      this.otpForm.value.otp5 +
      this.otpForm.value.otp6  ;

      var param = this.agreePaymentService.getSendOTPSessionReq(otpValue);
      this.submitOtpSession(param);
    } else{
      this.validateForm() ;
    }
  }

  submitOtpSession(param) {
    console.log("this.DataService.request" + this.DataService.request);

    this.tempDecryptedReq = JSON.parse(this.encryptDecryptService.decryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), this.DataService.request));
    console.log("nominee auth ", this.tempDecryptedReq)
    console.log(this.tempDecryptedReq);
    this.tempDecryptedReq.methodName = this.DataService.endPoint.split('/')[1];
    this.tempDecryptedReq.value = this.otpForm.value.otp1 + this.otpForm.value.otp2 +  this.otpForm.value.otp3 + this.otpForm.value.otp4 + this.otpForm.value.otp5 + this.otpForm.value.otp6;
    this.tempDecryptedReq.customerID = this.DataService.userDetails.customerId;
    this.tempDecryptedReq.remarks = this.tempDecryptedReq.remarks ? this.tempDecryptedReq.remarks : "OLTASTRANSFERTRANSACTION"

    console.log(this.tempDecryptedReq);
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(this.tempDecryptedReq));
    this.DataService.request = encryptData;
    console.log(this.DataService.request);
    this.submitReq();
  }


  submitReq(){
    console.log("this.DataService.request" + this.DataService.request);
    this.http.callBankingAPIService( this.DataService.request, this.storage.getLocalStorage(this.constant.storage_deviceId),this.DataService.endPoint).subscribe(data => {

      this.otpForm.reset();
      switch (data.responseParameter.opstatus) {
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
          if (data.responseParameter.opstatus == '00') {
            console.log(data);
            this.DataService.receiptType = 'Successful';
          } else {
            this.DataService.receiptType = 'Failed';
          }
          this.DataService.receiptmsg = data.responseParameter.Result;
          this.DataService.receipdRefID = data.RRN =="" ? "-" : data.RRN ;
          this.router.navigate(['/challanPaymentSuccess']);
      }
    })
  }

  onKeyUpEvent(index: any, event: any, type: any) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type).value.length === 1) {
      if (index !== 7) {
        this.getSpasswordElement(index + 1, type).focus();
      } else {
        this.getSpasswordElement(index, type).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type).focus();
    }


    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'otp') {
          this.otpForm.get(this.otpInput[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type).focus();
      }
    }

  }

  onFocusEvent(index: any, type: any) {

    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any) {
    if (type == 'otp') {
      return this.OTPRows._results[index].nativeElement;
    }
  }

  /**
   * call function for resend function
   */
   resendOTP(numCount?: any) {
    this.otpForm.reset();
    var resendOTPReq = this.otpSessionService.getResendOTPSessionReq('CHALLANPAYMENT');
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

  closePopup(popup){
    this.commonMethod.closePopup(popup);
    this.router.navigateByUrl('/challanPaymentOverview');
  }

}
