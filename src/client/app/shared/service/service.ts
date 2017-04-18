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
    this.serviceId = data.serviceId;
    this.name = data.name;
    this.description = data.description;
    this.status = data.isActive;
    this.wide = data.wide;
    this.tall = data.tall;
  }
}

export interface ServiceComponent {
  data: any;
  name: string;
  status: string;
}

export class ServiceType {
  serviceTypeId: number;
  name: string;
  description: string;
  component: Type<any>;
}

export const ALL_SERVICE_TYPES: ServiceType[] = [
  {
    serviceTypeId: 1,
    name: 'Dimmable RGB LED Bulb',
    description: 'Dimmable A19 E26 RGB LED Bulb, Color Changing, 160 degree Beam Angle, ' +
    '5W, 16 Color Choice, Remote Controller Included, LED Light Bulb',
    component: LightComponent
  },
  {
    serviceTypeId: 2,
    name: 'Weather Underground',
    description: 'A weather service for reporting weather forecasts.',
    component: WundergroundComponent
  },
  {
    serviceTypeId: 3,
    name: 'TODO List',
    description: 'Keeps track of things you need to do in a list. Items can be checked ' +
    'off when completed.',
    component: TodoListComponent
  }
];
