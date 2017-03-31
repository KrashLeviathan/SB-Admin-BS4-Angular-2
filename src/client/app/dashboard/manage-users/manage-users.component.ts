import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import {AlertType, PopoverControllerComponent} from '../../shared/popover-controller/popover-controller';

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

  savingState: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .then(users => this.users = users);
  }

  deleteUser(): void {
    if (!this.isConfirmingDelete) {
      return;
    }
    this.savingState = true;
    this.isConfirmingDelete = false;
    this.userService.deleteUser(this.userToDelete.userId)
      .then(success => {
        this.savingState = false;
        if (success) {
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, '\'' + this.userToDelete.email + '\' was ' +
            'successfully removed from the account.');
        } else {
          PopoverControllerComponent.createAlert(AlertType.DANGER,
            '\'' + this.userToDelete.email + '\' could not be removed from the account.');
        }
        // Call cancelDelete to reset userToDelete
        this.cancelDelete();
      });
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
    this.savingState = true;
    this.isConfirmingAdmin = false;
    let serverRequest = (this.userAdminChanges.setAsAdmin)
      ? this.userService.giveAdminPrivileges(this.userAdminChanges.userId)
      : this.userService.revokeAdminPrivileges(this.userAdminChanges.userId);
    serverRequest.then(success => {
      this.savingState = false;
      if (success) {
        let msg = (this.userAdminChanges.setAsAdmin)
          ? 'given to'
          : 'revoked from';
        PopoverControllerComponent.createAlert(AlertType.SUCCESS, 'Admin privileges were ' + msg
          + ' \'' + this.userAdminChanges.email + '\'.');
      } else {
        PopoverControllerComponent.createAlert(AlertType.DANGER,
          'Could not make admin changes to \'' + this.userAdminChanges.email + '\'.');
      }
      // Call cancelAdminChange reset userAdminChanges
      this.cancelAdminChange();
    });
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
