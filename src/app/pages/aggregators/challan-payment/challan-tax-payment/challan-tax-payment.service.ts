import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class ChallanTaxPaymentService {

  constructor(
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods,
    private encryptDecryptService: EncryptDecryptService,
  ) { }

  getAccountBalanceParam(selectAccount)
  {
    console.log(selectAccount)
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_MobileNo_Org]: this.localStorage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_referenceNumber]:this.commonMethod.genRandomDigit(9),
      [this.constant.key_branchCode]: "0181",
      [this.constant.key_accountNo]:selectAccount,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),

    }
    console.log("Get Balance params =====>" + JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  oltasTransferTransactionCall(challanTaxPaymentForm, challanTaxDetails, selectedAccount, accBalance) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage('deviceId'),
      [this.constant.key_banknameurl]: challanTaxDetails.BankNameURL,
      [this.constant.key_majorhead]: challanTaxPaymentForm.majorHead,
      [this.constant.key_radioindex]: challanTaxDetails.radioIndex,
      [this.constant.key_bankurl]: challanTaxDetails.BankURL,
      [this.constant.key_custname]: challanTaxPaymentForm.fullName,
      [this.constant.key_transactiondate]: challanTaxDetails.TransactionDate,
      [this.constant.key_add_state]: challanTaxPaymentForm.state,
      [this.constant.key_bankname_c]: challanTaxDetails.BankName_c,
      [this.constant.key_add_line1]: challanTaxPaymentForm.address1,
      [this.constant.key_add_line2]: challanTaxPaymentForm.address2,
      [this.constant.key_add_line3]: challanTaxPaymentForm.address3,
      [this.constant.key_add_line4]: challanTaxPaymentForm.address4,
      [this.constant.key_add_line5]: challanTaxPaymentForm.address5,
      [this.constant.key_zaocode]: challanTaxDetails.ZAOCODE,
      [this.constant.key_valid]: challanTaxDetails.valid,
      [this.constant.key_financialyear]: challanTaxPaymentForm.assestmentYear,
      [this.constant.key_pan]: challanTaxPaymentForm.pan,
      [this.constant.key_challanno]: challanTaxDetails.ChallanNo,
      [this.constant.key_minorhead]: challanTaxPaymentForm.minorHead,
      [this.constant.key_add_pin]: challanTaxPaymentForm.pin,
      [this.constant.key_minorindex]: challanTaxDetails.MinorIndex,
      [this.constant.key_r2]: challanTaxDetails.R2,
      [this.constant.key_flag_var]: challanTaxDetails.flag_var,
      [this.constant.key_UserID]: this.dataService.userId,
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_accountNo]: selectedAccount,
      [this.constant.key_remarks]: challanTaxPaymentForm.remark,
      [this.constant.key_amount]: Math.round(challanTaxPaymentForm.totalAmount.replace(/[^.0-9]+/g, '')),
      [this.constant.key_basicTax]: challanTaxPaymentForm.incomeTax == "" ? '0' : Math.round(challanTaxPaymentForm.incomeTax.replace(/[^.0-9]+/g, '')) ,
      [this.constant.key_educess]: challanTaxPaymentForm.educationCess == "" ? '0' : Math.round(challanTaxPaymentForm.educationCess.replace(/[^.0-9]+/g, '')) ,
      [this.constant.key_surcharge]: challanTaxPaymentForm.surcharge == "" ? '0' : Math.round(challanTaxPaymentForm.surcharge.replace(/[^.0-9]+/g, '')) ,
      [this.constant.key_paymentcode1]: "",
      [this.constant.key_paymentcode2]: "",
      [this.constant.key_paymentcode3]: "",
      [this.constant.key_interest]: challanTaxPaymentForm.interest == "" ? '0' : Math.round(challanTaxPaymentForm.interest.replace(/[^.0-9]+/g, '')) ,
      [this.constant.key_penalty]: challanTaxPaymentForm.penalty == "" ? '0' : Math.round(challanTaxPaymentForm.penalty.replace(/[^.0-9]+/g, '')) ,
      [this.constant.key_Other]: challanTaxPaymentForm.other == "" ? '0' : Math.round(challanTaxPaymentForm.other.replace(/[^.0-9]+/g, '')) ,
      [this.constant.key_fee234e]: "00",
      [this.constant.key_fee26qb]: "00",
      [this.constant.key_totalamt]: Math.round(challanTaxPaymentForm.totalAmount.replace(/[^.0-9]+/g, '')),
      [this.constant.key_scrollno]: "",
      [this.constant.key_paymentMode]: "",
      [this.constant.key_chqcreditdate]: "",
      [this.constant.key_brscrolldate]: "",
      [this.constant.key_nodalscrollno]: "",
      [this.constant.key_nodalscrolldt]: "",
    }

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
