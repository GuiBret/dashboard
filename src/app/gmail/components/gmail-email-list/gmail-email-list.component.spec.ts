import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/services/http.service';
import { GmailCustomEmail } from '../../interfaces/gmail-custom-email.interface';

import { GmailEmailListComponent } from './gmail-email-list.component';

describe('GmailEmailListComponent', () => {
  let component: GmailEmailListComponent;
  let fixture: ComponentFixture<GmailEmailListComponent>;

  const httpServiceStub: Partial<HttpService> = {

  };

  const mockEmailList: Array<GmailCustomEmail> = [
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

  const mockEmailList2: Array<GmailCustomEmail> = [
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
  const mockEmailList3: Array<GmailCustomEmail> = [
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailEmailListComponent ],
      providers: [
        { provide: HttpService, useValue: httpServiceStub}
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
      console.log(mockEmailList);
      component['emailList'] = mockEmailList;
      component.indeterminateCheckboxChecked = true;
      component.indeterminateCheckboxState = true;

      component.defineIndeterminateState();

      expect(component.indeterminateCheckboxChecked).toEqual(false);
      expect(component.indeterminateCheckboxState).toEqual(false);

    });

    it('should mark indeterminate as true & checked as null since we have one of 2 selected', () => {
      console.log(mockEmailList);
      component['emailList'] = [...mockEmailList2];


      component.indeterminateCheckboxChecked = false;
      component.indeterminateCheckboxState = false;

      component.defineIndeterminateState();

      expect(component.indeterminateCheckboxChecked).toEqual(null);
      expect(component.indeterminateCheckboxState).toEqual(true);
    });

    it('should mark indeterminate as false & checked as true since all emails are selected', () => {
      console.log(mockEmailList);
      component['emailList'] = [...mockEmailList3];


      component.indeterminateCheckboxChecked = null;
      component.indeterminateCheckboxState = null;

      component.defineIndeterminateState();

      expect(component.indeterminateCheckboxChecked).toEqual(true);
      expect(component.indeterminateCheckboxState).toEqual(false);
    });
  });
});
