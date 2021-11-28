import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe, Location, PlatformLocation } from '@angular/common';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import * as jsPDF from 'jspdf';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';

@Component({
  selector: 'app-aggre-payment-receipt',
  templateUrl: './aggre-payment-receipt.component.html',
  styleUrls: ['./aggre-payment-receipt.component.scss']
})
export class AggrePaymentReceiptComponent implements OnInit {
  payTo:any;
  status:any;
  todayDateTime:any;
  totalAccountList =[];
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethods: CommonMethods,
    private location : Location,
    private platformLocation: PlatformLocation,
    private loader : pageLoaderService,
    private datePipe : DatePipe,
    private customCurrencyPipe : CustomCurrencyPipe
  ) { }
  refTransJson: any = [
    {
      'key': 'Transaction ID',
      'value': ''
    }
  ];
  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }


  ngOnInit(): void {
    this.todayDateTime = this.datePipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.refTransJson[0].value = this.DataService.referenceNo;
    this.status = this.DataService.paymentDetails.opstatus;
    console.log(this.DataService.paymentDetails.opstatus);
    this.payTo = this.DataService.aggregatorDetails.MerchantName ?  this.DataService.aggregatorDetails.MerchantName : '-';
    // history.pushState(
    //   {},
    //   'login',
    //   this.location.prepareExternalUrl('login')
    // );
    // history.pushState(
    //   {},
    //   'self',
    //   this.location.prepareExternalUrl(this.router.url)
    // );
    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
    this.DataService.changeMessage(this.commonPageComponent);
  //   this.platformLocation.onPopState(() => {
  //     this.router.navigateByUrl('login?'+this.DataService.aggregatorHref)
  // });
  //automatic redirection of url
  var self = this;
  setTimeout(function(){
    self.redirectURL();
   }, 10000);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  redirectURL(){
    var returnUrl = this.DataService.aggregatorDetails.RU + this.DataService.paymentDetails.returnUrl;
    console.log('Return URL: ', returnUrl);
    window.open(returnUrl,"_self")
  }

  downloadPdfReceipt(type) {
    this.loader.showLoader();
    var pdfsize = 'a4';
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    this.totalAccountList = this.DataService.customerOperativeAccList;
    console.log('total account list: ', this.totalAccountList);
    if (this.status == '00') {
      var imgColor = 'success';
    //    if (resp.responseParameter.opstatus == '00') {
    //   this.dataService.receiptType = this.constant.val_Successful;
    // } else {
    //   this.dataService.receiptType = this.constant.val_Failure;
    // }
    }
    else {
      imgColor = 'failed';
    }
    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.DataService.paymentDetails.debitAccount);

    var branchJSON = [
      { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
      { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
      { 'key': 'Branch Address', 'value': selAccDtl[0].BRANCHADDRESS },
      { 'key': 'Branch Contact', 'value': selAccDtl[0].phone_number },
      { 'key': 'IFSC', 'value': selAccDtl[0].ifscCode },
    ];
      var receiptFundTransferJson = [
        { 'key': 'Pay To', 'value': this.payTo },
        { 'key': 'Payment Amount', 'value': this.customCurrencyPipe.transform( this.DataService.paymentDetails.amount, 'symbol'),},
        { 'key': 'Reference Number', 'value': this.DataService.referenceNo},
        { 'key': 'Debit Account', 'value': this.DataService.paymentDetails.debitAccount},
        { 'key': 'Remarks', 'value': this.DataService.paymentDetails.remarks},
        { 'key': 'Date', 'value': this.DataService.paymentDetails.transDate}
      ];
      this.loader.hideLoader();
      this.commonMethods.generatePDF(imgColor, this.status == '00' ? this.constant.val_Successful : this.constant.val_Failure, '', this.refTransJson, receiptFundTransferJson, 'Fund Transfer', branchJSON, type, this.DataService.paymentDetails.debitAccount, this.todayDateTime);
  }


  shareDetails() {
    this.shareViaMail();
  }
  /**
   * share details via mail in desktop
   */
  shareViaMail() {
    let details = this.getValuesToSend();
    window.open('mailto:?subject=Receipt&body=' + details);
  }
  /**
   * Get selected values from account details
   */
  getValuesToSend() {
    let selectedFields = "";
    selectedFields += "Pay To :" + this.payTo + ", ";
    selectedFields += "Payment Amount :"   + this.customCurrencyPipe.transform( this.DataService.paymentDetails.amount, 'symbol');", ";
    //  OSREC.CurrencyFormatter.format( this.receiptResp.amount, { currency: 'INR', symbol: 'INR' });
    selectedFields += "Reference Number :" + this.DataService.referenceNo + ", ";
    selectedFields += "Debit Account :" + this.DataService.paymentDetails.debitAccount + ", ";
    selectedFields += "Remarks :" + this.DataService.paymentDetails.remarks + ", ";
    selectedFields += "Date :" + this.DataService.paymentDetails.transDate + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }


}
