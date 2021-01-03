import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

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

  const httpServiceStub: Partial<HttpService> = {};
  const snackbarStub: Partial<MatSnackBar> = {};
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadEmailComponent ],
      providers: [
        {provide: ActivatedRoute, useValue: actRouteStub},
        {provide: HttpService, useValue: httpServiceStub},
        {provide: MatSnackBar, useValue: snackbarStub},
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
