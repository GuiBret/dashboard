import { Component, Inject, OnInit } from '@angular/core';
declare global {
  interface Window {
    onSpotifyWebPlaybackSDKReady: any
  }
}

@Component({
  selector: 'app-spotify-internal-player',
  templateUrl: './spotify-internal-player.component.html',
  styleUrls: ['./spotify-internal-player.component.css']
})
export class SpotifyInternalPlayerComponent implements OnInit {

  constructor() {

   }

  ngOnInit(): void {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const token = 'BQDXkmlrdOGsExoc9Ke7kGok26BHjAHhmxUpXIDQgi-0SmMPF12W1nBWV80Y_49q18MhUNXalpCYwnhOUIECj8L421rf_obRCNkTYKPbEh5DU_BvtqxjWNry0YujspFbDDKmctZpuTcnqLOaT4r3vIbxgSFCrWQl3ZjiKBDA1S7VnKjOMZOmDh4';
      const player = new Spotify.Player({
        name: 'Web Playback SDK Quick Start Player',
        getOAuthToken: cb => { cb(token); }
      });

      // // Error handling
      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // // Playback status updates
      player.addListener('player_state_changed', state => { console.log(state); });

      // // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // // Not Ready
      // player.addListener('not_ready', ({ device_id }) => {
      //   console.log('Device ID has gone offline', device_id);
      // });

      console.log(player.connect);
      // // Connect to the player!
      player.connect();

    }
  }

}
