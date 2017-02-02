import { Component, Input, OnInit } from '@angular/core';

import { CurrentWeather } from '../models/weather';

@Component({
  selector: 'app-currentweather',
  templateUrl: './currentweather.component.html',
  styleUrls: ['./currentweather.component.css']
})
export class CurrentweatherComponent implements OnInit {
  @Input() Weather: CurrentWeather;
  constructor(weather: CurrentWeather) {

   }

  ngOnInit() {
  }

}
