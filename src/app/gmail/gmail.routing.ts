import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GmailComponent } from './gmail.component';
import { GmailStoreTokenComponent } from './components/gmailstoretoken/gmailstoretoken.component';
import { ReadEmailComponent } from './pages/read-email/read-email.component';


const routes: Routes = [
  {
    path: 'gmail', component: GmailComponent
  },
  {
    path: 'gmail/read-email/:emailid', component: ReadEmailComponent
  },
  {
    path: 'gmail/store-token/:token/:expires', component: GmailStoreTokenComponent
  }
]

@NgModule({

  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]

})

export class GmailRoutingModule {}
