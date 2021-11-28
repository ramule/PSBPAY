import { Injectable } from '@angular/core';
import { HttpRestApiService } from './http-rest-api.service';
import { AppConstants } from '../app.constant';
import { CommonMethods } from '../utilities/common-methods';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  langJsonData: any = {};
  langData: any = {};
  enLangJSON: any;

  constructor(
    private http: HttpRestApiService,
    private constant: AppConstants,
    private commonMethod: CommonMethods,
    private dataService : DataService
  ) { }



}
