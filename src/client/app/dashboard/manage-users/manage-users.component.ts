import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';

@Component({
  moduleId: module.id,
  selector: 'manage-users',
  templateUrl: './manage-users.component.html'
})

export class ManageUsersComponent implements OnInit {
  users: User[];
  userToDelete: any = {
    userId: 0,
    email: ''
  };
  isConfirmingDelete: boolean = false;
  userAdminChanges: any = {
    userId: 0,
    email: '',
    setAsAdmin: false
  };
  isConfirmingAdmin: boolean = false;

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

  deleteUser(): void {
    if (!this.isConfirmingDelete) {
      return;
    }
    // TODO: Make call to UserService
    console.log('TODO: delete user ' + this.userToDelete.userId);
    // Call cancelDelete to remove modal
    this.cancelDelete();
  }

  confirmDelete(user: User): void {
    this.userToDelete = user;
    this.isConfirmingDelete = true;
  }

  cancelDelete(): void {
    this.userToDelete = {userId: 0, email: ''};
    this.isConfirmingDelete = false;
  }

  adminChange(): void {
    if (!this.isConfirmingAdmin) {
      return;
    }
    // TODO: Make call to UserService
    // TODO: Make sure it's not the only admin removing his own privileges
    console.log('TODO: make admin change');
    // Call cancelAdminChange to remove modal
    this.cancelAdminChange();
  }

  confirmAdminChange(user: User): void {
    this.userAdminChanges = {
      userId: user.userId,
      email: user.email,
      setAsAdmin: !user.isAdmin
    };
    this.isConfirmingAdmin = true;
  }

  cancelAdminChange(): void {
    this.userAdminChanges = {userId: 0, email: '', setAsAdmin: false};
    this.isConfirmingAdmin = false;
  }
}
