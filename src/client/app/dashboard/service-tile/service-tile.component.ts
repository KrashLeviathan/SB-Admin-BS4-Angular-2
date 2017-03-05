import {Component, OnInit, Input} from '@angular/core';
import {Service} from '../shared/service/service';

@Component({
  moduleId: module.id,
  selector: 'service-tile',
  templateUrl: 'service-tile.component.html'
})

export class ServiceTileComponent implements OnInit {
  @Input() service: Service;

  ngOnInit(): void {
    // TODO
  }
}
