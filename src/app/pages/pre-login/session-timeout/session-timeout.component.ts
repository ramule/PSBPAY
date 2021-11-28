import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-session-timeout',
  templateUrl: './session-timeout.component.html',
  styleUrls: ['./session-timeout.component.scss']
})
export class SessionTimeoutComponent implements OnInit {
  commonPageComponent = {
    'headerType': 'preLoginHeader',
    'sidebarNAv': '',
    'footer': 'preLoginFooter',
  }
  constructor(
    public DataService: DataService,
    private location: Location,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.DataService.changeMessage(this.commonPageComponent);
    history.pushState({}, 'sessionTimeout', this.location.prepareExternalUrl('sessionTimeout'));
    history.pushState({}, 'self', this.location.prepareExternalUrl(this.router.url));
  }

  goToPage() {
    this.router.navigateByUrl('/login');
  }
}
