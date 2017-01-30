/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { YahooService } from './yahoo.service';

describe('YahooService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YahooService]
    });
  });

  it('should ...', inject([YahooService], (service: YahooService) => {
    expect(service).toBeTruthy();
  }));
});
