import { Component, Inject, OnInit } from '@angular/core';
import { SpotifyPlayerService } from 'src/app/Spotify/services/spotify-player.service';
import { SpotifyService } from 'src/app/Spotify/services/spotify.service';


@Component({
  selector: 'app-spotify-internal-player',
  templateUrl: './spotify-internal-player.component.html',
  styleUrls: ['./spotify-internal-player.component.css']
})
export class SpotifyInternalPlayerComponent implements OnInit {

  constructor(private spotifyPlayerSvc: SpotifyPlayerService, private spotifySvc: SpotifyService) {

   }

  ngOnInit(): void {

    window.onSpotifyWebPlaybackSDKReady = () => {

      // We connect to the Playback SDK only if we are connected to Spotify
      if(this.spotifySvc.checkSpotifyStatus()) {
        const token = localStorage.getItem('spotifyToken');
        const player = new Spotify.Player({
          name: 'Dashboard Player',
          getOAuthToken: cb => { cb(token); }
        });

        // // Error handling
        // TODO: handle errors
        // player.addListener('initialization_error', ({ message }) => { console.error(message); });
        // player.addListener('authentication_error', ({ message }) => { console.error(message); });
        // player.addListener('account_error', ({ message }) => { console.error(message); });
        // player.addListener('playback_error', ({ message }) => { console.error(message); });

        // // Playback status updates
        player.addListener('player_state_changed', state => { console.log(state); });

        // // Ready
        player.addListener('ready', ({ device_id }) => {
          this.spotifyPlayerSvc.setPlayerID(device_id);
        });

        // // Connect to the player!
        player.connect();

      }


    }
  }

}
