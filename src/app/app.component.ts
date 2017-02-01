import { Component } from '@angular/core';

import { WeatherService } from './weather.service';
import { YahooService } from './services/yahoo.service';
import { ApixuService } from './services/apixu.service';

import { Location } from './models/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService, YahooService, ApixuService]
})
export class AppComponent {
  private _timeout;
  private _timeoutValue: number = 500;

  public Title = 'How is the weather';
  public Forecast: string;
  public Location: string;
  public Locations: any;
  public Services;

  constructor(private _weatherService: WeatherService) {
    this.Services = this._weatherService.getServices();
  }

  getForecast(location: Location) {
    if(location && location.Id) {
      this.Location = location.toString();
      this.Locations = [];

      let forecast = this._weatherService.getForecast(location.Id);
      forecast.subscribe(v => {
        this.Forecast = JSON.stringify(v);
      });
    }
  }

  searchLocation(query: string) {
    if(query) {
      clearTimeout(this._timeout);
      this._timeout = setTimeout(() => {
        let locations = this._weatherService.searchLocation(query);
        locations && locations.subscribe(loc => {
          this.Locations = loc;
        });
      }, this._timeoutValue);
    }
  }

  changeProvider(provider: string) {
    this.Location = null;
    this.Forecast = null;
    this._weatherService.changeProvider(provider);
  }
}
