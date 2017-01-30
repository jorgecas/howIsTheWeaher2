import { Component } from '@angular/core';

import { WeatherService } from './weather.service';
import { YahooService } from './services/yahoo.service';
import { ApixuService } from './services/apixu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [WeatherService, YahooService, ApixuService]
})
export class AppComponent {
  private timeout;

  public title = 'app works!';
  public Forecast: string;
  public Location: string;
  public Locations: any;

  constructor(private weatherService: WeatherService) {

  }

  getForecast(query: string) {

    this.Location = query;
    this.Locations = [];

    let forecast = this.weatherService.getForecast(query);
    forecast.subscribe(v => {
      this.Forecast = JSON.stringify(v);
    })
  }

  searchLocation(query: string) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let locations = this.weatherService.searchLocation(query);
      locations && locations.subscribe(loc => {
        this.Locations = loc;
      });
    }, 1000);
  }
}
