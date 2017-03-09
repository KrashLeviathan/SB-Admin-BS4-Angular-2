import {UserPreferences} from "./user-preferences";

export class User {
  userId: number;
  userName: string;
  displayName: string;
  isAdmin: boolean;
  preferences: UserPreferences;
}
