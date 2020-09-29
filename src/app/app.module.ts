import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatIconModule } from '@angular/material/icon';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { GithubComponent } from './pages/github/github.component';
import { GmailComponent } from './pages/gmail/gmail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule, MatTable } from '@angular/material/table';
import {MatSelectModule, MatSelect} from '@angular/material/select';
import { TodoEditComponent } from './components/TodoList/todo-edit/todo-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule} from '@angular/material/slider';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { SpotifyHomeComponent } from './pages/spotify-home/spotify-home.component';
import { SpotifySearchComponent } from './components/Spotify/spotify-search/spotify-search.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { SpotifyStoreTokenComponent } from './pages/spotify-store-token/spotify-store-token.component';
import { SpotifyInterceptor } from './interceptors/spotify.interceptor';
import { SpotifyUserInfoComponent } from './pages/spotify-user-info/spotify-user-info.component';
import { SpotifyPlayerComponent } from './components/spotify-player/spotify-player.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TodoListComponent,
    GithubComponent,
    GmailComponent,
    TodoEditComponent,
    SpotifyHomeComponent,
    SpotifySearchComponent,
    SpotifyStoreTokenComponent,
    SpotifyUserInfoComponent,
    SpotifyPlayerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatCardModule,
    MatInputModule,
    MatSliderModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SpotifyInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
