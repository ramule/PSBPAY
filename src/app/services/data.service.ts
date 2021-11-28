import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Location, TitleCasePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  disableBack = false;
  isLoginVirtual: boolean = true;
  constructor(private location: Location) {}

  public latitude = null;
  public longitude = null;
  ipAddress = "";
  isCordovaAvailable = window.hasOwnProperty('cordova');
  public componentchange: any = [];
  informationLabel = "";
  informationDetails = "";
  currentLat:any;
  currentLng:any;
  isLatLongFetched = false;
  primaryAccountDtl:any;
  LoginForm: any;
  lastLoginDate:number;
  otplength:any;
  dateFormat:any="";
  amountFormat:any = "";
  mobStaticEncKey: any;
  customerAccountList = [];
  isOmniLogin = false;
  userId:any = "";
  onRefreshDate : Date;
  loginType: any;
  psbLoginType:any;
  merchantDtls:any;
  userDetails: any;
  referenceNo: any;
  ominiChannelParam: any = {};
  endPoint="";
  customerCanTransferAccountList = [];
  customerLoanAccountList = [];
  customerMyDepostie = [];
  customerBorrowingsList = [];
  standingInstructionParam:any;
  customerOperativeAccList = [];
  challanTaxPaymentObj: any;
  loginData = {
    "mobnumber": null,
    "tab": 'user'
  }
  totalMyDepositBalance = 0;
  totalMyBorrowingsBalance = 0;
  totalMyOperativeBalance = 0;
  public subject = new Subject<any>();
  private messageSource = new BehaviorSubject(this.componentchange);
  currentMessage = this.messageSource.asObservable();
  paymentDetails:any={};
  previousPageUrl="";
  currentPageUrl="";
  encryptParam="";
  routeParam = "";
  request: any;
  receiptType: any = '';
  receiptmsg:any= "";
  receipdRefID:any = "";
  otpValue ="";
  oltasForm = "";
  timeFormat = "h:mm:ss a";
  aggregatorDetails:any={};
  challanTaxDetails: any = {};
  challanTaxOverviewDetails: any = {};
  aggregatorHref:any;
  merchantName: any;
  timeoutHeader: any = "";
  timeoutMsg: any = "";
  gstnPaymentDetails: any = {};
  gstnSelectedAccount: any = "";
  refNo: any;
  isOTPMaxAttempts = false;
  isReceivedAccMatched: boolean = false;
  changeMessage(message: any) {
    this.messageSource.next(message);
  }

  getAccountCarouselOptions() {
    let accountCarouselOptions: OwlOptions = {
      margin: 10,
      nav: true,
      autoplay: false,
      autoplayTimeout: 3000,
      loop: false,
      rewind: true,
      autoWidth:true,
      responsive: {
        0: {
          items: 1,
          nav: false,
        },
        600: {
          items: 1,
          nav: false,
        },
        768: {
          items: 2,
          nav: false,
        },
        1024: {
          items: 2,
          nav: false,
        },
        1366: {
          items: 2,
          nav: false,
        },
        1600: {
          items: 3,
          nav: false,
        },
      },
    };
    return accountCarouselOptions;
  }

  getCustomizeMenuCarouselOptions() {
    let customizeListCarouselOptions = {
      autoWidth: true,
      loop: false,
      nav: true,
      merge: true,
      dots: false,
      autoplay: true,
      responsive: {
        0: {
          items: 3,
          nav: false,
        },
        600: {
          items: 4,
          nav: false,
        },
        1024: {
          items: 4,
          nav: false,
        },
        1200: {
          items: 4,
          nav: false,
        },
        1366: {
          items: 5,
          nav: false,
        },
        1400: {
          items: 5,
          nav: false,
        },
        1600: {
          items: 6,
          nav: false,
        },
      },
    };
    return customizeListCarouselOptions;
  }

  getCustomizeMenuListCarouselOptions() {
    let customizeMenuCarouselOptions = {
      autoplay: false,
      autoplayTimeout: 3000,
      loop: false,
      autoWidth: true,
      rewind: true,
      nav: false,
      dots: false,
      responsive: {
        0: {
          items: 3,
          nav: true,
        },
        480: {
          items: 3,
          nav: true,
        },
        640: {
          items: 4,
          nav: true,
        },
        768: {
          items: 5,
          nav: true,
        },
        1024: {
          items: 4,
          nav: true,
        },
        1200: {
          items: 4,
          nav: true,
        },
        1366: {
          items: 5,
          nav: true,
        },
        1400: {
          items: 5,
          nav: true,
        },
        1600: {
          items: 6,
          nav: true,
        },
      },
    };
    return customizeMenuCarouselOptions;
  }

  getCustomizeInvestCarouselOptions(){
    let customizeInvestCarouselOptions = {
        autoWidth: false,
        loop: false,
        nav: false,
        merge: true,
        dots: true,
        autoplay: false,
        items: 3

      }
    return customizeInvestCarouselOptions;
  }

  getrecommendedCardCarouselOptions() {
    let recommendedCardCarouselOptions = {
      autoWidth: false,
      loop: false,
      nav: false,
      merge: true,
      dots: true,
      autoplay: false,
      items: 1
    }
    return recommendedCardCarouselOptions;
  }

  getContactListColour(contactListData: any) {
    let tempList = contactListData;
    let counter = 1;
    for (let i = 0; i < tempList.length; i++) {
      if (counter == 1) {
        tempList[i]['color'] = 'green1';
        counter++;
      } else if (counter == 2) {
        tempList[i]['color'] = 'greenlight';
        counter++;
      } else if (counter == 3) {
        tempList[i]['color'] = 'grey1';
        counter++;
      } else if (counter == 4) {
        tempList[i]['color'] = 'yellow';
        counter = 1;
      }
    }
    contactListData = tempList;

    return contactListData;
  }

  getContactListColourNext(contactListData: any) {
    let tempList = contactListData;
    let counter = 1;
    for (let i = 0; i < tempList.length; i++) {
      if (counter == 1) {
        tempList[i]['color'] = 'blue';
        counter++;
      } else if (counter == 2) {
        tempList[i]['color'] = 'red';
        counter++;
      } else if (counter == 3) {
        tempList[i]['color'] = 'yellow';
        counter++;
      } else if (counter == 4) {
        tempList[i]['color'] = 'greenlight';
        counter = 1;
      }
    }
    contactListData = tempList;

    return contactListData;
  }

  getCurrentLatLong(): Observable<any> {
    var subject = new Subject<any>();
    let myObj = this;
    navigator.geolocation.getCurrentPosition(success, failure, { enableHighAccuracy: true })
    let self = this;
    function success(position:any) {
      console.log('MY CURRENT position', position);
      self.currentLat = position.coords.latitude;
      self.currentLng = position.coords.longitude;
      myObj.latitude = position.coords.latitude;
      myObj.longitude = position.coords.longitude;
      myObj.isLatLongFetched = true;
      console.log("location lat long " + myObj.latitude + ":::" + myObj.longitude);
      subject.next(true);
      subject.complete();
    }

    function failure(error:any) {
      console.log('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
      subject.next(false);
      subject.complete();
    }

    return subject.asObservable();
  }

  //otp and tpin screen
  getOnKeyUpEvent(index, event, type, otpRows, formValue, otpValue) {
    const eventCode = event.which || event.keyCode;

    if (this.getSpasswordElement(index, type, otpRows).value.length === 1) {
      if (index !== 6) {
        this.getSpasswordElement(index + 1, type, otpRows).focus();
      } else {
        this.getSpasswordElement(index, type, otpRows).blur();
        // Submit code
        console.log('submit code ');
      }
    }
    if (eventCode === 12 && index !== 1) {
      this.getSpasswordElement(index - 1, type, otpRows).focus();
    }


    if (eventCode === 8 || eventCode === 229) {
      if (event.key != "Unidentified") {
        if (type == 'otp' || type== 'tpin') {
          formValue.get(otpValue[index])?.setValue("");
        }
        this.getSpasswordElement(index - 1, type, otpRows).focus();
      }
    }

  }

  onFocusEvent(index: any, type: any, otpRows: any) {

    for (let item = 1; item < index; item++) {
      const currentElement = this.getSpasswordElement(item, type, otpRows);
      if (!currentElement.value) {
        currentElement.focus();
        break;
      }
    }
  }

  getSpasswordElement(index: any, type: any, otpRows: any) {
    if (type == 'otp' || type == 'tpin') {
      return otpRows._results[index].nativeElement;
    }
  }


  setOmniChannelReqParam(key, param) {
    this.ominiChannelParam[key] = param;
  }

  getOmniChannelReqParam(key) {
    return this.ominiChannelParam[key];
  }

}


