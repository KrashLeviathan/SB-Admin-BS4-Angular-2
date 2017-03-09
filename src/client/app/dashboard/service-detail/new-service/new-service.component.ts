import {Component} from '@angular/core';
import {ServiceType, ALL_SERVICE_TYPES} from '../../shared/service/service';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {ServiceService} from '../../shared/service/service.service';

@Component({
  moduleId: module.id,
  selector: 'new-service',
  templateUrl: 'new-service.component.html'
})

export class NewServiceComponent {
  serviceType: ServiceType;
  allServiceTypes: ServiceType[] = ALL_SERVICE_TYPES;
  canContinue: boolean = true;

  constructor(private serviceService: ServiceService,
              private router: Router,
              private location: Location) {
  }

  cancel(): void {
    this.location.back();
  }

  continue(): void {
    if (!this.serviceType) {
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
}
