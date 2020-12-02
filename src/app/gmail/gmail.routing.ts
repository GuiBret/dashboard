import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { GmailStoreTokenComponent } from './gmailstoretoken/gmailstoretoken.component';


const routes: Routes = [

  {
    path: 'gmail/store-token', component: GmailStoreTokenComponent
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
