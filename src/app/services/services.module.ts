import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpRestApiService } from './http-rest-api.service';
import { DataService } from './data.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
  providers:[
    HttpRestApiService,
    DataService,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ServicesModule { }
