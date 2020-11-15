import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoListService } from 'src/app/services/todo-list.service';

import { TodoEditComponent } from './todo-edit.component';

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;
  let httpClientStub: Partial<HttpClient>;
  let matSnackbarModule: Partial<MatSnackBar>;
  let actRouteStub: Partial<ActivatedRoute>;
  let routerStub: Partial<Router>;
  let todoSvcStub: Partial<TodoListService>;


  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable()),
  };

  actRouteStub = {
    data: of({
      todo: {
        _id: "1234",
        title: "My title",
        content: "My content",
        status: false,
        __v: 1234
      }
    })
  };

  routerStub = {
    navigate: jasmine.createSpy()
  };

  // Since we are testing opposite cases back to back, we need to store them in variables so that they can be reset
  const editTodoSpy = jasmine.createSpy().and.returnValue(new Observable());
  const addTodoSpy = jasmine.createSpy().and.returnValue(new Observable());

  todoSvcStub = {
    editTodo: editTodoSpy,
    addTodo: addTodoSpy,
    displaySnackbar: jasmine.createSpy()
  };

  const mockTodoData: {todo: Todo} = {
    todo: {
      _id: '1234',
      title: 'My title',
      content: 'My content',
      status: false,
      __v: 1

    }
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoEditComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: matSnackbarModule, provide: MatSnackBar},
        {useValue: actRouteStub, provide: ActivatedRoute},
        {useValue: routerStub, provide: Router},
        {useValue: todoSvcStub, provide: TodoListService},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Handle route', () => {
    it('should have set currID, currTodo, and editMode to true', () => {


      component.handleRoute(mockTodoData);

      expect(component['currId']).toEqual('1234');
      expect(component['currTodo']).toEqual(mockTodoData.todo);
      expect(component['editMode']).toEqual(true);
    });

    // it('should have created a new todo (editMode to false', () => {
    //   const mockNewTodo = {
    //     todo : {
    //       _id: null,
    //       title: '',
    //       content: '',
    //       status: false,
    //       __v: 0,
    //     }

    //   };

    //   component.handleRoute(mockNewTodo);

    //   expect(component['editMode']).toEqual(false);

    // })
  });

  describe('On submit form', () => {
    it('should have called editTodo since we are in editMode', () => {

      editTodoSpy.calls.reset();
      addTodoSpy.calls.reset();

      component.editMode = true;
      component.onSubmitForm();

      // See actRouteStub.todo
      expect(todoSvcStub.editTodo).toHaveBeenCalledWith({
        _id: "1234",
        title: "My title",
        content: "My content",
        status: false,
        __v: 1234
      });
      expect(todoSvcStub.addTodo).not.toHaveBeenCalled();
    });

    it('should have called addTodo since we are not in editMode', () => {

      editTodoSpy.calls.reset();
      addTodoSpy.calls.reset();

      component.editMode = false;
      component.onSubmitForm();

      expect(todoSvcStub.editTodo).not.toHaveBeenCalled();
      expect(todoSvcStub.addTodo).toHaveBeenCalledWith({
        _id: "1234",
        title: "My title",
        content: "My content",
        status: false,
        __v: 1234
      });
    });
  });

  describe('On todo edited', () => {
    it('should have displayed a snackbar and navigated to /todolist', () => {
      component.onTodoEdited({status: 'OK'});

      expect(todoSvcStub.displaySnackbar).toHaveBeenCalledWith('Todo succesfully edited.');

      expect(routerStub.navigate).toHaveBeenCalledWith(['/todolist']);
    });

    // TODO : handle that
    it('should have displayed an error', () => {
      component.onTodoEdited({status: 'KO'});
    });
  });

  describe('On todo added', () => {
    it('should have displayed a snackbar and navigated to /todolist', () => {
      component.onTodoAdded({status: 'OK'});

      expect(todoSvcStub.displaySnackbar).toHaveBeenCalledWith('Todo succesfully added.');
      expect(routerStub.navigate).toHaveBeenCalledWith(['/todolist']);

    });

    // TODO : handle that
    it('should have displayed an error', () => {
      component.onTodoAdded({status: 'KO'});
    })
  });
});
