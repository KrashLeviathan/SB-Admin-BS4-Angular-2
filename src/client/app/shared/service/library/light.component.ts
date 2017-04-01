import {Component, Input} from '@angular/core';
import {ServiceComponent} from '../service';

@Component({
  template: `
    <div class="todo-list-tile">
      <h4>{{name}}</h4>
      <div class="on-off-buttons">
        <button class="btn" (click)="data.turnedOn = true"
                [class.btn-secondary]="!data.turnedOn" [class.btn-primary]="data.turnedOn">On
        </button>
        <button class="btn btn-secondary" (click)="data.turnedOn = false"
                [class.btn-secondary]="data.turnedOn" [class.btn-primary]="!data.turnedOn">Off
        </button>
      </div>
    </div>
  `,
  styles: [`
    .on-off-buttons {
      text-align: center;
      margin-top: 2.2em;
    }
    h4 {
      font-size: 1em;
      font-variant: small-caps;
      letter-spacing: 0.2em;
      overflow: hidden;
    }
  `]
})

export class LightComponent implements ServiceComponent {
  @Input() data: any;
  @Input() name: string;
  @Input() status: string;

  // data.turnedOn : boolean
}
