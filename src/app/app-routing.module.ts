import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoEditComponent } from './components/TodoList/todo-edit/todo-edit.component';


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
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
