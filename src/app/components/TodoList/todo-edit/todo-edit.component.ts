import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Todo } from 'src/app/models/todo';
import { FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  componentTitle: string = "Edit an element";
  currId: string = '';
  currTodo: Todo;

  constructor(private todoSvc: TodoListService, private route: ActivatedRoute, private titleSvc: Title) {
    this.titleSvc.setTitle('Todo List - Edit a todo');
   }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.currId = params.id;
      this.currTodo = this.todoSvc.getTodo(this.currId);
      // this.
    });

  }

}
