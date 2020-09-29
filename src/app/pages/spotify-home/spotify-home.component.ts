import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { FormControl } from '@angular/forms';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';
import { Title } from '@angular/platform-browser';


/**
 * The homepage of Spotify
 */
@Component({
  selector: 'app-spotify-home',
  templateUrl: './spotify-home.component.html',
  styleUrls: ['./spotify-home.component.css']
})
export class SpotifyHomeComponent implements OnInit {
  needsLogin = false;



  spotifyAuthUrl = '';
  /**
   * Boolean indicating if we can make some requests
   */
  spotifyOK = false;
  constructor(private titleSvc: Title, private http: HttpService, private spotifyService: SpotifyService) {
    this.titleSvc.setTitle('Spotify - Home')
  }

  /**
   * On init, check Spotify's statud
   */
  ngOnInit(): void {

    if(!localStorage.getItem('spotifyToken')) {

        this.http.checkSpotifyStatus().subscribe(this.handleSpotifyStatus.bind(this));
    } else {
      this.spotifyOK = true;
    }



  }

  handleSpotifyStatus(response: any) {
    if(response.status === 'OK') {
      this.spotifyOK = true;
    } else {
      this.spotifyAuthUrl = response.url;
    }
  }

  ngOnDestroy() {

  }




}
