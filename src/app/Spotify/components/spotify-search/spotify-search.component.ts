import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { FormControl, FormGroup } from '@angular/forms';
import { SpotifyPlayerService } from '../../services/spotify-player.service';

@Component({
  selector: 'app-spotify-search',
  templateUrl: './spotify-search.component.html',
  styleUrls: ['./spotify-search.component.css']
})
export class SpotifySearchComponent implements OnInit, OnDestroy {


  formControl = new FormControl();
  formGroupOptions = new FormGroup({
    albums: new FormControl(false),
    songs: new FormControl(false),
    artists: new FormControl(true),
  });
  constructor(private spotifyService: SpotifyService, private spotifyPlayerService: SpotifyPlayerService) { }

  /**
   * The element of the autocomplete input
   */
  currElement = {name: ""};

  /**
   * The options for the autocomplete input
   */
  options = [];
  ngOnInit(): void {
    // Triggers autocomplete if str.length >= 3
    this.formControl.valueChanges.subscribe(this.onSearchTextChanged.bind(this));
    this.formGroupOptions.valueChanges.subscribe(this.onOptionsChanged.bind(this));
  }

  onSearchTextChanged(newValue : string) {
    if(newValue.length >= 3) {
      this.spotifyService.fetchAutocomplete(newValue, this.formGroupOptions.value).subscribe(this.populateOptions.bind(this));
    } else {
      this.options = [];
    }
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

  playElement(selectedOption: {uri: string, type: string}) {
    this.spotifyService.playElement(selectedOption.uri, selectedOption.type, this.spotifyPlayerService.getPlayerID());
  }

  onOptionsChanged(newFormValue: {albums: boolean, artists: boolean, songs: boolean}) {
    if(!newFormValue.albums && !newFormValue.artists && !newFormValue.songs) {

      this.formGroupOptions.setValue({
        albums: true,
        songs: true,
        artists: true
      })
    }
  }

}
