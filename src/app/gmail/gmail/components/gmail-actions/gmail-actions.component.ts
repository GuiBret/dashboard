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

  markMultipleEmailsAsRead() {
    const selectedEmailIds = this.gmailService.messagesSelected.map(email => email.id);

    this.gmailService.markMultipleEmailsAsRead(selectedEmailIds)
                     .subscribe(this.onCallbackForBatchMarkAsRead.bind(this, selectedEmailIds));
  }

  private onCallbackForBatchMarkAsRead(selectedEmailIds: Array<string>): void {
    this.emailListChanged.next(selectedEmailIds);
  }

  /**
   * Callback to click on button "Delete selected", checks which emails are marked for deletion and tells the service to make the request
   */
  deleteMultipleEmails(): void {
    const selectedEmailIds = this.gmailService.messagesSelected.map(email => email.id);

    this.gmailService.deleteMultipleEmails(selectedEmailIds).subscribe(this.onMultipleEmailsDeleted.bind(this));
  }

  private onMultipleEmailsDeleted(): void {
    this.gmailService.resetMessageBox();
    this.triggerSearch.next();
  }



  trashMultipleEmails(): void {
    const selectedEmailIds = this.gmailService.messagesSelected.map(email => email.id);

    this.gmailService.trashMessages(selectedEmailIds).subscribe(this.onMultipleEmailsTrashed.bind(this));
  }

  /**
   * Callback of trashMultipleEmails, triggers a new search in the email list component
   */
  private onMultipleEmailsTrashed() {
    this.triggerSearch.next();
  }

  untrashMessages() {
    const selectedEmailIds = this.gmailService.messagesSelected.map(email => email.id);

    this.gmailService.untrashMessages(selectedEmailIds).subscribe(this.onMultipleEmailsUntrashed.bind(this));
  }

  private onMultipleEmailsUntrashed() {
    this.triggerSearch.next();
  }
}
