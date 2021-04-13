import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SpotifyPlayerService } from 'src/app/Spotify/services/spotify-player.service';
import { SpotifyService } from 'src/app/Spotify/services/spotify.service';

import { SpotifyInternalPlayerComponent } from './spotify-internal-player.component';

describe('SpotifyInternalPlayerComponent', () => {
  let component: SpotifyInternalPlayerComponent;
  let fixture: ComponentFixture<SpotifyInternalPlayerComponent>;

  let spotifyPlayerSvcStub: Partial<SpotifyPlayerService>;
  let spotifySvcStub: Partial<SpotifyService>;

  spotifyPlayerSvcStub = {};
  spotifySvcStub = {};

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
});
