import { Component, OnInit } from '@angular/core';
import { TodoListService } from 'src/app/services/todo-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Todo } from 'src/app/models/todo';

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
    this.route.params.subscribe((params: Params) => {

      if(params.id) {
        this.editMode = true;
        this.currId = params.id;
        this.currTodo = this.todoSvc.getTodo(this.currId);
        this.form.setValue(this.currTodo);
      }

      // this.
    });

  }

  onSubmitForm() {

    this.todoSvc.editTodo(this.form.value).subscribe((response: any) => {
      if(response.status === 'OK') {
        this.todoSvc.displaySnackbar('Todo succesfully edited.');

        this.router.navigate(['/todolist']);
      }
    });
  }

}
