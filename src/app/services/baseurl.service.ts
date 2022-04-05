import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseurlService {

  constructor() { }
  baseUrl: string = 'http://localhost:1061/api';

  public getBaseUrl(): string {
    return this.baseUrl;
  }
}
