import {NgModule} from '@angular/core';

import {ServiceContainer} from './service-container.component';
import {BrowserModule} from '@angular/platform-browser';
import {ServiceDirective} from './service.directive';
import {WundergroundComponent} from './library/wunderground.component';
import {LightComponent} from './library/light.component';
import {TodoListComponent} from './library/todo-list.component';

@NgModule({
  imports: [BrowserModule],
  declarations: [
    ServiceDirective,
    ServiceContainer,
    WundergroundComponent,
    LightComponent,
    TodoListComponent // Add more components as needed for specific services
  ],
  entryComponents: [
    WundergroundComponent,
    TodoListComponent,
    LightComponent
  ], // Add specific service components here as well
  exports: [
    ServiceDirective,
    ServiceContainer
  ]
})

export class ServiceModule {
}
