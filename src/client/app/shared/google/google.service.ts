import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {UserService} from '../user/user.service';

@Injectable()
export class GoogleService {
  constructor(private userService: UserService) {
  }

  /**
   * Logs the user into SmartSync, returning true if the user exists
   * and false if he doesn't.
   * @param googleUser
   * @returns {Promise<boolean>}
   */
  loginUser(googleUser: any): Promise<boolean> {
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
        this.handleUserNotExist(profile, sessionToken)
          .then(() => resolve(false));
      });
    });
  }

  private acceptUser(partialUser: any, householdId: number) {
    let user = UserService.createUser(partialUser, householdId, null);
    this.userService.setActiveUser(user);
  }

  private handleUserNotExist(profile: any, sessionToken: string): Promise<boolean> {
    // TODO: Route to registration page instead of just automatically adding them as user
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
}
