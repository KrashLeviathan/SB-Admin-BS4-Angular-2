import {Component, Input} from '@angular/core';
import {ServiceComponent} from '../service';

@Component({
  template: `
    <div class="todo-list-tile">
      <h4>{{name}}</h4>
      <div class="table-responsive">
        <table class="table table-sm">
          <tr *ngFor="let item of data.items">
            <td>{{item.description}}</td>
            <td class="text-right">
              <a href="Javascript:void(0)"><i class="fa fa-lg fa-fw" [ngClass]="{
                   'fa-check-square-o': item.complete,
                   'fa-square-o': !item.complete
                   }" (click)="item.complete = !item.complete"></i></a>
              <a href="Javascript:void(0)"><i class="fa fa-lg fa-fw fa-minus" (click)="removeItem(item)"></i></a>
            </td>
          </tr>
        </table>
        <button class="btn btn-secondary pull-right" (click)="addItem()">Add Item</button>
      </div>
    </div>
  `,
  styles: [`
    i {
      text-align: left;
      width: 22px;
    }

    td {
      border: none;
    }

    .text-right {
      text-align: right;
    }

    h4 {
      font-size: 1em;
      font-variant: small-caps;
      letter-spacing: 0.2em;
      overflow: hidden;
    }
  `]
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

  addItem() {
    // TODO
    console.log('Add item clicked!');
  }

  removeItem(item: any) {
    // TODO
    console.log('Remove item clicked!');
  }
}
