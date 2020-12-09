import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-email-container',
  templateUrl: './email-container.component.html',
  styleUrls: ['./email-container.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom // Used to contain the styles inside the component
})
export class EmailContainerComponent implements OnInit {

  @Input() htmlContent: string;
  constructor() { }

  ngOnInit(): void {
  }

}
