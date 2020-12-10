import { Component, OnInit } from '@angular/core';
import { SpotifyPlayerService } from '../../services/spotify-player.service';
import { Subscription, Observable } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { Song } from 'src/app/Spotify/services/song';

@Component({
  selector: 'app-spotify-player',
  templateUrl: './spotify-player.component.html',
  styleUrls: ['./spotify-player.component.css']
})
export class SpotifyPlayerComponent implements OnInit {

  song: Song = {
    title: 'My song',
    artist: 'My artist',
    album: 'My album',
    imageUrl: ''
  };

  playbackChanged : Subscription;
  volume: number = 20;

  currPlayerStatus = true;
  constructor(private spotifySvc: SpotifyService, private spotifyPlayerSvc: SpotifyPlayerService) { }

  ngOnInit(): void {
    this.spotifyPlayerSvc.getInfoOnPlayback().subscribe(this.setCurrentSong.bind(this));

    this.playbackChanged = this.spotifySvc.onPlaybackChanged.subscribe(this.getPlaybackInfo.bind(this));


    // TODO: Find another way to handle that
    setInterval(() => {
      this.getPlaybackInfo();
    }, 30000);
  }

  /**
   * Defines a new song, callback of onPlaybackInfoReceived
   * @param song The song which will be displayed in the player
   */
  setCurrentSong(song: Song) {
    this.song = song;
  }

  getPlaybackInfo() {
    setTimeout(() => {

      this.spotifyPlayerSvc.getInfoOnPlayback().subscribe(this.setCurrentSong.bind(this));
    }, 500);
  }

  /**
   * Plays / pauses the playback, then reverses the player status
   */
  onClickPlayPause() {

    let obs : Observable<any>;
    // If the current status is "Play", we'll pause the playback
    if(this.currPlayerStatus) {
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
    this.spotifyPlayerSvc.goToPreviousSong().subscribe(this.getPlaybackInfo.bind(this));
  }

  /**
   * When "Next song" or "Previous song" is triggered, we fetch the playback's info
   */
  onPreviousOrNextSongTriggered() {
    this.getPlaybackInfo();
  }
  /**
   * Calls the endpoint to go to the next song, then gets the info on the current playback after 500ms (bc of asynchronity)
   */
  goToNextSong() {
    this.spotifyPlayerSvc.goToNextSong().subscribe(this.getPlaybackInfo.bind(this));
  }

  getAvailableDevices() {
    this.spotifyPlayerSvc.getAvailableDevices();
  }

  setVolume() {
    this.spotifyPlayerSvc.setVolume(this.volume);
  }

}
