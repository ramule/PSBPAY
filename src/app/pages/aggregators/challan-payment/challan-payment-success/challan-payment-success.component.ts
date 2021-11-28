import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DatePipe, Location } from '@angular/common';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { FontBase64 } from '../../../../utilities/app-enum';
declare var window: any;
import * as jsPDF from 'jspdf';

@Component({
  selector: 'app-challan-payment-success',
  templateUrl: './challan-payment-success.component.html',
  styleUrls: ['./challan-payment-success.component.scss']
})
export class ChallanPaymentSuccessComponent implements OnInit {
  receiptType: any;
  receipdRefID: any;
  overviewObject: any;
  receiptMsg: any;
  refTransJson: any = [
    {
      'key': 'Transaction ID',
      'value': ''
    }
  ];
  todayDateTime: any;
  totalAccountList = [];
  constructor(
    public DataService: DataService,
    public constant: AppConstants,
    private router: Router,
    private location: Location,
    public commonMethod: CommonMethods,
    private loader: pageLoaderService,
    private datePipe: DatePipe,
    private customCurrencyPipe: CustomCurrencyPipe
  ) { }

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  ngOnInit(): void {
    this.todayDateTime = this.datePipe.transform(new Date(), 'ddMMyyyyhhmmss');
    this.refTransJson[0].value = this.DataService.receipdRefID;
    this.DataService.changeMessage(this.commonPageComponent);
    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    this.receiptType = this.DataService.receiptType;
    this.receipdRefID = this.DataService.receipdRefID;
    this.overviewObject = this.DataService.challanTaxOverviewDetails;
    this.receiptMsg = this.DataService.receiptmsg;

    // setTimeout(() => {
    //   window.location = "https://14.140.81.154/etaxnew/tdsnontds.jsp";
    // }, 10000);
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }


  downloadPdfReceipt(type) {
    this.loader.showLoader();
    var pdfsize = 'a4';
    var doc = new jsPDF();
    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    this.totalAccountList = this.DataService.customerOperativeAccList;
    console.log('total account list: ', this.totalAccountList);
    if (this.receiptType === this.constant.val_Successful) {
      var imgColor = 'success';
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
      { 'key': 'Oltas Form No', 'value': this.DataService.oltasForm },
      { 'key': 'Major Head', 'value': this.overviewObject.majorHead ? this.overviewObject.majorHead : '-' },
      { 'key': 'Minor Head', 'value': this.overviewObject.minorHead ? this.overviewObject.minorHead : '-', },
      { 'key': 'Nature of Payment', 'value': '-' },
      { 'key': 'PAN/TAN', 'value': this.overviewObject.pan ? this.overviewObject.pan : '-' },
      { 'key': 'Full Name', 'value': this.overviewObject.fullName ? this.overviewObject.fullName : '-' },
      { 'key': 'Assessment Year', 'value': this.overviewObject.assestmentYear ? this.overviewObject.assestmentYear : '-' },
      { 'key': 'Address Line 1', 'value': this.overviewObject.address1 ? this.overviewObject.address1 : '-' },
      { 'key': 'Address Line 2', 'value': this.overviewObject.address2 ? this.overviewObject.address2 : '-' },
      { 'key': 'Address Line 3', 'value': this.overviewObject.address3 ? this.overviewObject.address3 : '-' },
      { 'key': 'Address Line 4', 'value': this.overviewObject.address4 ? this.overviewObject.address4 : '-' },
      { 'key': 'Address Line 5', 'value': this.overviewObject.address5 ? this.overviewObject.address5 : '-' },
      { 'key': 'State', 'value': this.overviewObject.state ? this.overviewObject.state : '-' },
      { 'key': 'PIN', 'value': this.overviewObject.pin ? this.overviewObject.pin : '-' },
      { 'key': 'Tax', 'value': this.overviewObject.incomeTax },
      { 'key': 'Surcharge', 'value': this.overviewObject.surcharge },
      { 'key': 'Education Cess', 'value': this.overviewObject.educationCess },
      { 'key': 'Interest', 'value': this.overviewObject.interest },
      { 'key': 'Penalty', 'value': this.overviewObject.penalty },
      { 'key': 'Others', 'value': this.overviewObject.other },
      // { 'key': 'Total Amount', 'value': this.customCurrencyPipe.transform(this.overviewObject.totalAmount, 'symbol') },
      { 'key': 'Total Amount', 'value': this.overviewObject.totalAmount },
      { 'key': 'Remarks', 'value': this.overviewObject.remark ? this.overviewObject.remark : '-' },
      { 'key': 'Date', 'value': this.overviewObject.dob },

    ];
    this.loader.hideLoader();
    this.generatePDF(imgColor, this.receiptType, this.receiptMsg, this.refTransJson, receiptFundTransferJson, 'Challan Payment', branchJSON, type, this.DataService.paymentDetails.debitAccount, this.todayDateTime);
  }


  generatePDF(imageColor, msg, submsg, reftransJSON, receiptJSON, receiptName, branchJSON, printPDF, accountNo, todayDateTime) {
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = this.commonMethod.psbNewLogo;
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line


    doc.setFontSize(7);
    var count1 = 10
    for (i = 0; i < branchJSON.length; i++) {
      var data = branchJSON[i].key + ": " + branchJSON[i].value
      doc.text(data, pageWidth - 110, count1, 'left');
      count1 = count1 + 5
    }
    // doc.text("Branch Name : ", pageWidth - 110, 10, 'left');
    // doc.text("Branch Code : ", pageWidth - 110, 15, 'left');
    // doc.text("Branch Address : ", pageWidth - 110, 20, 'left');
    // doc.text("Branch Contact : ", pageWidth - 110, 25, 'left');
    // doc.text("IFSC : " , pageWidth - 110, 30, 'left');
    // doc.text("MICR Code : ", pageWidth - 110, 35, 'left');

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth - 15, 45);

