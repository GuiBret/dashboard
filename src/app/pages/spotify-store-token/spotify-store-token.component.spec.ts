import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyStoreTokenComponent } from './spotify-store-token.component';

describe('SpotifyStoreTokenComponent', () => {
  let component: SpotifyStoreTokenComponent;
  let fixture: ComponentFixture<SpotifyStoreTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyStoreTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyStoreTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
