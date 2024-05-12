import { DbStore } from '../../db/db.store';
import { IGroup } from '../../core/model';

export const GroupsStore = new DbStore<IGroup>('groups');
