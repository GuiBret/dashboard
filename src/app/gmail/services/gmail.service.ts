import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GmailCustomEmail } from '../interfaces/gmail-custom-email.interface';
import { GmailEmail } from '../interfaces/gmail-email.interface';

/**
 * The service that handles all playback actions with Spotify
 */
@Injectable({
  providedIn: 'root'
})
export class GmailService {

  private newEmailListPosted: Subject<any> = new Subject();
  public onNewEmailListPosted = this.newEmailListPosted.asObservable();

  constructor(private http: HttpService) {

  }

  /**
   * Retrieves the email id list, then makes another call per email to get content
   */
  fetchEmailList() {

    let messages: Array<GmailCustomEmail> = [];

    // TODO: Rewrite that

    this.http.getEmailList().subscribe((response: {messages: Array<{id: string, threadId: string}>}) => {
      response.messages.forEach((message: {id: string, threadId: string}) => {

        this.http.getIndividualEmailInfo(message.id).subscribe((emailInfo: GmailEmail) => {

          let sender = emailInfo.payload.headers.filter((currHeader: {name: string, value: string}) => {
            return currHeader.name === 'From';
          })[0].value;
          messages.push({
            id: emailInfo.id,
            internalDate: emailInfo.internalDate,
            isRead: !emailInfo.labelIds.includes('UNREAD'),
            snippet: decodeURIComponent(emailInfo.snippet),
            from: sender


          });

        })
      });
    });

    setTimeout(() => {
      messages.sort((a, b) => {
        return b.internalDate - a.internalDate;
      })
      this.newEmailListPosted.next(messages);

    }, 2000);
  }
}
