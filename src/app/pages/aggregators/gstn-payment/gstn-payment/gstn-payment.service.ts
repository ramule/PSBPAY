import { Injectable } from '@angular/core';
import { AppConstants } from 'src/app/app.constant';
import { DataService } from 'src/app/services/data.service';
import { EncryptDecryptService } from 'src/app/services/encrypt-decrypt.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class GstnPaymentService {

  constructor(
    private constant: AppConstants,
    private dataService: DataService,
    private localStorage: LocalStorageService,
    private encryptDecryptService: EncryptDecryptService,
  ) { }

  gstnTransferTransaction(formData, gstnPaymentDetails, accountNo) {
    var inputData = {
      [this.constant.key_entityId]: this.constant.getEntityId(),
      [this.constant.key_deviceId]: this.localStorage.getLocalStorage('deviceId'),
      [this.constant.key_donationId]: "1",
      [this.constant.key_challanno]: gstnPaymentDetails.cpin,
      [this.constant.key_txnId]: formData.txnId,
      [this.constant.key_accountNo]: accountNo,
      [this.constant.key_remarks]: this.dataService.routeParam,
      [this.constant.key_amount]: gstnPaymentDetails.total_amt.trim().replace(/[^0-9]+/g, ''),
      [this.constant.key_UserID]: this.dataService.userId,
    }

    let encryptData = this.encryptDecryptService.encryptText(this.localStorage.getSessionStorage(this.constant.val_sessionKey), JSON.stringify(inputData));
    return encryptData;
  }
}
