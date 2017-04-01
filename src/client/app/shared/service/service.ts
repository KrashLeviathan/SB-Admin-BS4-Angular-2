import {Type} from '@angular/core';
import {LightComponent} from './library/light.component';
import {WundergroundComponent} from './library/wunderground.component';
import {TodoListComponent} from './library/todo-list.component';

export class Service {
  serviceId: number;
  name: string;
  description: string;
  serviceType: ServiceType;
  status: string;
  wide: boolean = false;
  tall: boolean = false;

  constructor(public component: Type<any>, public data: any) {
    // Nothing here. To create a specific class of a service, pass in the class name
    // and a generic object containing the specific class's fields.
    //
    // E.g.   let service = new Service(WundergroundComponent, {location: 'Ames', temp: '42', ...});
  }
}

export interface ServiceComponent {
  data: any;
  name: string;
  status: string;
}

export class ServiceType {
  serviceTypeId: string;
  name: string;
  description: string;
  component: Type<any>;
}

export const ALL_SERVICE_TYPES: ServiceType[] = [
  {
    serviceTypeId: 'dimmable_a19_e26_rgb_led_bulb',
    name: 'Dimmable RGB LED Bulb',
    description: 'Dimmable A19 E26 RGB LED Bulb, Color Changing, 160 degree Beam Angle, ' +
    '5W, 16 Color Choice, Remote Controller Included, LED Light Bulb',
    component: LightComponent
  },
  {
    serviceTypeId: 'wunderground_api',
    name: 'Weather Underground',
    description: 'A weather service for reporting weather forecasts.',
    component: WundergroundComponent
  },
  {
    serviceTypeId: 'todo_list',
    name: 'TODO List',
    description: 'Keeps track of things you need to do in a list. Items can be checked ' +
    'off when completed.',
    component: TodoListComponent
  }
];
