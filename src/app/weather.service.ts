import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Location } from './models/location'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApixuService } from './services/apixu.service';
import { YahooService } from './services/yahoo.service';

@Injectable()
export class WeatherService {
  public services = [];
  private selectedService: any;
  constructor(private _apixu: ApixuService, private _yahoo: YahooService) {
    this.services = [_apixu, _yahoo];
    this.selectedService = _yahoo;
   }

   getServices () {
     return this.services.map(s => s.Name);
   }

   getForecast(query?: string): Observable<any> {
     return this.selectedService.getForecast();
   }

   searchLocation(query?: string): Observable<any> {
     if(query) {
      return this.selectedService.searchLocation(query);
    }
   }
}
