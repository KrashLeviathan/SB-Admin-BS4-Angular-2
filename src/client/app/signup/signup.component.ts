import {Component} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from "../shared/user/user.service";
import {Household} from "../shared/household/household";
import {HouseholdService} from "../shared/household/household.service";

declare const gapi: any;

@Component({
  moduleId: module.id,
  selector: 'signup-cmp',
  templateUrl: 'signup.component.html',
  styles: [`
    .invite-list {
      width: 100%;
    }

    .rounded-btn.active {
      background-color: rgba(255, 255, 255, 0.2);
    }

    .form-note {
      font-size: 0.7em;
      color: rgba(255, 255, 255, 0.5);
      font-style: italic;
      margin-top: 1em;
    }
  `]
})

export class SignupComponent {
  MAX_VARCHAR_LENGTH: number = 255;

  invites: any[];
  households: Household[];
  // Form data
  displayName: string = '';
  householdName: string = '';
  acceptingInvite = false;
  selectedInvite: number = null;
  joinHouseholdLater: boolean = true;
  householdFirstAddressLine = '';
  householdSecondAddressLine = '';
  householdCity = '';
  householdState = '';
  householdZip = '';
  householdInputs = true;

  constructor(private router: Router, private userService: UserService, private householdService: HouseholdService) {
  }

  ngOnInit(){
    this.invites = [];
    this.households = [];
    this.userService.getActiveUser().then(response => {
      this.userService.getUserInvites().then(invites => {
        for(let i = 0; i < invites.length; i++){
          this.householdService.getHousehold(invites[i].householdId).then(houses => {
            let curr = {
              "householdId": houses.householdId,
              "householdName": houses.householdName,
              "inviteId": invites[i].id
            }
            this.invites.push(curr);
            // this.households.push(houses[i]);
          })
        }
      });
    })
  }

  onSubmit(f: NgForm): void {
    // this.router.navigate(['/createnewuser']);
    //TODO accept invite, set user household.
    if(this.acceptingInvite){
      //TODO accepting invite
      this.userService.acceptInvite(this.selectedInvite).then(response => {
        let data = {
          "displayName": this.displayName,
          "accent": "#00ffab",
          "neutralLight": "#969696",
          "neutralDark": "#313131",
          "primary": "#345cb2",
          "secondary": "#3b5156"
        };
        let householdId = response.householdId;
        this.userService.saveUser(data).then(result => {
          UserService.activeUser.householdId = householdId;
          this.router.navigate(['/dashboard', 'home']);
        })
      });
    }else if(this.joinHouseholdLater){
      //TODO later
      //TODO I might not allow this because it will make loading the dashboard page super difficult
    }else{
      let data = {
        'ownerId': UserService.activeUser.userId,
        'householdName': this.householdName,
        'firstAddressLine': this.householdFirstAddressLine,
        'secondAddressLine': this.householdSecondAddressLine,
        'city': this.householdCity,
        'state': this.householdState,
        'zipCode': this.householdZip
      }
      let house = new Household(data);
      this.householdService.addHousehold(house).then(response => {
          UserService.activeUser.householdId = response.householdId;

          this.userService.giveAdminPrivileges(UserService.activeUser.userId).then(() => {
            UserService.activeUser.role = '1';
            UserService.activeUser.isAdmin = true;
            let data = {
              "displayName": this.displayName,
              "accent": "#00ffab",
              "neutralLight": "#969696",
              "neutralDark": "#313131",
              "primary": "#345cb2",
              "secondary": "#3b5156"
            };
            this.userService.saveUser(data).then(result => {

              this.router.navigate(['/dashboard', 'home']);
            })

          })
        }
      )
    }

  }

  onClickInvite(invite: number): void {
    this.acceptingInvite = true;
    this.selectedInvite = invite;
    this.joinHouseholdLater = false;
    this.householdName = '';
    this.householdInputs = true;
  }

  onFocusHousehold(): void {
    this.selectedInvite = null;
    this.acceptingInvite = false;
    this.joinHouseholdLater = false;
    this.householdInputs = false;
  }

  onClickJoinLater(): void {
    this.joinHouseholdLater = true;
    this.selectedInvite = null;
    this.acceptingInvite = false;
    this.householdName = '';
  }
}

