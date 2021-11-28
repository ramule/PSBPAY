import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { DatePipe, Location } from '@angular/common';
import { GstnPaymentSuccessService } from './gstn-payment-success.service';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { pageLoaderService } from 'src/app/services/pageloader.service';
import { FontBase64 } from 'src/app/utilities/app-enum';
import * as jsPDF from 'jspdf';
declare var window: any;
@Component({
  selector: 'app-gstn-payment-success',
  templateUrl: './gstn-payment-success.component.html',
  styleUrls: ['./gstn-payment-success.component.scss']
})
export class GstnPaymentSuccessComponent implements OnInit {
  totalAccountList =[];

  receiptType: any;
  receipdRefID: any;
  overviewObject: any;
  receiptMsg: any;
  todayDateTime:any;
  refTransJson: any = [
    {
      'key': 'Transaction ID',
      'value': ''
    }
  ];
  constructor(
    public DataService: DataService,
    public constant: AppConstants,
    private router: Router,
    private location: Location,
    private http: HttpRestApiService,
    public commonMethod: CommonMethods,
    private storage: LocalStorageService,
    private gstnPaymentSuccessService: GstnPaymentSuccessService,
    private customCurrencyPipe : CustomCurrencyPipe,
    private loader : pageLoaderService,
    private datePipe : DatePipe,
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
    this.overviewObject = this.DataService.gstnPaymentDetails;
    this.receiptMsg = this.DataService.receiptmsg;
    this.getGSTNPaymentResponse();
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  getGSTNPaymentResponse() {
    var param = this.gstnPaymentSuccessService.getGSTNPaymentReqCall(this.overviewObject);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_GSTNPAYMENTRESPONSE).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter
      if (resp.opstatus == "00") {
        var formData = data;
        var gstnForm = document.createElement("form");
        gstnForm.setAttribute("method", "post");
        gstnForm.setAttribute("action", this.overviewObject.returnurl);
        gstnForm.setAttribute("target", 'GSTNFile');

        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", "data");
        hiddenField.setAttribute("value", formData);
        gstnForm.appendChild(hiddenField);
        document.body.appendChild(gstnForm);
        var map = window.open('', 'GSTNFile');

        if (map) {
          setTimeout(() => {
            gstnForm.submit();
          }, 10000);
        } else {
          console.log('Form is null');
        }
      }
    })
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
    var selAccDtl = this.totalAccountList.filter(item => item.accountNo == this.DataService.gstnSelectedAccount);

    var branchJSON = [
      { 'key': 'Branch Name', 'value': selAccDtl[0].branch_name },
      { 'key': 'Branch Code', 'value': selAccDtl[0].branchCode },
      { 'key': 'Branch Address', 'value': selAccDtl[0].BRANCHADDRESS },
      { 'key': 'Branch Contact', 'value': selAccDtl[0].phone_number },
      { 'key': 'IFSC', 'value': selAccDtl[0].ifscCode },
    ];
      var receiptFundTransferJson = [
        { 'key': 'IGST Amount', 'value': this.overviewObject.igst_amt ? this.overviewObject.igst_amt : '-' },
        { 'key': 'Cess amount', 'value': this.customCurrencyPipe.transform( this.overviewObject.cess_amt, 'symbol'),},
        { 'key': 'CGST Account Code', 'value': this.overviewObject.cess_acc_code},
        { 'key': 'SGST Account Code', 'value': this.overviewObject.sgst_acc_code},
        { 'key': 'Challan Expiry Date', 'value': this.overviewObject.chln_exp_dt},
        { 'key': 'SGST Amount', 'value': this.customCurrencyPipe.transform(this.overviewObject.sgst_amt, 'symbol')},
        { 'key': 'GSTIN', 'value': this.overviewObject.gstin},
        { 'key': 'CGST Amount', 'value': this.customCurrencyPipe.transform(this.overviewObject.cgst_amt, 'symbol')},
        { 'key': 'Total Amount', 'value': this.customCurrencyPipe.transform(this.overviewObject.total_amt, 'symbol')},
        { 'key': 'Cess Account Code', 'value': this.overviewObject.cess_acc_code},
        { 'key': 'Transaction Id', 'value': this.overviewObject.txnid},
        { 'key': 'IGST Account Code', 'value': this.overviewObject.igst_acc_code}
      ];
      this.loader.hideLoader();
      // this.commonMethod.generatePDF(imgColor, this.receiptType === this.constant.val_Successful ? this.constant.val_Successful : this.constant.val_Failure, '', this.refTransJson, receiptFundTransferJson, 'GSTN Payment', branchJSON, type, this.DataService.gstnSelectedAccount, this.todayDateTime);
      this.generatePDF(imgColor, this.receiptType, this.DataService.receiptmsg, this.refTransJson, receiptFundTransferJson, 'GSTN Payment', branchJSON, type, this.DataService.gstnSelectedAccount, this.todayDateTime);
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
    selectedFields += "IGST Amount :" + this.overviewObject.igst_amt ? this.overviewObject.igst_amt : '-' + ", ";
    selectedFields += "Cess amount :"   + this.customCurrencyPipe.transform(this.overviewObject.cess_amt, 'symbol');", ";
    selectedFields += "CGST Account Code :" + this.overviewObject.sgst_acc_code + ", ";
    selectedFields += "SGST Account Code :" + this.overviewObject.sgst_acc_code+ ", ";
    selectedFields += "Challan Expiry Date :" + this.overviewObject.chln_exp_dt + ", ";
    selectedFields += "SGST Amount :" + this.overviewObject.sgst_acc_code + ", ";
    selectedFields += "GSTIN :" + this.overviewObject.gstin + ", ";
    selectedFields += "CGST Amount :" + this.customCurrencyPipe.transform(this.overviewObject.cgst_amt, 'symbol') + ", ";
    selectedFields += "Total Amount :" + this.customCurrencyPipe.transform(this.overviewObject.total_amt, 'symbol') + ", ";
    selectedFields += "Cess Account Code :" + this.overviewObject.cess_acc_code+ ", ";
    selectedFields += "Transaction Id :" + this.overviewObject.txnid + ", ";
    selectedFields += "IGST Account Code :" + this.overviewObject.igst_acc_code + ", ";

    return selectedFields.replace(/,\s*$/, "");
  }

  /*** Generate E-Receipt PDF */

  generatePDF(imageColor,msg,submsg,reftransJSON,receiptJSON,receiptName,branchJSON,printPDF, accountNo, todayDateTime) {
    var pdfsize = 'a4';
    var doc = new jsPDF();

    var pageHeight = doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    var pageWidth = doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    var img = new Image()
    img.src = this.commonMethod.psbNewLogo;
    doc.addImage(img, 'png', 20, 16, 60, 15);
    doc.setLineWidth(0.5);
    doc.line(90, 7, 90, 40); // vertical line

    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    doc.setFontSize(7);
    var count1 = 10
    for(i=0;i<branchJSON.length;i++)
    {
      var data = branchJSON[i].key+": "+branchJSON[i].value
      doc.text(data, pageWidth - 110, count1, 'left');
      count1 = count1 + 5
    }

    doc.setLineWidth(0.1);
    doc.line(15, 45, pageWidth-15, 45);

    doc.setFontSize(20);

    doc.text("E-Receipt", pageWidth/2, 60, 'center');



    var img = new Image()
    if(imageColor=='success')
    img.src = this.commonMethod.successLogo;
    else
    img.src = this.commonMethod.errorLogo;
    doc.addImage(img, 'png', 20, 75, 16, 16);

    doc.setFontSize(20);

    doc.text(msg, 40, 85, 'left');

    doc.setFontSize(12)
    doc.text(submsg, 40, 95, 'left');

    doc.setFontSize(9)
    doc.text(reftransJSON[0].key+": "+reftransJSON[0].value, 40, 105, 'left');

    doc.setLineWidth(0.1);
    doc.line(17, 110, pageWidth-17, 110);


    // add the font to jsPDF
    doc.addFileToVFS("Sakalbharati.ttf", FontBase64.Sakalbharati);
    doc.addFont("Sakalbharati.ttf", "Sakalbharati", "normal");
    doc.setFont("Sakalbharati");

    doc.setFontSize(11);
    var count = 120
    for(i=0;i<receiptJSON.length;i++)
    {
      var data = receiptJSON[i].key+": "+receiptJSON[i].value
      doc.text(data, 25, count, 'left');
      count = count + 10
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
      doc.line(15, 282, pageWidth-15, 282);
      doc.setFontSize(8)
      doc.text('Registered Office: Punjab & Sind Bank, 21, Rajendra Place, New Delhi- 110008', 15, 287, 'left')
      doc.text('Page ' + String(i) + ' of ' + String(pageCount), doc.internal.pageSize.width - 30, 287, 'left')
    }

    if (printPDF=='Y') {
      doc.autoPrint();
      window.open(doc.output('bloburl'));
    }
    else {
      this.commonMethod.downloadPDF(doc, receiptName+'_xx'+ this.maskCharacter(accountNo, 4)+ '_' +todayDateTime);
    }
  }

  maskCharacter(str, n) {
    // Slice the string and replace with
    // mask then add remaining string
    // return ('' + str).slice(0, -n).replace(/./g, "*")+ ('' + str).slice(-n);
    return str.slice(-n);
  }

  redirectURL(){
    this.router.navigateByUrl('/login');
  }

}
