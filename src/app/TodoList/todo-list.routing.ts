import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoDataResolverService } from './resolvers/todo-data-resolver.service';

const routes: Routes = [
  {
    path: 'todolist', component: TodoListComponent
  },
  {
    path: 'todolist/:id/edit', component: TodoEditComponent, resolve: {
      todo: TodoDataResolverService
    }
  },
  {
    path: 'todolist/add', component: TodoEditComponent, resolve: {
      todo: TodoDataResolverService
    }
  },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
})
export class TodoListRoutingModule {}
