import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

import { SpotifyStoreTokenComponent } from './spotify-store-token.component';

describe('SpotifyStoreTokenComponent', () => {
  let component: SpotifyStoreTokenComponent;
  let fixture: ComponentFixture<SpotifyStoreTokenComponent>;
  let actRouteStub: Partial<ActivatedRoute>;
  let routerStub: Partial<Router>;

  actRouteStub = {
    params: of({

    })
  };
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
    fixture = TestBed.createComponent(SpotifyStoreTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
