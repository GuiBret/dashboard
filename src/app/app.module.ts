import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule, MatToolbar } from '@angular/material/toolbar';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { MatIconModule } from '@angular/material/icon';
import { GithubComponent } from './pages/github/github.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';

import { SpotifyModule } from './Spotify/spotify.module';
import { TodoListModule } from './TodoList/todo-list.module';
import { SharedModule } from './shared/shared.module';
import { GmailModule } from './gmail/gmail.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GithubComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatExpansionModule,
    MatToolbarModule,
    HttpClientModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    SpotifyModule,
    TodoListModule,
    SharedModule,
    GmailModule

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
