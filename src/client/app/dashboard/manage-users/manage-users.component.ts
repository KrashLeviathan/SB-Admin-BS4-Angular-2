import {Component, OnInit} from '@angular/core';
import {User} from '../../shared/user/user';
import {UserService} from '../../shared/user/user.service';
import {AlertType, PopoverControllerComponent} from '../../shared/popover-controller/popover-controller';
import {GlobalVariables} from '../../shared/global-variables';
import {HouseholdService} from '../../shared/household/household.service';
import {NgForm} from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'manage-users',
  templateUrl: './manage-users.component.html'
})

export class ManageUsersComponent implements OnInit {
  users: User[];
  userIsAdmin: boolean = true;

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

  MAX_VARCHAR_LENGTH: number = 255;
  inviteEmail: string = '';
  isInvitingUser: boolean = false;

  savingState: boolean = false;

  constructor(private userService: UserService, private householdService: HouseholdService) {
  }

  ngOnInit(): void {
    this.userService.getActiveUser().then(response => {
      this.householdService.getActiveHousehold().then(result => {
        this.getUsers(HouseholdService.activeHousehold.householdId);
      });
    });
  }

  getUsers(householdId: number): void {
    this.userService.getUsers(householdId)
      .then(users => {
        this.users = users;
        this.navigationComplete();
      });
  }

  deleteUser(): void {
    if (!this.isConfirmingDelete || !this.userIsAdmin) {
      return;
    }
    this.savingState = true;
    this.isConfirmingDelete = false;
    this.userService.removeUserFromHousehold(this.userToDelete.userId)
      .then(success => {
        this.savingState = false;
        if (success) {
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, '\'' + this.userToDelete.email + '\' was ' +
            'successfully removed from the account.');
          this.userService.getUsers(UserService.activeUser.householdId).then(response => {
            this.users = response;
            this.navigationComplete();
          });
        } else {
          PopoverControllerComponent.createAlert(AlertType.DANGER,
            '\'' + this.userToDelete.email + '\' could not be removed from the account.');
        }
        // Call cancelDelete to reset userToDelete
        this.cancelDelete();
      });
  }

  confirmDelete(user: User): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.userToDelete = user;
    this.isConfirmingDelete = true;
  }

  cancelDelete(): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.userToDelete = {userId: 0, email: ''};
    this.isConfirmingDelete = false;
  }

  adminChange(): void {
    if (!this.isConfirmingAdmin || !this.userIsAdmin) {
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
        this.userService.getUsers(UserService.activeUser.householdId).then(response => {
          this.users = response;
          this.navigationComplete();
        });
      } else {
        PopoverControllerComponent.createAlert(AlertType.DANGER,
          'Could not make admin changes to \'' + this.userAdminChanges.email + '\'.');
      }
      // Call cancelAdminChange reset userAdminChanges
      this.cancelAdminChange();
    });
  }

  confirmAdminChange(user: User): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.userAdminChanges = {
      userId: user.userId,
      email: user.email,
      setAsAdmin: !user.isAdmin
    };
    this.isConfirmingAdmin = true;
  }

  cancelAdminChange(): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.userAdminChanges = {userId: 0, email: '', setAsAdmin: false};
    this.isConfirmingAdmin = false;
  }

  inviteUser(form: NgForm): void {
    if (!this.userIsAdmin || form.invalid) {
      return;
    }
    this.userService.inviteUserEmail(form.value.inviteEmail)
      .then(success => {
        if (success) {
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, form.value.inviteEmail + ' invited successfully.');
        } else {
          PopoverControllerComponent.createAlert(AlertType.DANGER, 'Could not invite \''
            + form.value.inviteEmail + '\'. Make sure he or she is a registered SmartSync user before sending ' +
            'the invite.', 10000);
        }
      });

    this.isInvitingUser = false;
  }

  confirmInviteUser(): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.inviteEmail = '';
    this.isInvitingUser = true;
    let inputField = document.querySelector('#inviteEmailField');
    setTimeout(() => {
      (<HTMLInputElement>inputField).focus();
    }, 100);
  }

  cancelInviteUser(): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.isInvitingUser = false;
  }

  private navigationComplete(): void {
    GlobalVariables.navigationState.next(false);
  }
}
