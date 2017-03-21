import {User} from './user';
import {UserPreferences} from './user-preferences';
import {DB_VIEWS} from '../dbview/mock-dbviews';

const MOCK_USER_PREFS: UserPreferences = {
  activeView: DB_VIEWS[1],
  userViewCollection: DB_VIEWS,
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
    googleId: 'nkarasch',
    displayName: 'Papa Nate',
    fullName: 'Nathan Karasch',
    givenName: 'Nathan',
    familyName: 'Karasch',
    imageUrl: 'http://krashdev.com/images/nathankarasch-scaled.jpg',
    email: 'mock_nate@gmail.com',
    role: '',
    created: '',
    lastUpdated: '',
    isAdmin: true,
    preferences: MOCK_USER_PREFS
  },
  {
    userId: 2,
    googleId: 'trevorh',
    displayName: 'Trevor',
    fullName: '',
    givenName: '',
    familyName: '',
    imageUrl: '',
    email: 'mock_trevor@gmail.com',
    role: '',
    created: '',
    lastUpdated: '',
    isAdmin: false,
    preferences: MOCK_USER_PREFS
  },
  {
    userId: 3,
    googleId: 'gcs',
    displayName: 'Charlie',
    fullName: '',
    givenName: '',
    familyName: '',
    imageUrl: '',
    email: 'mock_charlie@gmail.com',
    role: '',
    created: '',
    lastUpdated: '',
    isAdmin: false,
    preferences: MOCK_USER_PREFS
  },
  {
    userId: 4,
    googleId: 'jacmeyer',
    displayName: 'Jack',
    fullName: '',
    givenName: '',
    familyName: '',
    imageUrl: '',
    email: 'mock_jack@gmail.com',
    role: '',
    created: '',
    lastUpdated: '',
    isAdmin: false,
    preferences: MOCK_USER_PREFS
  }
];
