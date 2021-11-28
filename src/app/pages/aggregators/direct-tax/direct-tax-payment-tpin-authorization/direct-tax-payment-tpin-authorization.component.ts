import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-tax-payment-tpin-authorization',
  templateUrl: './direct-tax-payment-tpin-authorization.component.html',
  styleUrls: ['./direct-tax-payment-tpin-authorization.component.scss']
})
export class DirectTaxPaymentTpinAuthorizationComponent implements OnInit {


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

 
  @ViewChildren('directTaxTpinRow') directTaxTpinRows: any;

  directTaxTpin = ['tpin1', 'tpin2', 'tpin3', 'tpin4','tpin5','tpin6']

  tpinForm : FormGroup ;

  ngOnInit(): void {
    this.buildForm() ;
    this.DataService.changeMessage(this.commonPageComponent);
  }

  buildForm(){
    this.tpinForm = new FormGroup({
      tpin1: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      tpin2: new FormControl('', [Validators.required, Validators.maxLength(1)]),
      tpin3: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      tpin4: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      tpin5: new FormControl('', [Validators.required,Validators.maxLength(1)]),
      tpin6: new FormControl('', [Validators.required,Validators.maxLength(1)]),
    });
  }

  validateForm(){
    if(this.tpinForm.invalid){
      this.tpinForm.get('tpin1').markAsTouched();
      this.tpinForm.get('tpin2').markAsTouched();
      this.tpinForm.get('tpin3').markAsTouched();
      this.tpinForm.get('tpin4').markAsTouched();
      this.tpinForm.get('tpin5').markAsTouched();
      this.tpinForm.get('tpin6').markAsTouched();
      return;
     }
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  directTaxTpinSubmit(){
    if(this.tpinForm.valid){
      this.goToPage('directTaxPaymentReceipt')
    }else{
      this.validateForm() ;
    }
  }


  onKeyUpEvent(index : any, event: any, type: any) {
    this.DataService.getOnKeyUpEvent(index, event, type, this.directTaxTpinRows, this.tpinForm, this.directTaxTpin) ;
    
    }
    
    onFocusEvent(index: any, type: any){
      this.DataService.onFocusEvent(index, type, this.directTaxTpinRows)
    }
    

}

