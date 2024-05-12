import { DbStore } from '../../db/db.store';
import { IUser } from '../../core/model';

export const UserStore = new DbStore<IUser>('users');
