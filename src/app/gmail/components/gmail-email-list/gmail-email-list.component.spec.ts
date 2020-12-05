import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailEmailListComponent } from './gmail-email-list.component';

describe('GmailEmailListComponent', () => {
  let component: GmailEmailListComponent;
  let fixture: ComponentFixture<GmailEmailListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailEmailListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailEmailListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
