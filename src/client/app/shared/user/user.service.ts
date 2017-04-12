import {Injectable} from '@angular/core';
import {User} from './user';
import {EncryptionService} from '../encryption/encryption.service';
import {Cookie} from 'ng2-cookies/ng2-cookies';
import {Headers, Http, RequestOptions, Response} from '@angular/http';
import {UserPreferences} from './user-preferences';
import {ColorScheme} from './color-scheme';
import {HouseholdService} from '../household/household.service';
import {AlertType, PopoverControllerComponent} from '../popover-controller/popover-controller';
import {GlobalVariables} from '../global-variables';
import {Router} from "@angular/router";
import {Household} from "../household/household";

export const DAYS_UNTIL_SESSION_EXPIRATION = 7;

@Injectable()
export class UserService {
  static activeUser: User;
  // static activeUserPrefs: UserPreferences;
  // static activeUserColorScheme: ColorScheme;


  /**
   * Displays a popover with the error message. Timeout on popover is 60 seconds.
   * @param error
   */
  static handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      if (body.message) {
        errMsg = body.message;
      } else {
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    // return Observable.throw(errMsg);
    PopoverControllerComponent.createAlert(AlertType.DANGER, errMsg, 60000);
  }

  /**
   * The header for a POST request sending json data.
   * @returns {RequestOptions}
   */
  static jsonHeader(): RequestOptions {
    let headers = new Headers({'Content-Type': 'application/json'});
    return new RequestOptions({headers: headers});
  }

  /**
   * Creates a full User object from a partial user object (such is returned in GET requests)
   * @param partialUser
   * @param householdId
   * @param preferences
   * @returns {User}
   */
  static createUser(partialUser: any, householdId: number, preferences: UserPreferences): User {
    return {
      userId: partialUser.userId || 0,
      googleId: partialUser.googleId || '',
      displayName: partialUser.displayName || '',
      fullName: partialUser.fullName || '',
      givenName: partialUser.givenName || '',
      familyName: partialUser.familyName || '',
      imageURL: partialUser.imageURL || '',
      email: partialUser.email || '',
      householdId: householdId,
      role: partialUser.role || '',
      created: partialUser.created || '',
      lastUpdated: partialUser.lastUpdated || '',
      isAdmin: (partialUser.role == '1') || false,
      preferences: preferences
    };
  }

  constructor(private http: Http, private router: Router) {
  }

  /**
   * On login, the active user sessionId is encrypted and stored in the cookies.
   * @param sessionToken
   */
  setActiveUserSession(sessionToken: string): void {
    let encryptedToken = EncryptionService.encrypt(
      EncryptionService.encode(sessionToken)
    );
    Cookie.set('sessionToken', encryptedToken, DAYS_UNTIL_SESSION_EXPIRATION);
    //TODO send sessionToken to the server to save.
  }

  /**
   * Caches the currently logged in user and updates the Cookie.
   * @param user
   */
  setActiveUser(user: User): void{
    Cookie.set('userId', user.userId.toString());
    UserService.activeUser = user;
  }

  /**
   * Returns the user who is logged in and actively using SmartSync.
   * Caches the value for additional accesses.
   * @returns {Promise<User>}
   */
  getActiveUser(): Promise<User> {
    // TODO: We should be storing the
    // let encryptedToken = Cookie.get('sessionToken');
    // if (!encryptedToken) {
    //   // Expired token returns null active user
    //   return Promise.resolve(null);
    // }
    // // Decrypt session token
    // let sessionToken = EncryptionService.decode(
    //   EncryptionService.decrypt(encryptedToken)
    // );
    // Return the current active user if there's already one loaded,
    // otherwise load the active user, set it, and return it
    return new Promise(resolve => {
      if (UserService.activeUser) {
        resolve(UserService.activeUser);
      } else {
        this.getUser(parseInt(Cookie.get('userId'))).then(result => {
          this.setActiveUser(result);
          resolve(result);
        });
      }
    });
  }

  acceptInvite(inviteId: number): Promise<any>{
    return new Promise(resolve => {

      this.http.post(GlobalVariables.BASE_URL + `/invites/` + inviteId +`/accept`,null, UserService.jsonHeader()).toPromise().then(
        response => {
          let body = response.json();
          resolve(body);
        }
      )
    })
  }

