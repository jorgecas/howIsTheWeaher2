import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';

import { CurrentWeather, DayWeather, Forecast } from '../models/weather';
import { Location } from '../models/location';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

@Injectable()
export class YahooService {
  public Name: string = 'Yahoo';
  private _key: string = '';

  private defaultQuery: string;

  constructor(private http: Http) {
    this.defaultQuery = '332471';
  }

  private getUrl(query: string, format = 'json', protocol = 'https') {
    return `${protocol}://query.yahooapis.com/v1/public/yql?q=${query}&format=${format}`;
  }

  getForecast(query: string = this.defaultQuery): Observable<any> {
    let url = this.getUrl(`select * from weather.forecast where woeid=${query}`);
    return this.http.get(url)
                    .map(this.handleForecastResponse)
                    .catch(this.handleError);
  }

  searchLocation(query: string): Observable<any> {
    let url = this.getUrl(`select name, country.code, country.content, admin1.code, admin1.content, admin2.code, admin2.content, admin3.code, admin3.content, locality1, postal.type, postal.content from geo.places where text="${query}"`);
    return this.http.get(url)
                    .map(this.handleLocationResponse)
                    .catch(this.handleError);
  }
            

  private handleForecastResponse(value: Response) {
    let result = value.json(),
        forecast: Forecast,
        current: CurrentWeather,
        days,
        units,
        windDirection;
    if(result.query && result.query.count && result.query.results.channel) {
      units = result.query.results.channel.units;
      windDirection = result.query.results.channel.wind.direction;
      windDirection =  (windDirection < 11.25) ? "N" : 
             (windDirection >= 11.25 && windDirection < 33.75) ? "NNE" :
             (windDirection >= 33.75 && windDirection < 56.25) ? "NE" :
             (windDirection >= 56.25 && windDirection < 78.75) ? "ENE" :
             (windDirection >= 78.75 && windDirection < 101.25) ? "E" :
             (windDirection >= 101.25 && windDirection < 123.75) ? "ESE" :
             (windDirection >= 123.75 && windDirection < 146.25) ? "SE" :
             (windDirection >= 146.25 && windDirection < 168.75) ? "SSE" :
             (windDirection >= 168.75 && windDirection < 191.25) ? "S" :
             (windDirection >= 191.25 && windDirection < 213.75) ? "SSW" :
             (windDirection >= 213.75 && windDirection < 236.25) ? "SW" :
             (windDirection >= 236.25 && windDirection < 258.75) ? "WSW" :
             (windDirection >= 258.75 && windDirection < 281.25) ? "W" :
             (windDirection >= 281.25 && windDirection < 303.75) ? "WNW" :
             (windDirection >= 303.75 && windDirection < 326.25) ? "NW" :
             (windDirection >= 326.25 && windDirection < 348.75) ? "NNW" : "N"

      current = new CurrentWeather(location, result.query.results.channel.item.condition.text,
                                    result.query.results.channel.item.condition.temp,
                                    result.query.results.channel.atmosphere.humidity,
                                    result.query.results.channel.wind.speed,
                                    windDirection,
                                    result.query.results.channel.atmosphere.pressure,
                                    null,
                                    new Date(result.query.created),
                                    '',
                                    units);
      days = result.query.results.channel.item.forecast.map(day => new DayWeather(day.high, day.low, day.text, null, new Date(Date.parse(day.date))));
      forecast = new Forecast(days, units) 
    }
    return {current: current, forecast: forecast};
  }

  private handleLocationResponse(value: Response ) {
    let result = value.json(),
        places = result.query && result.query.count && result.query.results.place;

    if(places && places.length) {
      return places.map(p => new Location(p.country && p.country.content, 
                                          p.country && p.country.code, 
                                          p.locality1 && p.locality1.content || p.name, 
                                          p.admin1 && p.admin1.content, 
                                          p.postal && p.postal.content,
                                          0, 0,
                                          '',
                                          p.locality1 && p.locality1.woeid || p.admin1 && p.admin1.woeid || p.country && p.country.woeid
                                          ));
    } else if (places) {
      return [new Location(places.country && places.country.content, 
                           places.country && places.country.code, 
                           places.locality1 && places.locality1.content || places.name, 
                           places.admin1 && places.admin1.code, 
                           places.postal && places.postal.content,
                          0, 0,
                          '',
                          places.locality1 && places.locality1.woeid || places.admin1 && places.admin1.woeid || places.country && places.country.woeid,
                          )
              ];
    }
    return [new Location()];
  }

  private handleError(error:any) {
    return Observable.throw(error.message && `There was an error fetching data from ${this.Name} service. ${error.message}.` || error.json().error);
  }
}