import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { GmailCustomEmail } from '../../interfaces/gmail-custom-email.interface';
import { GmailService } from '../../services/gmail.service';

@Component({
  selector: 'app-read-email',
  templateUrl: './read-email.component.html',
  styleUrls: ['./read-email.component.css']
})
export class ReadEmailComponent implements OnInit, OnDestroy {

  emailContent: any;

  timeoutMarkEmailAsReadId: any;

  constructor(private gmailService: GmailService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer,
              private snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.route.data.subscribe((data: { emailContent: GmailCustomEmail}) => {
      this.emailContent = data.emailContent;

      // Required to display the inline styles
      this.emailContent.htmlContent = this.sanitizer.bypassSecurityTrustHtml(this.emailContent.htmlContent);

      this.timeoutMarkEmailAsReadId = setTimeout(() => {
        this.gmailService.markEmailAsRead(this.emailContent.id).subscribe(() => {
          this.snackbar.open('Email marked as read', null, {
            duration: 10000
          });

        });
      }, 5000);
    });
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutMarkEmailAsReadId);
  }

}
