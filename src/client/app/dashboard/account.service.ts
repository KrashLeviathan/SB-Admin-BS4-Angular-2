import {Injectable} from '@angular/core';
import {Account} from './account';
import {ACCOUNT} from './mock-accounts';

@Injectable()
export class AccountService {
  getAccount(id: number): Promise<Account> {
    return Promise.resolve(ACCOUNT);
  }
}
