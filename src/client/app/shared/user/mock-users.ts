import {User} from './user';
import {UserPreferences} from './user-preferences';
import {DB_VIEWS} from '../dbview/mock-dbviews';

const MOCK_USER_PREFS: UserPreferences = {
  activeView: DB_VIEWS[1],
  userViews: DB_VIEWS,
  colorScheme: {
    primary: '#345cb2',
    secondary: '#3b5156',
    accent: '#00ffab',
    neutralLight: '#969696',
    neutralDark: '#313131'
  }
};

export const USERS: User[] = [
  {
    userId: 1,
    userName: 'nkarasch',
    displayName: 'Papa Nate',
    isAdmin: true,
    preferences: MOCK_USER_PREFS
  },
  {
    userId: 2,
    userName: 'trevorh',
    displayName: 'Trevor',
    isAdmin: false,
    preferences: MOCK_USER_PREFS
  },
  {
    userId: 3,
    userName: 'gcs',
    displayName: 'Charlie',
    isAdmin: false,
    preferences: MOCK_USER_PREFS
  },
  {
    userId: 4,
    userName: 'jacmeyer',
    displayName: 'Jack',
    isAdmin: false,
    preferences: MOCK_USER_PREFS
  }
];
