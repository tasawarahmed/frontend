import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { BaseurlService } from './baseurl.service';
import { Ikeyvaluepair } from '../model/Ikeyvaluepair';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient, private baseurl: BaseurlService) {}
  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>(this.baseurl.getBaseUrl() +  '/city');
  }

  getPropertyTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseurl.getBaseUrl() +  '/propertytype/list');
  }
  getFurnishingTypes(): Observable<Ikeyvaluepair[]> {
    return this.http.get<Ikeyvaluepair[]>(this.baseurl.getBaseUrl() +  '/furnishingtype/list');
  }

  getAllProperties(SellRent?: number): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseurl.getBaseUrl() + '/property/list/' + SellRent.toString());
  }

  getUnfilteredProperties(): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];
        for (const id in data) {
          if (data.hasOwnProperty(id)) {
            propertiesArray.push(data[id]);
          }
        }
        return propertiesArray;
      })
    );
  }

  //Test method to test the file upload functionality. This method can upload single or multiple files.
  addProperty1(formData: FormData): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseurl.getBaseUrl() + '/property/add1', formData, httpOptions );
  }


  addProperty(property: Property): Observable<any> {
    console.log(property);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + localStorage.getItem('token')
      })
    };
    return this.http.post(this.baseurl.getBaseUrl() + '/property/add', property, httpOptions );
  }

  getProperty(id: number) {
    return this.http.get<Property>(this.baseurl.getBaseUrl() + '/property/detail/' + id.toString())
  }

  newPropID(): number {
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return +localStorage.getItem('PID');
    }
  }

  getPropertyAge(dateOfEstablishment: string): string {
    const today = new Date();
    const estDate = new Date(dateOfEstablishment);
    let age = today.getFullYear() - estDate.getFullYear();
    const m = today.getMonth() - estDate.getMonth();

    if (m < 0 || m ===0 && today.getDate() < estDate.getDate()){
      age--;
    }

    if (today < estDate){
      return this.getPropertyAgeString(0);
    }

    if (age === 0){
      return 'Less than a year';
    }

    return this.getPropertyAgeString(age);
  }

  getPropertyAgeString(age: number): string {

    if (age <= 0){
      return 'Less than a year';
    } else {
      return age.toString() + ' years';
    }
  }

  getPropertySellRentString(sellRent: number): string{
    if (sellRent === 1) {
      return 'Buy';
    }
    else{
      return 'Rent';
    }
  }
}
