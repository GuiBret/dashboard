import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';

import { SpotifyPlayerComponent } from './spotify-player.component';

describe('SpotifyPlayerComponent', () => {
  let component: SpotifyPlayerComponent;
  let fixture: ComponentFixture<SpotifyPlayerComponent>;
  let httpClientStub: Partial<HttpClient>;

  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable())
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyPlayerComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });
});
