import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailContainerComponent } from './email-container.component';

describe('EmailContainerComponent', () => {
  let component: EmailContainerComponent;
  let fixture: ComponentFixture<EmailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
