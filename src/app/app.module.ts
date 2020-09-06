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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    TodoListComponent,
    GithubComponent,
    GmailComponent
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
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
