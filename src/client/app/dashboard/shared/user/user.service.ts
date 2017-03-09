import {Injectable} from '@angular/core';
import {User} from './user';
import {USERS} from './mock-users';
import {EncryptionService} from '../encryption/encryption.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';

export const DAYS_UNTIL_SESSION_EXPIRATION = 7;

@Injectable()
export class UserService {
  /**
   * On login, the active user sessionId is encrypted and stored in the cookies.
   * @param sessionToken
   */
  setActiveUserSession(sessionToken: string): void {
    let encryptedToken = EncryptionService.encrypt(
      EncryptionService.encode(sessionToken)
    );
    Cookie.set('sessionToken', encryptedToken, DAYS_UNTIL_SESSION_EXPIRATION);
  }

  getActiveUser(): Promise<User> {
    let encryptedToken = Cookie.get('sessionToken');
    let sessionToken = EncryptionService.decode(
      EncryptionService.decrypt(encryptedToken)
    );
    // TODO: Replace with HTTP request
    return this.getUser(1);
  }

  getUser(userId: number): Promise<User> {
    // TODO: Replace with HTTP request
    return new Promise(resolve => {
      this.getUsers()
        .then(users => {
          resolve(users.find(user => user.userId === userId));
        });
    });
  }

  getUsers(): Promise<User[]> {
    // TODO: Replace with HTTP request
    return Promise.resolve(USERS);
  }

  getUserPreferences(userId: number): Promise<any> {
    // TODO: Currently just getting drag positions
    return Promise.resolve(localStorage.getItem('dragPositions'));
  }

  setUserPreferences(userId: number, prefs: any): Promise<boolean> {
    // TODO: Replace with HTTP request
    localStorage.setItem('dragPositions', JSON.stringify(prefs));
    return Promise.resolve(true);
  }
}
