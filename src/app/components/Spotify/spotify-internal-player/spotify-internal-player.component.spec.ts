import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotifyPlayerService } from 'src/app/Spotify/services/spotify-player.service';
import { SpotifyService } from 'src/app/Spotify/services/spotify.service';

import { SpotifyInternalPlayerComponent } from './spotify-internal-player.component';


describe('SpotifyInternalPlayerComponent', () => {
  let component: SpotifyInternalPlayerComponent;
  let fixture: ComponentFixture<SpotifyInternalPlayerComponent>;

  let spotifyPlayerSvcStub: Partial<SpotifyPlayerService>;
  let spotifySvcStub: Partial<SpotifyService>;



  spotifyPlayerSvcStub = {
    setPlayerID: (playerID: string) => {}
  };
  spotifySvcStub = {
    checkSpotifyStatus: jasmine.createSpy().and.returnValue(false)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyInternalPlayerComponent ],
      providers: [
        {provide: SpotifyPlayerService, useValue: spotifyPlayerSvcStub},
        {provide: SpotifyService, useValue: spotifySvcStub},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyInternalPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On web playback ready', () => {
    it('should not do anything since we are not connected to Spotify', () => {
      localStorage.removeItem('spotifyToken');
      component.ngOnInit();
      window.onSpotifyWebPlaybackSDKReady();
    });
  });

  describe('On player ready', () => {
    it('should have define the passed deviceID to the service', () => {
      spyOn(spotifyPlayerSvcStub, 'setPlayerID');

      // tslint:disable-next-line: no-string-literal
      component['onPlayerReady']({device_id: 'abcdef'});

      expect(spotifyPlayerSvcStub.setPlayerID).toHaveBeenCalledWith('abcdef');
    });
  });
});
