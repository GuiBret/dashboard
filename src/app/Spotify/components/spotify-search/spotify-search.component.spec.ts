import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';

import { SpotifySearchComponent } from './spotify-search.component';

describe('SpotifySearchComponent', () => {
  let component: SpotifySearchComponent;
  let fixture: ComponentFixture<SpotifySearchComponent>;
  let httpClientStub: Partial<HttpClient>;
  let spotifySvcStub: Partial<SpotifyService>;


  // We have to store it in a variable since we'll test it multiple times
  const mockFetchAutocomp = jasmine.createSpy().and.returnValue(new Observable());

  spotifySvcStub = {
    fetchAutocomplete: mockFetchAutocomp
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifySearchComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: spotifySvcStub, provide: SpotifyService},
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

  describe('on search text changed', () => {
    it('should have reset options since the length of the text is under 3', () => {

      mockFetchAutocomp.calls.reset();

      component.options = [
        {
          name: 'a'
        },
        {
          name: 'b'
        }
      ];
      component.onSearchTextChanged('ab');

      expect(spotifySvcStub.fetchAutocomplete).not.toHaveBeenCalled();
      expect(component.options).toEqual([]);
    });

    it('should have called fetchAutocomplete since the string is longer than 3 characters', () => {
      mockFetchAutocomp.calls.reset();

      component.formGroupOptions.setValue({artists: false, albums: true, songs: false});
      component.onSearchTextChanged('abcd');

      expect(spotifySvcStub.fetchAutocomplete).toHaveBeenCalledWith('abcd', {artists: false, albums: true, songs: false});

    });
  });

  describe('Display name', () => {
    it('should display the name of the element', () => {
      const mockElement = {
        name: 'My name'
      };

      const name = component.displayName(mockElement);

      expect(name).toEqual('My name');
    });
  });

  describe('On checkbox clicked', () => {
    it('should have rechecked all checkboxes if they are all unchecked', () => {
      component.formGroupOptions.setValue({
        albums: true, songs: false, artists: false
      });
      component.onOptionsChanged({albums: false, songs: false, artists: false});

      expect(component.formGroupOptions.value).toEqual({albums: true, songs: true, artists: true});
    })
  });

  it('should not have done anything since at least one checkbox is checked', () => {
    component.formGroupOptions.setValue({
      albums: true, songs: false, artists: false
    });
    component.onOptionsChanged({albums: false, songs: false, artists: true});

    expect(component.formGroupOptions.value).toEqual({albums: true, songs: false, artists: false});
  })
});
