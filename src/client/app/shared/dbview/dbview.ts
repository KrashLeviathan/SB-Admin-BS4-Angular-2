import {ServiceLayout} from './service-layout';

/**
 * A dashboard view object.
 */
export class DBView {
  viewId: number;
  name: string;
  description: string;
  ownerId: number;
  ownerName: string;
  serviceLayout: ServiceLayout;
  windowWidth: number;
}
