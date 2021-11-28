import { Component, NgZone, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { AppConstants } from '../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountType } from '../../../utilities/app-enum';
import { pageLoaderService } from '../../../services/pageloader.service';
import { LoginService } from './login.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
declare var $ :any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  sessionDecryptKey: any;
  warningResp:any;
  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }
  information = "";

  loginAttemptCount:any;
  incorrectLogin:boolean = false;
  attempRemaining:any;
  attemptedTime:any;

  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private loader: pageLoaderService,
    private loginService: LoginService,
    private encryptDecryptService : EncryptDecryptService,
    private storage : LocalStorageService,
    private ngZone:NgZone
  ) { }

  loginForm: FormGroup;
  retailLoginForm : FormGroup ;

  psbLoginType = 'retailBanking' ;

  ngOnInit(): void {
    //this.setDetails()
    // var splittedArray = array[1];
    // this.DataService.paymentDetails.remark = splittedArray[1].split('=')[1];
    this.buildForm();
    this.DataService.isOmniLogin = false;
    this.DataService.changeMessage(this.commonPageComponent);
    $('#userName').bind('keyboardChange', this.updateUsername.bind(this));
    // $('#userName').bind('show', this.resetUserName.bind(this));
    $('#pwd').bind('keyboardChange', this.updatePwd.bind(this));

    $('#corporateId').bind('keyboardChange', this.updateCorp.bind(this));
    $('#userNameCorporate').bind('keyboardChange', this.updateUserNameCorp.bind(this));
    $('#pwdCorporate').bind('keyboardChange', this.updatePwdCorp.bind(this));


    $("#userName").bind('beforeVisible', this.resetUserName.bind(this));
    $("#pwd").bind('beforeVisible', this.resetPwd.bind(this));
    $("#corporateId").bind('beforeVisible', this.resetCorp.bind(this));
    $("#userNameCorporate").bind('beforeVisible', this.resetUserNameCorp.bind(this));
    $("#pwdCorporate").bind('beforeVisible', this.resetPwdCorp.bind(this));
    // this.testEncrypt();
  }

  setDetails(){
    var array = window.location.href.split('?');
    this.DataService.aggregatorHref = array[1];
    var obj={};var data = decodeURIComponent(array[1]).split('|');
    for(var i=0; i<data.length; i++){
      var s = data[i].split('=');
       obj[s[0]] = s[1]
   }
   this.DataService.aggregatorDetails = obj;
  }

  resetPwd() {
    $("#pwd").val("");
    this.retailLoginForm.patchValue({ password: "" })
  }

  resetCorp(){
    $("#corporateId").val("");
    this.loginForm.patchValue({ corporateId: "" })
  }

  resetUserNameCorp(){
    $("#userNameCorporate").val("");
    this.loginForm.patchValue({ userId: "" })
  }

  resetPwdCorp(){
    $("#pwdCorporate").val("");
    this.loginForm.patchValue({ password: "" })
  }

  updatePwd(e, keyboard, el) {
    this.ngZone.run(() => {
      this.retailLoginForm.patchValue({ password: this.reverse(e.target.value) });
    })
  }

  resetUserName() {
    $("#userName").val("")
    this.retailLoginForm.patchValue({ username: "" });
  }


  /**
   * Below function is called for updating the input value of username &password using virtual keyboard
   * @param e
   * @param keyboard
   * @param el
   */
   updateUsername(e, keyboard, el) {
    console.log(e.target.value);
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g,'')
    if(e.action){
      this.ngZone.run(() => {
        this.retailLoginForm.patchValue({ username: this.reverse(e.target.value) });
      })
    }else{
      this.retailLoginForm.patchValue({ username: "" });
      $("#userName").val("")
    }
  }

  updateCorp(e, keyboard, el){
    console.log(e.target.value);
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g,'')
    if(e.action){
      this.ngZone.run(() => {
        this.loginForm.patchValue({ corporateId: this.reverse(e.target.value) });
      })
    }else{
      this.loginForm.patchValue({ corporateId: "" });
      $("#corporateId").val("")
    }
  }

  updateUserNameCorp(e, keyboard, el){
    console.log(e.target.value);
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g,'')
    if(e.action){
      this.ngZone.run(() => {
        this.loginForm.patchValue({ userId: this.reverse(e.target.value) });
      })
    }else{
      this.loginForm.patchValue({ userId: "" });
      $("#userNameCorporate").val("")
    }
  }

  updatePwdCorp(e, keyboard, el){
    console.log(e.target.value);
    e.target.value = e.target.value.replace(/[^a-zA-Z0-9_.]/g,'')
    if(e.action){
      this.ngZone.run(() => {
        this.loginForm.patchValue({ password: this.reverse(e.target.value) });
      })
    }else{
      this.loginForm.patchValue({ password: "" });
      $("#pwdCorporate").val("")
    }
  }

  reverse(s) {
    // return s;
    return s.split("").reverse().join("");
  }

  goToPage(routeName : any){
    this.ngZone.run(()=>{
      this.router.navigateByUrl('/'+routeName);
    })
  }

  buildForm(){
    this.retailLoginForm = new FormGroup({
      username : new FormControl('', [Validators.required]),
      password : new FormControl('', [Validators.required, Validators.minLength(8)]),
      test : new FormControl('')
      // password2 : new FormControl('', [Validators.required]),
      // radioboxdemo1: new FormControl('', [Validators.required]),
    })

    this.loginForm = new FormGroup({
      corporateId : new FormControl(''),
      userId : new FormControl(''),
      password : new FormControl(''),
      // password2 : new FormControl(''),
      // radioboxdemo: new FormControl(''),
    })


  }

  validateForm(value){
    this.afterValidateFormSelection() ;

    switch(value){
      case 'retailBanking' :
        if(this.retailLoginForm.invalid){
          this.retailLoginForm.get('username').markAsTouched();
          this.retailLoginForm.get('password').markAsTouched();
          // this.retailLoginForm.get('password2').markAsTouched();
          // this.retailLoginForm.get('radioboxdemo1').markAsTouched();
        }
        break;

      case 'corporateBanking' :
        if(this.loginForm.invalid){
          this.loginForm.get('corporateId').markAsTouched();
          this.loginForm.get('userId').markAsTouched();
          this.loginForm.get('password').markAsTouched();
          // this.loginForm.get('password2').markAsTouched();
          // this.loginForm.get('radioboxdemo').markAsTouched();
        }
        break ;
    }
  }

  afterValidateFormSelection(){
    if (this.psbLoginType == 'retailBanking') {
      //corporate
      this.loginForm.get('corporateId').clearValidators();
      this.loginForm.get('userId').clearValidators();
      this.loginForm.get('password').clearValidators();
      // this.loginForm.get('password2').clearValidators();
      // this.loginForm.get('radioboxdemo').clearValidators();

      this.loginForm.get('corporateId').updateValueAndValidity();
      this.loginForm.get('userId').updateValueAndValidity();
      this.loginForm.get('password').updateValueAndValidity();
      // this.loginForm.get('password2').updateValueAndValidity();
      // this.loginForm.get('radioboxdemo').updateValueAndValidity();

      //Retail
      this.retailLoginForm.get('username').setValidators([Validators.required]);
      this.retailLoginForm.get('password').setValidators([Validators.required, Validators.minLength(8)]);
      // this.retailLoginForm.get('password2').setValidators([Validators.required]);
      // this.retailLoginForm.get('radioboxdemo1').setValidators([Validators.required]);

      this.retailLoginForm.get('username').updateValueAndValidity();
      this.retailLoginForm.get('password').updateValueAndValidity();
      // this.retailLoginForm.get('password2').updateValueAndValidity();
      // this.retailLoginForm.get('radioboxdemo1').updateValueAndValidity();


    } else {
        //Retail
        this.retailLoginForm.get('username').clearValidators();
        this.retailLoginForm.get('password').clearValidators();
        // this.retailLoginForm.get('password2').clearValidators();
        // this.retailLoginForm.get('radioboxdemo1').clearValidators();

        this.retailLoginForm.get('username').updateValueAndValidity();
        this.retailLoginForm.get('password').updateValueAndValidity();
        // this.retailLoginForm.get('password2').updateValueAndValidity();
        // this.retailLoginForm.get('radioboxdemo1').updateValueAndValidity();

        //Corporate
        this.loginForm.get('corporateId').setValidators([Validators.required]);
        this.loginForm.get('userId').setValidators([Validators.required,Validators.pattern("[a-zA-Z0-9]*$")]);
        this.loginForm.get('password').setValidators([Validators.required, Validators.minLength(8)]);
        // this.loginForm.get('password2').setValidators([Validators.required]);
        // this.loginForm.get('radioboxdemo').setValidators([Validators.required]);

        this.loginForm.get('corporateId').updateValueAndValidity();
        this.loginForm.get('userId').updateValueAndValidity();
        this.loginForm.get('password').updateValueAndValidity();
        // this.loginForm.get('password2').updateValueAndValidity();
        // this.loginForm.get('radioboxdemo').updateValueAndValidity();
    }
  }
    /**
  * Login submit using username and password
  */
  loginUsername(value) {
    this.afterValidateFormSelection() ;
    if(this.psbLoginType == 'retailBanking'){
      if (this.retailLoginForm.valid) {
        this.setLoginDetails();
      }
      else {
        console.log('Retail :', this.retailLoginForm)
        this.validateForm('retailBanking');
      }

    }else{
      if (this.loginForm.valid) {
        // alert('Corporate Login successful')
        // this.goToPage(value);
        var param = this.loginService.getUserLoginCall(this.loginForm.value);
        let deviceID = this.constant.deviceID;
        this.loginApiCall(param, deviceID, 'credentials');
      }
      else {
        this.validateForm('corporateBanking');
      }
    }

  }


  setLoginDetails(){
     // this.goToPage(value);
     this.loader.showLoader();
     this.retailLoginForm.value.username = this.retailLoginForm.value.username.toLowerCase();
     this.sessionDecryptKey = this.retailLoginForm.value.username.toLowerCase() + this.constant.sessionEncryptKey + this.encryptDecryptService.createMD5Value(this.retailLoginForm.value.password);

     console.log("sessionDecryptKey =====> " + this.sessionDecryptKey);
     var param = this.loginService.getParamForLogin(this.retailLoginForm.value,this.psbLoginType == 'corporateBanking');
     let deviceID = this.constant.deviceID;
     this.loginApiCall(param,deviceID, 'credentials');
     // this.loginApiCall(param, "116813222160430", 'credentials');
     this.DataService.LoginForm = this.retailLoginForm.value
  }

  /**
  * api call for login
  * @Param get request in encrypted format
  * @loginType
  */
   loginApiCall(param,deviceID, loginType) {

    this.warningResp = "";
    this.http.callBankingAPIService(param, deviceID, this.psbLoginType == 'corporateBanking' ?  this.constant.serviceName_CORPUSERLOGIN : this.constant.serviceName_Login).subscribe(data => {
      console.log(data);
      if(data.responseParameter.invalidAttempts == 1 || data.responseParameter.invalidAttempts == 2 ){
        this.warningResp = 'You have already used '+data.responseParameter.invalidAttempts+' incorrect login attempts out of 3'
        //  showToast( 'You have already used 2 incorrect login attempts out of 4', 'error2', true );
      }
      if(data.responseParameter.invalidAttempts == 3){
        this.warningResp = 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours';
         // showToast( 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours', 'error2', true );
      }

      var resp = data.responseParameter;
      console.log("response :" + data.responseParameter);
      if (resp.opstatus == "00") {
        this.storage.removeFromLocalStorage("logAttempt");
        this.storage.removeFromLocalStorage("attemptedDateTime");
        this.DataService.lastLoginDate =  Date.now();
        this.loader.hideLoader();
        console.log( data.responseParameter);
        this.DataService.otplength = resp.OtpLength;
        this.DataService.dateFormat = resp.dateFormat;
        console.log('otp length:', this.DataService.otplength);
        this.DataService.amountFormat = resp.amountFormat
        if(this.psbLoginType == 'retailBanking'){
          var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        }else{
          this.sessionDecryptKey = this.loginForm.value.userId + this.constant.sessionEncryptKey + this.encryptDecryptService.createMD5Value(this.loginForm.value.password);
          var sessionKey = this.encryptDecryptService.decryptText(this.sessionDecryptKey, resp.Session);
        console.log('sessionKey', sessionKey);
        }


        //handel null or empty session
        if(sessionKey == undefined || sessionKey == null || sessionKey == ""){
          // showToastMessage("Invalid Credentials.", "error");
          this.information = "Invalid Credentials";
          this.commonMethod.openPopup('div.popup-bottom.show-common-info-login');
          return;
        }
        this.storage.setSessionStorage(this.constant.val_sessionKey, sessionKey);
        console.log("resp.deviceId" + resp.deviceId);
        this.storage.setLocalStorage("deviceId", resp.deviceId);
        this.storage.setLocalStorage("mobileNo", resp.MobileNo);
        this.DataService.mobStaticEncKey = this.storage.getLocalStorage("mobileNo") + this.constant.mapEncryptKey
        if (data.hasOwnProperty('set')) {
          this.DataService.customerAccountList = data.set.records;
          this.DataService.isOmniLogin = true; // handel page navigation after session timeout
          this.DataService.customerCanTransferAccountList =[];
          this.DataService.customerMyDepostie =[];
          this.DataService.customerLoanAccountList =[];
          this.DataService.customerMyDepostie = [];
          this.DataService.customerOperativeAccList = [];
          this.DataService.customerBorrowingsList = [];

          this.DataService.totalMyDepositBalance = 0;
          this.DataService.totalMyOperativeBalance = 0;
          this.DataService.totalMyBorrowingsBalance = 0;
          if(this.psbLoginType == 'retailBanking'){
            this.DataService.userId = this.retailLoginForm.value.username;
          data.set.records.forEach(el => {
            if(el.accountType != 'CAPPI'){
              if(el.accountFlag == "P") this.DataService.primaryAccountDtl = el;
              if(el.SchemeCode == AccountType.FIXED_DEPOSITE_ACCOUNT){
                this.DataService.customerMyDepostie.push(el);
                this.DataService.totalMyDepositBalance = this.DataService.totalMyDepositBalance + parseFloat(el.acctBalance);
              }
              else if( el.SchemeCode == AccountType.SAVING_ACCOUNT ||  el.SchemeCode == AccountType.CURRENT_ACCOUNT || el.SchemeCode == AccountType.CASH_CREDIT || el.SchemeCode == AccountType.OVER_DRAFT_ACCOUNT ){
                // el.AGSStatus = el["AGS Status"];
                this.DataService.customerOperativeAccList.push(el);
                this.DataService.totalMyOperativeBalance = this.DataService.totalMyOperativeBalance + parseFloat(el.acctBalance);
                console.log("customerOperativeAccList =====>",this.DataService.customerOperativeAccList);
              }
              else if( el.SchemeCode == AccountType.LOAN_ACCOUNT ){
                this.DataService.customerBorrowingsList.push(el);
                this.DataService.totalMyBorrowingsBalance = this.DataService.totalMyBorrowingsBalance + parseFloat(el.acctBalance);
              }
            }
          });
        }else{
          this.DataService.userId = this.loginForm.value.userId;
          this.DataService.customerOperativeAccList = data.set.records;
        }
          this.DataService.onRefreshDate = new Date();
        }
        console.log('userId: ', this.DataService.userId);
        this.storage.setLocalStorage("username", this.retailLoginForm.get('username').value);
        this.DataService.loginType = loginType;
        this.DataService.isOmniLogin = true;
        /*
        **** below condition will check internet banking with otp
        **** is required or not
        **** if require then navigate to dashboard else otp page
        */
        //TODO:need to add condition for internet banking only
        // if (resp.IBLoginOtpRequired == 'N') {
          this.DataService.userDetails = resp;
          console.log("userDetails", this.DataService.userDetails);
          // this.DataService.setDetails(userProfile);
          this.storage.setSessionStorage("isLoggedIn", "true");
          this.DataService.loginData.mobnumber = resp.MobileNo;
          this.DataService.psbLoginType = this.psbLoginType;
        //TODO:get encrypted data to process further
        // if(this.DataService.routeParam == 'encData') {
        //   this.getPgPaymentRequest();
        // }
        // else if(this.DataService.routeParam == 'oltasData') {
        //   this.getoltasParams()
        // }


        if(this.DataService.routeParam == 'oltasData') {
          this.goToPage('challanTaxPayment');
        }
        else if(this.DataService.routeParam == 'GSTN') {
          this.getGSTNPaymentRequest();
        }
        else {
          this.getPgPaymentRequest();
        }
        //this.goToPage('agreePayment');


        // }
        // else {
          // this.DataService.otpPreviousPage = "/login";
          // this.DataService.otpNextPage = "/dashboard";
          // this.DataService.routeWithNgZone('otp');
        // }

      }
      else {
        this.errorCallBack(resp);
      }
    });
  }

  getPgPaymentRequest(){
    var param = this.loginService.getPgPaymentRequest();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_PGPAYMENTREQUEST).subscribe(data => {
      console.log(data);
      if(data.responseParameter){
        this.DataService.aggregatorDetails  = JSON.parse('{"' + data.responseParameter.response.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        console.log('aggregatorDetails: ', this.DataService.aggregatorDetails);
        console.log('Received AccNo: ', this.DataService.aggregatorDetails.AccNo);
        console.log('customerOperativeAccList: ', this.DataService.customerOperativeAccList);
        this.commonMethod.closeAllPopup() ;
        if(this.DataService.aggregatorDetails.AccNo) {
          if(this.DataService.aggregatorDetails.AccNo == '00000000000000') {
            this.DataService.isReceivedAccMatched = false;
            this.goToPage('agreePayment');
          }
          else {
            this.DataService.customerOperativeAccList.forEach(element => {
              if(element.accountNo == this.DataService.aggregatorDetails.AccNo) {
                this.DataService.isReceivedAccMatched = true;
              }
            });

            if(this.DataService.isReceivedAccMatched) {
              this.goToPage('agreePayment');
            }
            else {
              this.commonMethod.openPopup('div.detailsMismatchPopup');
            }
          }
        }
        else {
          this.DataService.isReceivedAccMatched = false;
          this.goToPage('agreePayment');
        }
      }
    });
  }

  getoltasParams() {
    var param = this.loginService.getOltasParamsCall();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_OLTASGETPARAMS).subscribe(data => {
      console.log(data);
      if(data.responseParameter){
        this.DataService.challanTaxDetails  = JSON.parse('{"' + data.responseParameter.response.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        console.log('challanTaxDetails: ', this.DataService.challanTaxDetails);
        this.goToPage('challanTaxPayment');
      }
    });
  }

  getGSTNPaymentRequest() {
    var param = this.loginService.getGSTNPaymentReqCall();
    this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_GSTNPAYMENTREQUEST).subscribe(data => {
      console.log(data);
      if(data.responseParameter){
        // this.DataService.gstnPaymentDetails  = JSON.parse('{"' + data.responseParameter.response.replace(/&/g, '","').replace(/=/g,'":"') + '"}', function(key, value) { return key===""?value:decodeURIComponent(value) })
        this.DataService.gstnPaymentDetails  = JSON.parse(data.responseParameter.response);
        console.log('gstnPaymentDetails: ', this.DataService.gstnPaymentDetails);
        this.goToPage('gstnPayment');
      }
    });
  }

  /**
   * function to called on unsuccessfull responce
   * @subActionId
   * @resp
   */
   errorCallBack(resp) {
    this.retailLoginForm.reset();
    this.loginForm.reset();
   // this.errorCallBack(data.subActionId, resp);
    this.incorrectLogin = true;
    //console.log(this.storage.getLocalStorage("logAttempt"));
    var attempNo = Number(this.storage.getLocalStorage("logAttempt"));
    //attempNo = Number(attempNo);
    console.log(attempNo);
    //console.log(attempNo + 1);
    // var newNo:number;
    var newNo = attempNo + 1;
    console.log(newNo);
    this.storage.setLocalStorage("logAttempt", JSON.stringify(newNo));
    this.loginAttemptCount = JSON.parse(this.storage.getLocalStorage("logAttempt"));
    console.log(this.loginAttemptCount);
    this.attempRemaining = 3 - this.loginAttemptCount;
    console.log(this.attempRemaining);
    if(this.loginAttemptCount >= 3){
      this.storage.setLocalStorage("attemptedDateTime", JSON.stringify(new Date()));
      var diff = this.calculateDiff();
      console.log(diff);
      if(diff == 0){
        this.warningResp = 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours';
        //sshowToast( 'Your account is locked because you have exceeded maximum number of invalid log in attempts. Please try logging in after 24 hours', 'error2', true );
      }else{

        this.storage.removeFromLocalStorage("logAttempt");
        this.storage.removeFromLocalStorage("attemptedDateTime");
        //this.submitDisabled = false;
      }
    }

    this.information = resp.Result;
    this.commonMethod.openPopup('div.popup-bottom.show-common-info-login');
  }

  calculateDiff(){
    var data = JSON.parse(this.storage.getLocalStorage("attemptedDateTime"));
    let date = new Date(data);
    //let date = new Date("Thu Aug 04 2021 10:25:10 GMT+0530 (India Standard Time)");
    let currentDate = new Date();
    //let currentDate = new Date("Thu Aug 05 2021 10:24:10 GMT+0530 (India Standard Time)");
    let days = Math.floor((currentDate.getTime() - date.getTime()) / 1000 / 60 / 60 / 24);
    return days;
  }


  loginTypeSelection(){
    if(this.psbLoginType == 'retailBanking'){
      this.retailLoginForm.reset();
    }
    else{
      this.loginForm.reset() ;
    }
  }

  closePopup(popUp){
    this.commonMethod.closePopup(popUp)
  }

  testEncrypt(){
   var test= 'STATUS=00|PRN= BAJAJ1010101010|NAR=NA|BID=1234567|AMT=2.00|Accountnumber=123456789|Checksum=10293054';
   console.log('testEncrypt ', this.encryptDecryptService.createSHA256Value(test));
  }


  onCancelPayment(){
    if(this.DataService.routeParam != 'oltasData' && this.DataService.routeParam != 'GSTN') {
      this.getCancelPgPayment();
    }
    else {
      console.log("onCancelPayment");
      window.history.back();
    }
  }

  getCancelPgPayment(){
    var param = this.loginService.getCancelPgPaymentCall();
    this.http.callBankingAPIService(param, this.constant.deviceID, this.constant.serviceName_CANCELPGPAYMENTREQUEST).subscribe(data => {
      console.log(data);
      if(data.responseParameter){
        var returnUrl = data.responseParameter.returnUrl
        console.log('Return url: ', returnUrl);
        window.open(returnUrl,"_self")
      }
    });
  }

  callTest(){
    var tracesForm = document.createElement("form");
    tracesForm.setAttribute("method", "post");
    tracesForm.setAttribute("action", ' http://127.0.0.1:3000');
    tracesForm.setAttribute("name", '');
    tracesForm.setAttribute("target", 'test');

    var hiddenField = document.createElement("input");
    hiddenField.setAttribute("type", "hidden");
    hiddenField.setAttribute("name", "data");
    hiddenField.setAttribute("value", decodeURIComponent('oltasForm=281&oltasData=ufX3yftueh35Mpy1dILGIFrqODLwKC0dFDHCTTkiz23B9Crsa21HLJ4V9QL57EVXxuR%2Fej0KEbtBYAK8KWf%2FZCS0ztGSEJ4cg6HTtY3frpUwVYM8JnFrUn0TLmTl9pGSHPCcEaG9He0FrOPI4UdXEwTElQPdNVliM5TJmxNFoBdCDAaJMKeE%207Rt%20ghX1%2Fx2vRlYN3wsINFedGft7ZrMYzp2wO2weS2RQc3SQlmoLSI1mykkm1d7XSveVABTZqyuju%2F%2FMBaVdbkbn83XZ0CGhXtFR5EgZUgdJqU2WHh0OQZXfwRI7vMRVE9vJbpjSewjKmzg%2FSRbIvIynKUWaZ1wVjashOa39LUMiQGeXiJzzjwu4mBCoYx8hje1Mv99lpYqS7L0qGtA8n%2FDv2%2FiqwWGL5NuhLXeiSkZ4snioEZCwJ90d1fLsBMFWBueV%2FyCQiXYJdIkV%2F2Rl7lYrk0Rc7AKygpPihNfCWIlf4QvcUVg73XshBDE0KypOxJar%2FYt2oDb%2FEIY6MuPDhUYu4HoZPa7mg%3D%3D'));
    tracesForm.appendChild(hiddenField);
    document.body.appendChild(tracesForm);
    var map = window.open('', 'test');
    if (map) {
      tracesForm.submit();
    } else {
      console.log('Form is null');
    }
  }


  openExtraPopup(e){
    switch(e){
      case 'guidelines':
        this.commonMethod.openPopup('div.guidelines-popup') ;
      break ;

      case 'termsCondition' :
        this.commonMethod.openPopup('div.terms-conditions-popup')
        break;

      case 'disclaimer' :
        this.commonMethod.openPopup('div.disclaimer-popup')
        break;

        case 'privacyPolicy' :
          this.commonMethod.openPopup('div.privacy-popup')
          break;
    }
  }

  clossGuidelinesPopup(){
    this.commonMethod.closeAllPopup() ;
  }

  closeAllPopup() {
    this.commonMethod.closeAllPopup();
  }

}
