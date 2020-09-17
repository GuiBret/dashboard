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
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule, MatTable } from '@angular/material/table';
import {MatSelectModule, MatSelect} from '@angular/material/select';
import { TodoEditComponent } from './components/TodoList/todo-edit/todo-edit.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatCheckboxModule } from '@angular/material/checkbox';
import { SpotifyHomeComponent } from './pages/spotify-home/spotify-home.component';
import { SpotifySearchComponent } from './components/Spotify/spotify-search/spotify-search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TodoListComponent,
    GithubComponent,
    GmailComponent,
    TodoEditComponent,
    SpotifyHomeComponent,
    SpotifySearchComponent
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
    MatInputModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
