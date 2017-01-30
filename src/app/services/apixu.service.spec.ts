/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApixuService } from './apixu.service';

describe('ApixuService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApixuService]
    });
  });

  it('should ...', inject([ApixuService], (service: ApixuService) => {
    expect(service).toBeTruthy();
  }));
});
