import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GstnPaymentSuccessService {

  constructor(
    private constant: AppConstants,
    private localStorage: LocalStorageService,
    private dataService: DataService,
    private encryptDecryptService: EncryptDecryptService
  ) { }

  getGSTNPaymentReqCall(gstnPaymentDetails) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage('deviceId'),
      [this.constant.key_challanno]: gstnPaymentDetails.cpin,
      [this.constant.key_refNo]: this.dataService.referenceNo, // ref number from response of GSTNTRANSFERTRANSACTION
      [this.constant.key_UserID]: this.dataService.userId
    }
    console.log(JSON.stringify(inputData));

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
