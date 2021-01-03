import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GmailService } from './gmail.service';

describe('GmailService', () => {
  let service: GmailService;
  const httpServiceStub: Partial<HttpService> = {
    modifyEmail: () => new Observable(),
    getIndividualEmailInfo: jasmine.createSpy().and.returnValue(new Observable())
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
      const mockEmail = {
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

      service.toggleImportantEmail(mockEmail);

      expect(httpServiceStub.modifyEmail).toHaveBeenCalledWith(mockEmail.id, {
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
});
