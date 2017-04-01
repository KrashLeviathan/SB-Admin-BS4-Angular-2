import {Injectable} from '@angular/core';
import {Household} from './household';
import {HOUSEHOLDS} from './mock-households';

@Injectable()
export class HouseholdService {
  getHousehold(householdId: number): Promise<Household> {
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(HOUSEHOLDS[householdId]);
      }, 250);
    });
  }

  saveHousehold(formData: Object): Promise<boolean> {
    // TODO: Save form data to server
    console.log(formData);
    return new Promise(resolve => {
      // Simulate server latency with 1 second delay
      setTimeout(() => resolve(true), 250);
    });
  }
}
