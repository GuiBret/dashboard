import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-gmailstoretoken',
  templateUrl: './gmailstoretoken.component.html',
  styleUrls: ['./gmailstoretoken.component.css']
})
export class GmailStoreTokenComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('Coucou')
    this.route.params.subscribe((params: any) => {
      localStorage.setItem('gmailToken', params.token);
      localStorage.setItem('gmailExp', params.expires);
    });
  }

}
