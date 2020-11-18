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
import { GmailComponent } from './pages/gmail/gmail.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatTableModule, MatTable } from '@angular/material/table';
import {MatSelectModule, MatSelect} from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SpotifyModule } from './Spotify/spotify.module';
import { TodoListModule } from './TodoList/todo-list.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    GithubComponent,
    GmailComponent,
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
    MatCheckboxModule,
    ReactiveFormsModule,
    SpotifyModule,
    TodoListModule,
    SharedModule
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
