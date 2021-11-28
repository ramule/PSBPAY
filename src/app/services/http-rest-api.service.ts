import { Injectable, Injector, NgZone } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';
import { CommonMethods } from '../utilities/common-methods';
import { AppConstants } from '../app.constant';
import { LocalStorageService } from './local-storage.service';
import { IRequest, IStatus } from '../utilities/app-interface';
//import { pageLoaderService } from './pageloader.service';
import { Router } from '@angular/router';
import { DataService } from './data.service';
//import { PluginService } from './plugin-service';
import { EncryptDecryptService } from './encrypt-decrypt.service';
import { TranslatePipe } from '../pipes/translate.pipe'
import { pageLoaderService } from './pageloader.service';

declare var showToastMessage: any;


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class HttpRestApiService {

  STATUS: IStatus;
  constructor(
    private http: HttpClient,
    private commonMethod: CommonMethods,
    private constants: AppConstants,
    private storage: LocalStorageService,
    private ngZone: NgZone,
    //private loader: pageLoaderService,
    private router: Router,
    private dataService: DataService,
    private encryptDecryptService: EncryptDecryptService,
    private injector: Injector,
    private loader: pageLoaderService
    //private plugin: PluginService,
  )
  {
    this.STATUS = this.constants.Status
  }

  /**
   * This function is invoked whenever api call is made
   * @param endpoint
   * @param request
   */
   apiCall(endpoint: string, request: any): Promise<any> {
    this.loader.showLoader();
    /**** request Param ***/
    var timeOut = 20000;
    // var timeOut = endpoint == this.constants.upiserviceName_CHECKSIMBINDINGSTATUS ? 80000 : 200000;
    var url;
    url = this.constants.publicURL.serviceURL;
    return this.http.post(`${url}${endpoint}`, JSON.stringify(request), httpOptions).pipe(
      timeout(timeOut),
      catchError(this.handleError<any>(endpoint))
    ).toPromise()
      .then((response) => {
        return new Promise((resolve, reject) => {
          resolve(response);
        });
      });
  }

  /**
   * This function is invoked whenever api call is made
   * @param endpoint
   * @param request
   */
   callBankingAPIService( request: any, deviceId: any, endpoint: any): Observable<any> {
    let connectionStatus = navigator.onLine ? 'online' : 'offline';
    var self = this;
    var subject = new Subject<any>();

    const requestObj: IRequest = <IRequest>{
      sourceIp: self.dataService.ipAddress,
      prefered_Language: self.storage.hasKeyLocalStorage(self.constants.storage_language) ? self.storage.getLocalStorage(self.constants.storage_language) : self.constants.val_default_lang,
      entityId: self.constants.getEntityId(),
      deviceId: deviceId,
      map: request
    };
    console.log('HTTPSERVICE => requestObj==== ', JSON.stringify(requestObj));

    if (connectionStatus == 'online') {
      this.apiCall(endpoint, requestObj).then((response) => {
        this.loader.hideLoader();
        console.log('response', JSON.stringify(response));
        if (response != undefined) {
          var decryptKey = "";

          switch (response.secType) {
            case "M":
              decryptKey = self.constants.staticKey;
              break;

            case "S":
              decryptKey = self.storage.getLocalStorage(this.constants.storage_mobileNo) + self.constants.mapEncryptKey;
              break;

            case "D":
              decryptKey = self.storage.getSessionStorage(self.constants.val_sessionKey);
              break;

            default:
              decryptKey = "";
              break;
          }

          var decryptedData = decryptKey == "" ? response : self.encryptDecryptService.decryptText(decryptKey, self.commonMethod.removeLineBreaksFromBase64(response.data));
          if (decryptKey != "") {
            var responseData = JSON.parse(decryptedData);
            for (var key in responseData) {
              response[key] = responseData[key];
            }
          }
          delete response['data'];

          console.log(endpoint + " response--->" + JSON.stringify(response));
          if (response.hasOwnProperty('responseParameter')) {
            this.ngZone.run(() => {
              if (response.responseParameter.hasOwnProperty('opstatus')) {
                if (response.responseParameter.opstatus == self.constants.InvalidSessionCode) {
                  showToastMessage(response.responseParameter.Result);
                  console.log("this.router.url", this.router.url);
                  self.router.navigateByUrl('/login');
                }
              }
            })
          }
          if (response) {
            subject.next(response);
            subject.complete();
          } else {
            subject.complete();
            // subject.unsubscribe();
          }
        }
      }, (error) => {
        subject.next({ responseParameter: { opstatus: "01" } }); self.loader.hideLoader();
        console.log('Error in httpservice ', error);
      });
    }
    else {
      subject.unsubscribe();
      this.ngZone.run(() => {
        this.dataService.informationLabel = this.injector.get(TranslatePipe).transform('INFORMATION');
        this.dataService.informationDetails = this.injector.get(TranslatePipe).transform('NO_INTERNET_CONNECTION');
        this.commonMethod.openPopup('div.popup-bottom.network-info')
      });
    }
    return subject.asObservable();
  }


  /**
   * This is the main function which is invoked for api call's
   * @param request
   * @param deviceId
   * @param endpoint
   */



  /**
   * For handling http error this function is invoked
   * @param operation
   * @param result
   */
   private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      this.loader.hideLoader();
      // TODO: send the error to remote logging infrastructure
      console.error('Error in http-rest-api ===> ', error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      switch (error.status) {
        case this.STATUS.ERR_CODE_SERVER_UNAVAILABLE:
          console.log(this.constants.SERVICE_UNAVAILABLE_MSG);
          break;
        case this.STATUS.ERR_CODE_TIMEOUT:
          console.log(this.constants.SERVICE_TIMEOUT_MSG);
          break;
        //don't add toast msg from here
        case this.STATUS.ERR_CODE_SERVER_ERROR:
          console.log(this.constants.SERVICE_SERVER_ERROR_MSG);
          break;
        case this.STATUS.ERR_CODE_BAD_REQUEST:
          console.log(this.constants.SERVICE_BAD_REQ_MSG);
          break;
        case this.STATUS.ERR_CODE_UNAUTHORIZED:
          console.log(this.constants.SERVICE_UNAUTHORIZED_MSG);
          break;
        case this.STATUS.ERR_CODE_NOT_FOUND:
          console.log(this.constants.SERVICE_NOT_FOUND_MSG);
          break;
        case this.STATUS.ERR_CODE_METHOD_NOT_ALLOWED:
          console.log(this.constants.SERVICE_METHOD_NOT_ALLOWED_MSG);
          break;
        case this.STATUS.ERR_CODE_UNKNOWN:
          console.log(this.constants.SERVICE_METHOD_UNKNOWN_ERR_MSG);
          break;

        default:
          break;
      }
      return of(result as T);
    };
  }

  public getIPAddress() {
    return this.http.get("http://api.ipify.org/?format=json");
  }

  /**
   *
   * fork join implementation
   */







}
