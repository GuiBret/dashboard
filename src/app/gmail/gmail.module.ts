import { NgModule } from '@angular/core';
import { GmailComponent } from './gmail.component';
import { GmailRoutingModule } from './gmail.routing';
import { GmailStoreTokenComponent } from './components/gmailstoretoken/gmailstoretoken.component';
import { GmailEmailListComponent } from './components/gmail-email-list/gmail-email-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReadEmailComponent } from './pages/read-email/read-email.component';


@NgModule({
  declarations: [
    GmailComponent,
    GmailStoreTokenComponent,
    GmailEmailListComponent,
    ReadEmailComponent
  ],
  imports: [
    GmailRoutingModule,
    SharedModule
  ],
  exports: [

  ],
  providers: [],
})
export class GmailModule {}
