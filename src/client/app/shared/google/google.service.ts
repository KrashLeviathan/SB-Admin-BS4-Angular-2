import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {UserService} from '../user/user.service';

@Injectable()
export class GoogleService {
  constructor(private userService: UserService) {
  }

  /**
   * Logs the user into SmartSync, returning true if the user exists (or new)
   * and false if he doesn't.
   * @param googleUser
   * @param registerNew
   * @returns {Promise<boolean>}
   */
  loginUser(googleUser: any, registerNew: boolean): Promise<boolean> {
    console.log('Logging in user');
    let profile = googleUser.getBasicProfile();
    let googleId = profile.getId();
    let sessionToken = googleUser.getAuthResponse().id_token;

    return new Promise(resolve => {
      //TODO replace with actual email returned from google. Jack hasn't implemented that method yet.
      Promise.all([
        this.userService.getUserByGoogle(googleId),
        this.userService.getUserHouseholdByGoogle(googleId)
      ]).then(response => {
        this.userService.setActiveUserSession(sessionToken);
        let partialUser = response[0].json();
        this.acceptUser(partialUser, response[1]);
        resolve(true);
      }).catch(() => {
        if (registerNew) {
          this.addNewUser(profile, sessionToken)
            .then(() => resolve(true));
        } else {
          this.handleUserNotExist();
          resolve(false);
        }
      });
    });
  }

  private acceptUser(partialUser: any, householdId: number) {
    let user = UserService.createUser(partialUser, householdId, null);
    this.userService.setActiveUser(user);
  }

  private addNewUser(profile: any, sessionToken: string): Promise<boolean> {
    let partialUser = {
      googleId: profile.getId(),
      givenName: profile.getGivenName(),
      fullName: profile.getName(),
      familyName: profile.getFamilyName(),
      imageURL: profile.getImageUrl(),
      email: profile.getEmail(),
      role: '0'
    };
    return this.userService.addNewUser(partialUser, sessionToken);
  }

  private handleUserNotExist() {
    // TODO
    console.log('User doesn\'t exist!');
  }
}
