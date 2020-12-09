import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GmailCustomEmail } from '../../interfaces/gmail-custom-email.interface';

@Component({
  selector: 'app-read-email',
  templateUrl: './read-email.component.html',
  styleUrls: ['./read-email.component.css']
})
export class ReadEmailComponent implements OnInit {

  emailContent: any;
  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    this.route.data.subscribe((data: { emailContent: GmailCustomEmail}) => {
      this.emailContent = data.emailContent;

      // Required to display the inline styles
      this.emailContent.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.emailContent.htmlContent);
    });
  }

}
