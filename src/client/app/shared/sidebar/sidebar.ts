import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';

@Component({
  moduleId: module.id,
  selector: 'sidebar-cmp',
  templateUrl: 'sidebar.html'
})

export class SidebarComponent implements OnInit {
  isActive = false;
  showMenu: string = '';
  userIsAdmin: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getActiveUser().then(user => this.userIsAdmin = user.isAdmin);
  }

  eventCalled() {
    this.isActive = !this.isActive;
  }

  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }
}
