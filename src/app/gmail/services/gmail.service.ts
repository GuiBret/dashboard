import { Injectable } from '@angular/core';
import { emit } from 'process';
import { forkJoin, Observable, Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GmailCustomEmail } from '../interfaces/gmail-custom-email.interface';
import { GmailEmail } from '../interfaces/gmail-email.interface';
import * as quotedPrintable from 'quoted-printable';
import { map } from 'rxjs/operators';

/**
 * The service that handles all playback actions with Spotify
 */
@Injectable({
  providedIn: 'root'
})
export class GmailService {

  private newEmailListPosted: Subject<any> = new Subject();
  public onNewEmailListPosted = this.newEmailListPosted.asObservable();

  // TODO: merge these 2 properties
  private cachedMessages: Object = {};
  private messageBox = [];

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

    // First call to get the email list
    this.http.getEmailList(limit, token).subscribe((response: {messages: Array<{id: string, threadId: string}>, nextPageToken: string}) => {

      this.nextPageToken = response.nextPageToken;

      // Then we make a call for each
      const messagesToFetch = response.messages.map(this.makeGetCallOnEmail.bind(this));

      // When all calls are finished, we post the email list
      forkJoin(messagesToFetch).subscribe({
        complete: () => {
          this.newEmailListPosted.next(this.messageBox);
          this.messageBox = [];
        }
      });
    });
  }

  /**
   * Makes the call to get the email with id message.id, returns observable
   * @param message The message object, containing the ID of the email we want to get
   */
  private makeGetCallOnEmail(message: {id: string, threadId: string}) {
    return this.http.getIndividualEmailInfo(message.id).pipe(map(this.parseEmail.bind(this)));
  }

  private parseEmail(emailInfo: GmailEmail) {

      const filteredEmail = this.filterEmailInfo(emailInfo);
      this.cachedMessages[emailInfo.id] = filteredEmail;

      // We push the message in messages to use it in GmailEmailComponent
      this.messageBox.push(filteredEmail);
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

    let htmlContentAsBase64;

    if(emailInfo.payload.body.size !== 0) {
      htmlContentAsBase64 = emailInfo.payload.body.data;
    } else { // Otherwise we check in parts

      // TODO: Add recursion on part search
      let filteredParts = emailInfo.payload.parts.filter((currPart: { mimeType: string, body: {data: string}}) => {
        return currPart.mimeType === 'text/html';
      });

      if(filteredParts.length === 0) {
        htmlContentAsBase64 = '';
      } else {
        htmlContentAsBase64 = filteredParts[0].body.data;
      }
    }


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

  markEmailAsRead(id: string) {
    return this.http.modifyEmail(id, {
      "removeLabelIds": [
        'UNREAD'
      ]
    });
  }

  markEmailAsUnread(id: string) {
    // this.http.modifyEmail({
    //   "addLabelIds": [
    //     'UNREAD'
    //   ]
    // });
  }
}
