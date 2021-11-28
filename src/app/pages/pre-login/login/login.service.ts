import { Injectable } from '@angular/core';
import { AppConstants } from '../../../app.constant';
import { EncryptDecryptService } from '../../../services/encrypt-decrypt.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { DataService } from 'src/app/services/data.service';
import { CommonMethods } from 'src/app/utilities/common-methods';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private constant: AppConstants,
    private encryptDecryptService: EncryptDecryptService,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private commonMethod: CommonMethods
  ) { }

  /**
   * request parameter for language json
   */
  getLangObjectParam() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
    }

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }



  /**
   * request parameter for login general
   * @formData
   */
  //TODO:need to add current location
  getParamForLogin(formData,isCorporate?) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_loginType]: this.constant.val_loginType,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_isCorporate]:isCorporate ?  'Y': 'N',
      [this.constant.key_MobileNo]: formData.mobNumber == undefined ? "" : formData.mobNumber,
      [this.constant.key_UserID]: formData.username == undefined ? "" : formData.username.toLowerCase(),
      [this.constant.key_password]: formData.password == undefined ? "" : this.encryptDecryptService.createMD5Value(formData.password),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_omniDashData]: "000023372",//000023372 //011170631
    }
    console.log(JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;

    // let encryptData = this.encryptDecryptService.encryptText('8668557192'+this.constant.mapEncryptKey, JSON.stringify(inputData));
    // return encryptData;
  }


  getUserLoginCall(formData: any) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_cbsType]: this.constant.val_cbsType,
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_mobileAppVersion]: this.constant.val_mobileAppVersion,
      [this.constant.key_clientAppVersion]: this.constant.val_clientAppVersion,
      [this.constant.key_latitude]: this.dataService.latitude,
      [this.constant.key_longitude]: this.dataService.longitude,
      [this.constant.key_loginType]: this.constant.val_loginType,
      [this.constant.key_loginip]: this.constant.val_loginip,
      [this.constant.key_isCorporate]: this.constant.val_isCorporate,
      [this.constant.key_MobileNo]: '',
      [this.constant.key_password]: formData.password == undefined ? "" : this.encryptDecryptService.createSHA256Value(formData.password),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_omniDashData]: '000023372',
      [this.constant.key_companyCode]: formData.corporateId,
      [this.constant.key_UserID]: formData.userId == undefined ? "" : formData.userId,
    }

    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }

  getPgPaymentRequest() {
    // var inputData = {
    //   [this.constant.key_encData]: this.dataService.encryptParam,
    //   [this.constant.key_UserID]: this.dataService.userId,
    //   [this.constant.key_merchId]: this.dataService.userId,
    // }

    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage('deviceId'),
      [this.constant.key_MerchantName]: this.dataService.merchantName,
      [this.constant.key_refNo]: this.dataService.refNo,
      [this.constant.key_UserID]: this.dataService?.userId
    }

    console.log(JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getCancelPgPaymentCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.constant.deviceID,
      [this.constant.key_MerchantName]: this.dataService.merchantName,
      [this.constant.key_refNo]: this.dataService.refNo,
      [this.constant.key_trnTypr]: this.constant.val_trnTypr
    }
    console.log(JSON.stringify(inputData));
    let encryptData = this.encryptDecryptService.encryptText(this.constant.staticKey, JSON.stringify(inputData));
    return encryptData;
  }

  getOltasParamsCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_mobPlatform]: this.constant.val_mobPlatform,
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage('deviceId'),
      [this.constant.key_RRN]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_referenceNumber]: this.commonMethod.genRandomDigit(9),
      [this.constant.key_oltasData]: this.dataService.encryptParam,
      [this.constant.key_oltasForm]: this.dataService.oltasForm,
      [this.constant.key_merchId]: 'OLTAS',
      [this.constant.key_UserID]: this.dataService.userId
    }
    console.log(JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  getGSTNPaymentReqCall() {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage('deviceId'),
      [this.constant.key_MerchantName]: this.dataService.merchantName,
      [this.constant.key_refNo]: this.dataService.refNo,
      [this.constant.key_UserID]: this.dataService.userId
    }
    console.log(JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }

  encryptDataForMobile(inputData){
    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getLocalStorage('mobileStaticEncrypyKey'), JSON.stringify(inputData));
    return encryptData;
  }


}
