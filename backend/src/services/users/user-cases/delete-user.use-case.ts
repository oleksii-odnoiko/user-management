import { UserStore } from '../users.db';

export class DeleteUserUseCase {
  static delete(id: number) {
    const item = UserStore.getItem(id);
    if (!item) throw Error('Item is not exist');
    UserStore.deleteItem(id);
  }
}
