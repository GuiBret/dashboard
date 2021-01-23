import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GmailCustomEmail } from '../interfaces/gmail-custom-email.interface';
import { GmailEmail } from '../interfaces/gmail-email.interface';
import { GmailService } from '../services/gmail.service';

@Injectable()
export class GetEmailResolver implements Resolve<any> {
  constructor(private gmailService: GmailService, private httpService: HttpService, private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot): Observable<GmailCustomEmail> {
    const emailId = route.paramMap.get('emailid');

    return new Observable((observer) => {

      if (this.gmailService.containsEmailWithId(emailId)) {
        observer.next(this.gmailService.getCachedEmail(emailId));
        observer.complete();

      }

      this.httpService.getIndividualEmailInfo(emailId).subscribe((emailInfo: GmailEmail) => {
        const filteredEmail = this.gmailService.filterEmailInfo(emailInfo);

        observer.next(filteredEmail);
        observer.complete();

      });

      if (this.gmailService.containsEmailWithId(emailId)) {
        return this.gmailService.getCachedEmail(emailId);
      }

      this.httpService.getIndividualEmailInfo(emailId).subscribe((emailInfo: GmailEmail) => {
        const filteredEmail = this.gmailService.filterEmailInfo(emailInfo);
        return {emailContent: filteredEmail};

      });


    });




  }

}
