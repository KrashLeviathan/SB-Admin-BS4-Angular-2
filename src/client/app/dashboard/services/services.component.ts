import {Component, OnInit} from '@angular/core';
import {Service} from '../../shared/service/service';
import {ServiceService} from '../../shared/service/service.service';

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
    // TODO: Make call to ServiceService
    console.log('TODO: delete service ' + this.serviceToDelete.serviceId);
    // Call cancelDelete to remove modal
    this.cancelDelete();
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
