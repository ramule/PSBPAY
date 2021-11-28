import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, SESSION_STORAGE } from 'ngx-webstorage-service';
import { AppConstants } from '../app.constant';
import { EncryptDecryptService } from './encrypt-decrypt.service';
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor(
    @Inject(LOCAL_STORAGE) private localStorage: StorageService,
    @Inject(SESSION_STORAGE) private sessionStorage: StorageService,
    private encryptDecrypt : EncryptDecryptService,
    private constant:AppConstants
  ) { }

  setLocalStorage(key: any, value: any) {
    let encVal = this.encryptDecrypt.encryptText(this.constant.storageEncryptKey,value);
    this.localStorage.set(key, encVal);
  }

  setPlainLocalStorage(key: any, value: any) {
    this.localStorage.set(key, value);
  }

  getPlainLocalStorage(key: any) {
    return this.localStorage.get(key);
  }

  getLocalStorage(key: any) {
    let storageKey = this.localStorage.get(key);
    return this.encryptDecrypt.decryptText(this.constant.storageEncryptKey,storageKey);
  }

  removeFromLocalStorage(key: any) {
    this.localStorage.remove(key);
  }

  clearLocalStorage() {
    this.localStorage.clear();
  }

  hasKeyLocalStorage(key: any) {
    return this.localStorage.has(key);
  }

  setSessionStorage(key: any, value: any) {
    let encVal = this.encryptDecrypt.encryptText(this.constant.storageEncryptKey,value);
    this.sessionStorage.set(key, encVal);
  }

  getSessionStorage(key: any) {
    let storageKey = this.sessionStorage.get(key);
    return this.encryptDecrypt.decryptText(this.constant.storageEncryptKey,storageKey);
  }

  hasKeySessionStorage(key: any) {
    return this.sessionStorage.has(key);
  }

  removeFromSessionStorage(key: any) {
    this.sessionStorage.remove(key);
  }

  clearSessionStorage() {
    this.sessionStorage.clear();
  }

}
