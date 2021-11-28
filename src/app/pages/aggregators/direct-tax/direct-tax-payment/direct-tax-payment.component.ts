import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-direct-tax-payment',
  templateUrl: './direct-tax-payment.component.html',
  styleUrls: ['./direct-tax-payment.component.scss']
})
export class DirectTaxPaymentComponent implements OnInit {

  
  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethod: CommonMethods,
    private http: HttpRestApiService
  ) { }

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  accountList =[
    { 'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9897'},
    {'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9898'},
    {'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9899'},
    {'accoutType': 'Saving Account', 'accountNo' : 'XXX XXX 9890'},
  ] ;

  accountValue : any = '';
  directTaxPaymentForm : FormGroup ;

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.changeMessage(this.commonPageComponent);
  }

  buildForm(){
    this.directTaxPaymentForm = new FormGroup({
      tax: new FormControl('', [Validators.required]),
      surcharge: new FormControl('',[Validators.required]),
      educationCess: new FormControl('', [Validators.required ]),
      interest: new FormControl('', [Validators.required]),
      penalty: new FormControl('', [Validators.required ]),
      other: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required]),
      payment: new FormControl('', [Validators.required]) ,
      datepicker1: new FormControl('', [Validators.required]) 
    }
      );

  }

  validateForm(){
    if (this.directTaxPaymentForm.invalid ) {
      this.directTaxPaymentForm.get('tax').markAsTouched();
      this.directTaxPaymentForm.get('surcharge').markAsTouched();
      this.directTaxPaymentForm.get('educationCess').markAsTouched();
      this.directTaxPaymentForm.get('interest').markAsTouched();
      this.directTaxPaymentForm.get('penalty').markAsTouched();
      this.directTaxPaymentForm.get('other').markAsTouched();
      this.directTaxPaymentForm.get('totalAmount').markAsTouched();
      this.directTaxPaymentForm.get('payment').markAsTouched();
      this.directTaxPaymentForm.get('datepicker1').markAsTouched();


      return;
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

  directTaxPaymentSubmit(){
    if(this.directTaxPaymentForm.valid){
      this.goToPage('directTaxPaymentOverview')
    }else{
      this.validateForm() ;
    }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
