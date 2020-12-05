import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GmailComponent } from './gmail.component';
import { GmailStoreTokenComponent } from './gmailstoretoken/gmailstoretoken.component';


const routes: Routes = [
  {
    path: 'gmail', component: GmailComponent
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
