import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GmailService } from './gmail.service';

describe('GmailService', () => {
  let service: GmailService;
  const httpServiceStub: Partial<HttpService> = {
    modifyEmail: () => new Observable()
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
  });


});
