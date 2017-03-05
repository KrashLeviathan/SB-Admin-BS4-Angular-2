import {Component, OnInit} from '@angular/core';
import {Service} from '../service';
import {ServiceService} from '../service.service';

@Component({
  moduleId: module.id,
  selector: 'services-cmp',
  templateUrl: './services.component.html'
})

export class ServicesComponent implements OnInit {
  services: Service[];

  constructor(private serviceService: ServiceService) {
  }

  getServices(): void {
    this.serviceService.getServices()
      .then(services => this.services = services);
  }

  ngOnInit(): void {
    this.getServices();
  }

  delete(serviceId: number): void {
    console.log('TODO: delete(' + serviceId + ')');
  }
}
