import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Song } from 'src/app/Spotify/services/song';
import { PlaybackMetadata } from '../../interfaces/playback-metadata.interface';
import { DurationPipe } from '../../pipes/duration.pipe';
import { RepeatModeIconPipe } from '../../pipes/repeat-mode-icon.pipe';
import { SpotifyPlayerService } from '../../services/spotify-player.service';
import { SpotifyService } from '../../services/spotify.service';

import { SpotifyPlayerComponent } from './spotify-player.component';

describe('SpotifyPlayerComponent', () => {
  let component: SpotifyPlayerComponent;
  let fixture: ComponentFixture<SpotifyPlayerComponent>;
  let httpClientStub: Partial<HttpClient>;
  let spotifyPlayerSvcStub: Partial<SpotifyPlayerService>;
  let spotifySvcStub: Partial<SpotifyService>;


  const mockPlaySong = jasmine.createSpy().and.returnValue(new Observable());
  const mockPauseSong = jasmine.createSpy().and.returnValue(new Observable());

  spotifyPlayerSvcStub = {
    getInfoOnPlayback: jasmine.createSpy().and.returnValue(new Observable()),
    goToPreviousSong: jasmine.createSpy().and.returnValue(new Observable()),
    goToNextSong: jasmine.createSpy().and.returnValue(new Observable()),
    onPlaybackMetadataChanged: new Observable(),
    playSong: mockPlaySong,
    pauseSong: mockPauseSong,
    setVolume: jasmine.createSpy()

  }

  spotifySvcStub = {
    onPlaybackChanged: new Observable()
  };

  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable())
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyPlayerComponent, DurationPipe, RepeatModeIconPipe ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: spotifyPlayerSvcStub, provide: SpotifyPlayerService},
        {useValue: spotifySvcStub, provide: SpotifyService},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  describe('Go to previous song', () => {
    it('should have called spotify player service', () => {
      component.goToPreviousSong();

      expect(spotifyPlayerSvcStub.goToPreviousSong).toHaveBeenCalled();
    });
  });

  describe('Go to next song', () => {
    it('should have called spotify player service', () => {
      component.goToNextSong();

      expect(spotifyPlayerSvcStub.goToNextSong).toHaveBeenCalled();
    });
  });

  describe('On click play pause', () => {
    it('should have subscribed to pauseSong since we are currently playing', () => {

      component['playIntervalID'] = new Observable().subscribe(() => {});
      mockPlaySong.calls.reset();
      mockPauseSong.calls.reset();

      component.currPlayerStatus = true;
      component.onClickPlayPause();


      expect(mockPauseSong).toHaveBeenCalled();
      expect(component['playIntervalID'].closed).toBe(false);
    });

    it('should have subscribed to playSong since we are currently on pause', () => {

      mockPlaySong.calls.reset();
      mockPauseSong.calls.reset();

      component.currPlayerStatus = false;
      component.onClickPlayPause();

      // expect(mockPauseSong).toHaveBeenCalled();
      expect(mockPlaySong).toHaveBeenCalled();
    });
  });


  describe('On previous or next song triggered', () => {
    it('should have tried to retrieve the playback info from the server', () => {
      spyOn(component, 'getPlaybackInfo');
      component.onPreviousOrNextSongTriggered();

      expect(component.getPlaybackInfo).toHaveBeenCalled();
    });
  });

  describe('Set current song', () => {
    it('should have defined the provided song as component.song', () => {
      const mockSong: Song = {
        title: 'My title',
        artist: 'My artist',
        album: 'My album',
        imageUrl: '',
      }
      component.setCurrentSong(mockSong);

      expect(component.song).toEqual(mockSong);
    })
  });

  describe("Update playback metadata", () => {

    it('should not have unsubscribed to the play interval ID and recalculated everything per the info', () => {
      component['playIntervalID'] = null;
      component['songDuration'] = 250;
      component['currentSongPosition'] = 12;
      component['currPlayerStatus'] = true;

      const playbackInfo: PlaybackMetadata = {
        duration: 40000,
        position: 2000,
        paused: true,
        repeat_mode: 0,
        shuffle: false
      };

      component.updatePlaybackMetadata(playbackInfo);

      expect(component.songDuration).toEqual(40);
      expect(component.currentSongPosition).toEqual(2);
      expect(component.currPlayerStatus).toEqual(false);

    });

    it('should have recreated the play interval ID and recalculated everything per the info', () => {
      const mockPlayIntervalID = new Observable().subscribe(() => {});
      component['playIntervalID'] = mockPlayIntervalID;
      component['songDuration'] = 250;
      component['currentSongPosition'] = 12;
      component['currPlayerStatus'] = true;

      const playbackInfo: PlaybackMetadata = {
        duration: 40000,
        position: 2000,
        paused: true,
        repeat_mode: 0,
        shuffle: false
      };

      component.updatePlaybackMetadata(playbackInfo);

      expect(component['playIntervalID']).not.toEqual(mockPlayIntervalID);
      expect(component.songDuration).toEqual(40);
      expect(component.currentSongPosition).toEqual(2);
      expect(component.currPlayerStatus).toEqual(false);

    });
  });

  describe('Set volume', () => {
    it('should have called the service which will set the volume', () => {
      component['volume'] = 27;

      component.setVolume();

      expect(spotifyPlayerSvcStub.setVolume).toHaveBeenCalledWith(27);


    });
  });

  describe('Update timer', () => {
    it('should not do anything since the player is currently paused', () => {
      component.currPlayerStatus = false;
      component.currentSongPosition = 25;
      component['updateTimer']();

      expect(component.currPlayerStatus).toEqual(false);
      expect(component.currentSongPosition).toEqual(25);
    });

    it('should increment the position since the player is running', () => {
      component.currPlayerStatus = true;
      component.currentSongPosition = 25;
      component['updateTimer']();

      expect(component.currPlayerStatus).toEqual(true);
      expect(component.currentSongPosition).toEqual(26);
    })
  });
});
