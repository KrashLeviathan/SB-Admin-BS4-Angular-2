import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'main-view-add-service',
  template: ''
})

export class MainViewAddServiceComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit() {
    // Re-routes the page back to the dashboard editing page
    // so that packery re-initializes with the new service
    this.router.navigate(['dashboard/', 'home', 'edit']);
  }
}
