import { Injectable } from '@angular/core';
declare var device: any;

@Injectable()

export class AppConstants {

  /** public URL Api configuration */
  publicURL = {
    // serviceURL: 'http://172.25.1.114:8086/PNSMiddleware/rest/',
  //  serviceURL: 'http://172.20.3.30:8080/PNSMiddleware/rest/' // Nalini
    //serviceURL: 'http://172.20.2.26:8090/PNSMiddleware/rest/'    // chaitali
  // serviceURL: 'http://172.20.2.244:8080/PNSMiddleware/rest/'    //mahendra sir
  // serviceURL: 'http://172.21.1.145:8080/PNSMiddleware/rest/', // Mahendra Ackruti
  // serviceURL: 'http://172.21.1.51:8080/PNSMiddleware/rest/', // Mahendra Ackruti
  // serviceURL: 'http://172.20.3.44:8080/PNSMiddleware/rest/'    // venkat sir
  // serviceURL: 'http://172.20.3.44:8080/PNSMiddleware/rest/'    //venkat sir
    //serviceURL: 'http://14.141.164.230:9044/PSBMiddleware/rest/',
  //  serviceURL: 'https://infrabotsdev.infrasofttech.com/PNSMiddleware/rest/',
    // serviceURL: 'https://1.7.192.200:443/PNSMiddleware/rest/',
    // serviceURL : 'https://psbuatappendssl.onlinepsb.co.in/PNSMiddleware/rest/' // Secured UPI UAT
    // serviceURL : 'https://psbomnigateway.onlinepsb.co.in/PNSMiddleware/rest/' //Prod URL
    serviceURL: 'https://psbuatappendssl.onlinepsb.co.in/OMNI/rest/', //omni UAT
    // serviceURL: 'http://172.21.1.145:8080/PNSMiddleware/rest/', // Mahendra


    // serviceURL: 'https://psbdev.onlinepsb.co.in/OMNI/rest/', //  omni DEV
    //  serviceURL : 'https://psbuatappendssl.onlinepsb.co.in/OMNI/rest/' // Secured Omni uat
  };

  apiURL = this.publicURL;

  /************************************************************* Omni Constants Starts******************************************************************************/

  //CORPORATE service params keys

  // common keys
  /****************************************************************************/
  key_entityId = 'entityId';
  key_cbsType = 'cbsType';
  key_mobPlatform = 'mobPlatform';
  key_mobileAppVersion = 'mobileAppVersion';
  key_clientAppVersion = 'clientAppVer';
  key_latitude = 'latitude';
  key_longitude = 'longitute';
  /****************************************************************************/

