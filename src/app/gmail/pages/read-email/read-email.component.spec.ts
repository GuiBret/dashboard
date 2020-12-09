import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ReadEmailComponent } from './read-email.component';

describe('ReadEmailComponent', () => {
  let component: ReadEmailComponent;
  let fixture: ComponentFixture<ReadEmailComponent>;

  const actRouteStub: Partial<ActivatedRoute> = {
    params: of({

    }),
    data: of({
      emailContent: {
        htmlContent: '<p>Hello world</p>',
        subject: 'My subject'

      }

    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEmailComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: actRouteStub}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
