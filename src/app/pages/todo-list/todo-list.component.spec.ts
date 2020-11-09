import { ObserversModule } from '@angular/cdk/observers';
import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { observeOn } from 'rxjs/operators';
import { TodoListService } from 'src/app/services/todo-list.service';

import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let httpClientStub: Partial<HttpClient>;
  let matSnackbarStub: Partial<MatSnackBar>;
  let todoSvcStub: Partial<TodoListService>;
  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable()),
    post: jasmine.createSpy().and.returnValue(new Observable()),

  }

  matSnackbarStub = {
    open: jasmine.createSpy()
  }

  todoSvcStub = {
    saveTodoList: jasmine.createSpy().and.returnValue(new Observable((observer) => observer.next({status: 'OK'})))
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: matSnackbarStub, provide: MatSnackBar},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Save todo list', () => {
    it('should display a snackbar for 2 seconds', () => {
      const prevMockFct = todoSvcStub.saveTodoList;


      component.saveTodoList();

      expect(matSnackbarStub.open).toHaveBeenCalledWith('Todo List saved succesfully', '', { duration: 2000});
      todoSvcStub.saveTodoList = prevMockFct;
    });
    it("should not do anything since todoSvc.saveTodoList somehow returns an observable containing KO", () => {

    });
  })
});
