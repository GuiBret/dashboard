import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
export class GmailEmailListComponent implements OnInit {

  public emailList: Array<GmailCustomEmail> = [];
  public displayedColumns: Array<string> = ['id', 'from', 'snippet', 'internalDate'];

  private currPageSize = 50;

  indeterminateCheckboxState = false;

  indeterminateCheckboxChecked = false;

  options = [];

  emailSearchControl = new FormControl();

  isLoading = false;

  constructor(private gmailService: GmailService) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.gmailService.onNewEmailListPosted.subscribe((newEmailList: Array<GmailCustomEmail>) => {
      this.isLoading = false;
      this.emailList = newEmailList;
      this.defineIndeterminateState();
    });
  }

  ngOnDestroy() {
    this.emailList = [];
    this.gmailService.resetTokens();
  }

  // TODO: Group the next 2 functions
  /**
   * Triggered when changing page or elements per page, records the info and performs a search
   * @param event
   */
  loadNewList(event: any) {
    this.emailList = [];
    this.isLoading = true;

    let direction = (event.pageIndex > event.previousPageIndex) ? 'next' : 'prev';

    this.currPageSize = event.pageSize;
    this.gmailService.fetchEmailList(direction, event.pageSize, this.emailSearchControl.value);

  }

  makeSearch() {
    this.emailList = [];
    this.isLoading = true;
    this.gmailService.resetTokens();

    this.gmailService.fetchEmailList('init', this.currPageSize, this.emailSearchControl.value);

  }

  stopPropagation(event: any) {
    event.stopPropagation();
  }

  toggleEmail() {
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

  defineIndeterminateState() {

    const nbOfEmailsSelected = this.emailList.filter(elem => elem.selected).length;

    if(nbOfEmailsSelected === 0) {
      this.indeterminateCheckboxChecked = false;
      this.indeterminateCheckboxState = false;
    } else if (nbOfEmailsSelected === this.currPageSize) {
      this.indeterminateCheckboxState = false;
      this.indeterminateCheckboxChecked = true;
    } else {
      this.indeterminateCheckboxState = true;
      this.indeterminateCheckboxChecked = null;
    }


  }

  /**
   * Callback to click on button "Delete selected", checks which emails are marked for deletion and tells the service to make the request
   */
  deleteSelectedEmails() {
    const selectedEmailIds = this.emailList.filter((email) => email.selected)
                                           .map(email => email.id);

    this.gmailService.deleteMultipleEmails(selectedEmailIds).subscribe(() => {
      this.gmailService.resetTokens();
      this.isLoading = true;

      this.gmailService.fetchEmailList('init');
    });
  }
}
