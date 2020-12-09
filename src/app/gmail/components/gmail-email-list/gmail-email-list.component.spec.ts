import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/services/http.service';

import { GmailEmailListComponent } from './gmail-email-list.component';

describe('GmailEmailListComponent', () => {
  let component: GmailEmailListComponent;
  let fixture: ComponentFixture<GmailEmailListComponent>;

  const httpServiceStub: Partial<HttpService> = {

  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmailEmailListComponent ],
      providers: [
        { provide: HttpService, useValue: httpServiceStub}
      ]
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
