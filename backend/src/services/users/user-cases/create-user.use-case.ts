import { UserStore } from '../users.db';
import { IUser } from '../../../core/model';

export class CreateUserUseCase {
  static create(user: IUser) {
    return UserStore.addItem(user);
  }
}
