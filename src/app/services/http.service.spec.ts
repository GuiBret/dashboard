import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  let httpClientStub: Partial<HttpClient>;

  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable())
  };
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

  describe('Refresh spotify token', () => {
    it('should have called the server to the correct address with the token', () => {
      service.refreshSpotifyToken('mycustomtoken');

      expect(httpClientStub.get).toHaveBeenCalledWith(environment.serverRoot + '/spotify/refresh-token/mycustomtoken');
    });
  })
});
