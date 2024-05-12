import { Request, Response } from 'express';

import { GetGroupsUseCase } from './use-cases';

export class GroupsController {
  static async getAll(req: Request, res: Response) {
    const groups = GetGroupsUseCase.getAll();
    return res.status(200).json(groups);
  }
}