  // corporate user login service keys
  key_loginType = 'loginType';
  key_loginip = 'loginip';
  key_isCorporate = 'isCorporate';
  key_MobileNo = 'MobileNo';
  key_password = 'password';
  key_RRN = "RRN";
  key_referenceNumber = 'referenceNumber';
  key_omniDashData = 'omniDashData';
  key_companyCode = 'companyCode';
  key_UserID = 'UserID';
  key_deviceId = 'deviceId';
  key_dataType = "dataType";
  key_requestType = "requestType";
  key_subtype = "subtype";
  key_displayName = "displayName";
  key_city = 'city';
  key_CountryCode = "COUNTRYCODE";
  key_StateId = "stateId";
  key_branchCode = "branchCode";
  key_branchID = "branchID";
  key_MobileNo_Org = "MobileNoOrg";
  key_accountno = 'accountno';
  key_accountNo = 'accountNo';
  key_omni_custAccountData = "custAccountData";
  key_omni_customerID = "customerID";
  key_panNumber = "panNumber";
  key_corpCompId = "corpCompId";
  key_corporateId = 'corporateId';
  key_companyLogo = 'companyLogo';
  key_companyId = 'companyId';
  key_tempUserName = 'tempUserName';
  key_userType = 'userType';
  key_FirstName = 'FirstName';
  key_LastName = 'LastName';
  key_email_id = 'email_id';
  key_COUNTRYNAME = 'COUNTRYNAME';
  key_workPhone = 'workPhone';
  key_state = 'state';
  key_nationid = 'nationid';
  key_passportImg = 'passportImg';
  key_resolutionoftheboard = 'resolutionoftheboard';
  key_userImg = 'userImg';
  key_incorporateCerti = 'incorporateCerti';
  key_otherDoc = 'otherDoc';
  key_passportNumber = 'passportNumber';
  key_nationalIdNumber = 'nationalIdNumber';
  key_otpCode = 'otpCode';
  key_reqData = "reqData";
  key_accountNumber = "accountNumber";
  key_service_Type = "service_Type";
  key_pendingat = "pendingat";
  key_channelAction = "channelAction";
  key_Status = 'Status';
  key_OTP = 'otpCode';
  key_omni_neftTransfer = "neftTransfer";
  key_amount = "amount";
  key_benefName = "benefName";
  key_beneficiary_account_no = "beneficiary_account_no";
  key_ifsc_code = "ifsc_code";
  key_remarks = "remarks";
  key_customerID = "customerID";
  key_debitBranchCode = "debitBranchCode";
  key_creditBranchCode = "creditBranchCode";
  key_toAccount = "toAccount";
  key_donationId = "donationId";
  key_TransactionType = "TransactionType";
  key_TransactionDate = "TransactionDate";
  key_methodName = "methodName";
  key_value = "value";
  key_encData = "encData";
  key_oltasData = "oltasData";
  key_oltasForm = "oltasForm";
  key_merchId = "merchId";
  key_banknameurl = "banknameurl";
  key_majorhead = "majorhead";
  key_radioindex = "radioindex";
  key_bankurl = "bankurl";
  key_custname = "custname";
  key_transactiondate = "transactiondate";
  key_add_state = "add_state";
  key_bankname_c = "bankname_c";
  key_add_line1 = "add_line1";
  key_add_line2 = "add_line2";
  key_add_line3 = "add_line3";
  key_add_line4 = "add_line4";
  key_add_line5 = "add_line5";
  key_zaocode = "zaocode";
  key_valid = "valid";
  key_financialyear = "financialyear";
  key_pan = "pan";
  key_challanno = "challanno";
  key_minorhead = "minorhead";
  key_add_pin = "add_pin";
  key_minorindex = "minorindex";
  key_r2 = "r2";
  key_flag_var = "flag_var";
  key_basicTax = "basicTax";
  key_educess = "educess";
  key_surcharge = "surcharge";
  key_paymentcode1 = "paymentcode1";
  key_paymentcode2 = "paymentcode2";
  key_paymentcode3 = "paymentcode3";
  key_interest = "interest";
  key_penalty = "penalty";
  key_Other = "Other";
  key_fee234e = "fee234e";
  key_fee26qb = "fee26qb";
  key_totalamt = "totalamt";
  key_scrollno = "scrollno";
  key_paymentMode = "paymentMode";
  key_chqcreditdate = "chqcreditdate";
  key_brscrolldate = "brscrolldate";
  key_nodalscrollno = "nodalscrollno";
  key_nodalscrolldt = "nodalscrolldt";
  key_MerchantName = "merchName";
  key_refNo = "referenceNumber";
  key_txnId = "txnId";
  key_trnTypr = "trnTypr";

  // CORPORATE Services endpoints

  serviceName_CORPUSERLOGIN = 'CORPLOGIN/CORPUSERLOGIN';
  serviceName_GETCONTACTUSLIST = 'PRELOGIN/GETCONTACTUSLIST';
  serviceName_CORPCUSTACCOUNTVALIDATION = "CORPREGISTRATION/CORPCUSTACCOUNTVALIDATION";
  serviceName_PANVALIDATION = 'REGISTRATION/PANVALIDATION';
  serviceName_ADDCORPORATEDETAILS = 'CORPREGISTRATION/ADDCORPORATEDETAILS';
  serviceName_CORPCHECKUSERNAME = 'CORPREGISTRATION/CORPCHECKUSERNAME';
  serviceName_CREATECORPUSER = 'CORPUSER/CREATECORPUSER';
  serviceName_CORPVALIDATEOTP = 'CORPREGISTRATION/CORPVALIDATEOTP';
  serviceName_CORPRESENDOTP = 'CORPREGISTRATION/CORPRESENDOTP';
  serviceName_LOCATEUS = "PRELOGIN/LOCATEUS";
  serviceName_VERFYCREDNTIALS = 'PRELOGIN/VERFYCREDNTIALS';
  serviceName_Login = 'LOGIN/OMNILOGIN';
  serviceName_RESENDOTPSESSION = "OTP/RESENDOTPSESSION";
  serviceName_ADDOMNICHANNELREQ = "TRANSACTION/ADDOMNICHANNELREQ";
  serviceName_NEFTFUNDTRANSFER = "TRANSACTION/NEFTFUNDTRANSFER";
  // serviceName_TRANSFERTRANSACTION="TRANSACTION/TRANSFERTRANSACTION";
  serviceName_TRANSFERTRANSACTION="PaymentAggregator/TRANSFERTRANSACTION";
  serviceName_PGPAYMENTREQUEST ="PaymentAggregator/PGPAYMENTREQUEST";
  serviceName_PGPAYMENTVERIFYREQUEST = "PaymentAggregator/PGPAYMENTVERIFYREQUEST";
  serviceName_CANCELPGPAYMENTREQUEST = "PaymentAggregator/CANCELPGPAYMENTREQUEST";
  serviceName_OLTASTRANSFERTRANSACTION = 'PaymentAggregator/OLTASTRANSFERTRANSACTION';
  serviceName_OLTASGETPARAMS = 'PaymentAggregator/OLTASGETPARAMS';
  serviceName_BALANCEINQUIRY = "TRANSACTION/BALANCEINQUIRY";

