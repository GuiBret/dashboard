import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmailTrashComponent } from './gmail-trash.component';

describe('GmailTrashComponent', () => {
  let component: GmailTrashComponent;
  let fixture: ComponentFixture<GmailTrashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailTrashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmailTrashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
