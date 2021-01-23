import { HttpClient, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

import { SpotifyInterceptor } from './spotify.interceptor';

describe('SpotifyInterceptor', () => {
  let httpServiceStub: Partial<HttpService>;

  const refreshSpotifyTokenSpy = jasmine.createSpy().and.returnValue(new Observable());
  httpServiceStub = {
    refreshSpotifyToken: refreshSpotifyTokenSpy
  };
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SpotifyInterceptor,
      {
        useValue: httpServiceStub, provide: HttpService
      }
      ]
  }));

  it('should be created', () => {
    const interceptor: SpotifyInterceptor = TestBed.inject(SpotifyInterceptor);
    expect(interceptor).toBeTruthy();
  });

  it('should not pass the request since it\'s not in its scope', () => {
    const interceptor: SpotifyInterceptor = TestBed.inject(SpotifyInterceptor);
    const request = new HttpRequest('GET', 'https://myrandomurl.com');
    const nextMockObj = {
      handle: jasmine.createSpy()
    };
    interceptor.intercept(request, nextMockObj);

    expect(nextMockObj.handle).toHaveBeenCalledWith(request);


  });

  it('should simply have added the token since it\'s a spotify request and we have a token', () => {
    const interceptor: SpotifyInterceptor = TestBed.inject(SpotifyInterceptor);
    const request = new HttpRequest('GET', 'https://test.spotify.com');
    localStorage.setItem('spotifyExp', ((new Date().getTime()) + 1000).toString());
    localStorage.setItem('spotifyToken', ((new Date().getTime()) + 1000).toString());

    const nextMockObj = {
      handle: jasmine.createSpy()
    };

    interceptor.intercept(request, nextMockObj);
  });

  it('should have called the function refreshing the token since the expiration date is passed', () => {
    const interceptor: SpotifyInterceptor = TestBed.inject(SpotifyInterceptor);
    const request = new HttpRequest('GET', 'https://test.spotify.com');
    localStorage.setItem('spotifyExp', ((new Date().getTime()) - 1000).toString());
    localStorage.setItem('spotifyRefresh', 'refresh');

    const nextMockObj = {
      handle: jasmine.createSpy()
    };

    interceptor.intercept(request, nextMockObj).subscribe(() => {
      expect(refreshSpotifyTokenSpy).toHaveBeenCalledWith('refresh');
    });


  });
});
