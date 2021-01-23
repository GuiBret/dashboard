import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GmailService } from '../../services/gmail.service';

@Component({
  selector: 'app-gmail-trash',
  templateUrl: './gmail-trash.component.html',
  styleUrls: ['./gmail-trash.component.css']
})
export class GmailTrashComponent implements OnInit {

  constructor(private gmailService: GmailService, private titleService: Title) { }

  ngOnInit(): void {
    this.gmailService.fetchEmailList('init', 50, null, 'TRASH');
    this.titleService.setTitle('Trash');
  }
}
