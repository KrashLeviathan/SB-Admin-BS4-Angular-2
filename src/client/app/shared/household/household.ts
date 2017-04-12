export class Household {
  householdId: number;
  ownerId: number;
  householdName: string;
  firstAddressLine: string;
  secondAddressLine: string;
  city: string;
  state: string;
  zipCode: number;
  created: Date;
  lastUpdated: Date;

  constructor(public data: any) {

    this.householdId = data.householdId;
    this.ownerId = data.ownerId;
    this.householdName = data.householdName;
    this.firstAddressLine = data.firstAddressLine;
    this.secondAddressLine = data.secondAddressLine;
    this.city = data.city;
    this.state = data.state;
    this.zipCode = data.zipCode;


  }
}
