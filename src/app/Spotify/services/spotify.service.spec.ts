import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { SpotifyService } from './spotify.service';

describe('SpotifyService', () => {
  let service: SpotifyService;
  let httpClientStub: Partial<HttpClient>;

  const putSpyObj = jasmine.createSpy().and.returnValue(new Observable());
  const getSpyObj = jasmine.createSpy().and.returnValue(new Observable());
  httpClientStub = {
    get: getSpyObj,
    put: putSpyObj
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {provide: HttpClient, useValue: httpClientStub}
      ]
    });
    service = TestBed.inject(SpotifyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Make autocomplete', () => {
    it('should pass all cases', () => {
      getSpyObj.calls.reset();
      service.fetchAutocomplete('test', {albums: true, songs: false, artists: false});

      expect(httpClientStub.get).toHaveBeenCalledWith(environment.serverRoot + '/spotify/autocomp/test?type=album');

      getSpyObj.calls.reset();
      service.fetchAutocomplete('test', {albums: true, songs: true, artists: false});

      expect(httpClientStub.get).toHaveBeenCalledWith(environment.serverRoot + '/spotify/autocomp/test?type=album,track');

      getSpyObj.calls.reset();
      service.fetchAutocomplete('test', {albums: true, songs: false, artists: true});

      expect(httpClientStub.get).toHaveBeenCalledWith(environment.serverRoot + '/spotify/autocomp/test?type=album,artist');

      getSpyObj.calls.reset();
      service.fetchAutocomplete('test', {albums: true, songs: true, artists: true});

      expect(httpClientStub.get).toHaveBeenCalledWith(environment.serverRoot + '/spotify/autocomp/test?type=album,artist,track');
    });
  });

  describe('Play element', () => {
    it('should have made PUT request with an attribute "uri" since we are trying to play a song', () => {
      putSpyObj.calls.reset();
      service.playElement('randomuri', 'track');
      expect(httpClientStub.put).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/play', {uris: ['randomuri']});
    });

    it('should have made PUT request with an attribute "context_uri" since we are trying to play an album (same for an album)', () => {
      putSpyObj.calls.reset();
      service.playElement('randomuri', 'album');
      expect(httpClientStub.put).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/play', {context_uri: 'randomuri'});
    });
  });




});
