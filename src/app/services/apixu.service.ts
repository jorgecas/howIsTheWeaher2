import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { CurrentWeather, DayWeather, Forecast } from '../models/weather';
import { Location } from '../models/location';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApixuService {
  public Name: string = 'Apixu';

  private _key: string = 'a885581ca7e4469faa8221724171501';
  private _defaultQuery: string;

  constructor(private http: Http) {
    this._defaultQuery = 'auto:ip';
  }

  private getUrl(query: string, request = 'forecast', format = 'json', protocol = 'https') {
    return `${protocol}://api.apixu.com/v1/${request}.${format}?key=${this._key}&q=${query}`;
  }

  getForecast(query = this._defaultQuery): Observable<any> {
    let url = this.getUrl(query, 'forecast');
    return this.http.get(url)
                    .map(this.handleForecastResponse)
                    .catch(this.handleError);

  }

  searchLocation(query: string = this._defaultQuery): Observable<any> {
    let url = this.getUrl(query, 'search');
    return this.http.get(url)
                    .map(this.handleLocationResponse)
                    .catch(this.handleError);
  }

  private handleForecastResponse(value: Response ){
    let result = value.json(),
        location,
        current,
        forecast,
        units;
    if(result) {
      if(result.location) {
        location = new Location(result.location.country, null, result.location.name, result.location.region, null, result.location.lat, result.location.lon, null, result.location.tz_id);
      }
      if(result.current) {
        units = {
          distance: 'mi',
          pressure: 'in',
          speed: 'mph',
          temperature: 'F'
        };
        current = new CurrentWeather(location, result.current.condition.text, result.current.temp_f, result.current.humidity, 
                              result.current.wind_mph, result.current.wind_dir, result.current.pressure_in, 
                              result.current.precip_in, new Date(result.current.last_updated), result.current.condition.icon, units);
      }
      if(result.forecast) {
        let days = result.forecast.forecastday.map(day => new DayWeather(day.day.maxtemp_f, day.day.mintemp_f, day.day.condition.text, day.day.condition.icon, new Date(Date.parse(day.date))));
        forecast = new Forecast(days);
      }
      return {current: current, forecast: forecast };
    }
    return {current: null, forecast: null };
  }

  private handleLocationResponse(value: Response ){
    let result = value.json();
    if(result && result.length) {
      return result.map(p => {
        let location = p.name.split(', ');
        return new Location(location[2], null, location[0], p.region, null, 0, 0, null, p.name)
      });
    }
    return [new Location()];
  }

  private handleError(error:any) {
    return Observable.throw((error.json && error.json().error) || `There was an error fetching data from ${this.Name} service`);
  }

}
