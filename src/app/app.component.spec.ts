/* tslint:disable:no-unused-variable */
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { FormsModule } from '@angular/forms';
import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';

import { WeatherService } from './weather.service';
import { Location } from './models/location';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [
        AppComponent
      ],
      providers: [
        Http,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        WeatherService]
    })
    .compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have a valid WeatherService instance', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component._weatherService).toBeTruthy();
  }));

  it('should have a WeatherService instance with at least two providers', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    expect(component._weatherService).toBeTruthy();
    expect(component._weatherService.getServices().length).toBeGreaterThanOrEqual(2);
  }));

  it('should blank Location, Locations and Forecast result if selected provider changes', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    component.changeProvider('Yahoo');
    component.SelectedLocation = 'Location';
    component.Forecast = 'Forecast';
    
    fixture.detectChanges();

    expect(component.SelectedLocation).toEqual('Location');
    expect(component.Forecast).toEqual('Forecast');

    component.changeProvider('Apixu');
    expect(component.SelectedLocation).toBeNull();
    expect(component.Locations.length).toEqual(0);
    expect(component.Forecast).toBeNull();
  }));

  it('should call only once to searchLocation from the service within half a second', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    const location = 'Location';

    spyOn(component._weatherService, 'searchLocation');

    component.searchLocation(location);
    component.searchLocation(location);
    setTimeout(function() {
      expect(component._weatherService.searchLocation).toHaveBeenCalledTimes(1);
    }, 510);
  }));

  it('should not call searchLocation from the service if parameter is empty', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;

    spyOn(component._weatherService, 'searchLocation');

    component.searchLocation();
    setTimeout(function() {
      expect(component._weatherService.searchLocation).toHaveBeenCalledTimes(0);
    }, 510);
  }));

  it('should not call getForecast from the service if parameter is null, undefined or have null or undefined Id', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    const location = new Location();
    
    spyOn(component._weatherService, 'getForecast');

    component.getForecast();
    component.getForecast(null);
    component.getForecast(location);
    expect(component._weatherService.getForecast).toHaveBeenCalledTimes(0);
  }));

  it('should call getForecast from the service if parameter is not null or undefined and does not have null or undefined Id', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const component = fixture.debugElement.componentInstance;
    
    let location = new Location(null, null, null, null, null, 0, 0, null, 'Id');
    spyOn(component._weatherService, 'getForecast');
    component.getForecast(location);
    expect(component._weatherService.getForecast).toHaveBeenCalled();
  }));
});
