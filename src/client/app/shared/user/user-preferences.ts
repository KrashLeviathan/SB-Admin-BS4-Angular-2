import {DBView} from '../dbview/dbview';
import {ColorScheme} from './color-scheme';

export class UserPreferences {
  activeView: DBView;
  userViews: DBView[];
  colorScheme: ColorScheme;
}
