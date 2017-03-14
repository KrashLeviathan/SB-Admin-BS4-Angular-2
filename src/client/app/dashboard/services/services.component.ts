import {Component, OnInit} from '@angular/core';
import {Service} from '../../shared/service/service';
import {ServiceService} from '../../shared/service/service.service';
import {PopoverControllerComponent, AlertType} from '../../shared/popover-controller/popover-controller';

@Component({
  moduleId: module.id,
  selector: 'services-cmp',
  templateUrl: './services.component.html'
})

export class ServicesComponent implements OnInit {
  services: Service[];

  isConfirmingDelete: boolean = false;
  serviceToDelete: any = {
    serviceId: 0,
    name: ''
  };

  savingState: boolean = false;

  constructor(private serviceService: ServiceService) {
  }

  getServices(): void {
    this.serviceService.getServices()
      .then(services => this.services = services);
  }

  ngOnInit(): void {
    this.getServices();
  }

  deleteService(): void {
    if (!this.isConfirmingDelete) {
      return;
    }
    this.savingState = true;
    this.isConfirmingDelete = false;
    this.serviceService.deleteService(this.serviceToDelete.serviceId)
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
    this.serviceToDelete = service;
    this.isConfirmingDelete = true;
  }

  cancelDelete(): void {
    this.serviceToDelete = {serviceId: 0, name: ''};
    this.isConfirmingDelete = false;
  }
}
