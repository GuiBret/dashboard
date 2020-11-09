import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { SpotifySearchComponent } from './spotify-search.component';

describe('SpotifySearchComponent', () => {
  let component: SpotifySearchComponent;
  let fixture: ComponentFixture<SpotifySearchComponent>;
  let httpClientStub: Partial<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifySearchComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient}
      ],
      imports: [
        MatAutocompleteModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
