import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyControlsComponent } from './spotify-controls.component';

describe('SpotifyControlsComponent', () => {
  let component: SpotifyControlsComponent;
  let fixture: ComponentFixture<SpotifyControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
