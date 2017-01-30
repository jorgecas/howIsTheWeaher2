import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { CurrentWeather, DayWeather, Forecast } from '../models/weather';
import { Location } from '../models/location';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class YahooService {
  public Name: string = 'Yahoo';
  private _key: string = '';

  private defaultQuery: Location;

  constructor(private http: Http) {
    this.defaultQuery = new Location(null, null, null, null, null,null, null, null, '332471');
  }

  private getUrl(query: string, format = 'json', protocol = 'https') {
    return `${protocol}://query.yahooapis.com/v1/public/yql?q=${query}&format=${format}`;
  }

  getForecast(query: Location = this.defaultQuery): Observable<any> {
    let url = this.getUrl(`select * from weather.forecast where woeid=${query.Id}`);
    return this.http.get(url)
                    .map(this.handleForecastResponse)
                    .catch(this.handleError);

  }

  searchLocation(query: string): Observable<any> {
    let url = this.getUrl(`select country.code, country.content, admin1.code, admin1.content, admin2.code, admin2.content, admin3.code, admin3.content, locality1, postal.type, postal.content from geo.places where text="${query}"`);
    return this.http.get(url)
                    .map(this.handleLocationResponse)
                    .catch(this.handleError);
  }

  private handleForecastResponse(value: Response) {
    let result = value.json(),
        forecast = result.query && result.query.count && result.query.results.channel;
    if(forecast){
        return forecast;
    }
    return null;
  }

  private handleLocationResponse(value: Response ) {
    let result = value.json(),
        places = result.query && result.query.count && result.query.results.place;

    if(places && places.length) {
      return places.map(p => new Location(p.country && p.country.content, p.country && p.country.code, 
                                          p.admin1 && p.admin1.content, p.admin && p.admin1.code, 
                                          p.postal && p.postal.content,
                                          0, 0,
                                          p.locality1 && p.locality1.woeid,
                                          ''));
    } else if (places) {
      return [new Location(places.country && places.country.content, places.country && places.country.code, 
                          places.admin1 && places.admin1.content, places.admin && places.admin1.code, 
                          places.postal && places.postal.content,
                          0, 0,
                          places.locality1 && places.locality1.woeid,
                          '')
              ];
    }
    return [new Location()];
  }

  private handleError(error:any) {
    return Observable.throw(error.json().error || `There was an error fetching data from ${this.Name} service`);
  }
}