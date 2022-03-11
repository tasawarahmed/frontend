import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPropertyBase } from '../model/ipropertybase';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getAllProperties(SellRent?: number): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<IPropertyBase> = [];
        const localProperties = JSON.parse(localStorage.getItem('newProp'));

        if (localProperties) {
          for (const id in localProperties) {
            if (SellRent) {
              if (
                data.hasOwnProperty(id) &&
                localProperties[id].SellRent === SellRent
              ) {
                propertiesArray.push(localProperties[id]);
              }
            } else{
              propertiesArray.push(localProperties[id]);
            }

          }
        }

        for (const id in data) {
          if(SellRent){
            if (data.hasOwnProperty(id) && data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
            }else{
              propertiesArray.push(data[id]);
            }

        }
        return propertiesArray;
      })
    );
  }
  getUnfilteredProperties(): Observable<IPropertyBase[]> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<IPropertyBase> = [];
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
    return this.getAllProperties().pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.Id === id)
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