    doc.setFontSize(20);

    doc.text("E-Receipt", pageWidth / 2, 60, 'center');

    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    var img = new Image()
    if (imageColor == 'success')
      img.src = this.commonMethod.successLogo;
    else
      img.src = this.commonMethod.errorLogo;
    doc.addImage(img, 'png', 20, 75, 16, 16);

    doc.setFontSize(20);

    doc.text(msg, 40, 85, 'left');

    doc.setFontSize(12);
    doc.text(submsg, 40, 92, 'left');
    doc.text(this.overviewObject.totalAmount, 40, 99, 'left');

    doc.setFontSize(9)
    doc.text(reftransJSON[0].key + ": " + reftransJSON[0].value, 40, 105, 'left');

    doc.setLineWidth(0.1);
    doc.line(17, 110, pageWidth - 17, 110);

    doc.setFontSize(11)
    var count = 120
    var col1Data = Math.ceil(receiptJSON.length/2)
    for (i = 0; i < col1Data; i++) {
      var data = receiptJSON[i].key + ": " + receiptJSON[i].value
      doc.text(data, 25, count, 'left');
      count = count + 10
    }

    var count2ndCol = 120
    for (i = col1Data; i < receiptJSON.length; i++) {
      var data = receiptJSON[i].key + ": " + receiptJSON[i].value
      doc.text(data, 150, count2ndCol, 'left');
      count2ndCol = count2ndCol + 7
    }

    doc.setLineWidth(0.2);
    doc.rect(15, 70, doc.internal.pageSize.width - 30, 170, 'S');

    doc.setFontSize(8)
    doc.text("This is computer generated statement and does not require any signature.", 15, 277, 'left');


    const pageCount = doc.internal.getNumberOfPages()
    doc.setFontSize(6)
    for (var i = 1; i <= pageCount; i++) {
      doc.setPage(i)
      doc.setLineWidth(0.1);
      doc.line(15, 282, pageWidth - 15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    if (printPDF == 'Y') {
      if (!window.hasOwnProperty('cordova')) {
        doc.autoPrint();
        window.open(doc.output('bloburl'));
      }
      else {
        this.commonMethod.shareDownloadedPDF(doc, receiptName + '_XX' + this.commonMethod.maskCharacter(accountNo, 4) + '_' + todayDateTime);
      }
    }
    else {
      this.commonMethod.downloadPDF(doc, receiptName + '_XX' + this.commonMethod.maskCharacter(accountNo, 4) + '_' + todayDateTime);
    }
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
    selectedFields += "Major Head :" + this.overviewObject.majorHead ? this.overviewObject.majorHead : '-' + ", ";
    selectedFields += "Minor Head :" + this.overviewObject.minorHead ? this.overviewObject.minorHead : '-' + ", ";
    //  OSREC.CurrencyFormatter.format( this.receiptResp.amount, { currency: 'INR', symbol: 'INR' });
    selectedFields += "Nature of Payment :" + '-' + ", ";
    selectedFields += "PAN/TAN :" + this.overviewObject.pan ? this.overviewObject.pan : '-' + ", ";
    selectedFields += "Full Name :" + this.overviewObject.fullName ? this.overviewObject.fullName : '-' + ", ";
    selectedFields += "Assessment Year :" + this.overviewObject.assestmentYear ? this.overviewObject.assestmentYear : '-' + ", ";

    selectedFields += "Address Line 1 :" + this.overviewObject.address1 ? this.overviewObject.address1 : '-' + ", ";
    selectedFields += "Address Line 2 :" + this.overviewObject.address2 ? this.overviewObject.address2 : '-' + ", ";
    selectedFields += "Address Line 3 :" + this.overviewObject.address3 ? this.overviewObject.address3 : '-' + ", ";
    selectedFields += "Address Line 4 :" + this.overviewObject.address4 ? this.overviewObject.address4 : '-' + ", ";
    selectedFields += "Address Line 5 :" + this.overviewObject.address5 ? this.overviewObject.address5 : '-' + ", ";
    selectedFields += "State :" + this.overviewObject.state ? this.overviewObject.state : '-' + ", ";

    selectedFields += "PIN :" + this.DataService.paymentDetails.transDate + ", ";
    selectedFields += "State :" + this.DataService.paymentDetails.transDate + ", ";
    selectedFields += "Tax :" + this.overviewObject.incomeTax + ", ";
    selectedFields += "Surcharge :" + this.overviewObject.surcharge + ", ";
    selectedFields += "Education Cess :" + this.overviewObject.educationCess + ", ";
    selectedFields += "Interest :" + this.overviewObject.interest + ", ";
    selectedFields += "Penalty :" + this.overviewObject.penalty + ", ";
    selectedFields += "Others :" + this.overviewObject.other + ", ";
    selectedFields += "Total Amount :" + this.customCurrencyPipe.transform(this.overviewObject.totalAmount, 'symbol') + ", ";
    selectedFields += "Remarks :" + this.overviewObject.remark ? this.overviewObject.remark : '-' + ", ";
    selectedFields += "Date :" + this.overviewObject.dob + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

}
