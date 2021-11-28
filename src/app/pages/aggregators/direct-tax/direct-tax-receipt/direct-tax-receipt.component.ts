import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../../services/data.service';
import { AppConstants } from '../../../../app.constant';
import { Router } from '@angular/router';
import { CommonMethods } from 'src/app/utilities/common-methods';



@Component({
  selector: 'app-direct-tax-receipt',
  templateUrl: './direct-tax-receipt.component.html',
  styleUrls: ['./direct-tax-receipt.component.scss']
})
export class DirectTaxReceiptComponent implements OnInit {

  constructor(
    public DataService: DataService,
    private constant: AppConstants,
    private router: Router,
    public commonMethods: CommonMethods,
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
