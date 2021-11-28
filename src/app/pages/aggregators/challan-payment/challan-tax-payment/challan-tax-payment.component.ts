import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { ChallanTaxPaymentService } from './challan-tax-payment.service';
import { DatePipe, Location, PlatformLocation } from '@angular/common';
import { CustomCurrencyPipe } from 'src/app/pipes/custom-currency.pipe';
import { FormValidationService } from 'src/app/services/form-validation.service';
import { FormatDatePipe } from 'src/app/pipes/date-formatter.pipe';
declare var showToastMessage: any;

@Component({
  selector: 'app-challan-tax-payment',
  templateUrl: './challan-tax-payment.component.html',
  styleUrls: ['./challan-tax-payment.component.scss']
})
export class ChallanTaxPaymentComponent implements OnInit {
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService,
    private storage: LocalStorageService,
    private challanTaxPaymentService: ChallanTaxPaymentService,
    private location: Location,
    private datepipe: DatePipe,
    private platformLocation: PlatformLocation,
    private formValidation: FormValidationService,
    private customCurrencyPipe: CustomCurrencyPipe,
    private formateDate : FormatDatePipe
  ) { }

  challanTaxDetails: any;
  selectedAccount: any;
  accBalance: any;
  challanTaxPaymentForm: FormGroup;
  accountList = [];
  accountValue: any = '';
  refreshedTime: any;
  todayDate: any;
  validTaxAmount: boolean = false;
  amountInWordSB = "";


  interestModel : any ;
  surchargeModel : any ;
  incomeTaxModel : any ;
  educationCessModel : any ;
  penaltyModel : any ;
  otherModel :any ;


  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  ngOnInit(): void {
    this.buildForm();

    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    //   this.platformLocation.onPopState(() => {
    //     this.router.navigateByUrl('login?'+this.DataService.challanTaxDetails)
    // });

    this.todayDate = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    this.challanTaxDetails = this.DataService.challanTaxDetails;
    console.log('Challan Tax Payment Details: ', this.challanTaxDetails);
    console.log('oltasForm: ', this.DataService.oltasForm);
    this.DataService.changeMessage(this.commonPageComponent);
    this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);

    this.DataService.oltasForm = this.getOldTasForm(this.challanTaxDetails);
    //alert(this.DataService.oltasForm);

    switch(this.DataService.oltasForm){
      case '280':
        if(this.challanTaxDetails.MinorHead != '800'){
          this.challanTaxPaymentForm.patchValue({
            majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
            minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
            pan: this.challanTaxDetails.PAN ? this.challanTaxDetails.PAN : '-',
            fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
            assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
            address1: this.challanTaxDetails.Add_Line1 ? this.challanTaxDetails.Add_Line1 : '-',
            address2: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2 : '-',
            address3: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
            address4: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
            address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
            state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
            city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
            pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
            dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
            naturePayment: this.challanTaxDetails.NaturePayment ? this.challanTaxDetails.NaturePayment : '-'
      });

    }else{
          this.challanTaxPaymentForm.patchValue({
            majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
            minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
            pan: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
            ackNo : this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
            fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
            assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
            address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
            totalAmount : this.challanTaxDetails.Add_Line1 ? this.challanTaxDetails.Add_Line1 : '-',
            state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
            city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
            pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
            dob: this.challanTaxDetails.Add_Line2 ? this.formateDate.transform(this.challanTaxDetails.Add_Line2) : '-',
            naturePayment: this.challanTaxDetails.NaturePayment ? this.challanTaxDetails.NaturePayment : '-'
      });
        }
        break ;
      case '281':
        this.challanTaxPaymentForm.patchValue({
          majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
          minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
          pan: this.challanTaxDetails.TAN ? this.challanTaxDetails.TAN : '-',
          fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
          assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
          address1: this.challanTaxDetails.Add_Line1 ? this.challanTaxDetails.Add_Line1 : '-',
          address2: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2 : '-',
          address3: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
          address4: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
          address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
          state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
          city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
          pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
          dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
          naturePayment: this.challanTaxDetails.NaturePayment ? this.challanTaxDetails.NaturePayment : '-'
        });
        break ;
      case '282':
      case '283':
      case '284':
          this.challanTaxPaymentForm.patchValue({
            majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
            minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
            pan: this.challanTaxDetails.PAN ? this.challanTaxDetails.PAN : '-',
            fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
            assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
            address1: this.challanTaxDetails.Add_Line1 ? this.challanTaxDetails.Add_Line1 : '-',
            address2: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2 : '-',
            address3: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
            address4: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
            address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
            state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
            city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
            pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
            dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
            naturePayment: this.challanTaxDetails.NaturePayment ? this.challanTaxDetails.NaturePayment : '-'
      });
        break ;

      case '285':
        var totalAmount = Number(this.challanTaxDetails.Add_Line1) + Number(this.challanTaxDetails.Add_Line2) + Number(this.challanTaxDetails.Add_Line3) + Number(this.challanTaxDetails.Add_Line4)
             this.challanTaxPaymentForm.patchValue({
                majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
                minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
                pan: this.challanTaxDetails.PAN ? this.challanTaxDetails.PAN : '-',
                fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
                assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
                incomeTax: this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line1, 'symbol'),
                interest: this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line2, 'symbol'),
                // penalty: this.customCurrencyPipe.transform(this.challanTaxDetails.oltasData.split('=')[1], 'symbol'),
                penalty: this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line3, 'symbol'),
                other: this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line4, 'symbol'),
                ackNo: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
                state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
                city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
                pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
                dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
                totalAmount: this.customCurrencyPipe.transform(totalAmount,'symbol'),
                address1: '-',
                address2: '-',
                address3: '-',
                address4: '-',
                address5: '-',
                naturePayment: this.challanTaxDetails.NaturePayment ? this.challanTaxDetails.NaturePayment : '-'
      })
      // this.challanTaxPaymentForm.get('incomeTax').disable();
      // this.challanTaxPaymentForm.get('interest').disable();
      // this.challanTaxPaymentForm.get('penalty').disable();
      // this.challanTaxPaymentForm.get('other').disable();
        break ;

      case '286':
        // var totalAmount = Number(this.challanTaxDetails.Add_Line1) + Number(this.challanTaxDetails.Add_Line2) + Number(this.challanTaxDetails.oltasData.split('=')[1]) + Number(this.challanTaxDetails.Add_Line4)
             this.challanTaxPaymentForm.patchValue({
              majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
              minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
              pan: this.challanTaxDetails.PAN ? this.challanTaxDetails.PAN : '-',
              natureOfPan: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
              fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
              assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
              address1: this.challanTaxDetails.Add_Line1 ? this.challanTaxDetails.Add_Line1 : '-',
              address2: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2 : '-',
              address3: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
              address4: '-',
              address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
              state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
              city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
              pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
              dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
              naturePayment: '-'
      });
        break ;
      case '287':
          this.challanTaxPaymentForm.patchValue({
              majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
              minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
              pan: this.challanTaxDetails.Add_Line3 == "P" ? this.challanTaxDetails.PAN : '-',
              natureOfPan: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
              fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
              assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
              address1: this.challanTaxDetails.Add_Line1 ? this.challanTaxDetails.Add_Line1 : '-',
              address2: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2 : '-',
              address3: '-',
              address4: '-',
              address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
              state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
              city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
              pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
              dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
              naturePayment: this.challanTaxDetails.NaturePayment ? this.challanTaxDetails.NaturePayment : '-'
      });
        break ;
      case '26QB DEMAND PAYMENT':
        this.challanTaxPaymentForm.patchValue({
          majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
          minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
          pan: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
          natureOfPan: '-',
          fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
          assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
          address1: '-',
          address2: '-',
          address3: '-',
          address4: '-',
          address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
          state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
          city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
          pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
          dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
          naturePayment: '-',
          dateOfPayemnt: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3') : '-',
          ackNo: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
          zaocode: "722008",
          valid: this.challanTaxDetails.valid ? this.challanTaxDetails.valid : '-',
          financialYear: this.challanTaxDetails.FinancialYear ? this.challanTaxDetails.FinancialYear : '-',
      });
        break;
      case '26QB':
        this.challanTaxPaymentForm.patchValue({
          majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
          minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
          pan: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
          natureOfPan: '-',
          fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
          assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
          address1: '-',
          address2: '-',
          address3: '-',
          address4: '-',
          address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
          state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
          city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
          pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
          dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
          naturePayment: '-',
          dateOfPayemnt: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3') : '-',
          ackNo: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
          zaocode: "722008",
          valid: this.challanTaxDetails.valid ? this.challanTaxDetails.valid : '-',
          financialYear: this.challanTaxDetails.FinancialYear ? this.challanTaxDetails.FinancialYear : '-',
          totalAmount: this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line1,'symbol'),
      });
        break;
      case '26QC DEMAND PAYMENT':
        this.challanTaxPaymentForm.patchValue({
          majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
          minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
          pan: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
          natureOfPan: '-',
          fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
          assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
          address1: '-',
          address2: '-',
          address3: '-',
          address4: '-',
          address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
          state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
          city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
          pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
          dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
          naturePayment: '-',
          dateOfPayemnt: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3') : '-',
          ackNo: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
          zaocode: "722008",
          valid: this.challanTaxDetails.valid ? this.challanTaxDetails.valid : '-',
          financialYear: this.challanTaxDetails.FinancialYear ? this.challanTaxDetails.FinancialYear : '-',
      });

        break;
      case '26QC':
        this.challanTaxPaymentForm.patchValue({
          majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '0021',
          minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
          pan: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : 'PANNOTAVBL',
          natureOfPan: '-',
          fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
          assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
          address1: '-',
          address2: '-',
          address3: '-',
          address4: '-',
          address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
          state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
          city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
          pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
          dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
          naturePayment: '-',
          dateOfPayemnt: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3') : '-',
          ackNo: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
          zaocode: "722008",
          valid: this.challanTaxDetails.valid ? this.challanTaxDetails.valid : '-',
          financialYear: this.challanTaxDetails.FinancialYear ? this.challanTaxDetails.FinancialYear : '-',
          totalAmount: this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line1,'symbol'),
      });


        break;
      case '26QD DEMAND PAYMENT':
        this.challanTaxPaymentForm.patchValue({
          majorHead: this.challanTaxDetails.MajorHead ? this.challanTaxDetails.MajorHead : '-',
          minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
          pan: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : '-',
          natureOfPan: '-',
          fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
          assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
          address1: '-',
          address2: '-',
          address3: '-',
          address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
          state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
          city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
          pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
          dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
          naturePayment: '-',
          dateOfPayemnt: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3') : '-',
          ackNo: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
          zaocode: "722008",
          valid: this.challanTaxDetails.valid ? this.challanTaxDetails.valid : '-',
          financialYear: this.challanTaxDetails.FinancialYear ? this.challanTaxDetails.FinancialYear : '-',
      });
        break;
      case '26QD':
        console.log(this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line1,'symbol'));
        this.challanTaxPaymentForm.patchValue({
          majorHead: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.MajorHead : '0021',
          minorHead: this.challanTaxDetails.MinorHead ? this.challanTaxDetails.MinorHead : '-',
          pan: this.challanTaxDetails.Add_Line3 ? this.challanTaxDetails.Add_Line3 : 'PANNOTAVBL',
          natureOfPan: '-',
          fullName: this.challanTaxDetails.Name ? this.challanTaxDetails.Name : '-',
          assestmentYear: this.challanTaxDetails.AssessYear ? this.challanTaxDetails.AssessYear : '-',
          address1: '-',
          address2: '-',
          address3: '-',
          address5: this.challanTaxDetails.Add_Line5 ? this.challanTaxDetails.Add_Line5 : '-',
          state: this.challanTaxDetails.Add_State ? this.challanTaxDetails.Add_State : '-',
          city: this.challanTaxDetails.Add_City ? this.challanTaxDetails.Add_City : '-',
          pin: this.challanTaxDetails.Add_PIN ? this.challanTaxDetails.Add_PIN : '-',
          dob: this.datepipe.transform(new Date().toISOString(),"dd MMM yy"),
          naturePayment: '-',
          dateOfPayemnt: this.challanTaxDetails.Add_Line2 ? this.challanTaxDetails.Add_Line2.replace(/^(\d{2})(\d{2})(\d{4})$/, '$1/$2/$3') : '-',
          ackNo: this.challanTaxDetails.Add_Line4 ? this.challanTaxDetails.Add_Line4 : '-',
          zaocode: "722008",
          valid: this.challanTaxDetails.valid ? this.challanTaxDetails.valid : '-',
          financialYear: this.challanTaxDetails.FinancialYear ? this.challanTaxDetails.FinancialYear : '-',
          totalAmount: this.customCurrencyPipe.transform(this.challanTaxDetails.Add_Line1,'symbol'),
      });
        break;
    }


    if(this.DataService.oltasForm != '26QD' && this.DataService.oltasForm != '26QC' && this.DataService.oltasForm != '26QB'  ) this.addTotalAmt() ;
    this.accountList = this.DataService.customerOperativeAccList;
    console.log('account list: ', this.accountList);

    if (this.accountList.length != 0) {
      setTimeout(() => {
        this.selectedAccount = this.accountList[0].accountNo;
        this.accBalance = this.accountList[0].acctBalance;
      });
      this.getAccountBalance(this.accountList[0].accountNo)
    }
  }


  getOldTasForm(chalanDtl){
    if(chalanDtl.oltasForm == "280"){
      if(chalanDtl.Add_Line4.length == 9 && chalanDtl.Add_Line1.toUpperCase() == "DEMAND PAYMENT" ){
        return "26QB DEMAND PAYMENT";
      }
      else if(chalanDtl.Add_Line4.length == 9){
        return "26QB";
      }
      else if(chalanDtl.Add_Line4.length == 10 && chalanDtl.Add_Line1.toUpperCase() == "DEMAND PAYMENT" && chalanDtl.Add_Line4.charAt(0).toUpperCase() == "R" ){
        return "26QC DEMAND PAYMENT";
      }
      else if(chalanDtl.Add_Line4.length == 10 && chalanDtl.Add_Line4.charAt(0).toUpperCase() == "R" ){
        return "26QC";
      }
      else if(chalanDtl.Add_Line4.length == 10 && chalanDtl.Add_Line1.toUpperCase() == "DEMAND PAYMENT" && chalanDtl.Add_Line4.charAt(0).toUpperCase() == "D" ){
        return "26QD DEMAND PAYMENT";
      }
      else if(chalanDtl.Add_Line4.length == 10 && chalanDtl.Add_Line4.charAt(0).toUpperCase() == "D" ){
        return "26QD";
      }
      else{
        return "280";
      }
    }
    else{
      return chalanDtl.oltasForm
    }
  }

  buildForm() {
    this.challanTaxPaymentForm = new FormGroup({
      majorHead: new FormControl(''),
      minorHead: new FormControl(''),
      naturePayment: new FormControl(''),
      pan: new FormControl(''),
      natureOfPan : new FormControl(''),
      ackNo : new FormControl(''),
      fullName: new FormControl(''),
      assestmentYear: new FormControl(''),
      address1: new FormControl(''),
      address2: new FormControl(''),
      address3: new FormControl(''),
      address4: new FormControl(''),
      address5: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pin: new FormControl(''),
      incomeTax: new FormControl(''),
      surcharge: new FormControl(''),
      educationCess: new FormControl(''),
      interest: new FormControl(''),
      penalty: new FormControl(''),
      other: new FormControl(''),
      totalAmount: new FormControl(''),
      remark: new FormControl('',[]),
      dob: new FormControl(''),
      dateOfPayemnt: new FormControl(''),
      zaocode: new FormControl(''),
      valid: new FormControl(''),
      financialYear: new FormControl(''),
    });
  }

  validateForm() {
    if (this.challanTaxPaymentForm.invalid) {
      this.challanTaxPaymentForm.get('incomeTax').markAsTouched();
      this.challanTaxPaymentForm.get('surcharge').markAsTouched();
      this.challanTaxPaymentForm.get('educationCess').markAsTouched();
      this.challanTaxPaymentForm.get('interest').markAsTouched();
      this.challanTaxPaymentForm.get('penalty').markAsTouched();
      this.challanTaxPaymentForm.get('other').markAsTouched();
      this.challanTaxPaymentForm.get('totalAmount').markAsTouched();
      this.challanTaxPaymentForm.get('remark').markAsTouched();
      this.challanTaxPaymentForm.get('dob').markAsTouched();
      return;
    }
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
  getAccountBalance(selectedAccount, isrefresh?) {
    if (selectedAccount == "") {
      showToastMessage("Please select account")
      return;
    }

    if (isrefresh == 'refresh') {
      var param = this.challanTaxPaymentService.getAccountBalanceParam(selectedAccount);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.accBalance = data.set.records[0].ledgerBalance
          this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
        }
      })
    } else {

      var param = this.challanTaxPaymentService.getAccountBalanceParam(selectedAccount);
      this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_BALANCEINQUIRY).subscribe(data => {
        console.log(data);
        var resp = data.responseParameter
        if (resp.opstatus == "00") {
          this.accBalance = data.set.records[0].ledgerBalance
          this.refreshedTime = this.datepipe.transform(new Date().toISOString(), this.DataService.timeFormat);
        }
      })
    }
  }

  onAccountSelectType() {
    if (window.innerWidth < 767) {
      this.commonMethod.openPopup('div.popup-bottom.sel-account');
    }
  }

  getToAccValue(accountType, accountNo) {
    this.accountValue = accountType.concat(" ", accountNo);
  }

  closePopup() {
    this.commonMethod.closeAllPopup();
  }

  goToPage(routeName) {
    this.router.navigateByUrl('/' + routeName);
  }

  challanTaxPaymentSubmit() {
    this.validTaxAmount = false;
    var totalAmt = parseFloat(this.challanTaxPaymentForm.value.totalAmount.replace(/[^.0-9]+/g, ''));
    if (this.challanTaxPaymentForm.valid) {
      if(totalAmt > 0){
        this.DataService.challanTaxOverviewDetails = this.challanTaxPaymentForm.value;
        if(this.DataService.challanTaxDetails.incomeTax == "" ){ this.DataService.challanTaxDetails.incomeTax = '₹ 0' }
        if(this.DataService.challanTaxDetails.surcharge == "" ){ this.DataService.challanTaxDetails.surcharge = '₹ 0' }
        if(this.DataService.challanTaxDetails.educationCess == "" ){ this.DataService.challanTaxDetails.educationCess = '₹ 0' }
        if(this.DataService.challanTaxDetails.interest == "" ){ this.DataService.challanTaxDetails.interest = '₹ 0' }
        if(this.DataService.challanTaxDetails.penalty == "" ){ this.DataService.challanTaxDetails.penalty = '₹ 0' }
        if(this.DataService.challanTaxDetails.other == "" ){ this.DataService.challanTaxDetails.other = '₹ 0' }

        var param = this.challanTaxPaymentService.oltasTransferTransactionCall(this.challanTaxPaymentForm.value, this.challanTaxDetails, this.selectedAccount, this.accBalance);
        this.DataService.request = param;
        this.DataService.endPoint = this.constant.serviceName_OLTASTRANSFERTRANSACTION;
        this.DataService.paymentDetails.debitAccount = this.selectedAccount;
        this.router.navigateByUrl('/challanPaymentOverview');
      }
      else{
        this.validTaxAmount = true;
      }
      // this.onOltasTransferTransaction();

    } else {
      this.validateForm();
    }
  }

  onOltasTransferTransaction() {
    var param = this.challanTaxPaymentService.oltasTransferTransactionCall(this.challanTaxPaymentForm.value, this.challanTaxDetails, this.selectedAccount, this.accBalance);
    this.http.callBankingAPIService(param, this.storage.getLocalStorage("deviceId"), this.constant.serviceName_OLTASTRANSFERTRANSACTION).subscribe(data => {
      console.log(data);
      var resp = data.responseParameter;
      if (resp.opstatus == "00") {
        this.goToPage('challanPaymentOverview')
      }
      else {

      }
    });
  }

  onCancel() {
    this.location.back();
  }

  /**
   * set update currency value
   * @param value
   */
  formatCurrency(value, fld) {
    this.validTaxAmount = false;
    console.log(value);
    this.formValidation.formatCurrency(value, this.challanTaxPaymentForm, fld);
    if(this.DataService.oltasForm != '26QD' && this.DataService.oltasForm != '26QC' && this.DataService.oltasForm != '26QB' ) this.addTotalAmt();
  }

  focusAmount(value, type){

    switch(type){
      case 'interest':
        this.interestModel = value.replace(/^\₹|,\d*$/gm, '')
        break ;

      case 'surcharge':
        this.surchargeModel = value.replace(/^\₹|,\d*$/gm, '')
        break ;

      case 'incomeTax':
        this.incomeTaxModel = value.replace(/^\₹|,\d*$/gm, '')
        break ;

      case 'educationCess':
        this.educationCessModel = value.replace(/^\₹|,\d*$/gm, '')
        break ;

      case 'penalty':
        this.penaltyModel = value.replace(/^\₹|,\d*$/gm, '')
        break ;

      case 'other':
        this.otherModel = value.replace(/^\₹|,\d*$/gm, '')
        break ;
    }



  }

  addTotalAmt() {
    var totalAmt = 0;
    this.amountInWordSB = "";
    if (this.challanTaxPaymentForm.value.incomeTax != "") {
      totalAmt = totalAmt + parseFloat(this.challanTaxPaymentForm.value.incomeTax.replace(/[^.0-9]+/g, ''));
    }
    if (this.challanTaxPaymentForm.value.surcharge != "") {
      totalAmt = totalAmt + parseFloat(this.challanTaxPaymentForm.value.surcharge.replace(/[^.0-9]+/g, ''));
    }
    if (this.challanTaxPaymentForm.value.educationCess != "") {
      totalAmt = totalAmt + parseFloat(this.challanTaxPaymentForm.value.educationCess.replace(/[^.0-9]+/g, ''));
    }
    if (this.challanTaxPaymentForm.value.interest != "") {
      totalAmt = totalAmt + parseFloat(this.challanTaxPaymentForm.value.interest.replace(/[^.0-9]+/g, ''));
    }
    if (this.challanTaxPaymentForm.value.penalty != "") {
      totalAmt = totalAmt + parseFloat(this.challanTaxPaymentForm.value.penalty.replace(/[^.0-9]+/g, ''));
    }
    if (this.challanTaxPaymentForm.value.other != "") {
      totalAmt = totalAmt + parseFloat(this.challanTaxPaymentForm.value.other.replace(/[^.0-9]+/g, ''));
    }

    let updatedCurrency = this.customCurrencyPipe.transform(""+totalAmt, 'decimal');
    this.challanTaxPaymentForm.patchValue({ totalAmount: "₹" + updatedCurrency  });
    this.amountInWordSB = this.commonMethod.convertNumberToWords(totalAmt);
  }


  OnInput(evn, form: FormGroup, fld) {

    var regex = new RegExp("(\\.\\d{" + 2 + "})\\d+", "g");
    evn = evn.replace(regex, '$1');

    form.patchValue({ [fld]: evn });

  }

}
