import {Injectable} from '@angular/core';
import {Household} from './account';
import {HOUSEHOLDS} from './mock-accounts';

@Injectable()
export class AccountService {
  getAccount(id: number): Promise<Household> {
    return Promise.resolve(HOUSEHOLDS[id]);
  }

  saveAccount(formData: Object): Promise<boolean> {
    // TODO: Save form data to server
    console.log(formData);
    return new Promise(resolve => {
      // Simulate server latency with 1 second delay
      setTimeout(() => resolve(true), 1000);
    });
  }
}
