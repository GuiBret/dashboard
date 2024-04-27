import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyPlayerSdkComponent } from './spotify-player-sdk.component';

describe('SpotifyPlayerSdkComponent', () => {
  let component: SpotifyPlayerSdkComponent;
  let fixture: ComponentFixture<SpotifyPlayerSdkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyPlayerSdkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyPlayerSdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
