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
      this.player = new Spotify.Player({
        name: 'Dashboard Player',
        getOAuthToken: cb => { cb(token); }
      });

      // // Error handling
      // TODO: handle errors
      this.player.addListener('initialization_error', ({ message }) => { this.spotifyPlayerSvc.displaySnackbar("Initialization error"); });
      this.player.addListener('authentication_error', ({ message }) => { this.spotifyPlayerSvc.displaySnackbar("Authentication error"); });
      this.player.addListener('account_error', ({ message }) => { this.spotifyPlayerSvc.displaySnackbar("Account error") });
      this.player.addListener('playback_error', ({ message }) => { console.error(message); });

      // // Playback status updates
      this.player.addListener('player_state_changed', state => { this.spotifyPlayerSvc.pushPlaybackMetadataChanged(state); });

      // // Ready
      this.player.addListener('ready', ({ device_id }) => {
        this.spotifyPlayerSvc.setPlayerID(device_id);
      });

      // // Connect to the player!
      this.player.connect();

}
  }

}
