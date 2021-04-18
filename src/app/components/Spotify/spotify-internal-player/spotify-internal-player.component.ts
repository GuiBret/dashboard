import { Component, Inject, OnInit } from '@angular/core';
import { SpotifyPlayerService } from 'src/app/Spotify/services/spotify-player.service';
import { SpotifyService } from 'src/app/Spotify/services/spotify.service';

@Component({
  selector: 'app-spotify-internal-player',
  templateUrl: './spotify-internal-player.component.html',
  styleUrls: ['./spotify-internal-player.component.css']
})
export class SpotifyInternalPlayerComponent implements OnInit {

  private player: any;
  constructor(private spotifyPlayerSvc: SpotifyPlayerService, private spotifySvc: SpotifyService) {

   }

  ngOnInit(): void {

    window.onSpotifyWebPlaybackSDKReady = this.onSpotifyWebPlaybackSDKReady.bind(this);

  }
  private onSpotifyWebPlaybackSDKReady() {
    // We connect to the Playback SDK only if we are connected to Spotify
    if(this.spotifySvc.checkSpotifyStatus()) {
      const token = localStorage.getItem('spotifyToken');
      this.player = new window.Spotify.Player({
        name: 'Dashboard Player',
        getOAuthToken: cb => { cb(token); }
      });


      // TODO: improve error handling
      this.player.addListener('initialization_error', this.triggerErrorMessage.bind(this, "Initialization error"));
      this.player.addListener('authentication_error', this.triggerErrorMessage.bind(this, "Authentication error"));
      this.player.addListener('account_error', this.triggerErrorMessage.bind(this, "Account error"));
      this.player.addListener('playback_error', this.triggerErrorMessage.bind(this, "Playback error"));

      // Playback status updates
      this.player.addListener('player_state_changed', state => { this.spotifyPlayerSvc.pushPlaybackMetadataChanged(state); });

      // Ready
      this.player.addListener('ready', this.onPlayerReady.bind(this));

      // Connect to the player!
      this.player.connect().then(this.onPlayerConnected.bind(this));

    }
  }

  private triggerErrorMessage(message: string) {
    this.spotifyPlayerSvc.displaySnackbar(message);
  }

  private onPlayerReady(deviceID: string) {
    this.spotifyPlayerSvc.setPlayerID(deviceID);
  }

  private onPlayerConnected() {

    // Change position in song
    this.spotifyPlayerSvc.onSeekPositionRequested.subscribe(position => {
      this.player.seek(position);
    })
  }



}
