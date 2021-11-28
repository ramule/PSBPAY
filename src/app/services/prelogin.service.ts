import { Injectable } from '@angular/core';

import { AppConstants } from '../app.constant';
import { CommonMethods } from '../utilities/common-methods';
import { HttpRestApiService } from './http-rest-api.service';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class PreloginService {
  data: any = {};
  langData: any ={}
  languageVersion = "";

  constructor( private constant:AppConstants,
    private httpCall:HttpRestApiService,
    private commonMethod: CommonMethods,
    private storage: LocalStorageService) { }



}
