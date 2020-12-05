import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-gmail',
  templateUrl: './gmail.component.html',
  styleUrls: ['./gmail.component.css']
})
export class GmailComponent implements OnInit {

  constructor(private http: HttpService) { }

  ngOnInit(): void {
    if(localStorage.getItem('gmailToken')) {
      this.http.getEmailList().subscribe((emailList) => {
        console.log(emailList);
      })
    }
  }

}
