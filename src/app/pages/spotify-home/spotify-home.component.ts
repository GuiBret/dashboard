import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormControl } from '@angular/forms';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
  selector: 'app-spotify-home',
  templateUrl: './spotify-home.component.html',
  styleUrls: ['./spotify-home.component.css']
})
export class SpotifyHomeComponent implements OnInit {
  needsLogin = false;
  options = [];
  currElement = {};
  formControl = new FormControl();
  spotifyAuthUrl = '';
  spotifyOK = false;
  constructor(private http: HttpService, private spotifyService: SpotifyService) { }

  ngOnInit(): void {

    if(!localStorage.getItem('spotifyToken')) {

        this.http.checkSpotifyStatus().subscribe((response: any) => {
          if(response.status === 'OK') {
            this.spotifyOK = true;
          } else {
            this.spotifyAuthUrl = response.url;
          }
        });
    } else {
      this.spotifyOK = true;
    }
    // this.http.checkSpotifyStatus().subscribe((response: any) => {
    //   if(response.status === 'OK') {
    //     this.spotifyOK = true;
    //   } else {
    //     this.spotifyAuthUrl = response.url;
    //   }
    // });

    this.formControl.valueChanges.subscribe((newValue: string) => {
      if(newValue.length >= 3) {
        this.spotifyService.fetchAutocomplete(newValue).subscribe(this.populateOptions.bind(this));
      } else {
        this.options = [];
      }
    })
  }

  ngOnDestroy() {
    this.currElement = {};
    this.options = [];
  }

  populateOptions(response: any) {

    this.options = response.data;
  }

  displayName(element: any) {

    return element.name;
  }

  playElement(uri: string) {
    this.spotifyService.playElement(uri);
  }


}
