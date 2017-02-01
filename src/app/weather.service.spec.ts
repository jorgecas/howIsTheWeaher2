/* tslint:disable:no-unused-variable */
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TestBed, async, inject } from '@angular/core/testing';
import { WeatherService } from './weather.service';

import { ApixuService } from './services/apixu.service';
import { YahooService } from './services/yahoo.service';

describe('WeatherService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backendInstance: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backendInstance, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        WeatherService,
        ApixuService,
        YahooService
      ]
    }).compileComponents();
  });

    it('should have a assign a default provider if an invalid one is selected', inject([WeatherService], (service: WeatherService) => {
    service.changeProvider('Invalid');

    const selectedService = service.getSelectedService();
    expect(selectedService).toBeTruthy();
  }));
});
