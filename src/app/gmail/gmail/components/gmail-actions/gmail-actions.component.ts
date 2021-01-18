import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GmailService } from 'src/app/gmail/services/gmail.service';

@Component({
  selector: 'app-gmail-actions',
  templateUrl: './gmail-actions.component.html',
  styleUrls: ['./gmail-actions.component.css']
})
export class GmailActionsComponent implements OnInit {
  @Input() indeterminateCheckboxChecked: boolean;
  @Input() mode: string;
  @Output() emailListChanged = new EventEmitter<Array<string>>();
  @Output() triggerSearch = new EventEmitter<void>();

  constructor(private gmailService: GmailService) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    console.log(this.mode);
  }

  markMultipleEmailsAsRead() {
    const selectedEmailIds = this.gmailService.messagesSelected.map(email => email.id);

    this.gmailService.markMultipleEmailsAsRead(selectedEmailIds)
                     .subscribe(this.onCallbackForBatchMarkAsRead.bind(this, selectedEmailIds));
  }

  /**
   * Callback to click on button "Delete selected", checks which emails are marked for deletion and tells the service to make the request
   */
  deleteSelectedEmails() {
    const selectedEmailIds = this.gmailService.messagesSelected.map(email => email.id);

    this.gmailService.deleteMultipleEmails(selectedEmailIds).subscribe((() => {
      this.triggerSearch.next();
    }));
  }

  private onCallbackForBatchMarkAsRead(selectedEmailIds: Array<string>) {
    this.emailListChanged.next(selectedEmailIds);
    // this.emailList = this.emailList.map((email: GmailCustomEmail) => {
    //   if (selectedEmailIds.includes(email.id)) {
    //     email.isRead = true;
    //   }

    //   email.selected = false;

    //   return email;
    // });

    // this.defineIndeterminateState();
  }
}
