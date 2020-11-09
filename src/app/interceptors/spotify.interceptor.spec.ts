import { HttpClient } from '@angular/common/http';
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
});
