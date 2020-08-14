import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from 'src/app/location/location.model';

@Injectable({ providedIn: 'root' })
export class LocationService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  private locations: Location[] = [];
  private locUpdated = new Subject<Location[]>();

  getLocations() {
    this.http
      .get<{ message: string; location: any }>(
        'http://localhost:3000/api/locations'
      )
      .pipe(
        map((locData) => {
          // _id to id
          return locData.location.map((loc) => {
            return {
              id: loc._id,
              location: loc.location,
            };
          });
        })
      )
      .subscribe((transformedLocations) => {
        this.locations = transformedLocations;
        this.locUpdated.next([...this.locations]);
      });
  }

  getLocationsUpdatedListener() {
    return this.locUpdated.asObservable();
  }
}
