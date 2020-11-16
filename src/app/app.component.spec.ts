import { HttpClient } from '@angular/common/http';
import { componentFactoryName } from '@angular/compiler';
import { TestBed, async } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { SpotifyService } from './services/Spotify/spotify.service';

describe('AppComponent', () => {
  let httpClientStub: Partial<HttpClient>;
  let spotifySvcStub: Partial<SpotifyService>;
  let routerStub: Partial<Router>;

  spotifySvcStub = {
    checkSpotifyStatus: jasmine.createSpy()
  }

  routerStub = {
    navigate: jasmine.createSpy()
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: spotifySvcStub, provide: SpotifyService},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'dashboard'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('dashboard');
  });

  // describe('on router event received', () => {
  //   it('should have checked if were logged on spotify and navigated to /spotify', () => {

  //     const fixture = TestBed.createComponent(AppComponent);
  //     const app = fixture.componentInstance;


  //     let mockEvent = new NavigationEnd(0, 'http://localhost:4200/spotify/logged', 'http://localhost:4200/spotify/logged');


  //     app.onRouterEventReceived(mockEvent);

  //     expect(spotifySvcStub.checkSpotifyStatus).toHaveBeenCalled();
  //     expect(routerStub.navigate).toHaveBeenCalled();
  //   })
  // })

});
