import {Component, OnInit, Input} from '@angular/core';
import {Service} from './service';

@Component({
  moduleId: module.id,
  selector: 'service-cmp',
  templateUrl: './service.component.html'
})

export class ServiceComponent implements OnInit {
  @Input() service: Service;

  ngOnInit(): void {
    // TODO
  }
}
