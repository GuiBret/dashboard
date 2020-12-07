import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { SpotifyInterceptor } from './interceptors/spotify.interceptor';
import { SpotifyHomeComponent } from './pages/spotify-home/spotify-home.component';
import { SpotifyStoreTokenComponent } from './pages/spotify-store-token/spotify-store-token.component';
import { SpotifyUserInfoComponent } from 'src/app/pages/spotify-user-info/spotify-user-info.component';
import { SpotifyPlayerComponent } from './components/spotify-player/spotify-player.component';
import { SpotifySearchComponent } from './components/spotify-search/spotify-search.component';
import { SpotifyRoutingModule } from './spotify.routing';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    SpotifyHomeComponent,
    SpotifySearchComponent,
    SpotifyStoreTokenComponent,
    SpotifyUserInfoComponent,
    SpotifyPlayerComponent
  ],
  imports: [
    SpotifyRoutingModule,
    MatSliderModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatAutocompleteModule,
    MatButtonModule,
    SharedModule
  ],
  exports: [
    SpotifyHomeComponent,
    SpotifySearchComponent,
    SpotifyStoreTokenComponent,
    SpotifyUserInfoComponent,
    SpotifyPlayerComponent
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SpotifyInterceptor,
    multi: true
  }],
})
export class SpotifyModule {}
