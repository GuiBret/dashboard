import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyInternalPlayerComponent } from './spotify-internal-player.component';

describe('SpotifyInternalPlayerComponent', () => {
  let component: SpotifyInternalPlayerComponent;
  let fixture: ComponentFixture<SpotifyInternalPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyInternalPlayerComponent ]
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
