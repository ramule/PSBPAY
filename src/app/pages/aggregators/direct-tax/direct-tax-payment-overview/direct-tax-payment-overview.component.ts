import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { HttpRestApiService } from 'src/app/services/http-rest-api.service';
import { Observable, Subject } from 'rxjs';
import { Form, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-direct-tax-payment-overview',
  templateUrl: './direct-tax-payment-overview.component.html',
  styleUrls: ['./direct-tax-payment-overview.component.scss']
})
export class DirectTaxPaymentOverviewComponent implements OnInit {

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


  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

}
