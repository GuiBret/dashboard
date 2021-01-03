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
  private tokens = [null];
  private currTokenIdx = 0;

  constructor(private http: HttpService) {

  }

  get pageToken()  {
    return this.nextPageToken;
  }

  resetTokens() {
    this.tokens = [null];
    this.currTokenIdx = 0;
  }

  checkGmailStatus() {
    return localStorage.getItem('gmailToken') != null && parseInt(localStorage.getItem('gmailExp')) > (new Date().getTime());
  }

  /**
   * Retrieves the email id list, then makes another call per email to get content
   *
   *
   *
   * sélection token :

   * si init : rien (null)
   * si next : currTokenIdx
   * si prev : currTokenIdx - 1
   *
   * Après requête :
   *
   * Si prev : rien, currTokenIdx--
   * Si next :
   *    currTokenIdx++
   *    si currTokenIdx === tokens.length - 1 (dernier élement)
   *        push token

   * Si init : push token
   */
  fetchEmailList(direction: string, limit = 50, query = null) {
    let token = null;
    if(direction === 'next') {
      this.currTokenIdx++;
      token = this.tokens[this.currTokenIdx];
    } else if(direction === 'prev') {
      this.currTokenIdx--;
      token = this.tokens[this.currTokenIdx];
    }

    // First call to get the email list
    this.http.getEmailList(limit, token, query).subscribe((response: {messages: Array<{id: string, threadId: string}>, nextPageToken: string, resultSizeEstimate: number}) => {

      // If we are trying to go to next page and go to a new token which we did not go to, we add it to the list

      if(direction === 'init') {
        this.tokens.push(response.nextPageToken);
      }
      else if(direction === 'next' && this.currTokenIdx === this.tokens.length - 1) {
          this.tokens.push(response.nextPageToken);
      }


      if(response.resultSizeEstimate === 0) {
        this.newEmailListPosted.next([]);
        this.messageBox = [];
        return;
      }
      // Then we make a call for each
      const messagesToFetch = response.messages.map(this.makeGetCallOnEmail.bind(this));

      // When all calls are finished, we post the email list
      forkJoin(messagesToFetch).subscribe({
        complete: () => {

          // We order the messages by date before sending them
          this.messageBox = this.messageBox.sort((a, b) => {
            if(a.internalDate < b.internalDate) {
              return 1;
            }

            return -1;
          })

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
    const isRead = !emailInfo.labelIds || !emailInfo.labelIds.includes('UNREAD');
    const important = !emailInfo.labelIds || emailInfo.labelIds.includes('IMPORTANT');

    const snippet = quotedPrintable.decode(emailInfo.snippet);

    const sender = emailInfo.payload.headers.filter((currHeader: {name: string, value: string}) => {
      return currHeader.name.toUpperCase() === 'FROM';
    })[0].value;

    const subject = emailInfo.payload.headers.filter((currHeader: {name: string, value: string}) => {
      return currHeader.name.toUpperCase() === 'SUBJECT';
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
      htmlContent: htmlContent,
      selected: false,
      important: important
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

  deleteMultipleEmails(emailIds: Array<string>) {

    const payload = {
      ids: emailIds
    };

    return this.http.deleteMultipleEmails(payload);
  }

  markMultipleEmailsAsRead(ids: Array<string>) {

    const payload = {
      ids: ids,
      removeLabelIds: ['UNREAD']
    };

    return this.http.batchModifyEmails(payload);
  }

  toggleImportantEmail(email: GmailCustomEmail) : Observable<any> {
    let payload = {};
    if(email.important) {
      payload = {
        addLabelIds: ['IMPORTANT']
      };
    } else {
      payload = {
        removeLabelIds: ['IMPORTANT']
      };
    }

    return this.http.modifyEmail(email.id, payload);
  }
}
