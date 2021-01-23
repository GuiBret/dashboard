import { ComponentFixture, TestBed } from '@angular/core/testing';
import { doesNotReject } from 'assert';
import { Observable } from 'rxjs';
import { GmailCustomEmail } from 'src/app/gmail/interfaces/gmail-custom-email.interface';
import { GmailService } from 'src/app/gmail/services/gmail.service';

import { GmailActionsComponent } from './gmail-actions.component';

describe('GmailActionsComponent', () => {
  let component: GmailActionsComponent;
  let fixture: ComponentFixture<GmailActionsComponent>;
  let mockEmailList: Array<GmailCustomEmail>;

  const gmailServiceStub: Partial<GmailService> = {
    messagesSelected: [{
        id: 'b',
        snippet: 'abc',
        isRead: false,
        selected: false,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
    }],
    markMultipleEmailsAsRead: () => new Observable(),
    deleteMultipleEmails: () => new Observable(),
    trashMessages: () => new Observable(),
    untrashMessages: () => new Observable(),
    resetMessageBox: () => {}
  };


  beforeEach(async () => {

    mockEmailList = [
      {
        id: 'a',
        snippet: 'abc',
        isRead: true,
        selected: false,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      },
      {
        id: 'b',
        snippet: 'abc',
        isRead: false,
        selected: false,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      },
    ];

    // tslint:disable-next-line: no-string-literal
    gmailServiceStub['messageBox'] = mockEmailList;


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

  describe('Mark multiple emails as read', () => {
    it('should call the HTTP service to mark the email as read', (done) => {
      spyOn<any>(component, 'onCallbackForBatchMarkAsRead');
      spyOn(gmailServiceStub, 'markMultipleEmailsAsRead').and.returnValue(new Observable(o => o.next()));

      component.markMultipleEmailsAsRead();

      setTimeout(() => {
        expect(gmailServiceStub.markMultipleEmailsAsRead).toHaveBeenCalledWith(['b']);
        // tslint:disable-next-line: no-string-literal
        expect(component['onCallbackForBatchMarkAsRead']).toHaveBeenCalled();
        done();
      }, 500);
    });
  });

  describe('Delete selected emails', () => {
    it('should call the HTTP service to delete the selected messages and called the callback when finished', (done) => {
      // tslint:disable-next-line: no-string-literal
      spyOn<any>(component, 'onMultipleEmailsDeleted');

      spyOn(gmailServiceStub, 'deleteMultipleEmails').and.returnValue(new Observable(o => o.next()));

      component.deleteMultipleEmails();

      setTimeout(() => {
        expect(gmailServiceStub.deleteMultipleEmails).toHaveBeenCalledWith(['b']);
        // tslint:disable-next-line: no-string-literal
        expect(component['onMultipleEmailsDeleted']).toHaveBeenCalled();
        done();
      }, 500);
    });
  });

  describe('Trash multiple emails', () => {
    it('should have called GmailService to delete the selected messages and called the callback after subscription', (done) => {
      // tslint:disable-next-line: no-string-literal
      spyOn<any>(component, 'onMultipleEmailsTrashed');

      spyOn(gmailServiceStub, 'trashMessages').and.returnValue(new Observable(o => o.next()));

      component.trashMultipleEmails();

      setTimeout(() => {
        expect(gmailServiceStub.trashMessages).toHaveBeenCalledWith(['b']);
        // tslint:disable-next-line: no-string-literal
        expect(component['onMultipleEmailsTrashed']).toHaveBeenCalled();
        done();
      }, 500);
    });
  });

  describe('Untrash multiple emails', () => {
    it('should have called GmailService to "untrash" the selected messages and called the callback after subscription', (done) => {
      // tslint:disable-next-line: no-string-literal
      spyOn<any>(component, 'onMultipleEmailsUntrashed');

      spyOn(gmailServiceStub, 'untrashMessages').and.returnValue(new Observable(o => o.next()));

      component.untrashMessages();

      setTimeout(() => {
        expect(gmailServiceStub.untrashMessages).toHaveBeenCalledWith(['b']);
        // tslint:disable-next-line: no-string-literal
        expect(component['onMultipleEmailsUntrashed']).toHaveBeenCalled();
        done();
      }, 500);
    });
  });

  describe('On multiple emails read or unread', () => {
    it('should have triggered the event emitter', () => {
      spyOn(component.emailListChanged, 'next');
      const list = ['a', 'b', 'c'];

      // tslint:disable-next-line: no-string-literal
      component['onCallbackForBatchMarkAsRead'](list);

      expect(component.emailListChanged.next).toHaveBeenCalledWith(list);
    });
  });

  describe('On multiple emails deleted', () => {
    it('should have triggered a new search and reset all messages in the service', () => {
      spyOn(gmailServiceStub, 'resetMessageBox');
      spyOn(component.triggerSearch, 'next');
      const list = ['a', 'b', 'c'];

      // tslint:disable-next-line: no-string-literal
      component['onMultipleEmailsDeleted']();

      expect(gmailServiceStub.resetMessageBox).toHaveBeenCalled();
      expect(component.triggerSearch.next).toHaveBeenCalled();
    });
  });

});
