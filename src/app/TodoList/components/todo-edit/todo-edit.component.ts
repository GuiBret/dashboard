import { Component, OnInit } from '@angular/core';
import { TodoListService } from '../../services/todo-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/TodoList/models/todo';

import { Title } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  componentTitle: string = "Edit an element";
  currId: string = '';
  editMode = false;
  currTodo: Todo;


  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', [Validators.required]),
    _id: new FormControl(''),
    status: new FormControl(false),
    __v: new FormControl('')
  })

  constructor(private todoSvc: TodoListService, private route: ActivatedRoute, private titleSvc: Title, private router: Router) {
    this.titleSvc.setTitle('Todo List - Edit a todo');
   }

  ngOnInit(): void {
    this.route.data.subscribe(this.handleRoute.bind(this));

  }

  handleRoute(data: {todo: Todo }) {

      if(data.todo._id != null) {
        this.editMode = true;
      }


      this.currId = data.todo._id;
      this.currTodo = data.todo;
      this.form.setValue(this.currTodo);
  }

  onSubmitForm() {
    if(this.editMode) {
      this.todoSvc.editTodo(this.form.value).subscribe(this.onTodoEdited.bind(this));

    } else {
      this.todoSvc.addTodo(this.form.value).subscribe(this.onTodoAdded.bind(this));
    }

  }
  /**
   *
   * @param response Contains OK or KO, depending on server response
   */
  onTodoEdited(response: {status: string}) {
    if(response.status === 'OK') {
      this.todoSvc.displaySnackbar('Todo succesfully edited.');

      this.router.navigate(['/todolist']);
    }
  }

  /**
   *
   * @param response Contains OK or KO, depending on server response
   */
  onTodoAdded(response: {status: string}) {
    if (response.status === 'OK') {
      this.todoSvc.displaySnackbar('Todo succesfully added.');

      this.router.navigate(['/todolist']);
    }
  }

}
