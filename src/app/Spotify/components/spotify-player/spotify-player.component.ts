import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpotifyPlayerService } from '../../services/spotify-player.service';
import { Subscription, Observable, interval, Subject } from 'rxjs';
import { SpotifyService } from '../../services/spotify.service';
import { Song } from 'src/app/Spotify/services/song';
import { PlaybackMetadata } from '../../interfaces/playback-metadata.interface';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-spotify-player',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  playbackMetadataChanged: Subscription;

  playIntervalID: Subscription;

  pauseTriggered: Subject<void> = new Subject();

  onPauseTriggered$ = this.pauseTriggered.asObservable();

  // TODO : handle song duration
  songDuration: number = 1000;

  currentSongPosition = 0;


  volume: number = 20;

  currPlayerStatus = true;
  constructor(private spotifySvc: SpotifyService, private spotifyPlayerSvc: SpotifyPlayerService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cdr.detectChanges();
    this.spotifyPlayerSvc.getInfoOnPlayback().subscribe(this.setCurrentSong.bind(this));

    this.playbackChanged = this.spotifySvc.onPlaybackChanged.subscribe(this.getPlaybackInfo.bind(this));

    this.playbackMetadataChanged = this.spotifyPlayerSvc.onPlaybackMetadataChanged.subscribe(this.updatePlaybackMetadata.bind(this));


    // TODO: Find another way to handle that
    setInterval(() => {
      this.getPlaybackInfo();
      this.cdr.detectChanges();
    }, 5000);
  }

  /**
   * Defines a new song, callback of onPlaybackInfoReceived
   * @param song The song which will be displayed in the player
   */
  setCurrentSong(song: Song) {
    this.song = song;
    this.cdr.detectChanges();
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

      this.pauseTriggered.next();

    } else {
      obs = this.spotifyPlayerSvc.playSong();
      // this.playIntervalID.unsubscribe();
      this.playIntervalID = interval(1000).pipe(takeUntil(this.pauseTriggered)).subscribe(this.updateTimer.bind(this));
      this.cdr.detectChanges();
    }

    obs.subscribe((response) => {});
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

  updatePlaybackMetadata(newPlaybackInfo: PlaybackMetadata) {

    this.songDuration = newPlaybackInfo.duration / 1000;
    this.currentSongPosition = Math.floor(newPlaybackInfo.position / 1000);
    this.currPlayerStatus = !newPlaybackInfo.paused;
    this.pauseTriggered.next();

    this.playIntervalID = interval(1000).pipe(takeUntil(this.pauseTriggered)).subscribe(this.updateTimer.bind(this));
    this.cdr.detectChanges();

  }

  private updateTimer() {

    if(this.currPlayerStatus) {

      // Tweak to force detection change
      const newSongPosition = this.currentSongPosition + 1;
      this.currentSongPosition = null;
      this.currentSongPosition = newSongPosition;
      this.cdr.detectChanges();
    }
  }

  seekPositionInSong() {
    this.spotifyPlayerSvc.seekPositionInSong(this.currentSongPosition * 1000);
  }

}
