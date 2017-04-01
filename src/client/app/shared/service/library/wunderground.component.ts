import {Component, Input} from '@angular/core';
import {ServiceComponent} from '../service';

@Component({
  template: `
    <div class="wunderground-tile">
      <h4>{{data.location}}</h4>
      <p><span class="temperature">{{data.temp}}</span> &deg;{{(data.celsius) ? 'C' : 'F'}}</p>
    </div>
  `,
  styles: [`
    p {
      text-align: center;
      margin-top: 1em;
    }
    .temperature {
      font-size: 3em;
      font-weight: 700;
    }
    h4 {
      font-size: 1em;
      font-variant: small-caps;
      letter-spacing: 0.2em;
      overflow: hidden;
    }
  `]
})

export class WundergroundComponent implements ServiceComponent {
  @Input() data: any;
  @Input() name: string;
  @Input() status: string;

  // data.location : string
  // data.temp     : number
  // data.celsius  : false
}
