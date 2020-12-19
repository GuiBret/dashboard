import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

/**
 * Component representing the home page of the dashboard, describing its features
 */
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {

  /**
   * The constructor
   * @param titleSvc The title service, to change the window title
   */
  constructor(private titleSvc: Title) {
    this.titleSvc.setTitle('Dashboard - Home Page')
  }
}
