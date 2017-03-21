import {DBView} from '../dbview/dbview';
import {ColorScheme} from './color-scheme';

export class UserPreferences {
  /**
   * The view that currently displays in the user's dashboard.
   */
  activeView: DBView;
  /**
   * A set of views available to the user to apply to the dashboard.
   * The user may or may not be the owner/owner of the view.
   */
  userViewCollection: DBView[];
  /**
   * The user's dashboard color scheme.
   */
  colorScheme: ColorScheme;
}
