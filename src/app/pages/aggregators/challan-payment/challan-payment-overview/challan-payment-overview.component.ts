import { Component, OnInit, ViewChildren } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';
import { Location } from '@angular/common';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-challan-payment-overview',
  templateUrl: './challan-payment-overview.component.html',
  styleUrls: ['./challan-payment-overview.component.scss']
})
export class ChallanPaymentOverviewComponent implements OnInit {

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

    console.log('challan tax payment details: ', this.DataService.challanTaxOverviewDetails);
    this.overviewObject = this.DataService.challanTaxOverviewDetails;
  }

  goToPage(routeName){
    this.router.navigateByUrl('/'+routeName);
  }

  onBackClick() {
    this.router.navigateByUrl('/challanTaxPayment');
  }

}
