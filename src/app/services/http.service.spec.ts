import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpClientStub: Partial<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {useValue: httpClientStub, provide: HttpClient}
      ]
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
