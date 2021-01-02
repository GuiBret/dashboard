import { NgModule } from '@angular/core';
import { GmailComponent } from './gmail.component';
import { GmailRoutingModule } from './gmail.routing';
import { GmailStoreTokenComponent } from './components/gmailstoretoken/gmailstoretoken.component';
import { GmailEmailListComponent } from './components/gmail-email-list/gmail-email-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReadEmailComponent } from './pages/read-email/read-email.component';
import { EmailContainerComponent } from './components/email-container/email-container.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    GmailComponent,
    GmailStoreTokenComponent,
    GmailEmailListComponent,
    ReadEmailComponent,
    EmailContainerComponent,
  ],
  imports: [
    GmailRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatButtonModule,
  ],
  exports: [

  ],
  providers: [],
})
export class GmailModule {}
