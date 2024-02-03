import { UserReadResponse } from '$/types/api-client/UserReadResponse';

import { Entity } from './endpoints';
import list from './list';
export class User {
  private static entityName: Entity = 'user';
  static find(params: unknown) {
    return list<UserReadResponse[]>(User.entityName, params);
  }
}
