import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { GmailService } from '../../services/gmail.service';

import { GmailTrashComponent } from './gmail-trash.component';

describe('GmailTrashComponent', () => {
  let component: GmailTrashComponent;
  let fixture: ComponentFixture<GmailTrashComponent>;
  let gmailServiceStub: Partial<GmailService>;

  gmailServiceStub = {
    fetchEmailList: () => new Observable()
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailTrashComponent ],
      providers: [
        { provide: GmailService, useValue: gmailServiceStub},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
