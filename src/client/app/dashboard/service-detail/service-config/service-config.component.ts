import {Component, OnInit, Input} from '@angular/core';
import {Service} from '../../../shared/service/service';

@Component({
  moduleId: module.id,
  selector: 'service-config',
  templateUrl: 'service-config.component.html'
})

export class ServiceConfigComponent implements OnInit {
  @Input() service: Service;

  // TODO: Confirm user is admin before allowing access to this page

  ngOnInit(): void {
    // TODO
  }
}
