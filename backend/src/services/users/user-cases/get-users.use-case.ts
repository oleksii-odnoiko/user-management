import { UserStore } from '../users.db';
import { IUser } from '../../../core/model';

export class GetUsersUseCase {
  static getAll() {
    return UserStore.getItems();
  }

  static getUserByEmail(email: string) {
    const allUsers = this.getAll();
    return allUsers.find((user: IUser) => user.email === email);
  }

  static getByGroupId(groupId: number): IUser[] {
    const allUsers = this.getAll();
    return allUsers.filter((user: IUser) => user.groupId === groupId);
  }

  static getById(id: number) {
    const allUsers = this.getAll();
    return allUsers.find((user: IUser) => user.id === id);
  }
}
