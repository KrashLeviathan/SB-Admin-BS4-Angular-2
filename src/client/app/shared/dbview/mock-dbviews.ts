import {DBView} from './dbview';

export const DB_VIEWS: DBView[] = [
  {
    viewId: 1,
    name: 'Weekday A',
    description: 'Chores around the house, upcoming events, and Trevor\'s TODO list',
    ownerName: 'Trevor',
    ownerId: 2,
    serviceLayout: null,
    windowWidth: 600
  },
  {
    viewId: 2,
    name: 'Weekday B',
    description: 'Picture slideshow with Nate\'s TODO list',
    ownerName: 'Papa Nate',
    ownerId: 1,
    serviceLayout: null,
    windowWidth: 800
  },
  {
    viewId: 3,
    name: 'Home IoT',
    description: 'IoT status and control',
    ownerName: 'Papa Nate',
    ownerId: 1,
    serviceLayout: null,
    windowWidth: 1000
  },
  {
    viewId: 4,
    name: 'Charlie',
    description: 'Homework, chores, and games',
    ownerName: 'Charlie',
    ownerId: 3,
    serviceLayout: null,
    windowWidth: 400
  }
];
