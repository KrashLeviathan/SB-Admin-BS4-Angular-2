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

  /**
   * The preference's id number
   */
  id: number;

  /**
   * The user's id
   */
  userId: number;

  /**
   * The name of the preferences, for the user's sake
   */
  name: string;

  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  neutralLightColor: string;
  neutralDarkColor: string;


}
