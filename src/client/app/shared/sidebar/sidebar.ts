import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {HouseholdService} from "../household/household.service";
import {Cookie} from 'ng2-cookies/ng2-cookies';

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

  logout(){
    //href="https://accounts.google.com/logout"
    UserService.activeUser = null;
    HouseholdService.activeHousehold = null;
    Cookie.delete('sessionToken');
    Cookie.delete('userId');
    window.location.href = "https://accounts.google.com/logout";
  }
}
