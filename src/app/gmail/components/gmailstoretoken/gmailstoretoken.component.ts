import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-gmailstoretoken',
  templateUrl: './gmailstoretoken.component.html',
  styleUrls: ['./gmailstoretoken.component.css']
})
export class GmailStoreTokenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {
      localStorage.setItem('gmailToken', params.token);
      localStorage.setItem('gmailExp', params.expires);

      this.router.navigate(['gmail']);
    });
  }

}
