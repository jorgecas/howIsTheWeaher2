/* tslint:disable:no-unused-variable */
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

import { TestBed, async, inject } from '@angular/core/testing';

import { ApixuService } from './apixu.service';

describe('ApixuService', () => {
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
        ApixuService
      ]
    }).compileComponents();
  });
  it('should ...', inject([ApixuService], (service: ApixuService) => {
    expect(service).toBeTruthy();
  }));
});
