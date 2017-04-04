import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AlertType, PopoverControllerComponent} from '../../shared/popover-controller/popover-controller';
import {UserService} from '../../shared/user/user.service';
import {User} from '../../shared/user/user';
import {ColorScheme} from '../../shared/user/color-scheme';
import {GlobalVariables} from '../../shared/global-variables';

@Component({
  moduleId: module.id,
  selector: 'user-settings',
  templateUrl: './userSettings.component.html',
  styles: [`
    .user-settings-image {
      width: 96px;
      margin: 0 0 0 auto;
      border: solid 1px #151515;
      border-radius: 5px;
      display: block;
    }
  `]
})

export class UserSettingsComponent implements OnInit {
  MAX_VARCHAR_LENGTH: number = 255;

  activeUser: User;
  selectedColor: string = 'primary';
  formColors: ColorScheme = {
    primaryColor: '',
    secondaryColor: '',
    accentColor: '',
    neutralLightColor: '',
    neutralDarkColor: ''
  };

  formDisabled: boolean = true;
  savingState: boolean = false;
  errorOnSave: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getActiveUser()
      .then(user => {
        this.activeUser = user;
        for (let colorType in user.preferences.colorScheme) {
          (<any>this.formColors)[colorType] = (<any>user.preferences.colorScheme)[colorType];
        }
        this.navigationComplete();
      });
  }

  getTextColor(color: string): string {

    return (<any>this.formColors)[color];
  }

  setSelectedColor(colorName: string) {
    this.selectedColor = colorName;
  }

  updateColor(colorName: string, value: string) {
    (<any>this.formColors)[colorName] = value;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorOnSave = true;
      return;
    }
    this.errorOnSave = false;
    this.formDisabled = true;
    this.savingState = true;
    this.userService.saveUser(form.value)
      .then(success => {
        this.savingState = false;
        if (success) {
          this.activeUser.displayName = form.value.displayName;
          this.activeUser.preferences.colorScheme.primaryColor = form.value.primary;
          this.activeUser.preferences.colorScheme.secondaryColor = form.value.secondary;
          this.activeUser.preferences.colorScheme.accentColor = form.value.accent;
          this.activeUser.preferences.colorScheme.neutralLightColor = form.value.neutralLight;
          this.activeUser.preferences.colorScheme.neutralDarkColor = form.value.neutralDark;
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, 'User Settings were saved successfully.');
        } else {
          this.errorOnSave = true;
          this.formDisabled = false;
          PopoverControllerComponent.createAlert(AlertType.DANGER, 'User Settings could not be saved.');
        }
      });
  }

  cancelChanges(form: NgForm): void {
    this.errorOnSave = false;
    this.formDisabled = true;
    this.formColors = {
      primaryColor: this.activeUser.preferences.colorScheme.primaryColor,
      secondaryColor: this.activeUser.preferences.colorScheme.secondaryColor,
      accentColor: this.activeUser.preferences.colorScheme.accentColor,
      neutralLightColor: this.activeUser.preferences.colorScheme.neutralLightColor,
      neutralDarkColor: this.activeUser.preferences.colorScheme.neutralDarkColor
    };
    form.resetForm({
      displayName: this.activeUser.displayName,
      primaryColor: this.activeUser.preferences.colorScheme.primaryColor,
      secondaryColor: this.activeUser.preferences.colorScheme.secondaryColor,
      accentColor: this.activeUser.preferences.colorScheme.accentColor,
      neutralLightColor: this.activeUser.preferences.colorScheme.neutralLightColor,
      neutralDarkColor: this.activeUser.preferences.colorScheme.neutralDarkColor
    });
  }

  private navigationComplete(): void {
    GlobalVariables.navigationState.next(false);
  }
}
