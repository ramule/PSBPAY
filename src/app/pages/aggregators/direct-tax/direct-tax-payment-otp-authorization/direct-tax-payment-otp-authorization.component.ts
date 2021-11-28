import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-tax-payment-otp-authorization',
  templateUrl: './direct-tax-payment-otp-authorization.component.html',
  styleUrls: ['./direct-tax-payment-otp-authorization.component.scss']
})
export class DirectTaxPaymentOtpAuthorizationComponent implements OnInit {
 
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethods: CommonMethods,
    private http: HttpRestApiService
  ) { }
  
  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  @ViewChildren('directTaxOtpRow') directTaxOtpRows: any;

  directTaxOtp = ['otp1', 'otp2', 'otp3', 'otp4','otp5','otp6']

  otpForm : FormGroup ;

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.changeMessage(this.commonPageComponent);
  }

  buildForm(){
    this.otpForm = new FormGroup({
      otp1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      otp3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      otp6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
  }

  validateForm(){
    if(this.otpForm.invalid){
      this.otpForm.get('otp1').markAsTouched();
      this.otpForm.get('otp2').markAsTouched();
      this.otpForm.get('otp3').markAsTouched();
      this.otpForm.get('otp4').markAsTouched();
      this.otpForm.get('otp5').markAsTouched();
      this.otpForm.get('otp6').markAsTouched();
      return;
     }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  directTaxOtpSubmit(){
    if(this.otpForm.valid){
     this.goToPage('directTaxPaymentTpinAuth')
    }else{
      this.validateForm() ;
    }
  }


  onKeyUpEvent(index : any, event: any, type: any) {
    this.DataService.getOnKeyUpEvent(index, event, type, this.directTaxOtpRows, this.otpForm, this.directTaxOtp) ;
    
    }
    
    onFocusEvent(index: any, type: any){
      this.DataService.onFocusEvent(index, type, this.directTaxOtpRows)
    }
    

}
