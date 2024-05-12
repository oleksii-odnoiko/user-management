import { UserStore } from '../users.db';
import { IUser } from '../../../core/model';

export class UpdateUserUseCase {
  static update(user: IUser) {
    UserStore.updateItem(user.id, user);
  }
}
