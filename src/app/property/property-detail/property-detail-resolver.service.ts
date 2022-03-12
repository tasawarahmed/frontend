import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root',
})
export class PropertyDetailResolverService implements Resolve<Property> {
  constructor(private router: Router, private housingService: HousingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Property> | Property {
    const propID = route.params['id'];
    return this.housingService.getProperty(+propID).pipe(
      catchError(error => {
        (<any>this.router).navigate(['/']);
        return of(null);
      })
    );
  }
}
