import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from 'src/app/services/http.service';
import { Subscription } from 'rxjs';
import { TodoListService } from 'src/app/services/todo-list.service';
import { Todo } from 'src/app/models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit, OnDestroy {


  todoListChanged$: Subscription;
  todos: Array<Todo> = [];
  themes: Array<string> = [];
  displayedColumns = ['theme', 'title', 'content', 'controls'];
  constructor(private titleService: Title, private todoSvc: TodoListService) { }

  ngOnInit(): void {

    this.titleService.setTitle('TodoList - List');

    this.todoListChanged$ = this.todoSvc.fetchTodosAndThemes().subscribe((response: {todos: Array<Todo>, themes: Array<string> }) => {

      this.todos = response.todos;
      this.themes = response.themes;
    });
  }

  ngOnDestroy() {
    this.todoListChanged$.unsubscribe();
  }

}
