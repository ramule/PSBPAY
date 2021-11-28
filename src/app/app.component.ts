import { PlatformLocation } from '@angular/common';
import { Component, NgZone, OnInit } from '@angular/core';
import { Router, RoutesRecognized, ActivatedRoute } from '@angular/router';
import { filter, pairwise } from 'rxjs/operators';
import { AppConstants } from './app.constant';
import { DataService } from './services/data.service';
import { LocalStorageService } from './services/local-storage.service';
import { CommonMethods } from './utilities/common-methods';
declare var window: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'aggregator';
  previousUrl = [];

  constructor(
    private router : Router,
    private commonMethod: CommonMethods,
    private dataService : DataService,
    private activateRoute : ActivatedRoute,
    private ngZone: NgZone,
    location: PlatformLocation
    ){
      location.onPopState(() => {
        this.dataService.routeParam = "";
        this.dataService.merchantName = "";
        this.dataService.refNo = "";
      });
    }

  ngOnInit(){
    var self = this;
    self.getActivatedRoute();
    self.getEncryptParam();
    self.checkEvt();
    window.onhashchange = function () {
      // if (self.router.url != '/login') {
      //   self.sessionTimeout();
      // }
      self.sessionTimeout();
    }
  }

  handleBrowserBackEvent() {

  }

  sessionTimeout() {
    this.ngZone.run(() => {
      this.router.navigate(['/sessionTimeout'], { replaceUrl: true });
    });
  }

  /**
   * get Activated Routes
   */
   getActivatedRoute() {
    try{
    this.router.events
      .pipe(filter((evt: any) => evt instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log("EVENTS => ");
        console.log(events);
        this.commonMethod.closeAllPopup();
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);

        if(events[1].urlAfterRedirects != "/receipt"){
          this.dataService.previousPageUrl = events[0].urlAfterRedirects.substring(1, events[0].urlAfterRedirects.length);
          this.dataService.currentPageUrl = events[1].urlAfterRedirects.substring(1, events[1].urlAfterRedirects.length);
        }

        if (events[1].urlAfterRedirects == "/login") {
          this.previousUrl = [];
        }
      });
    }
    catch(e){
      console.log(e);
    }
  }

  getEncryptParam(){
    try{
      this.activateRoute.queryParams
      .subscribe(params => {
        console.log(params);
        // if(params.hasOwnProperty("encData")) {
        //   this.dataService.routeParam = "encData";
        //   this.dataService.encryptParam = ""+params.encData;
        //   this.dataService.encryptParam = this.dataService.encryptParam.split(' ').join("+");
        //   console.log(this.dataService.encryptParam);
        // } else if(params.hasOwnProperty("oltasData")) {
        //   this.dataService.routeParam = "oltasData";
        //   this.dataService.encryptParam = ""+params.oltasData;
        //   this.dataService.oltasForm = params.oltasForm;
        //   this.dataService.encryptParam = this.dataService.encryptParam.split(' ').join("+");
        //   console.log(this.dataService.encryptParam);
        // }

        if(params.hasOwnProperty("MerchantName")) {
          this.dataService.routeParam = params.MerchantName;
          this.dataService.merchantName = ""+params.MerchantName;
          this.dataService.refNo = ""+params.refNo;
          console.log('merchantName: ', this.dataService.merchantName);
          console.log('refNo: ', this.dataService.refNo);
        }
        else if(params.hasOwnProperty("oltasData")) {
          this.dataService.routeParam = "oltasData";

          /* Below code is when OLTAS sends encrypted data and after login we need to send oltasForm & oltasData to PaymentAggregator/OLTASGETPARAMS API after login */
          // this.dataService.encryptParam = ""+params.oltasData;
          // this.dataService.oltasForm = params.oltasForm;
          // this.dataService.encryptParam = this.dataService.encryptParam.split(' ').join("+");
          // console.log(this.dataService.encryptParam);

          /* Below code is when OLTAS sends decrypted data and we directly patch those values to OLTAS form */
          this.dataService.challanTaxDetails = params;
          this.dataService.oltasForm = params.oltasForm;
          console.log('oltasForm: ', this.dataService.oltasForm);
        }
      }
    );
    }
    catch(e){
      console.log(e);
    }
  }

  checkEvt() {
    var evTypep = window.performance.getEntriesByType("navigation")[0].type;
    console.log(evTypep);
    if (evTypep == 'reload') {
      this.router.navigateByUrl('/sessionTimeout');
      this.dataService.timeoutHeader = "Session Expired"
      this.dataService.timeoutMsg = "You are not allowed to refresh or use browser navgation key after login"
    }
  }
}
