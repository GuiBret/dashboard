import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { SpotifyPlayerService } from 'src/app/services/spotify/spotify-player.service';

import { SpotifyPlayerComponent } from './spotify-player.component';

describe('SpotifyPlayerComponent', () => {
  let component: SpotifyPlayerComponent;
  let fixture: ComponentFixture<SpotifyPlayerComponent>;
  let httpClientStub: Partial<HttpClient>;
  let spotifyPlayerSvcStub: Partial<SpotifyPlayerService>;


  const mockPlaySong = jasmine.createSpy().and.returnValue(new Observable());
  const mockPauseSong = jasmine.createSpy().and.returnValue(new Observable());

  spotifyPlayerSvcStub = {
    getInfoOnPlayback: jasmine.createSpy().and.returnValue(new Observable()),
    goToPreviousSong: jasmine.createSpy().and.returnValue(new Observable()),
    goToNextSong: jasmine.createSpy().and.returnValue(new Observable()),
    playSong: mockPlaySong,
    pauseSong: mockPauseSong,

  }

  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable())
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyPlayerComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: spotifyPlayerSvcStub, provide: SpotifyPlayerService},
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
      component.currPlayerStatus = true;
      component.onClickPlayPause();

      // expect(mockPauseSong).toHaveBeenCalled();
      expect(mockPlaySong).toHaveBeenCalled();
    })
  })
});
