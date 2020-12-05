import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

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

    let messages = [];

    // TODO: Rewrite that

    this.http.getEmailList().subscribe((response: {messages: Array<{id: string, threadId: string}>}) => {
      response.messages.forEach((message: {id: string, threadId: string}) => {

        this.http.getIndividualEmailInfo(message.id).subscribe((emailInfo: any) => {
          messages.push(emailInfo);

        })
      });
    });

    setTimeout(() => {
      this.newEmailListPosted.next(messages);
    }, 5000);
  }
}
