import {Component, Input} from '@angular/core';
import {ServiceComponent} from '../service';

@Component({
  template: `
    <div class="wunderground-tile">
      <p>{{data.location}}</p>
      <h4>{{data.temp}} &deg;{{(data.celsius) ? 'C' : 'F'}}</h4>
    </div>
  `
})

export class WundergroundComponent implements ServiceComponent {
  @Input() data: any;
  @Input() name: string;
  @Input() status: string;

  // data.location : string
  // data.temp     : number
  // data.celsius  : false
}
