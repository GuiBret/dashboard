import { Component, OnInit } from '@angular/core';
import { GmailCustomEmail } from '../../interfaces/gmail-custom-email.interface';
import { GmailEmail } from '../../interfaces/gmail-email.interface';
import { GmailService } from '../../services/gmail.service';

@Component({
  selector: 'app-email-list',
  templateUrl: './gmail-email-list.component.html',
  styleUrls: ['./gmail-email-list.component.css']
})
export class GmailEmailListComponent implements OnInit {

  public emailList: Array<GmailCustomEmail> = [];
  public displayedColumns: Array<string> = ['from', 'snippet'];

  constructor(private gmailService: GmailService) { }

  ngOnInit(): void {
    this.gmailService.onNewEmailListPosted.subscribe((newEmailList: Array<GmailCustomEmail>) => {

      this.emailList = newEmailList;
    })
  }

  ngOnDestroy() {
    this.emailList = [];
  }

}
