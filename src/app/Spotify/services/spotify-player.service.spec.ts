import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { SpotifyPlayerService } from './spotify-player.service';

describe('SpotifyPlayerService', () => {
  let service: SpotifyPlayerService;
  let httpClientStub: Partial<HttpClient>;


  const getSpy = jasmine.createSpy().and.returnValue(new Observable());
  const putSpy = jasmine.createSpy().and.returnValue(new Observable());
  const postSpy = jasmine.createSpy().and.returnValue(new Observable());



  httpClientStub = {
    get: getSpy,
    put: putSpy,
    post: postSpy,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useValue: httpClientStub, provide: HttpClient
        },
        {
          useValue: MatSnackBar, provide: MatSnackBar
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

      // FIXME : Check why setting the second argument triggers an error
      expect(httpClientStub.get).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/currently-playing', jasmine.any(Object));



    });
  });

  describe('Pause song', () => {
    it('should have set the current device on pause', () => {
      service.pauseSong();

      expect(httpClientStub.put).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/pause', {});
    });

    // TODO : handle that
    it('should have set a defined device on pause', () => {
      service.pauseSong('abc');
    });
  });

  describe('Play song', () => {
    it('should have set the current device on play', () => {
      service.playSong();

      expect(httpClientStub.put).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/play', {});
    });

    // TODO : handle that
    it('should have set a defined device on play', () => {
      service.playSong('abc');
    });
  });


  describe('Go to next song', () => {
    it('should have started the next song on the current device', () => {
      postSpy.calls.reset();
      service.goToNextSong();

      expect(httpClientStub.post).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/next', {});
    });

    // TODO : handle that
    it('should have started the next song a specific device', () => {
      postSpy.calls.reset();
      service.goToNextSong('abc');
    });
  });

  describe('Go to previous song', () => {
    it('should have started the next song on the current device', () => {
      postSpy.calls.reset();
      service.goToPreviousSong();

      expect(httpClientStub.post).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/previous', {});
    });

    // TODO : handle that
    it('should have started the next song a specific device', () => {
      postSpy.calls.reset();
      service.goToPreviousSong('abc');
    });
  });

  describe('Get info on playback', () => {
    it('should have called the API to retrieve playback info', () => {
      service.getInfoOnPlayback();

      // FIXME : Check why setting the second argument triggers an error
      expect(httpClientStub.get).toHaveBeenCalledWith('https://api.spotify.com/v1/me/player/currently-playing', jasmine.any(Object));
    });
  });

  describe('On info on playback received', () => {
    it('should have returned the info since the response is valid', () => {
      const playbackInfo = service.onInfoOnPlaybackReceived({
        status: 200,
        body: {
          item: {
            name: 'My name',
            artists: [
              {
                name: 'First artist'
              }, {
                name: 'Last artist'
              }
              ,


            ],
            album: {
              name: 'My album',
              images: [
                {url: 'https://mytesturl'}
              ]
            },


          }

        }
      });

      expect(playbackInfo.title).toEqual('My name');
      expect(playbackInfo.artist).toEqual('First artist');
      expect(playbackInfo.album).toEqual('My album');
      expect(playbackInfo.imageUrl).toEqual('https://mytesturl');

    });

    // TODO : do something else if the response is valid
    it('should not return anything since the response was not valid', () => {
      const playbackInfo = service.onInfoOnPlaybackReceived({
        status: 400
      });

      expect(playbackInfo).toEqual(undefined);
    });
  });


  describe('Set player ID', () => {
    it('should define the new player ID', () => {
      service['playerID'] = 'abcdef';
      service.setPlayerID('123456');

      expect(service['playerID']).toEqual('123456');
    });
  });


});
