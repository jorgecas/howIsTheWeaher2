import { Component } from '@angular/core';

import { WeatherService } from './weather.service';
import { YahooService } from './services/yahoo.service';
import { ApixuService } from './services/apixu.service';

import { Location } from './models/location';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService, YahooService, ApixuService],
})
export class AppComponent {
  private _timeout;
  private _timeoutValue: number = 500;

  public Title = 'How is the weather?';
  public Forecast: string;
  public SelectedLocation: string;
  public Locations: any;
  public Services;
  public SelectedService: string;

  constructor(private _weatherService: WeatherService) {
    this.Services = this._weatherService.getServices();
    this.SelectedService = this._weatherService.getSelectedService();
  }

  getForecast(location: Location) {
      this.SelectedLocation = location.toString();
      this.Locations = [];
      this.Forecast = null;

    if(location && location.Id) {
      let forecast = this._weatherService.getForecast(location.Id);
      forecast && forecast.subscribe(result => {
        console.log(result);
        this.Forecast = result;
      });
    }
  }

  searchLocation(query: string) {
    if(query) {
      clearTimeout(this._timeout);
      this.Locations = [];
      this._timeout = setTimeout(() => {
        let locations = this._weatherService.searchLocation(query);
        locations && locations.subscribe(loc => {
          this.Locations = loc;
        });
      }, this._timeoutValue);
    }
  }

  changeProvider(provider: string) {
    this.SelectedLocation = null;
    this.Locations = [];
    this.Forecast = null;
    this._weatherService.changeProvider(provider);
    this.SelectedService = this._weatherService.getSelectedService();
  }
}
