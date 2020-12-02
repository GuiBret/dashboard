import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailStoreTokenComponent } from './gmailstoretoken.component';

describe('GmailstoretokenComponent', () => {
  let component: GmailStoreTokenComponent;
  let fixture: ComponentFixture<GmailStoreTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailStoreTokenComponent ]
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
