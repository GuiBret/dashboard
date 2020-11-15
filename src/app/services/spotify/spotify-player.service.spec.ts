import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SpotifyPlayerService } from './spotify-player.service';

describe('SpotifyPlayerService', () => {
  let service: SpotifyPlayerService;
  let httpClientStub: Partial<HttpClient>;

  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable())
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useValue: httpClientStub, provide: HttpClient
        }
      ]
    });
    service = TestBed.inject(SpotifyPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Get info on playback', () => {
    it('should call the API', () => {
      service.getInfoOnPlayback();

      // FIXME : Check setting the second argument triggers an error
      expect(httpClientStub.get).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/currently-playing', jasmine.any(Object));



    });
  })
});
