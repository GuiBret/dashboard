import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http.service';
import { GmailService } from './gmail.service';

describe('GmailService', () => {
  let service: GmailService;
  const httpServiceStub: Partial<HttpService> = {
    modifyEmail: () => new Observable(),
    getIndividualEmailInfo: jasmine.createSpy().and.returnValue(new Observable()),
    getEmailList: jasmine.createSpy().and.returnValue(new Observable()),
    batchModifyEmails: () => new Observable(),
    deleteMultipleEmails: () => new Observable()
  };

  const mockEmail = {
    id: '176e3e15c4b963d8',
    threadId: '176e3e15c4b963d8',
    labelIds: [
      'UNREAD',
      'INBOX'
    ],
    snippet: 'Snippet',
    payload: {
      partId: '',
      mimeType: 'multipart/alternative',
      filename: '',
      headers: [
        {
          name: 'From',
          value: 'ab@c.com'
        },

      ],
      body: {
        size: 15,
        data: 'SGVsbG8gd29ybGQ='
      },
      parts: [
        {
          partId: '0',
          mimeType: 'text/html',
          filename: '',
          headers: [
            {
              name: 'Content-Type',
              value: 'text/plain;charset=UTF-8'
            },
            {
              name: 'Content-Transfer-Encoding',
              value: 'quoted-printable'
            },
            {
              name: 'Content-ID',
              value: 'text-body'
            }
          ],
          body: {
            size: 20,
            data: 'VGVzdCBlbWFpbCBkYXRh'
          }
        }
      ]
    },
    sizeEstimate: 73980,
    historyId: '8463774',
    internalDate: '1610140962000'
  };


  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {useValue: httpServiceStub, provide: HttpService}
      ]
    });
    service = TestBed.inject(GmailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('On email list received', () => {
    it('should have posted an empty array and stored an empty array since we have no results', () => {

      // tslint:disable-next-line: no-string-literal
      spyOn(service['newEmailListPosted'], 'next');

      const mockEmptyResponse = {
        messages: [],
        resultSizeEstimate : 0,
        nextPageToken: 'abc'
      };

      // tslint:disable-next-line: no-string-literal
      service['messageBox'] = [{}, {}, {}];

      service.onEmailListReceived('init', mockEmptyResponse);

      // tslint:disable-next-line: no-string-literal
      expect(service['messageBox'].length).toEqual(0);
      // tslint:disable-next-line: no-string-literal
      expect(service['newEmailListPosted'].next).toHaveBeenCalledWith([]);

    });

    it('should have added a new token since we are at the last index', () => {


      spyOn<any>(service, 'makeGetCallOnEmail');
      spyOn(service, 'fetchAllMessages');

      // tslint:disable-next-line: no-string-literal
      service['tokens'] = [null, 'a', 'b', 'c'];
      // tslint:disable-next-line: no-string-literal
      service['currTokenIdx'] = 3;

      const mockResponse = {
        messages: [
          {id: '1', threadId: 'a'},
          {id: '2', threadId: 'a'},
          { id: '3', threadId: 'a' },
          { id: '4', threadId: 'a' },
          { id: '5', threadId: 'a' }
        ],
        resultSizeEstimate : 5,
        nextPageToken: 'd'
      };


      service.onEmailListReceived('next', mockResponse);

      // tslint:disable-next-line: no-string-literal
      expect(service['tokens'].length).toEqual(5);
      // tslint:disable-next-line: no-string-literal
      expect(service['makeGetCallOnEmail']).toHaveBeenCalledTimes(5);
      // tslint:disable-next-line: no-string-literal
      expect(service['fetchAllMessages']).toHaveBeenCalled();
    });
  });

  describe('Toggle important email', () => {

    it('should add the IMPORTANT label since it is not marked as such', () => {
      const mockEmail = {
        id: 'a',
        snippet: 'abc',
        isRead: true,
        selected: false,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: false
      };

      spyOn(httpServiceStub, 'modifyEmail');

      service.toggleImportantEmail(mockEmail);

      expect(httpServiceStub.modifyEmail).toHaveBeenCalledWith(mockEmail.id, {
        addLabelIds: ['IMPORTANT']
      });

    });

    it('should remove the IMPORTANT label since it is marked as such', () => {
      const mockImportantEmail = {
        id: 'a',
        snippet: 'abc',
        isRead: true,
        selected: false,
        from: 'element@truc.com',
        internalDate: 123456,
        subject: 'Subject',
        htmlContent: '<p></p>',
        important: true
      };

      spyOn(httpServiceStub, 'modifyEmail');

      service.toggleImportantEmail(mockImportantEmail);

      expect(httpServiceStub.modifyEmail).toHaveBeenCalledWith(mockImportantEmail.id, {
        removeLabelIds: ['IMPORTANT']
      });

    });
  });

  describe('Reset tokens', () => {
    it('should have reset the tokens array and the token ID', () => {
      // tslint:disable-next-line: no-string-literal
      service['tokens'] = [null, 'a', 'b', 'c'];
      // tslint:disable-next-line: no-string-literal
      service['currTokenIdx'] = 2;

      service.resetTokens();

      // tslint:disable-next-line: no-string-literal
      expect(service['tokens'].length).toEqual(1);
      // tslint:disable-next-line: no-string-literal
      expect(service['currTokenIdx']).toEqual(0);
    });
  });

  describe('Fetch email list', () => {
    it('should keep currTokenIdx at 0 & make call with null', () => {

      // Define init values
      // tslint:disable-next-line: no-string-literal
      service['currTokenIdx'] = 0;
      // tslint:disable-next-line: no-string-literal
      service['tokens'] = [null];
      // tslint:disable-next-line: no-string-literal
      service['limit'] = 50;
      // tslint:disable-next-line: no-string-literal
      service['query'] = '';

      service.fetchEmailList('init');
      // tslint:disable-next-line: no-string-literal
      expect(service['currTokenIdx']).toEqual(0);
      // tslint:disable-next-line: no-string-literal
      expect(service['tokens']).toEqual([null]);
      expect(httpServiceStub.getEmailList).toHaveBeenCalledWith(50, null, null);
    });

    it('should have used the following token since we have passed next', () => {
      // tslint:disable-next-line: no-string-literal
      service['currTokenIdx'] = 0;
      // tslint:disable-next-line: no-string-literal
      service['tokens'] = [null, 'a'];
      // tslint:disable-next-line: no-string-literal
      service['limit'] = 50;

      service.fetchEmailList('next');

      // tslint:disable-next-line: no-string-literal
      expect(service['currTokenIdx']).toEqual(1);
      expect(httpServiceStub.getEmailList).toHaveBeenCalledWith(50, 'a', null);
    });

    it('should have used the previous token since we have passed prev', () => {
      // tslint:disable-next-line: no-string-literal
      service['currTokenIdx'] = 2;
      // tslint:disable-next-line: no-string-literal
      service['tokens'] = [null, 'a', 'b'];
      // tslint:disable-next-line: no-string-literal
      service['limit'] = 50;

      service.fetchEmailList('prev');

      // tslint:disable-next-line: no-string-literal
      expect(service['currTokenIdx']).toEqual(1);
      expect(httpServiceStub.getEmailList).toHaveBeenCalledWith(50, 'a', null);
    });

  });

  describe('Search header', () => {
    it('should return a correct value since we have found the required header', () => {
      const headers = [{
            name: 'From',
            value: 'My name'
      }];


      const result = service.searchHeader(headers, 'From');

      expect(result).toEqual('My name');
    });

    it('should return an empty string since we have not found what was required', () => {
      const headers = [{
        name: 'From',
        value: 'My name'
      }];


      const result = service.searchHeader(headers, 'Subject');

      expect(result).toEqual('');
    });
  });

  describe('Sort emails by date', () => {
    it('should correctly order emails', () => {
      const emailA = {
        name: 'a',
        internalDate: 2
      };

      const emailB = {
        name: 'b',
        internalDate: 3
      };

      // tslint:disable-next-line: no-string-literal
      expect(service['sortEmailsByDate'](emailA, emailB)).toEqual(1);
      // tslint:disable-next-line: no-string-literal
      expect(service['sortEmailsByDate'](emailB, emailA)).toEqual(-1);
    });
  });

  describe('Parse email', () => {
    it('should call the function filtering emailinfo & correctly store the message in the arrays', () => {
      // tslint:disable-next-line: no-string-literal
      service['cachedMessages'] = [];
      // tslint:disable-next-line: no-string-literal
      service['messageBox'] = [];

      spyOn(service, 'filterEmailInfo').and.returnValue({id: 'a', internalDate: 1234, snippet: 'Hello', isRead: true, from: 'a@abc.com', subject: '', htmlContent: '<p></p>', selected: false, important: true});

      // tslint:disable-next-line: no-string-literal
      service['parseEmail'](mockEmail);

      // tslint:disable-next-line: no-string-literal
      expect(service['filterEmailInfo']).toHaveBeenCalledWith(mockEmail);

      // tslint:disable-next-line: no-string-literal
      expect(service['messageBox'].length).toEqual(1);

      // tslint:disable-next-line: no-string-literal
      console.log('Cached messages');
      // tslint:disable-next-line: no-string-literal
      console.log(service['cachedMessages']);
      // tslint:disable-next-line: no-string-literal
      expect(service['cachedMessages'][mockEmail.id]).toEqual({id: 'a', internalDate: 1234, snippet: 'Hello', isRead: true, from: 'a@abc.com', subject: '', htmlContent: '<p></p>', selected: false, important: true});
    });
  });

  describe('filterEmailInfo', () => {

    it('should have passed a normal case', () => {
      // tslint:disable-next-line: no-string-literal
      const filteredEmail = service['filterEmailInfo'](mockEmail);

      expect(filteredEmail.isRead).toEqual(false);
      expect(filteredEmail.important).toEqual(false);
      expect(filteredEmail.from).toEqual('ab@c.com');
      expect(filteredEmail.htmlContent).toEqual('Hello world');



    });
    it('should not set isRead and important if they are missing', () => {
      const mockEmailInfo = JSON.parse(JSON.stringify(mockEmail));

      mockEmailInfo.labelIds = null;


      // tslint:disable-next-line: no-string-literal
      const filteredEmail = service['filterEmailInfo'](mockEmailInfo);

      expect(filteredEmail.isRead).toEqual(true);
      expect(filteredEmail.important).toEqual(false);

    });

    it('should use the first part since the payload data is empty', () => {
      const mockModifiedEmail = JSON.parse(JSON.stringify(mockEmail));
      mockModifiedEmail.payload.body.size = 0;
      mockModifiedEmail.payload.body.data = '';

      // tslint:disable-next-line: no-string-literal
      const filteredEmail = service['filterEmailInfo'](mockModifiedEmail);

      expect(filteredEmail.htmlContent).toEqual('Test email data');


    });

    it('should not return any html content since the parts payload mimetype is not valid', () => {
      const mockModifiedEmail = JSON.parse(JSON.stringify(mockEmail));
      mockModifiedEmail.payload.body.size = 0;
      mockModifiedEmail.payload.body.data = '';

      mockModifiedEmail.payload.parts[0].mimeType = 'application/json';

      // tslint:disable-next-line: no-string-literal
      const filteredEmail = service['filterEmailInfo'](mockModifiedEmail);

      expect(filteredEmail.htmlContent).toEqual('');
    });
  });

  describe('Mark email as read', () => {
    it('should have called the HTTP service to modify this email', () => {
      const mockId = 'abc';

      spyOn(httpServiceStub, 'modifyEmail');
      // tslint:disable-next-line: no-string-literal
      service['markEmailAsRead'](mockId);

      expect(httpServiceStub.modifyEmail).toHaveBeenCalledWith('abc', {
        removeLabelIds: [
          'UNREAD'
        ]
      });
    });

    describe('Mark multiple emails as read', () => {
      it('should have called the HTTP service method to modify emails in batch', () => {
        const mockIds = ['abc', 'def', 'ghi'];

        spyOn(httpServiceStub, 'batchModifyEmails');
        // tslint:disable-next-line: no-string-literal
        service['markMultipleEmailsAsRead'](mockIds);

        expect(httpServiceStub.batchModifyEmails).toHaveBeenCalledWith({
          ids: mockIds,
          removeLabelIds: ['UNREAD']
        });
      });
    });

    describe('Delete multiple emails', () => {
      it('should have called the HTTP service method to delete emails in batch', () => {
        const mockIds = ['abc', 'def', 'ghi'];

        spyOn(httpServiceStub, 'deleteMultipleEmails');
        // tslint:disable-next-line: no-string-literal
        service['deleteMultipleEmails'](mockIds);

        expect(httpServiceStub.deleteMultipleEmails).toHaveBeenCalledWith({
          ids: mockIds
        });
      });
    });
  });
});
