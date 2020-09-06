import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';


const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'todolist', component: TodoListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
