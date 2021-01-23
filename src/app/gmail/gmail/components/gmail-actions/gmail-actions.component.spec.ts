import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GmailService } from 'src/app/gmail/services/gmail.service';

import { GmailActionsComponent } from './gmail-actions.component';

describe('GmailActionsComponent', () => {
  let component: GmailActionsComponent;
  let fixture: ComponentFixture<GmailActionsComponent>;
  const gmailServiceStub: Partial<GmailService> = {

  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailActionsComponent ],
      providers: [
        { useValue: gmailServiceStub, provide: GmailService}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // describe('Mark multiple emails as read', () => {
  //   it('should call the HTTP service to mark the email as read', () => {
  //     // tslint:disable-next-line: no-string-literal
  //     component['emailList'] = mockEmailList;

  //     component.markMultipleEmailsAsRead();
  //   });
  // });
});
