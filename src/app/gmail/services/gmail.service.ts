import { Injectable } from '@angular/core';
import { emit } from 'process';
import { Observable, Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GmailCustomEmail } from '../interfaces/gmail-custom-email.interface';
import { GmailEmail } from '../interfaces/gmail-email.interface';
import * as quotedPrintable from 'quoted-printable';

/**
 * The service that handles all playback actions with Spotify
 */
@Injectable({
  providedIn: 'root'
})
export class GmailService {

  private cachedMessages: Object = {};
  private newEmailListPosted: Subject<any> = new Subject();
  public onNewEmailListPosted = this.newEmailListPosted.asObservable();

  private nextPageToken = '';

  constructor(private http: HttpService) {

  }

  get pageToken()  {
    return this.nextPageToken;
  }

  checkGmailStatus() {
    return localStorage.getItem('gmailToken') != null && parseInt(localStorage.getItem('gmailExp')) > (new Date().getTime());
  }

  /**
   * Retrieves the email id list, then makes another call per email to get content
   */
  fetchEmailList(limit = 50, token = null) {

    let messages: Array<GmailCustomEmail> = [];
    console.log(this.nextPageToken);

    // TODO: Rewrite & flatten that
    this.http.getEmailList(limit, token).subscribe((response: {messages: Array<{id: string, threadId: string}>, nextPageToken: string}) => {

      this.nextPageToken = response.nextPageToken;
      response.messages.forEach((message: {id: string, threadId: string}) => {

        this.http.getIndividualEmailInfo(message.id).subscribe((emailInfo: GmailEmail) => {

          let sender = emailInfo.payload.headers.filter((currHeader: {name: string, value: string}) => {
            return currHeader.name === 'From';
          })[0].value;

          const filteredEmail = this.filterEmailInfo(emailInfo);
          this.cachedMessages[emailInfo.id] = filteredEmail;
          // We push the message in messages to use it in GmailEmailComponent
          messages.push(filteredEmail);

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

  getCachedEmail(emailId: string) {
    return this.cachedMessages[emailId];
  }

  filterEmailInfo(emailInfo: GmailEmail) : GmailCustomEmail {

    const id = emailInfo.id;
    const internalDate = emailInfo.internalDate;
    const isRead = !emailInfo.labelIds.includes('UNREAD');

    const snippet = quotedPrintable.decode(emailInfo.snippet);

    const sender = emailInfo.payload.headers.filter((currHeader: {name: string, value: string}) => {
      return currHeader.name === 'From';
    })[0].value;

    const subject = emailInfo.payload.headers.filter((currHeader: {name: string, value: string}) => {
      return currHeader.name === 'Subject';
    })[0].value;

    const htmlContentAsBase64 = emailInfo.payload.parts.filter((currPart: { mimeType: string, body: {data: string}}) => {
      return currPart.mimeType === 'text/html';
    })[0].body.data;


    // https://stackoverflow.com/questions/24745006/gmail-api-parse-message-content-base64-decoding-with-javascript
    const htmlContent = atob( htmlContentAsBase64.replace(/-/g, '+').replace(/_/g, '/') );

    return {
      id: id,
      internalDate: internalDate,
      isRead: isRead,
      snippet: snippet,
      from: sender,
      subject: subject,
      htmlContent: htmlContent
    };
  }

  containsEmailWithId(emailId: string) : boolean {
    return this.cachedMessages[emailId] != null;
  }
}
