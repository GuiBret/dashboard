import { NgModule } from "@angular/core";
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '../shared/shared.module';
import { TodoEditComponent } from './components/todo-edit/todo-edit.component';
import { TodoListComponent } from './pages/todo-list/todo-list.component';
import { TodoListService } from './services/todo-list.service';
import { TodoListRoutingModule } from './todo-list.routing';

@NgModule({
  declarations: [
    TodoListComponent,
    TodoEditComponent,
  ],
  imports: [
    MatCheckboxModule,
    MatTableModule,
    MatFormFieldModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    TodoListRoutingModule
  ],
  providers: [
    TodoListService
  ]

})
export class TodoListModule {}
