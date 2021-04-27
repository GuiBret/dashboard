import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { TodoListService } from '../services/todo-list.service';

import { TodoDataResolverService } from './todo-data-resolver.service';

describe('TodoDataResolverService', () => {

  const getTodoListSpy = jasmine.createSpy().and.returnValue(new Observable());
  const getTodoSpy = jasmine.createSpy();

  let service: TodoDataResolverService;
  let httpServiceStub: Partial<HttpService>;
  let matSnackbarStub: Partial<MatSnackBar>;
  let todoSvcStub: Partial<TodoListService>;

  httpServiceStub = {
    getTodoList: getTodoListSpy
  };

  todoSvcStub = {
    getTodo: getTodoSpy
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {useValue: httpServiceStub, provide: HttpService},
        {useValue: matSnackbarStub, provide: MatSnackBar},
        {useValue: {snapshot: {paramMap: convertToParamMap({id: null})}}, provide: ActivatedRoute}
      ]
    });
    service = TestBed.inject(TodoDataResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('should have return an empty Todo object since todoId is not provided', () => {
    const route = TestBed.inject(ActivatedRoute);
    getTodoListSpy.calls.reset();
    getTodoSpy.calls.reset();

    service.resolve(route.snapshot, null);

    expect(getTodoSpy).not.toHaveBeenCalled();
    expect(getTodoListSpy).not.toHaveBeenCalled();
  });

});