  // GSTN services
  serviceName_GSTNPAYMENTREQUEST = "PaymentAggregator/GSTNPAYMENTREQUEST";
  serviceName_GSTNTRANSFERTRANSACTION = "PaymentAggregator/GSTNTRANSFERTRANSACTION";
  serviceName_GSTNPAYMENTRESPONSE = "PaymentAggregator/GSTNPAYMENTRESPONSE";

  // Response Keys

  val_Success = "00"
  val_InvalidOTP = "01"
  val_InvalidCredentials = "02"
  val_MaxAttempts = "03"
  val_InvalidSession = "92"

  // CORPORATE constant key values

  val_entityId_RMOB = "RMOB";
  val_entityId_RIB = "RIB";
  val_entityId_CMOB = "CMOB";
  val_entityIDDesk = 'CIB';
  val_android = "android";
  val_ios = "ios";
  val_cbsType = 'flexcube';
  val_mobPlatform = 'android';
  // val_mobPlatform = 'iOS';
  val_mobileAppVersion = '0.1.0';
  val_clientAppVersion = '1.0.0';
  val_loginType = 'credentials';
  val_loginip = '115.248.230.162';
  val_isCorporate = "N";
  val_default_lang = "en";
  val_sessionKey = "sessionKey";
  InvalidSessionCode = "92";
  deviceID = "1";
  val_upi_ALL = "ALL";
  val_NEARBY = "NEARBY";
  val_upi_BRANCH ="BRANCH";
  val_upi_ATM = "ATM"
  val_upi_ZONAL = "ZONAL";
  val_upi_HO = "HO";
  val_cbsTypeTcs = 'TCS';
  val_Successful = "Successful"
  val_success = 'success';
  val_Failure = "Failure";
  val_Failed = "Failed";

  val_latitude = '19.4437422';
  val_longitude = '72.805889';
  val_methodName = 'methodName';
  val_trnTypr = 'cancel';
  // CORPORATE encryption decryption keys

  staticKey = "jrD@Mt6i#0mnip$b";
  storageEncryptKey = 'p$b@20#st0mni';
  mapEncryptKey = 'jrD@Mt6i';
  sessionEncryptKey = '0mni@P$b#2020';

  // Storage keys

  storage_language = "language";
  storage_mobileNo = "mobileNo";
  storage_deviceId = "deviceId";

  /**Below are the static messages */
  SERVICE_UNAVAILABLE_MSG = "Service unavailable. Please try after sometime.";
  SERVICE_TIMEOUT_MSG = "Unable to connect to server. Please try after sometime..";
  SERVICE_SERVER_ERROR_MSG = "Internal Server Error";
  SERVICE_UNAUTHORIZED_MSG = "Not Authorized";
  SERVICE_BAD_REQ_MSG = "Bad Request";
  SERVICE_NOT_FOUND_MSG = "Not Found";
  SERVICE_METHOD_NOT_ALLOWED_MSG = "Method not allowed";
  SERVICE_METHOD_UNKNOWN_ERR_MSG = "Unknown Error. Please try after sometime..";

  /** Below are the constants for http status success and error code */
  Status = {
    SUCCESS: 200,
    ERR_CODE_BAD_REQUEST: 401,
    ERR_CODE_UNAUTHORIZED: 401,
    ERR_CODE_FORBIDDEN: 403,
    ERR_CODE_NOT_FOUND: 404,
    ERR_CODE_METHOD_NOT_ALLOWED: 405,
    ERR_CODE_SERVER_ERROR: 500,
    ERR_CODE_SERVER_UNAVAILABLE: 503,
    ERR_CODE_TIMEOUT: 408,
    ERR_CODE_UNKNOWN: 0,
  }

  getEntityId() {
    if (window.hasOwnProperty('cordova')) {
      if (device.platform.toLowerCase() == this.val_android || device.platform.toLowerCase() == this.val_ios) {
        return this.val_entityId_RMOB;
      } else {
        return "";
      }
    } else {
      return this.val_entityId_RIB;
    }
  }
}
