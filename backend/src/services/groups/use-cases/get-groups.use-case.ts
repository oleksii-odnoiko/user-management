import { IGroup } from '../../../core/model';
import { GroupsStore } from '../groups.db';

export class GetGroupsUseCase {
  static getAll(): IGroup[] {
    return GroupsStore.getItems();
  }
}
