import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CurrentweatherComponent } from './currentweather/currentweather.component';
import { ForecastweatherComponent } from './forecastweather/forecastweather.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrentweatherComponent,
    ForecastweatherComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
