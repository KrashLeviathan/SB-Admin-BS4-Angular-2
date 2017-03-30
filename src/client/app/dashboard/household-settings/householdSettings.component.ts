import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {HouseholdService} from '../../shared/household/household.service';
import {Household} from '../../shared/household/household';
import {STATES, State} from '../../states';
import {AlertType, PopoverControllerComponent} from '../../shared/popover-controller/popover-controller';

@Component({
  moduleId: module.id,
  selector: 'household-settings',
  templateUrl: './householdSettings.component.html'
})

export class HouseholdSettingsComponent implements OnInit {
  MAX_VARCHAR_LENGTH: number = 255;

  activeHousehold: Household;

  states: State[];
  formDisabled: boolean = true;
  savingState: boolean = false;
  errorOnSave: boolean = false;

  constructor(private householdService: HouseholdService) {
    this.states = STATES;
  }

  ngOnInit(): void {
    this.getActiveHousehold()
      .then(household => this.activeHousehold = household);
  }

  getActiveHousehold(): Promise<Household> {
    return this.householdService.getHousehold(0);
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      this.errorOnSave = true;
      return;
    }
    this.errorOnSave = false;
    this.formDisabled = true;
    this.savingState = true;
    this.householdService.saveHousehold(form.value)
      .then(success => {
        this.savingState = false;
        if (success) {
          this.activeHousehold.householdName = form.value.householdName;
          this.activeHousehold.firstAddressLine = form.value.firstAddressLine;
          this.activeHousehold.city = form.value.city;
          this.activeHousehold.state = form.value.state;
          this.activeHousehold.zipCode = form.value.zipCode;
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, 'Household Settings were saved successfully.');
        } else {
          this.errorOnSave = true;
          this.formDisabled = false;
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, 'Household Settings could not be saved.');
        }
      });
  }

  cancelChanges(form: NgForm): void {
    this.errorOnSave = false;
    this.formDisabled = true;
    form.resetForm({
      householdName: this.activeHousehold.householdName,
      firstAddressLine: this.activeHousehold.firstAddressLine,
      city: this.activeHousehold.city,
      state: this.activeHousehold.state,
      zipCode: this.activeHousehold.zipCode
    });
  }
}
