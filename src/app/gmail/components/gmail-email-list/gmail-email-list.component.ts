import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ifError } from 'assert';
import { GmailCustomEmail } from '../../interfaces/gmail-custom-email.interface';
import { GmailService } from '../../services/gmail.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './gmail-email-list.component.html',
  styleUrls: ['./gmail-email-list.component.css'],
  animations: [
    trigger('emailElem', [
      transition('void => *', [
        style({
          transform: 'translateY(50px)',
          opacity: '0'
        }),
        animate(250, style({
          transform: 'translateY(0)',
          opacity: '1'
        }))
      ])
    ])
  ]
})
export class GmailEmailListComponent implements OnInit, OnDestroy {

  public emailList: Array<GmailCustomEmail> = [];
  public displayedColumns: Array<string> = ['id', 'from', 'snippet', 'internalDate'];

  private currPageSize = 50;

  indeterminateCheckboxState = false;

  indeterminateCheckboxChecked = false;

  options = [];

  emailSearchControl = new FormControl();

  isLoading = false;

  @Input() labels: string;
  @Input() mode: string;

  constructor(private gmailService: GmailService, private snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.gmailService.onNewEmailListPosted.subscribe(this.handleNewEmailList.bind(this));
  }

  ngOnDestroy() {
    this.emailList = [];
    this.gmailService.resetTokens();
  }

  handleNewEmailList(newEmailList: Array<GmailCustomEmail>) {
    this.isLoading = false;
    this.emailList = newEmailList;
    this.defineIndeterminateState();
  }

  // TODO: Group the next 2 functions
  /**
   * Triggered when changing page or elements per page, records the info and performs a search
   * @param event
   */
  loadNewList(event: any) {
    this.prepareInterfaceForSearch();

    const direction = (event.pageIndex > event.previousPageIndex) ? 'next' : 'prev';

    this.currPageSize = event.pageSize;
    this.gmailService.fetchEmailList(direction, event.pageSize, this.emailSearchControl.value, this.labels);

  }

  makeInitSearch() {
    this.prepareInterfaceForSearch();
    this.gmailService.resetTokens();
    this.gmailService.fetchEmailList('init', this.currPageSize, this.emailSearchControl.value, this.labels);

  }


  prepareInterfaceForSearch() {
    this.emailList = [];
    this.isLoading = true;
  }

  stopPropagationAndToggleEmail(event: any, emailId: string) {
    event.preventDefault();
    event.stopPropagation();
    this.reverseAttributeInList(emailId, 'selected');

    this.defineIndeterminateState();

  }

  /**
   * Selects all emails if false => true, unselects all emails otherwise
   */
  toggleAllEmails(event: {source: any, checked: boolean}) {

    const newValue = event.checked;

    this.emailList.forEach((email) => {
      email.selected = newValue;
    });

    this.defineIndeterminateState();

  }

  /**
   * Defines the state for the indeterminate checkbox, called after each user interaction + on page load
   */
  defineIndeterminateState() {

    const nbOfEmailsSelected = this.emailList.filter(elem => elem.selected).length;

    if (nbOfEmailsSelected === 0) {
      this.indeterminateCheckboxChecked = false;
      this.indeterminateCheckboxState = false;
    } else if (nbOfEmailsSelected === this.emailList.length) {
      this.indeterminateCheckboxState = false;
      this.indeterminateCheckboxChecked = true;
    } else {
      this.indeterminateCheckboxState = true;
      this.indeterminateCheckboxChecked = null;
    }
  }

  toggleImportantEmail(event: any, email: GmailCustomEmail) {
    event.stopPropagation();

    const emailId = email.id;
    this.reverseAttributeInList(emailId, 'important');
    this.gmailService.toggleImportantEmail(email).subscribe((response: {labelIds: Array<string>}) => {
      if (response.labelIds.includes('IMPORTANT')) {
        this.snackbar.open('Email marked as important');
      } else {
        this.snackbar.open('Important label removed from email');
      }
    });
  }

  private getSelectedEmails(): Array<GmailCustomEmail> {
    return this.emailList.filter((email) => email.selected);
  }

  private reverseAttributeInList(searchedId: string, attrName: string) {
    this.emailList = this.emailList.map((email) => {
      if (email.id === searchedId) {
        email[attrName] = !email[attrName];
      }

      return email;
    });
  }

  onCallbackForBatchMarkAsRead(selectedEmailIds: Array<string>) {
    console.log(selectedEmailIds);
    this.emailList = this.emailList.map((email: GmailCustomEmail) => {
      if (selectedEmailIds.includes(email.id)) {
        email.isRead = true;
      }

      email.selected = false;

      return email;
    });

    this.defineIndeterminateState();
  }
}
