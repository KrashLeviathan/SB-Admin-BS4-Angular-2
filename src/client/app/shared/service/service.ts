export class Service {
  serviceId: number;
  serviceName: string;
  description: string;
  serviceType: ServiceType;
  status: string;
  wide: boolean = false;
  tall: boolean = false;
}

export class ServiceType {
  key: string;
  name: string;
  description: string;
}

export const ALL_SERVICE_TYPES: ServiceType[] = [
  {
    key: 'dimmable_a19_e26_rgb_led_bulb',
    name: 'Dimmable RGB LED Bulb',
    description: 'Dimmable A19 E26 RGB LED Bulb, Color Changing, 160 degree Beam Angle, ' +
    '5W, 16 Color Choice, Remote Controller Included, LED Light Bulb'
  },
  {
    key: 'wunderground_api',
    name: 'Weather Underground',
    description: 'A weather service for reporting weather forecasts.'
  },
  {
    key: 'google_calendar',
    name: 'Google Calendar',
    description: 'Provides synced calendar information from your Google account.'
  }
];
