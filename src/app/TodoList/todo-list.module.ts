import { NgModule } from "@angular/core";
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoListService } from './services/todo-list.service';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoEditComponent,
  ],
  imports: [

  ],
  providers: [
    TodoListService
  ]

})
export class TodoListModule {}
