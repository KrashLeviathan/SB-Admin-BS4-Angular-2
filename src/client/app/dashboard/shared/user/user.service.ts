import {Injectable} from '@angular/core';
import {User} from './user';
import {USERS} from './mock-users';

@Injectable()
export class UserService {
  getUser(userId: number) {
    // TODO: Replace with HTTP request
    return this.getUsers()
      .then(users => users.find(user => user.userId === userId));
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
