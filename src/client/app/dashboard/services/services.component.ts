import {Component, OnInit} from '@angular/core';
import {Service} from '../../shared/service/service';
import {ServiceService} from '../../shared/service/service.service';
import {PopoverControllerComponent, AlertType} from '../../shared/popover-controller/popover-controller';
import {UserService} from '../../shared/user/user.service';
import {GlobalVariables} from '../../shared/global-variables';
import {HouseholdService} from '../../shared/household/household.service';

@Component({
  moduleId: module.id,
  selector: 'services-cmp',
  templateUrl: './services.component.html'
})

export class ServicesComponent implements OnInit {
  services: Service[];
  userIsAdmin: boolean = false;
  activeUserId: number;

  isConfirmingDelete: boolean = false;
  serviceToDelete: any = {
    serviceId: 0,
    name: ''
  };

  savingState: boolean = false;

  constructor(private serviceService: ServiceService, private userService: UserService, private householdService: HouseholdService) {
  }

  getServices(userId: number): void {
    this.serviceService.getServices()
      .then(services => {
        this.services = services;
        this.navigationComplete();
      });
  }

  ngOnInit(): void {
    this.userService.getActiveUser().then(user => {
      this.householdService.getActiveHousehold().then(house => {
        this.userIsAdmin = user.isAdmin;
        this.activeUserId = user.userId;
        this.getServices(user.userId);
      });
    });
  }

  deleteService(): void {
    if (!this.isConfirmingDelete || !this.userIsAdmin) {
      return;
    }
    this.savingState = true;
    this.isConfirmingDelete = false;
    this.serviceService.deleteService(this.activeUserId, this.serviceToDelete.serviceId)
      .then(success => {
        this.savingState = false;
        if (success) {
          PopoverControllerComponent.createAlert(AlertType.SUCCESS, '\'' + this.serviceToDelete.name + '\' service ' +
            'was successfully deleted.');
        } else {
          PopoverControllerComponent.createAlert(AlertType.DANGER,
            '\'' + this.serviceToDelete.name + '\' could not be deleted.');
        }
        // Call cancelDelete to reset serviceToDelete
        this.cancelDelete();
      });
  }

  confirmDelete(service: Service): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.serviceToDelete = service;
    this.isConfirmingDelete = true;
  }

  cancelDelete(): void {
    if (!this.userIsAdmin) {
      return;
    }
    this.serviceToDelete = {serviceId: 0, name: ''};
    this.isConfirmingDelete = false;
  }

  private navigationComplete(): void {
    GlobalVariables.navigationState.next(false);
  }
}
