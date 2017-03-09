export class Account {
  static MAX_NAME_LENGTH: number = 24;
  static MAX_ADDRESS_LENGTH: number = 128;
  static MAX_CITY_LENGTH: number = 24;

  accountId: number;
  accountName: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: number;
}
