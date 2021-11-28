import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { ChallanTaxPaymentService } from '../../challan-payment/challan-tax-payment/challan-tax-payment.service';
import { GstnPaymentService } from './gstn-payment.service';
declare var showToastMessage: any;

@Component({
  selector: 'app-gstn-payment',
  templateUrl: './gstn-payment.component.html',
  styleUrls: ['./gstn-payment.component.scss']
})
export class GstnPaymentComponent implements OnInit {

  gstnPaymentDetails: any;
  selectedAccount: any;
  accBalance: any;
  gstnPaymentForm : FormGroup ;
  accountList =[];
  accountValue : any = '';
  refreshedTime: any;
  todayDate: any;
  isInsufficientBalance: boolean = false;

  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private location: Location,
    private datepipe: DatePipe,
    private challanTaxPaymentService: ChallanTaxPaymentService,
    private gstnPaymentService: GstnPaymentService
  ) { }

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  ngOnInit(): void {
    this.buildForm();

    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.todayDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.gstnPaymentDetails = this.DataService.gstnPaymentDetails;
    console.log('Challan Tax Payment Details: ', this.gstnPaymentDetails);
    this.DataService.changeMessage(this.commonPageComponent);
    this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
    this.gstnPaymentForm.patchValue({
      igstAmt: this.gstnPaymentDetails.igst_amt,
      cessAmt: this.gstnPaymentDetails.cess_amt,
      cgstAccCode: this.gstnPaymentDetails.cgst_acc_code,
      sgstAccCode: this.gstnPaymentDetails.sgst_acc_code,
      challanExpDate: this.gstnPaymentDetails.chln_exp_dt,
      sgstAmt: '₹ '+ this.gstnPaymentDetails.sgst_amt,
      gstin: this.gstnPaymentDetails.gstin,
      cgstAmt: '₹ '+ this.gstnPaymentDetails.cgst_amt,
      totalAmt: '₹ '+ this.gstnPaymentDetails.total_amt,
      cessAccCode: this.gstnPaymentDetails.cess_acc_code,
      txnId: this.gstnPaymentDetails.txnid,
      igstAccCode: this.gstnPaymentDetails.igst_acc_code,
      cpin: this.gstnPaymentDetails.cpin,
      paymentDate: this.gstnPaymentDetails.request_tim
    });

    this.accountList = this.DataService.customerOperativeAccList;
    console.log('account list: ', this.accountList);

    if(this.accountList.length != 0){
      setTimeout(() => {
        this.selectedAccount = this.accountList[0].accountNo;
        this.accBalance = this.accountList[0].acctBalance;
      });
      this.getAccountBalance(this.accountList[0].accountNo)
    }
  }

  buildForm(){
    this.gstnPaymentForm = new FormGroup({
      igstAmt: new FormControl(''),
      cessAmt: new FormControl(''),
      cgstAccCode: new FormControl(''),
      sgstAccCode: new FormControl(''),
      challanExpDate: new FormControl(''),
      sgstAmt: new FormControl(''),
      gstin: new FormControl(''),
      cgstAmt: new FormControl(''),
      totalAmt: new FormControl(''),
      cessAccCode: new FormControl(''),
      txnId: new FormControl(''),
      igstAccCode: new FormControl(''),
      cpin: new FormControl(''),
      paymentDate: new FormControl('')
    });
  }

  onFromAccountSelect(event) {
    console.log("onFromAccountSelect", event);
    this.selectedAccount = event;
    console.log(this.selectedAccount);
    this.getAccountBalance(event);
  }

  /**
   * This function is use to call api to fetch
   * accounts balance
   */
   getAccountBalance(selectedAccount , isrefresh?) {
    if(selectedAccount=="") {
      showToastMessage("Please select account")
      return;
    }

    if(isrefresh == 'refresh'){
     var param = this.challanTaxPaymentService.getAccountBalanceParam(selectedAccount);
     this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
       console.log(data);
       var resp = data.responseParameter
       if (resp.opstatus == "00") {
         this.accBalance = data.set.records[0].ledgerBalance
         this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
         console.log('Account Balance: ', Number(this.accBalance));
         console.log('Total Amount: ', Number(this.DataService.gstnPaymentDetails.total_amt));
         if(Number(this.accBalance) < Number(this.DataService.gstnPaymentDetails.total_amt)) {
           this.isInsufficientBalance = true;
         }
         else {
          this.isInsufficientBalance = false;
         }
       }
     })
    } else{

     var param = this.challanTaxPaymentService.getAccountBalanceParam(selectedAccount);
     this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
       console.log(data);
       var resp = data.responseParameter
       if (resp.opstatus == "00") {
         this.accBalance = data.set.records[0].ledgerBalance
         this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
         console.log('Account Balance: ', Number(this.accBalance));
         console.log('Total Amount: ', Number(this.DataService.gstnPaymentDetails.total_amt));
         if(Number(this.accBalance) < Number(this.DataService.gstnPaymentDetails.total_amt)) {
          this.isInsufficientBalance = true;
        }
        else {
         this.isInsufficientBalance = false;
        }
       }
     })
    }
  }

  onAccountSelectType() {
    if(window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(accountType, accountNo){
    this.accountValue = accountType.concat(" ", accountNo);
   }

  closePopup(){
    this.commonMethod.closeAllPopup();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  challanTaxPaymentSubmit(){
    if(this.gstnPaymentForm.valid && !this.isInsufficientBalance){
      this.DataService.gstnSelectedAccount = this.selectedAccount;
      var param = this.gstnPaymentService.gstnTransferTransaction(this.gstnPaymentForm.value, this.gstnPaymentDetails ,this.selectedAccount);
      this.DataService.request = param;
      this.DataService.endPoint = this.constant.serviceName_GSTNTRANSFERTRANSACTION;
      this.router.navigateByUrl('/gstnPaymentOverview');
    }
  }

  onCancel() {
    this.location.back();
  }

}
