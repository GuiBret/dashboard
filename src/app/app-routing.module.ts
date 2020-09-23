import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoEditComponent } from './components/TodoList/todo-edit/todo-edit.component';
import { SpotifyHomeComponent } from './pages/spotify-home/spotify-home.component';
import { SpotifyStoreTokenComponent } from './pages/spotify-store-token/spotify-store-token.component';
import { SpotifyTokenGuard } from './guards/spotify-token.guard';
import { TodoDataResolverService } from './resolvers/todo-data-resolver.service';


const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'todolist', component: TodoListComponent
  },
  {
    path: 'todolist/:id/edit', component:TodoEditComponent, resolve: {
      todo: TodoDataResolverService
    }
  },
  {
    path: 'todolist/add', component:TodoEditComponent, resolve: {
      todo: TodoDataResolverService
    }
  },
  {
    path: 'spotify', component: SpotifyHomeComponent, canActivate: [SpotifyTokenGuard]
  },
  {
    path: 'spotify/logged', component: SpotifyHomeComponent, canActivate: [SpotifyTokenGuard]
  },
  {
    path: 'spotify/store-token/:token/:refresh', component: SpotifyStoreTokenComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
