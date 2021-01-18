import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailActionsComponent } from './gmail-actions.component';

describe('GmailActionsComponent', () => {
  let component: GmailActionsComponent;
  let fixture: ComponentFixture<GmailActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailActionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
