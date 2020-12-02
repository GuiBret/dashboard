import { NgModule } from '@angular/core';
import { GmailComponent } from './gmail.component';
import { GmailRoutingModule } from './gmail.routing';
import { GmailStoreTokenComponent } from './gmailstoretoken/gmailstoretoken.component';


@NgModule({
  declarations: [
    GmailComponent,
    GmailStoreTokenComponent
  ],
  imports: [
    GmailRoutingModule
  ],
  exports: [

  ],
  providers: [],
})
export class GmailModule {}
