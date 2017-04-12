import {Injectable} from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {UserService} from '../user/user.service';
import {User} from "../user/user";
import {Response} from '@angular/http';


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
    let profile = googleUser.getBasicProfile();
    let googleId = profile.getId();
    let sessionToken = googleUser.getAuthResponse().id_token;

    return new Promise(resolve => {
      this.userService.getUserByGoogle(profile, sessionToken)
        .then(response => {
          this.userService.getUserHouseholdByGoogle(googleId).then(household => {
            if(household != 0){
              this.userService.setActiveUserSession(sessionToken);
              this.acceptUser(response, household).then(success => {

                resolve(success);
              })
            }else{
              this.userService.setActiveUserSession(sessionToken);
              let body = response.json();
              this.userService.getUser(body.userId).then(user => {
                this.userService.setActiveUser(user);
                resolve(false);
              });
            }
          }).catch(() => {
            this.userService.setActiveUserSession(sessionToken);
            // let body = response.json();
            // console.log(response);
            this.userService.getUser(response.userId).then(user => {
              this.userService.setActiveUser(user);
              resolve(false);
            });
          })
        }).catch(() =>{
          this.addNewUser(profile, sessionToken)
            .then(() => {
              resolve(false);
            });
      })
    });
  }

  private acceptUser(partialUser: any, householdId: number): Promise<boolean> {
    return new Promise(resolve => {
      let partial = partialUser.json();
      this.userService.getUserPreferences(partial.userId)
        .then(userPrefs => {
          let user = UserService.createUser(partial, householdId, userPrefs);
          this.userService.setActiveUser(user);
          resolve(true);
        }).catch(() => {
        this.userService.getUser(partial.userId).then(user => {
          this.userService.setActiveUser(user);
          resolve(false);
        });
      });
    })
  }

  private addNewUser(profile: any, sessionToken: string): Promise<Response> {
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
