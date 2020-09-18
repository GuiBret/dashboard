import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoEditComponent } from './components/TodoList/todo-edit/todo-edit.component';
import { SpotifyHomeComponent } from './pages/spotify-home/spotify-home.component';
import { SpotifyStoreTokenComponent } from './pages/spotify-store-token/spotify-store-token.component';


const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'todolist', component: TodoListComponent
  },
  {
    path: 'todolist/:id/edit', component:TodoEditComponent
  },
  {
    path: 'todolist/add', component:TodoEditComponent
  },
  {
    path: 'spotify', component: SpotifyHomeComponent
  },
  {
    path: 'spotify/store-token/:token', component: SpotifyStoreTokenComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
