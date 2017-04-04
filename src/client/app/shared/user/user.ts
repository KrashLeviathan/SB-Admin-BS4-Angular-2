import {UserPreferences} from './user-preferences';

export class User {
  userId: number;
  googleId: string;
  displayName: string;
  fullName: string;
  givenName: string;
  familyName: string;
  imageURL: string;
  email: string;
  householdId: number;
  role: string;
  created: string;
  lastUpdated: string;
  isAdmin: boolean;
  preferences: UserPreferences;
}
