import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { CreateUserUseCase, DeleteUserUseCase, GetUsersUseCase, UpdateUserUseCase } from './user-cases';
import { StatusCode } from '../../core/status-code.enum';
import { IUser } from '../../core/model';

export class UsersController {
  static async getAll(req: Request, res: Response) {
    const groupId = parseInt(<string>req.query.groupId);
    if (Number.isNaN(groupId)) {
      return res.status(StatusCode.InvalidData).send({ message: 'Invalid groupID' });
    }
    const users = GetUsersUseCase.getByGroupId(groupId);
    res.status(StatusCode.OK).json(users);
  }

  static async create(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(StatusCode.InvalidData).send(result.array());
    }
    const data: IUser = req.body;
    const newUser = CreateUserUseCase.create(data);
    res.status(StatusCode.Created).json(newUser);
  }

  static async update(req: Request, res: Response) {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(StatusCode.InvalidData).send(result.array());
    }
    const data = req.body;
    UpdateUserUseCase.update(data);
    res.status(StatusCode.NoContent).send();
  }

  static async delete(req: Request, res: Response) {
    const userId = parseInt(req.params.id);
    if (Number.isNaN(userId)) {
      return res.status(StatusCode.InvalidData).send({ message: 'Invalid userID' });
    }
    try {
      DeleteUserUseCase.delete(userId);
      res.status(StatusCode.NoContent).send();
    } catch (e: any) {
      res.status(StatusCode.InvalidData).send({ message: e.message });
    }
  }
}
