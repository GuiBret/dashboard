import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GmailService } from '../services/gmail.service';

@Injectable()
export class GetEmailResolver implements Resolve<any> {
  constructor(private gmailService: GmailService, private route: ActivatedRoute) {}

  resolve(route: ActivatedRouteSnapshot) {

    // TODO: Make request if the email is not cached (unlikely for now)
    return this.gmailService.getCachedEmail(route.paramMap.get('emailid'));
  }

}
