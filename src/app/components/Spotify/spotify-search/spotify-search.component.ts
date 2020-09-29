import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent implements OnInit, OnDestroy {

  formControl = new FormControl();
  constructor(private spotifyService: SpotifyService) { }
  currElement = {name: ""};
  options = [];
  ngOnInit(): void {
    // Triggers autocomplete if str.length >= 3
    this.formControl.valueChanges.subscribe((newValue: string) => {
      if(newValue.length >= 3) {
        this.spotifyService.fetchAutocomplete(newValue).subscribe(this.populateOptions.bind(this));
      } else {
        this.options = [];
      }
    });
  }

  ngOnDestroy() {
    this.currElement = {name: ""};
    this.options = [];
  }

  populateOptions(response: any) {

    this.options = response.data;
  }

  displayName(element: any) {
    if(element) {

      return element.name;
    }
  }

  playElement(uri: string) {
    this.spotifyService.playElement(uri);
  }

}
