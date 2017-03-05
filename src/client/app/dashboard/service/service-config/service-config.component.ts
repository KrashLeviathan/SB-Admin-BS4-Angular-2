import {Component, OnInit, Input} from '@angular/core';
import {Service} from '../../service';

@Component({
  moduleId: module.id,
  selector: 'service-config',
  templateUrl: 'service-config.component.html'
})

export class ServiceConfigComponent implements OnInit {
  @Input() service: Service;

  ngOnInit(): void {
    // TODO
  }
}
