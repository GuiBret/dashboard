import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { GmailCustomEmail } from '../../interfaces/gmail-custom-email.interface';
import { GmailEmail } from '../../interfaces/gmail-email.interface';
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
  public displayedColumns: Array<string> = ['from', 'snippet'];

  private currPageSize = 50;
  private currPageIndex = 1;

  isLoading = false;

  constructor(private gmailService: GmailService) { }

  ngOnInit(): void {

    this.isLoading = true;
    this.gmailService.onNewEmailListPosted.subscribe((newEmailList: Array<GmailCustomEmail>) => {
      this.isLoading = false;
      this.emailList = newEmailList;
    })
  }

  ngOnDestroy() {
    this.emailList = [];
  }

  loadNewList(event: any) {
    this.emailList = [];
    this.isLoading = true;
    this.gmailService.fetchEmailList(event.pageSize, this.gmailService.pageToken);

  }

}
