import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { SpotifyPlayerService } from './spotify-player.service';

describe('SpotifyPlayerService', () => {
  let service: SpotifyPlayerService;
  let httpClientStub: Partial<HttpClient>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          useValue: httpClientStub, provide: HttpClient
        }
      ]
    });
    service = TestBed.inject(SpotifyPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
