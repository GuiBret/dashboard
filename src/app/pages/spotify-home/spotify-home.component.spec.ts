import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SpotifyHomeComponent } from './spotify-home.component';

describe('SpotifyHomeComponent', () => {
  let component: SpotifyHomeComponent;
  let fixture: ComponentFixture<SpotifyHomeComponent>;
  let httpClientStub: Partial<HttpClient>;

  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable())
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyHomeComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Handle spotify status', () => {
    it('should set spotifyOK to true', () => {
      component.spotifyAuthUrl = '';
      component.spotifyOK = false;
      component.handleSpotifyStatus({status: 'OK'});

      expect(component.spotifyOK).toEqual(true);
    });

    it('should define spotifyAuthUrl', () => {

      component.spotifyAuthUrl = '';
      component.spotifyOK = true;
      component.handleSpotifyStatus({status: 'KO', url: 'https://myurl'});

      expect(component.spotifyOK).toEqual(false);
      expect(component.spotifyAuthUrl).toEqual('https://myurl');
    });
  })
});
