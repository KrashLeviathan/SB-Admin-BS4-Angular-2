import {Injectable} from '@angular/core';
import {User} from './user';
import {USERS} from './mock-users';

@Injectable()
export class UserService {
  getUser(id: number) {
    return this.getUsers()
      .then(users => users.find(user => user.userId === id));
  }

  getUsers(): Promise<User[]> {
    return Promise.resolve(USERS);
  }
}
