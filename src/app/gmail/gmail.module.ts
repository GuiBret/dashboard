import { NgModule } from '@angular/core';
import { GmailComponent } from './gmail.component';
import { GmailRoutingModule } from './gmail.routing';
import { GmailStoreTokenComponent } from './components/gmailstoretoken/gmailstoretoken.component';
import { GmailEmailListComponent } from './components/gmail-email-list/gmail-email-list.component';


@NgModule({
  declarations: [
    GmailComponent,
    GmailStoreTokenComponent,
    GmailEmailListComponent
  ],
  imports: [
    GmailRoutingModule
  ],
  exports: [

  ],
  providers: [],
})
export class GmailModule {}
