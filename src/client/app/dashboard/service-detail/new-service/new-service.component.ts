import {Component, OnInit} from '@angular/core';
import {ServiceType, ALL_SERVICE_TYPES} from '../../../shared/service/service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ServiceService} from '../../../shared/service/service.service';
import {UserService} from '../../../shared/user/user.service';
import {GlobalVariables} from '../../../shared/global-variables';
import {HouseholdService} from "../../../shared/household/household.service";

@Component({
  moduleId: module.id,
  selector: 'new-service',
  templateUrl: 'new-service.component.html'
})

export class NewServiceComponent implements OnInit {
  serviceType: ServiceType;
  allServiceTypes: ServiceType[] = ALL_SERVICE_TYPES;
  canContinue: boolean = true;
  userIsAdmin: boolean = false;
  activeUserId: number;
  confirmedNotAdmin: boolean = false;

  constructor(private serviceService: ServiceService,
              private router: Router,
              private location: Location,
              private userService: UserService,
              private householdService: HouseholdService) {
  }

  ngOnInit(): void {
    this.userService.getActiveUser().then(user => {
      this.householdService.getActiveHousehold().then(house => {
        this.userIsAdmin = user.isAdmin;
        this.activeUserId = user.userId;
        // Confirm they're not an admin before showing them the "not authorized" message
        this.confirmedNotAdmin = !user.isAdmin;
        this.navigationComplete();
      })
    });
  }

  cancel(): void {
    this.location.back();
  }

  continue(): void {
    if (!this.serviceType || !this.userIsAdmin) {
      this.canContinue = false;
      return;
    }
    this.canContinue = true;
    this.serviceService.createNewService(this.serviceType)
      .then(serviceId => {
        if (serviceId === -1) {
          // TODO: On Error
        } else {
          this.router.navigate(['dashboard/', 'service', serviceId, 'edit']);
        }
      });
  }

  private navigationComplete(): void {
    GlobalVariables.navigationState.next(false);
  }
}
