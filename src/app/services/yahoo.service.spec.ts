/* tslint:disable:no-unused-variable */
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TestBed, async, inject } from '@angular/core/testing';

import { YahooService } from './yahoo.service';

describe('YahooService', () => {
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
        YahooService
      ]
    }).compileComponents();
  });
  it('should ...', inject([YahooService], (service: YahooService) => {
    expect(service).toBeTruthy();
  }));
});
