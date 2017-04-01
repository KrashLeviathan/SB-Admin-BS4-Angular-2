import {Component, Input} from '@angular/core';
import {ServiceComponent} from '../service';

@Component({
  template: `
    <div class="todo-list-tile">
      <p>{{name}}</p>
      <ul>
        <li *ngFor="let item of data.items">{{item.description}}</li>
      </ul>
    </div>
  `
})

export class TodoListComponent implements ServiceComponent {
  @Input() data: any;
  @Input() name: string;
  @Input() status: string;

  // data.items : any[] = [
  //   {
  //     description : string,
  //     complete    : boolean
  //   }
  // ]
}
