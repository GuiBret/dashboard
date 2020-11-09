import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { TodoEditComponent } from './todo-edit.component';

describe('TodoEditComponent', () => {
  let component: TodoEditComponent;
  let fixture: ComponentFixture<TodoEditComponent>;
  let httpClientStub: Partial<HttpClient>;
  let matSnackbarModule: Partial<MatSnackBar>;
  let actRouteStub: Partial<ActivatedRoute>;
  let routerStub: Partial<Router>;

  httpClientStub = {
    get: jasmine.createSpy().and.returnValue(new Observable()),
  };


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoEditComponent ],
      providers: [
        {useValue: httpClientStub, provide: HttpClient},
        {useValue: matSnackbarModule, provide: MatSnackBar},
        {useValue: actRouteStub, provide: ActivatedRoute},
        {useValue: routerStub, provide: Router},
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
});
