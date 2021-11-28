import { Injectable } from '@angular/core';
import { AppConstants } from '../../../../app.constant';
import { EncryptDecryptService } from '../../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../../services/local-storage.service';
import { DataService } from '../../../../services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private storage: LocalStorageService,
    public dataService: DataService,
    private commonMethod : CommonMethods,
    private datepipe : DatePipe
  ) { }

  getFundTransferParam(formData,benificiaryDtl,fromAccount,type, dynamicVal){
    console.log("<===========  getOwnFundTransferParam  ===============>");
    var _userAccountDtl = this.dataService.customerOperativeAccList.filter(obj => obj.accountNo == fromAccount);
    console.log(formData,benificiaryDtl,_userAccountDtl);
    var transactType = type;
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_deviceId]: this.storage.getLocalStorage("deviceId"),
      [this.constant.key_customerID] : benificiaryDtl?.ID,
      [this.constant.key_referenceNumber]: this.dataService.aggregatorDetails.pgRef,
      [this.constant.key_MobileNo_Org]:this.storage.getLocalStorage(this.constant.storage_mobileNo),
      [this.constant.key_debitBranchCode]: '0000',
      [this.constant.key_accountNo]: fromAccount,
      [this.constant.key_creditBranchCode]: '0000',
      [this.constant.key_toAccount]: formData.sendTo,
      [this.constant.key_donationId]: '12',
      [this.constant.key_TransactionType]: transactType,
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_RRN] : this.commonMethod.genRandomDigit(9),
      [this.constant.key_remarks] : formData.remark,
      [this.constant.key_methodName]: 'TRANSFERTRANSACTION',
      [this.constant.key_value]:dynamicVal,
      [this.constant.key_UserID]: this.dataService.userId,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_MerchantName]: this.dataService.routeParam
      // [this.constant.key_TransactionDate]: this.datepipe.transform(new Date().toISOString(), 'dd-MM-yyyy hh:mm:ss')
    }


  console.log('payment request ', JSON.stringify(inputData));

  //this.dataService.setOmniChannelReqParam(this.constant.key_omni_ownTransfer,JSON.stringify(inputData));//set omni channel req
  let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
  return encryptData;
  }


  getNEFTFundTransferParam(formData, benificiaryDtl) {
    var inputData = {};
    inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_deviceId]: this.storage.getLocalStorage("deviceId"),
      [this.constant.key_MobileNo]: this.storage.getLocalStorage("mobileNo"),
      [this.constant.key_amount]: formData.amount.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_benefName]: benificiaryDtl.benefName,
      [this.constant.key_accountno]: formData.transferFrom,
      [this.constant.key_beneficiary_account_no]: benificiaryDtl.beneficiary_account_no,
      [this.constant.key_ifsc_code]: benificiaryDtl.IFSC,
      [this.constant.key_remarks]: formData.remark != undefined || formData.remark != null ? formData.remark : ''

    }
    console.log("neft requrest=====>" + JSON.stringify(inputData));
    this.dataService.setOmniChannelReqParam(this.constant.key_omni_neftTransfer, JSON.stringify(inputData));//set omni channel req
    let encryptData = this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

   /**
   * To get send otp request this function is invoked
   * @param otpFormData
   */
    getSendOTPSessionReq(otpNo) {
      var reqObj;
      reqObj = {
        [this.constant.key_entityId]: this.constant.getEntityId(),
        [this.constant.key_cbsType]: this.constant.val_cbsTypeTcs,
        [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
        [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
        [this.constant.key_deviceId]: this.storage.getLocalStorage(this.constant.storage_deviceId),
        [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
        [this.constant.key_MobileNo]:this.storage.getLocalStorage('mobileNo'),
        [this.constant.key_OTP]: otpNo,
        [this.constant.key_latitude]: this.constant.val_latitude,
        [this.constant.key_longitude]:this.constant.val_longitude,
      }

      console.log(reqObj);
      return this.encryptDecryptService.encryptText(this.storage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(reqObj))
    }

}
