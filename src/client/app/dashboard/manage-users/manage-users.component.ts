import { Component, OnInit } from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  moduleId: module.id,
  selector: 'manage-users',
  templateUrl: './manage-users.component.html'
})

export class ManageUsersComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  configureUser(user: User): void {
    console.log('TODO: configureUser(user)');
    console.log(user);
  }

  delete(userId: number): void {
    console.log('TODO: delete(' + userId + ')');
  }
}
