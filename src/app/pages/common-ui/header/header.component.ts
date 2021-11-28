import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/app.constant';
import { CommonMethods } from 'src/app/utilities/common-methods';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  commonPageComponent: any;

  constructor(
    public DataService: DataService,
    private router: Router,
    // public translate: TranslateService,
    private constant: AppConstants,
    private commonMethods: CommonMethods

  ) { }

  ngOnInit(): void {
    this.DataService.currentMessage.subscribe(message => (this.commonPageComponent = message));
  }

  goToPage(routeName : any){
    this.router.navigateByUrl('/'+routeName);
  }


  



}
