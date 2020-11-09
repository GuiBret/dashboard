import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyUserInfoComponent } from './spotify-user-info.component';

describe('SpotifyUserInfoComponent', () => {
  let component: SpotifyUserInfoComponent;
  let fixture: ComponentFixture<SpotifyUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyUserInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
