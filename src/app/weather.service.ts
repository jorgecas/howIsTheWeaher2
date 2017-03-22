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
  private _selectedService: any;
  
  constructor(private _apixu: ApixuService, private _yahoo: YahooService) {
    this.services = [_apixu, _yahoo];
    this._selectedService = _yahoo;
   }

   getServices () {
     return this.services.map(s => s.Name);
   }
   getSelectedService () {
     return this._selectedService.Name;
   }

   getForecast(query?: string): Observable<any> {
     if(query) {
      return this._selectedService.getForecast(query);
    }
   }
   
   searchLocation(query?: string): Observable<any> {
     if(query) {
       return this._selectedService.searchLocation(query);
     }
   }
   
   changeProvider(provider?: string) {
     this._selectedService = this.services.find(s => s.Name === provider) || this.services[0];
   }
}
