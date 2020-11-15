import { Component, OnInit } from '@angular/core';
import { SpotifyPlayerService } from 'src/app/services/spotify/spotify-player.service';
import { Subscription, Observable } from 'rxjs';
import { SpotifyService } from 'src/app/services/Spotify/spotify.service';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit {

  song: any = {
    title: 'My song',
    artist: 'My artist',
    album: 'My album',
    imageUrl: ''
  };

  playbackChanged : Subscription;
  volume: number = 20;

  currPlayerStatus = false;
  constructor(private spotifySvc: SpotifyService, private spotifyPlayerSvc: SpotifyPlayerService) { }

  ngOnInit(): void {
    this.spotifyPlayerSvc.getInfoOnPlayback().subscribe((song: any) => {
      this.song = song;
    });

    this.playbackChanged = this.spotifySvc.onPlaybackChanged.subscribe(this.getPlaybackInfo.bind(this));
  }

  getPlaybackInfo() {
    setTimeout(() => {

      this.spotifyPlayerSvc.getInfoOnPlayback().subscribe((song: any) => {

        this.song = song;
      });
    }, 500);
  }

  /**
   * Plays / pauses the playback, then reverses the player status
   */
  onClickPlayPause() {

    let obs : Observable<any>;
    // If the current status is "Play", we'll pause the playback
    if(!this.currPlayerStatus) {
      obs = this.spotifyPlayerSvc.pauseSong();

    } else {
      obs = this.spotifyPlayerSvc.playSong();
    }

    obs.subscribe((response) => {
      this.currPlayerStatus = !this.currPlayerStatus;
    })
  }

  /**
   * Calls the endpoint to go to the previous song, then gets the info on the current playback after 500ms (bc of asynchronity)
   */
  goToPreviousSong() {
    this.spotifyPlayerSvc.goToPreviousSong().subscribe(() => {
      this.getPlaybackInfo();

    });
  }
  /**
   * Calls the endpoint to go to the next song, then gets the info on the current playback after 500ms (bc of asynchronity)
   */
  goToNextSong() {
    this.spotifyPlayerSvc.goToNextSong().subscribe(() => {
      this.getPlaybackInfo();

    });
  }

  getAvailableDevices() {
    this.spotifyPlayerSvc.getAvailableDevices();
  }

  setVolume() {
    this.spotifyPlayerSvc.setVolume(this.volume);
  }

}
