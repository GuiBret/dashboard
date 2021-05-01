import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

import { GmailStoreTokenComponent } from './gmailstoretoken.component';

describe('GmailstoretokenComponent', () => {
  let component: GmailStoreTokenComponent;
  let fixture: ComponentFixture<GmailStoreTokenComponent>;
  const actRouteStub: Partial<ActivatedRoute> = {
    params: of({

    })
  };
  const routerStub: Partial<Router> = {
    navigate: jasmine.createSpy()
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailStoreTokenComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: actRouteStub},
        {provide: Router, useValue: routerStub},
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailStoreTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
