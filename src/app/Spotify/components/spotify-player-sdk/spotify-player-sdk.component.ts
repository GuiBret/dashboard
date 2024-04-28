import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as internal from 'events';

declare var Spotify: any;

@Component({
  selector: 'app-spotify-player-sdk',
  templateUrl: './spotify-player-sdk.component.html',
  styleUrls: ['./spotify-player-sdk.component.css'],
})
export class SpotifyPlayerSdkComponent implements OnInit {
  constructor(private readonly fb: FormBuilder) {}

  loadAPI: Promise<void>;

  @Output()
  onPlayerReady = new EventEmitter<string>();

  playerStateInterval: any;
  deviceId: string;
  devicesForm: FormGroup;

  player: any;

  ngOnInit(): void {
    console.log('Coucou');

    (<any>window).onSpotifyWebPlaybackSDKReady = this.connectPlayer.bind(this);

    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
      resolve();
    });

    this.loadAPI.then(() => {
      console.log('Script loaded');
    });

    this.playerStateInterval = setInterval(() => {
      this.loadPlayerState();
    }, 5000);

    let initialValues = {
      device: ['', Validators.required],
    };

    this.devicesForm = this.fb.group(initialValues);

    this.getAvailableDevices();
  }

  ngOnDestroy() {
    clearInterval(this.playerStateInterval);
  }

  connectPlayer() {
    console.log('Connecting player');
    const token = localStorage.getItem('spotifyToken');

    this.player = new Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: (cb: any) => {
        cb(token);
      },
      volume: 0.5,
    });

    this.player.addListener('ready', this.ready.bind(this));
    this.player.addListener('not_ready', this.notReady.bind(this));
    this.player.addListener('initialization_error', this.initError.bind(this));
    this.player.addListener('authentication_error', this.authError.bind(this));

    this.player.connect().then((success: any) => {
      console.log('Player connected');
    });
  }

  loadScript() {
    let node = document.createElement('script');

    node.src = 'https://sdk.scdn.co/spotify-player.js';
    node.type = 'text/javascript';
    node.async = true;

    document.getElementsByTagName('head')[0].appendChild(node);
  }

  initError(message: any) {
    console.log(message);
  }

  authError(message) {
    console.log(message);
  }

  loadPlayerState() {}

  getAvailableDevices() {}

  ready(result: { device_id: string }) {
    this.deviceId = result.device_id;
    this.onPlayerReady.emit(this.deviceId);
  }

  notReady(result: { device_id: string }) {
    this.deviceId = result.device_id;
    console.log('Player is not ready');
  }
}
