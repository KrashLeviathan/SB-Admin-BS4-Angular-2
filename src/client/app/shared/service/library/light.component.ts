import {Component, Input} from '@angular/core';
import {ServiceComponent} from '../service';

@Component({
  template: `
    <div class="todo-list-tile">
      <p>{{name}}</p>
      <button class="btn" (click)="data.turnedOn = true"
              [class.btn-secondary]="!data.turnedOn" [class.btn-primary]="data.turnedOn">On
      </button>
      <button class="btn btn-secondary" (click)="data.turnedOn = false"
              [class.btn-secondary]="data.turnedOn" [class.btn-primary]="!data.turnedOn">Off
      </button>
    </div>
  `
})

export class LightComponent implements ServiceComponent {
  @Input() data: any;
  @Input() name: string;
  @Input() status: string;

  // data.turnedOn : boolean
}
