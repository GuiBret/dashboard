import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subject } from 'rxjs';

import { SpotifyStoreTokenComponent } from './spotify-store-token.component';

describe('SpotifyStoreTokenComponent', () => {
  let component: SpotifyStoreTokenComponent;
  let fixture: ComponentFixture<SpotifyStoreTokenComponent>;
  let actRouteStub: Partial<ActivatedRoute>;
  let routerStub: Partial<Router>;

  const mockParamsSubject = new Subject<any>();
  const paramsObs = mockParamsSubject.asObservable()
  const routerNavigateSpy = jasmine.createSpy();

  actRouteStub = {
    params: paramsObs
  };

  routerStub = {
    navigate: routerNavigateSpy
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyStoreTokenComponent ],
      providers: [
        {useValue: actRouteStub, provide: ActivatedRoute},
        {useValue: routerStub, provide: Router},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {

    let store = {};
    spyOn(localStorage, 'getItem').and.callFake((key) => {
      return store[key];
    });

    spyOn(localStorage, 'setItem').and.callFake((key, newValue) => {
      store[key] = newValue;
    });

    fixture = TestBed.createComponent(SpotifyStoreTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('On init', () => {
    it('should not do anything if token and refresh are not provided', () => {

      routerNavigateSpy.calls.reset();

      localStorage.setItem('spotifyToken', 'abc');
      localStorage.setItem('spotifyRefresh', 'def');
      localStorage.setItem('spotifyExp', '19954215');
      mockParamsSubject.next({});

      expect(localStorage.getItem('spotifyToken')).toEqual('abc');
      expect(localStorage.getItem('spotifyRefresh')).toEqual('def');
      expect(localStorage.getItem('spotifyExp')).toEqual('19954215');

      expect(routerNavigateSpy).not.toHaveBeenCalled();


    });
    it('should set token and refresh if they are provided', () => {

      routerNavigateSpy.calls.reset();

      localStorage.setItem('spotifyToken', 'abc');
      localStorage.setItem('spotifyRefresh', 'def');
      localStorage.setItem('spotifyExp', '19954215');

      mockParamsSubject.next({
        token: 'mytoken',
        refresh: 'myrefresh'
      });

      expect(localStorage.getItem('spotifyToken')).toEqual('mytoken');
      expect(localStorage.getItem('spotifyRefresh')).toEqual('myrefresh');



    });
  })
});