  /**
   * Gets the User with the given userId.
   * On failure, it displays the error message popover and returns null.
   * @param userId
   * @returns {Promise<User>}
   */
  getUser(userId: number): Promise<User> {
    return new Promise(resolve => {
      Promise.all([
        this.http.get(GlobalVariables.BASE_URL + `/users/` + userId).toPromise(),
        this.getUserHousehold(userId),
        this.getUserPreferences(userId)
      ]).then(responseArray => {
        let partialUser = responseArray[0].json();
        let user = UserService.createUser(partialUser, responseArray[1], responseArray[2]);
        resolve(user);
      }).catch(response => {
        UserService.handleError(response);
        resolve(null);
      });
    });
  }

  getUserByGoogle(googleProfile: any, sessionToken: string): Promise<Response> {
    let googleId = googleProfile.getId();
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/users/google/` + googleId).toPromise().then(response => {
          resolve(response);
      }).catch(error => {
          // UserService.handleError(error);
          this.addNewUserByGoogle(googleProfile, sessionToken).then(user => {
            resolve(user);
          })
        });
    })
  }


  private addNewUserByGoogle(profile: any, sessionToken: string): Promise<Response> {
    let partialUser = {
      googleId: profile.getId(),
      givenName: profile.getGivenName(),
      fullName: profile.getName(),
      familyName: profile.getFamilyName(),
      imageURL: profile.getImageUrl(),
      email: profile.getEmail(),
      role: '0'
    };
    return this.addNewUser(partialUser, sessionToken);
  }


  /**
   * Returns the userId for the given email address.
   * On failure, it displays the error message popover and returns 0.
   * @param email
   * @returns {Promise<number>}
   */
  getUserIdByEmail(email: string): Promise<number> {
    return new Promise(resolve => {
      let encodedEmail = encodeURIComponent(email);
      this.http.get(GlobalVariables.BASE_URL + '/users/email/' + encodedEmail + '/').toPromise()
        .then(response => {
          resolve(response.json().userId);
        })
        .catch(response => {
          UserService.handleError(response);
          resolve(0);
        });
    });
  }

  addNewUser(partialUser: any, sessionToken: string): Promise<Response> {
    return new Promise(resolve => {
      this.http.post(GlobalVariables.BASE_URL + '/users/', JSON.stringify(partialUser), UserService.jsonHeader()).toPromise()
        .then(response => {
          this.setActiveUserSession(sessionToken);

          let user = new User();
          let body = response.json();
          user.userId = body.userId;
          user.email = body.email;
          user.givenName = body.givenName;
          user.familyName = body.familyName;
          user.displayName = body.displayName;
          user.imageURL = body.imageURL;
          user.role = body.role;
          this.getUserHousehold(user.userId).then(householdId => {
            UserService.activeUser.householdId = householdId;
          });
          this.setActiveUser(user);
          resolve(user);
        })
        .catch(response => {
          UserService.handleError(response);
          // resolve(false);
        });
    });
  }

  /**
   * Returns an array of Users from the given householdId. The User objects
   * aren't completely built, however (not loading UserPreferences for each one).
   * On failure, it displays the error message popover and returns null.
   * @param householdId
   * @returns {Promise<User[]>}
   */
  getUsers(householdId: number): Promise<User[]> {
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/households/` + householdId + `/users`).toPromise()
        .then(response => {
          let users: User[] = [];
          let partialUsers = response.json();
          partialUsers.forEach((partialUser: any) => {
            users.push(UserService.createUser(partialUser, householdId, null));
          });
          resolve(users);
        })
        .catch(response => {
          this.router.navigate(['/signup']);
          // UserService.handleError(response);
          resolve(null);
        });
    });
  }

  /**
   * Returns the householdId for the given userId.
   * On failure, it displays the error message popover and returns null.
   * @param userId
   * @returns {Promise<number>}
   */
  getUserHousehold(userId: number): Promise<number> {
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/users/` + userId + `/household`).toPromise()
        .then(household => {
          let body = household.json();
          resolve(body.householdId);
        })
        .catch(response => {
          // UserService.handleError(response);
          resolve(0);
        });
    });
  }

  /**
   * Returns the householdId for the given user (via user's googleId).
   * On failure, it displays the error message popover and returns null.
   * @param googleId
   * @returns {Promise<number>}
   */
  getUserHouseholdByGoogle(googleId: string): Promise<number> {
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/users/google/` + googleId + `/household`).toPromise()
        .then(response => {
          let household = response.json();
          resolve(household.householdId);
        })
        .catch(response => {
          // UserService.handleError(response);
          resolve(0);
        });
    });
  }


  getUserDragPositions(userId: number): Promise<UserPreferences> {
    //TODO: Currently just getting drag positions
    return new Promise(resolve => {
      resolve(localStorage.getItem('dragPositions'));
    });
  }

  /**
   * Gets the UserPreferences for the given userId.
   * On failure, it displays the error message popover and returns null.
   * @param userId
   * @returns {Promise<UserPreferences>}
   */
  getUserPreferences(userId: number): Promise<UserPreferences> {
    return new Promise(resolve => {
      Promise.all([
        this.http.get(GlobalVariables.BASE_URL + `/users/` + userId + `/preferences`).toPromise()
        // this.getUserDragPositions(userId)
      ]).then(response => {
        //TODO fix the way colorScheme is used.
        //Might need to create a new object to send as json as a hybrid of pref and color
        let pref = new UserPreferences();
        let color = new ColorScheme();
        let resp = response[0].json();
        color.primaryColor = resp.primaryColor;
        color.secondaryColor = resp.secondaryColor;
        color.neutralDarkColor = resp.neutralDarkColor;
        color.neutralLightColor = resp.neutralLightColor;
        color.accentColor = resp.accentColor;
        pref.id = resp.id;
        pref.name = resp.name;
        pref.userId = resp.userId;
        pref.colorScheme = color;
        resolve(pref);
      });

    });
  }

  /**
   * Sets the UserPreferences for the given userId. Returns true on success.
   * On failure, it displays the error message popover and returns false.
   * @param userId
   * @param prefs
   * @returns {Promise<boolean>}
   */
  setUserPreferences(userId: number, prefs: any): Promise<boolean> {
    // TODO: Replace with HTTP request
    localStorage.setItem('dragPositions', JSON.stringify(prefs));
    return new Promise(resolve => {
      // Simulate latency
      setTimeout(() => {
        resolve(true);
      }, 250);
    });
  }

  /**
   * Saves user settings from the UserSettings page form. Returns true on success.
   * On failure, it displays the error message popover and returns false.
   * @param formData
   * @returns {Promise<boolean>}
   */
  saveUser(formData: Object): Promise<boolean> {

    //TODO some of the colors not sending correctly either.
    //TODO need to fix the way colorScheme is used.
    //Might need to create a new object to send as json as a hybrid of pref and color
    let user = UserService.activeUser;
    let pref = {
      'accentColor': (<any>formData)['accent'],
      'neutralLightColor': (<any>formData)['neutralLight'],
      'neutralDarkColor': (<any>formData)['neutralDark'],
      'primaryColor': (<any>formData)['primary'],
      'secondaryColor': (<any>formData)['secondary'],
      'name': user.preferences.name,
      'userId': user.userId,
      'id': user.preferences.id
    };
    user.displayName = (<any>formData)['displayName'];

    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});

    return new Promise(resolve => {
      Promise.all([
        this.http.put(GlobalVariables.BASE_URL + `/users`, JSON.stringify(user), options).toPromise(),
        this.http.put(GlobalVariables.BASE_URL + `/users/preferences`, JSON.stringify(pref), options).toPromise()
      ]).then(response => {
          resolve(true);
        }
      );
    });

  }

  /**
   * Deletes the given user. Returns true on success.
   * On failure, it displays the error message popover and returns false.
   * @param userId
   * @returns {Promise<boolean>}
   */
  deleteUser(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.http.delete(GlobalVariables.BASE_URL + `/users/` + userId).toPromise()
        .then(() => resolve(true))
        .catch(response => {
          UserService.handleError(response);
          resolve(false);
        });
    });
  }

  removeUserFromHousehold(userId: number): Promise<boolean> {

    return new Promise(resolve => {
      this.http.delete(GlobalVariables.BASE_URL + `/households/`
        + HouseholdService.activeHousehold.householdId + `/users/` + userId).toPromise()
        .then(
          response => {
            // let body = response.json();
            // let user = new User();
            // user.userId = body.userId;
            // user.email = body.email;
            // user.givenName = body.givenName;
            // user.familyName = body.familyName;
            // user.imageURL = body.imageURL;
            // user.role = body.role;
            resolve(true);
          })
        .catch(response => {
          UserService.handleError(response);
          resolve(false);
        });
    });
  }

  /**
   * Makes the user an admin. Returns true on success.
   * On failure, it displays the error message popover and returns false.
   * @param userId
   * @returns {Promise<boolean>}
   */
  giveAdminPrivileges(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.getUser(userId).then(user => {
        user.role = '1';
        this.http.put(GlobalVariables.BASE_URL + `/users/`, JSON.stringify(user), UserService.jsonHeader()).toPromise()
          .then(() => resolve(true))
          .catch(response => {
            UserService.handleError(response);
            resolve(false);
          });
      });
    });
  }

  /**
   * Removes admin privileges from the user. Returns true on success.
   * On failure, it displays the error message popover and returns false.
   * @param userId
   * @returns {Promise<boolean>}
   */
  revokeAdminPrivileges(userId: number): Promise<boolean> {
    return new Promise(resolve => {
      this.getUser(userId).then(user => {
        user.role = '0';
        // TODO: The security on this part should be improved...
        this.http.put(GlobalVariables.BASE_URL + `/users/`, JSON.stringify(user), UserService.jsonHeader()).toPromise()
          .then(() => resolve(true))
          .catch(response => {
            UserService.handleError(response);
            resolve(false);
          });
      });
    });
  }

  // giveAdminPrivileges(userId: number): Promise<boolean> {
  //   return new Promise(resolve => {
  //     this.http.get(GlobalVariables.BASE_URL + `/users/`+userId).toPromise().then(response => {
  //       let json = new User();
  //       let body = response.json();
  //       json.userId = userId;
  //       json.familyName = body.familyName;
  //       json.googleId = body.googleId;
  //       json.fullName = body.fullName;
  //       json.displayName = body.displayName;
  //       json.email = body.email;
  //       json.givenName = body.givenName;
  //       json.role = '1';
  //       let headers = new Headers({ 'Content-Type': 'application/json'});
  //       let options = new RequestOptions({ headers: headers });
  //
  //       this.http.post(GlobalVariables.BASE_URL + `/users/`, JSON.stringify(json), options).toPromise()
  //         .then(
  //           response => {
  //             let body = response.json();
  //             let user = new User();
  //             user.userId = body.userId;
  //             user.email = body.email;
  //             user.givenName = body.givenName;
  //             user.familyName = body.familyName;
  //             user.imageURL = body.imageURL;
  //             user.role = body.role;
  //
  //             resolve(true);
  //           }
  //         )
  //         .catch(this.handleError);
  //     })
  //   });
  // }

  // revokeAdminPrivileges(userId: number): Promise<boolean> {
  //   return new Promise(resolve => {
  //     this.http.get(GlobalVariables.BASE_URL + `/users/`+userId).toPromise().then(response => {
  //       let json = new User();
  //       let body = response.json();
  //       json.userId = userId;
  //       json.familyName = body.familyName;
  //       json.googleId = body.googleId;
  //       json.fullName = body.fullName;
  //       json.displayName = body.displayName;
  //       json.email = body.email;
  //       json.givenName = body.givenName;
  //       json.role = '0';
  //       let headers = new Headers({ 'Content-Type': 'application/json'});
  //       let options = new RequestOptions({ headers: headers });
  //
  //       this.http.post(GlobalVariables.BASE_URL + `/users/`, JSON.stringify(json), options).toPromise()
  //         .then(
  //           response => {
  //             let body = response.json();
  //             let user = new User();
  //             user.userId = body.userId;
  //             user.email = body.email;
  //             user.givenName = body.givenName;
  //             user.familyName = body.familyName;
  //             user.imageURL = body.imageURL;
  //             user.role = body.role;
  //
  //             resolve(true);
  //           }
  //         )
  //         .catch(this.handleError);
  //     })
  //   });
  // }

  /**
   * Creates an invite for the user connected to the given email.
   * First it will check if a user with the given email is in the system.
   * If and only if such a user exists, the invite will be created for
   * that user to join the activeUser's household. Returns true on success.
   * On failure, it displays the error message popover and returns false.
   * @param email
   * @returns {Promise<T>}
   */
  inviteUserEmail(email: string): Promise<boolean> {
    return new Promise(resolve => {
      this.getUserIdByEmail(email).then(userId => {
        if (userId === 0) {
          // User doesn't exist for that email
          resolve(false);
        } else {
          let json = {
            userId: userId,
            householdId: UserService.activeUser.householdId
          };

          this.http.post(GlobalVariables.BASE_URL + `/invites`, JSON.stringify(json), UserService.jsonHeader()).toPromise()
            .then(() => resolve(true))
            .catch(response => {
              UserService.handleError(response);
              resolve(false);
            });
        }
      }).catch(response => {
        UserService.handleError(response);
        resolve(false);
      });
    });
  }

  getUserInvites(): Promise<any[]> {
    return new Promise(resolve => {
      this.http.get(GlobalVariables.BASE_URL + `/invites/users/` + UserService.activeUser.userId).toPromise()
        .then(response => {
          let json = response.json();
          resolve(json);
        });
    })
  }
  // Possible cruft to clean up later...
  // private extractData(res: Response) {
  //   let body = res.json();
  //   console.log(body.data);
  //   return body.data || {};
  // }
}
