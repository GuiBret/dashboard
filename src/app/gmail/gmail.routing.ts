import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GmailComponent } from './gmail.component';
import { GmailStoreTokenComponent } from './components/gmailstoretoken/gmailstoretoken.component';
import { ReadEmailComponent } from './pages/read-email/read-email.component';
import { GetEmailResolver } from './resolvers/email-data.resolver';


const routes: Routes = [
  {
    path: 'gmail', component: GmailComponent
  },
  {
    path: 'gmail/logged', component: GmailComponent
  },
  {
    path: 'gmail/read-email/:emailid', component: ReadEmailComponent,
    resolve: {
      emailContent: GetEmailResolver
    }
  },
  {
    path: 'gmail/store-token/:token/:expires', component: GmailStoreTokenComponent
  }
]

@NgModule({

  imports: [

    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ],
  providers: [
    GetEmailResolver
  ]

})

export class GmailRoutingModule {}
