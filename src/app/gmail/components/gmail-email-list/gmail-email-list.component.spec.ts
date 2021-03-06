import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { GmailCustomEmail } from '../../interfaces/gmail-custom-email.interface';
import { GmailService } from '../../services/gmail.service';

import { GmailEmailListComponent } from './gmail-email-list.component';

describe('GmailEmailListComponent', () => {
  let component: GmailEmailListComponent;
  let fixture: ComponentFixture<GmailEmailListComponent>;

  const resetTokenSpy = jasmine.createSpy();
  const gmailServiceStub: Partial<GmailService> = {
    onNewEmailListPosted: new Observable(),
    resetTokens: () => {},
    fetchEmailList: () => {},
    toggleImportantEmail: (email: GmailCustomEmail) => new Observable()
  };
  const matSnackbarStub: Partial<MatSnackBar> = {
    open: (message, action, config) => jasmine.createSpyObj(MatSnackBarRef)
  };

  let mockEmailList: Array<GmailCustomEmail>;
  let mockEmailList2: Array<GmailCustomEmail>;
  let mockEmailList3: Array<GmailCustomEmail>;

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
        isRead: true,
        selected: false,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      },
    ];

    mockEmailList2 = [
      {
        id: 'a',
        snippet: 'abc',
        isRead: true,
        selected: true,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      },
      {
        id: 'b',
        snippet: 'abc',
        isRead: true,
        selected: false,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      },
    ];

    mockEmailList3 = [
      {
        id: 'a',
        snippet: 'abc',
        isRead: true,
        selected: true,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      },
      {
        id: 'b',
        snippet: 'abc',
        isRead: true,
        selected: true,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      },
    ];

    await TestBed.configureTestingModule({
      declarations: [ GmailEmailListComponent ],
      providers: [

        { provide: GmailService, useValue: gmailServiceStub},
        { provide: MatSnackBar, useValue: matSnackbarStub},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('Define indeterminate state', () => {
    it('should set the states as false since no emails are selected', () => {
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList;
      component.indeterminateCheckboxChecked = true;
      component.indeterminateCheckboxState = true;

      component.defineIndeterminateState();

      expect(component.indeterminateCheckboxChecked).toEqual(false);
      expect(component.indeterminateCheckboxState).toEqual(false);

    });

    it('should mark indeterminate as true & checked as null since we have one of 2 selected', () => {
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = [...mockEmailList2];


      component.indeterminateCheckboxChecked = false;
      component.indeterminateCheckboxState = false;

      component.defineIndeterminateState();

      expect(component.indeterminateCheckboxChecked).toEqual(null);
      expect(component.indeterminateCheckboxState).toEqual(true);
    });

    it('should mark indeterminate as false & checked as true since all emails are selected', () => {
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = [...mockEmailList3];


      component.indeterminateCheckboxChecked = null;
      component.indeterminateCheckboxState = null;

      component.defineIndeterminateState();

      expect(component.indeterminateCheckboxChecked).toEqual(true);
      expect(component.indeterminateCheckboxState).toEqual(false);
    });
  });

  describe('Handle new email list', () => {
    it('should have properly set the email list', () => {
      spyOn(component, 'defineIndeterminateState');
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList;
      // tslint:disable-next-line: no-string-literal
      component['isLoading'] = true;
      component.handleNewEmailList(mockEmailList2);

      // tslint:disable-next-line: no-string-literal
      expect(component['emailList']).toEqual(mockEmailList2);
      // tslint:disable-next-line: no-string-literal
      expect(component['isLoading']).toEqual(false);
      expect(component.defineIndeterminateState).toHaveBeenCalled();

    });
  });

  describe('Get selected emails', () => {
    it('should properly return the selected emails', () => {
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList2;


      // tslint:disable-next-line: no-string-literal
      const selectedEmails = component['getSelectedEmails']();

      expect(selectedEmails.length).toEqual(1);
      expect(selectedEmails[0]).toEqual(mockEmailList2[0]);



    });
  });

  describe('Prepare interface for search', () => {
    it('should have reset the email list and set isLoading to true', () => {
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList2;
      // tslint:disable-next-line: no-string-literal
      component['isLoading'] = false;

      component.prepareInterfaceForSearch();
      // tslint:disable-next-line: no-string-literal
      expect(component['emailList'].length).toEqual(0);
      // tslint:disable-next-line: no-string-literal
      expect(component['isLoading']).toEqual(true);
    });
  });

  describe('Make init search', () => {
    it('should have prepared the interface, reset the tokens and called the service to fetch the list with correct params', () => {

      spyOn(component, 'prepareInterfaceForSearch');
      spyOn(gmailServiceStub, 'resetTokens');
      spyOn(gmailServiceStub, 'fetchEmailList');

      // tslint:disable-next-line: no-string-literal
      component['currPageSize'] = 25;
      // tslint:disable-next-line: no-string-literal
      component['emailSearchControl'].setValue('Hello');

      // tslint:disable-next-line: no-string-literal
      component['labels'] = 'INBOX';
      component.makeInitSearch();

      // tslint:disable-next-line: no-string-literal
      expect(component['prepareInterfaceForSearch']).toHaveBeenCalled();
      expect(gmailServiceStub.resetTokens).toHaveBeenCalled();
      expect(gmailServiceStub.fetchEmailList).toHaveBeenCalledWith('init', 25, 'Hello', 'INBOX');
    });
  });

  describe('Reverse attribute in list', () => {
    it('should have reversed the attribute of a given email', () => {

      // All emails are selected, we will reverse one of these
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList3;

      // tslint:disable-next-line: no-string-literal
      component['reverseAttributeInList'](mockEmailList3[0].id, 'selected');
    });
  });
  describe('Load new list', () => {
    it('should fetch the email list with prev since the new index is lower than the previous', () => {
      const mockEvent = {
        pageIndex: 1,
        previousPageIndex: 2,
        pageSize: 100
      };

      // tslint:disable-next-line: no-string-literal
      component['emailSearchControl'].setValue('');
      // tslint:disable-next-line: no-string-literal
      component['currPageSize'] = 200;

      // tslint:disable-next-line: no-string-literal
      component['labels'] = 'INBOX';

      spyOn(component, 'prepareInterfaceForSearch');
      spyOn(gmailServiceStub, 'fetchEmailList');

      component.loadNewList(mockEvent);

      // tslint:disable-next-line: no-string-literal
      expect(component['currPageSize']).toEqual(100);
      // tslint:disable-next-line: no-string-literal
      expect(gmailServiceStub['fetchEmailList']).toHaveBeenCalledWith('prev', 100, '', 'INBOX');
    });

    it('should call fetch the email list with next since the new index is higher than the previous', () => {
      const mockEvent = {
        pageIndex: 3,
        previousPageIndex: 2,
        pageSize: 100
      };

      // tslint:disable-next-line: no-string-literal
      component['emailSearchControl'].setValue('');
      // tslint:disable-next-line: no-string-literal
      component['currPageSize'] = 200;

      // tslint:disable-next-line: no-string-literal
      component['labels'] = 'INBOX';

      spyOn(component, 'prepareInterfaceForSearch');
      spyOn(gmailServiceStub, 'fetchEmailList');

      component.loadNewList(mockEvent);

      // tslint:disable-next-line: no-string-literal
      expect(component['currPageSize']).toEqual(100);
      // tslint:disable-next-line: no-string-literal
      expect(gmailServiceStub['fetchEmailList']).toHaveBeenCalledWith('next', 100, '', 'INBOX');
    });
  });

  describe('Stop propagation and toggle email', () => {
    it('should have prevented the normal behavior from happening and toggled the selected status of the email', () => {



      const stopPropSpy = jasmine.createSpy();
      const prevDefaultSpy = jasmine.createSpy();
      // https://stackoverflow.com/questions/8475564/using-jasmines-spyon-upon-a-private-method
      spyOn<any>(component, 'reverseAttributeInList');

      const mockEvent = {
        stopPropagation: stopPropSpy,
        preventDefault: prevDefaultSpy
      };

      const mockEmailId = mockEmailList3[0].id;
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList3;


      component.stopPropagationAndToggleEmail(mockEvent, mockEmailId);

      expect(stopPropSpy).toHaveBeenCalled();
      expect(prevDefaultSpy).toHaveBeenCalled();

      // tslint:disable-next-line: no-string-literal
      expect(component['reverseAttributeInList']).toHaveBeenCalledWith(mockEmailId, 'selected');
    });
  });

  describe('Toggle important email', () => {
    it('should apply modifications on screen, and then call the service', () => {

      const stopPropSpy = jasmine.createSpy();
      const mockEvent = {
        stopPropagation: stopPropSpy
      };
      // https://stackoverflow.com/questions/8475564/using-jasmines-spyon-upon-a-private-method
      spyOn<any>(component, 'reverseAttributeInList');
      spyOn(gmailServiceStub, 'toggleImportantEmail').and.returnValue(new Observable());
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList3;

      component.toggleImportantEmail(mockEvent, mockEmailList3[0]);

      expect(stopPropSpy).toHaveBeenCalled();

      // tslint:disable-next-line: no-string-literal
      expect(component['reverseAttributeInList']).toHaveBeenCalledWith(mockEmailList3[0].id, 'important');
      expect(gmailServiceStub.toggleImportantEmail).toHaveBeenCalledWith(mockEmailList3[0]);

    });
  });

  describe('Toggle all emails', () => {
    it('should apply the new state to all emails', () => {
      // tslint:disable-next-line: no-string-literal
      component['emailList'] = mockEmailList;

      // tslint:disable-next-line: no-string-literal
      component['emailList'].forEach((email) => {
        return email.selected;
      });


      // tslint:disable-next-line: no-string-literal
      component['toggleAllEmails']({source: {}, checked: true});

      component.emailList.forEach((email) => {
        expect(email.selected).toEqual(true);
      });
    });
  });


});


