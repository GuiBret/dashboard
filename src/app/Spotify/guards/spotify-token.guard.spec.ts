import { TestBed } from '@angular/core/testing';

import { SpotifyTokenGuard } from './spotify-token.guard';

describe('SpotifyTokenGuard', () => {
  let guard: SpotifyTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SpotifyTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
