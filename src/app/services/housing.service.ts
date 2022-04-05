import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';
import { BaseurlService } from './baseurl.service';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient, private baseurl: BaseurlService) {}
  getAllCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:1061/api/city');
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

  addProperty(property: Property) {
    let newProp: Array<Property> = [property];

    if (localStorage.getItem('newProp')) {
      newProp = [property, ...JSON.parse(localStorage.getItem('newProp'))];
    }

    localStorage.setItem('newProp', JSON.stringify(newProp));
  }

  getProperty(id: number) {
    return this.getAllProperties(1).pipe(
      map(propertiesArray => {
        // throw new Error('some error');
        // console.log(Error);
        return propertiesArray.find(p => p.id === id)
      })
    );
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
}
