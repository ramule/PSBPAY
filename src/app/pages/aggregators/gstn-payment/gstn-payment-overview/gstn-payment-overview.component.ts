import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { DataService } from '../../../../services/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-gstn-payment-overview',
  templateUrl: './gstn-payment-overview.component.html',
  styleUrls: ['./gstn-payment-overview.component.scss']
})
export class GstnPaymentOverviewComponent implements OnInit {
  overviewObject: any;
  constructor(
    public DataService: DataService,
    private location: Location,
    private router: Router,
    public commonMethod: CommonMethods,
    public datePipe: DatePipe
  ) { }

  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }

  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);

    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));

    console.log('GSTN payment details: ', this.DataService.gstnPaymentDetails);
    this.overviewObject = this.DataService.gstnPaymentDetails;
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  onBackClick() {
    this.router.navigateByUrl('/gstnPayment');
  }

}
