import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { HttpService } from '../services/http.service';
import { GmailService } from './services/gmail.service';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  constructor(private gmailService: GmailService, private titleService: Title) { }

  ngOnInit(): void {
    if(localStorage.getItem('gmailToken')) {
      this.gmailService.fetchEmailList();
      this.titleService.setTitle('Email list');
    }
  }

}
