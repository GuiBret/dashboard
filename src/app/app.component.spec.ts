import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { GmailService } from './gmail/services/gmail.service';
import { HttpService } from './services/http.service';
import { SpotifyService } from './Spotify/services/spotify.service';

describe('AppComponent', () => {

  let spotifySvcStub: Partial<SpotifyService>;
  let gmailSvcStub: Partial<GmailService>;
  let routerStub: Partial<Router>;
  let httpSvcStub: Partial<HttpService>;

  spotifySvcStub = {
    checkSpotifyStatus: jasmine.createSpy()
  };

  routerStub = {
    navigate: jasmine.createSpy()
  };

  httpSvcStub = {
    getSpotifyAuthUrl: jasmine.createSpy().and.returnValue(new Observable())
  };

  gmailSvcStub = {
    checkGmailStatus: jasmine.createSpy()
  };



  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {useValue: httpSvcStub, provide: HttpService},
        {useValue: spotifySvcStub, provide: SpotifyService},
        {useValue: gmailSvcStub, provide: GmailService},
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

  describe('Toggle sidenav', () => {

    it('should have inverted app.opened', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      app.opened = true;

      app.toggleSidenav();

      expect(app.opened).toEqual(false);
    });

  });

  describe('Trigger login procedure', () => {
    it('should have called getSpotifyAuthUrl', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      app.triggerLoginProcedure();

      expect(httpSvcStub.getSpotifyAuthUrl).toHaveBeenCalled();
    });
  });

  describe('Ng on init', () => {
    it('should call the functions to check if Gmail and spotify are active', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.componentInstance;

      app.ngOnInit();

      expect(gmailSvcStub.checkGmailStatus).toHaveBeenCalled();
      expect(spotifySvcStub.checkSpotifyStatus).toHaveBeenCalled();
    });
  });


});
