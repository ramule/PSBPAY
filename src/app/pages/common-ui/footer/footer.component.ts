import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Router } from '@angular/router';
// import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from 'src/app/app.constant';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  commonPageComponent: any;

  constructor(
    public DataService: DataService,
    private router: Router,
    // public translate: TranslateService,
    private constant: AppConstants
  ) { }


  ngOnInit(): void {
    this.DataService.currentMessage.subscribe(message => (this.commonPageComponent = message));
  }

}
