import { HttpClient, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SpotifyInterceptor } from './spotify.interceptor';

describe('SpotifyInterceptor', () => {
  let httpClientStub: Partial<HttpClient>;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpotifyInterceptor,
      {
        useValue: httpClientStub, provide: HttpClient
      }
      ]
  }));

  it('should be created', () => {
    const interceptor: SpotifyInterceptor = TestBed.inject(SpotifyInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not pass the request since it\'s not in its scope', () => {
    const interceptor: SpotifyInterceptor = TestBed.inject(SpotifyInterceptor);
    let request = new HttpRequest('GET', 'https://myrandomurl.com');
    const nextMockObj = {
      handle: jasmine.createSpy()
    }
    interceptor.intercept(request, nextMockObj);

    expect(nextMockObj.handle).toHaveBeenCalledWith(request);


  });

  // it('should simply have added the token since it\'s a spotify request and we have a token', () => {
  //   let request = new HttpRequest('GET', 'https://test.spotify.com');


  // });
});
