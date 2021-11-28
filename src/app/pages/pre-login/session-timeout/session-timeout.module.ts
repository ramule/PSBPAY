import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { SessionTimeoutRoutingModule } from './session-timeout-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule,
    SessionTimeoutRoutingModule
  ]
})
export class SessionTimeoutModule { }
