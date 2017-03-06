import {Component, OnInit, Input} from '@angular/core';
import {Service} from '../shared/service/service';
import {ServiceService} from '../shared/service/service.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'service-detail-cmp',
  templateUrl: 'service-detail.component.html'
})

export class ServiceDetailComponent implements OnInit {
  @Input()
  service: Service;
  isEditing: boolean = false;

  constructor(private serviceService: ServiceService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) {
  }

  ngOnInit(): void {
    this.isEditing = (this.route.data as any).value.isEditing === true;
    this.route.params
      .switchMap((params: Params) => this.serviceService.getService(+params['id']))
      .subscribe(service => {
        if (service) {
          this.service = service;
        } else {
          console.log('Bad route: ' + this.router.url);
          this.router.navigate(['dashboard/', 'services']);
        }
      });
  }

  cancel(): void {
    this.location.back();
  }

  save(): void {
    // TODO: Save service configuration
    console.log('Service configuration saved!');
    this.location.back();
  }
}
