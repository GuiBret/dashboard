import { Injectable } from '@angular/core';
import { emit } from 'process';
import { forkJoin, Observable, Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';
import { GmailCustomEmail } from '../interfaces/gmail-custom-email.interface';
import { GmailEmail, GmailEmailPart } from '../interfaces/gmail-email.interface';
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
  private cachedMessages: object = {};
  private messageBox = [];

  private nextPageToken = '';
  private tokens = [null];
  private currTokenIdx = 0;

  constructor(private http: HttpService) {

  }

  get pageToken()  {
    return this.nextPageToken;
  }

  get messagesSelected() {
    return this.messageBox.filter(message => message.selected);
  }

  resetTokens() {
    this.tokens = [null];
    this.currTokenIdx = 0;
  }

  resetMessageBox() {
    this.messageBox = [];
  }

  checkGmailStatus() {
    return localStorage.getItem('gmailToken') != null && parseInt(localStorage.getItem('gmailExp'), 10) > (new Date().getTime());
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
  fetchEmailList(direction: string, limit = 50, query = null, labels: string = 'INBOX') {
    this.messageBox = [];
    let token = null;
    if (direction === 'next') {
      this.currTokenIdx++;
      token = this.tokens[this.currTokenIdx];
    } else if (direction === 'prev') {
      this.currTokenIdx--;
      token = this.tokens[this.currTokenIdx];
    }

    // First call to get the email list
    this.http.getEmailList(limit, token, query, labels).subscribe({
      next: this.onEmailListReceived.bind(this, direction),
      error: this.handleError.bind(this)
    });
  }

  fetchTrash(direction: string, limit = 50, labels = null) {

    let token = null;

    if (direction === 'next') {
      this.currTokenIdx++;
      token = this.tokens[this.currTokenIdx];
    } else if (direction === 'prev') {
      this.currTokenIdx--;
      token = this.tokens[this.currTokenIdx];
    }

    this.http.getEmailList(limit, token, null, 'TRASH').subscribe({
      next: this.onEmailListReceived.bind(this, direction),
      error: this.handleError.bind(this)
    });
  }

  /**
   * Callback of getEmailList if everything went well
   * @param direction init, next or prev, used to know if we will search the next, previous page or we try to get a page for the first time
   * @param response The response
   */
  onEmailListReceived(direction: string,
                      response: {messages: Array<{id: string, threadId: string}>,
                      nextPageToken: string,
                      resultSizeEstimate: number}) {

    // If we are trying to go to next page and go to a new token which we did not go to, we add it to the list
    if (direction === 'init') {
      this.tokens.push(response.nextPageToken);
    }
    else if (direction === 'next' && this.currTokenIdx === this.tokens.length - 1) {
        this.tokens.push(response.nextPageToken);
    }

    console.log(response);
    if (response.resultSizeEstimate === 0) {
      this.newEmailListPosted.next([]);
      this.messageBox = [];
      return;
    }

    // Then we make a call for each
    const messagesToFetch = response.messages.map(this.makeGetCallOnEmail.bind(this));

    // When all calls are finished, we post the email list
    this.fetchAllMessages(messagesToFetch);
  }

  fetchAllMessages(messagesToFetch) {
    forkJoin(messagesToFetch).subscribe({
      complete: () => {

        // We order the messages by date before sending them
        this.messageBox = this.messageBox.sort(this.sortEmailsByDate.bind(this));

        this.newEmailListPosted.next(this.messageBox);
      }
    });
  }

  handleError(error: any) {
    alert('Flute');
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

  filterEmailInfo(emailInfo: GmailEmail): GmailCustomEmail {


    let isRead = true;
    let important = false;
    const id = emailInfo.id;
    const internalDate = parseInt(emailInfo.internalDate, 10);

    if (emailInfo.labelIds) {
      isRead = !emailInfo.labelIds.includes('UNREAD');
      important = emailInfo.labelIds.includes('IMPORTANT');
    }

    const snippet = quotedPrintable.decode(emailInfo.snippet);

    const sender = this.searchHeader(emailInfo.payload.headers, 'FROM');

    const subject = this.searchHeader(emailInfo.payload.headers, 'SUBJECT');

    let htmlContentAsBase64;

    if (emailInfo.payload.body.size !== 0) {
      htmlContentAsBase64 = emailInfo.payload.body.data;
    } else { // Otherwise we check in parts

      // TODO: Add recursion on part search
      const filteredParts = emailInfo.payload.parts.filter((currPart: GmailEmailPart) => {
        return currPart.mimeType === 'text/html';
      });

      if (filteredParts.length === 0) {
        htmlContentAsBase64 = '';
      } else {
        htmlContentAsBase64 = filteredParts[0].body.data;
      }
    }


    // https://stackoverflow.com/questions/24745006/gmail-api-parse-message-content-base64-decoding-with-javascript
    const htmlContent = atob( htmlContentAsBase64.replace(/-/g, '+').replace(/_/g, '/') );

    return {
      id,
      internalDate,
      isRead,
      snippet,
      from: sender,
      subject,
      htmlContent,
      selected: false,
      important
    };
  }

  containsEmailWithId(emailId: string): boolean {
    return this.cachedMessages[emailId] != null;
  }

  markEmailAsRead(id: string) {
    return this.http.modifyEmail(id, {
      removeLabelIds: [
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
      ids,
      removeLabelIds: ['UNREAD']
    };

    return this.http.batchModifyEmails(payload);
  }

  /**
   * Checks the state of the "important" attribute, defines the payload to be sent accordingly, then calls the http service to make the call
   * @param email The email in which we want to add / remove the IMPORTANT label
   */
  toggleImportantEmail(email: GmailCustomEmail): Observable<any> {
    let payload = {};

    // Note : The email important state has already been changed, then we should consider the new state is the one passed in email
    if (email.important) {
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

  sortEmailsByDate(a, b) {
    if (a.internalDate < b.internalDate) {
      return 1;
    }

    return -1;
  }

  searchHeader(headerArr: Array<any>, headerName: string) {
    let result = '';
    const header = headerArr.filter((currHeader: {name: string, value: string}) => {
      return currHeader.name.toUpperCase() === headerName.toUpperCase();
    });

    if (header && header.length !== 0) {
      result = header[0].value;
    }

    return result;
  }

  toggleSelectMessage(messageId: string) {
    this.messageBox = this.messageBox.map((message: GmailCustomEmail) => {
      if (message.id === messageId) {
        message.selected = !message.selected;
      }

      return message;
    });
  }

  toggleSelectedOnAllEmails(newValue: boolean) {
    this.messageBox.forEach((email: GmailCustomEmail) => {
      email.selected = newValue;

      return email;
    });
  }

  untrashMessages(ids: Array<string>) {
    const payload = {
      ids,
      removeLabelIds: ['TRASH'],
      addLabelIds: ['INBOX']
    };

    return this.http.batchModifyEmails(payload);


  }

  trashMessages(ids: Array<string>) {
    const payload = {
      ids,
      addLabelIds: ['TRASH'],
      removeLabelIds: ['INBOX']
    };

    return this.http.batchModifyEmails(payload);
  }

}
