import { HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http.service';

import { GmailComponent } from './gmail.component';

describe('GmailComponent', () => {
  let component: GmailComponent;
  let fixture: ComponentFixture<GmailComponent>;

  const httpServiceStub: Partial<HttpService> = {
    getEmailList: jasmine.createSpy().and.returnValue(new Observable())
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GmailComponent ],
      providers: [
        { provide: HttpService, useValue: httpServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
