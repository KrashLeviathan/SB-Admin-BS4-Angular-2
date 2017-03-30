import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AlertType, PopoverControllerComponent} from "../../shared/popover-controller/popover-controller";
import {UserService} from "../../shared/user/user.service";
import {User} from "../../shared/user/user";
import {ColorScheme} from "../../shared/user/color-scheme";

@Component({
  moduleId: module.id,
  selector: 'user-settings',
  templateUrl: './userSettings.component.html'
})

export class UserSettingsComponent implements OnInit {
  MAX_VARCHAR_LENGTH: number = 255;

  activeUser: User;
  selectedColor: string = 'primary';
  formColors: ColorScheme = {
    primary: '',
    secondary: '',
    accent: '',
    neutralLight: '',
    neutralDark: ''
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
      });
  }

  getTextColor(color: string): string {
    // TODO
    return "";
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
          this.activeUser.preferences.colorScheme.primary = form.value.primary;
          this.activeUser.preferences.colorScheme.secondary = form.value.secondary;
          this.activeUser.preferences.colorScheme.accent = form.value.accent;
          this.activeUser.preferences.colorScheme.neutralLight = form.value.neutralLight;
          this.activeUser.preferences.colorScheme.neutralDark = form.value.neutralDark;
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, 'User Settings were saved successfully.');
        } else {
          this.errorOnSave = true;
          this.formDisabled = false;
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, 'User Settings could not be saved.');
        }
      });
  }

  cancelChanges(form: NgForm): void {
    this.errorOnSave = false;
    this.formDisabled = true;
    this.formColors = {
      primary: this.activeUser.preferences.colorScheme.primary,
      secondary: this.activeUser.preferences.colorScheme.secondary,
      accent: this.activeUser.preferences.colorScheme.accent,
      neutralLight: this.activeUser.preferences.colorScheme.neutralLight,
      neutralDark: this.activeUser.preferences.colorScheme.neutralDark
    };
    form.resetForm({
      displayName: this.activeUser.displayName,
      primary: this.activeUser.preferences.colorScheme.primary,
      secondary: this.activeUser.preferences.colorScheme.secondary,
      accent: this.activeUser.preferences.colorScheme.accent,
      neutralLight: this.activeUser.preferences.colorScheme.neutralLight,
      neutralDark: this.activeUser.preferences.colorScheme.neutralDark
    });
  }

}
