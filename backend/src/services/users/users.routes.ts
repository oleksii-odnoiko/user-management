import { Router } from 'express';

import { UsersController } from './users.controller';
import { createUserValidator, updateUserValidator } from './validators/users-create-update.validator';

const router = Router();

router.get('/', UsersController.getAll);
router.post('/', createUserValidator, UsersController.create);
router.put('/:id', updateUserValidator, UsersController.update);
router.delete('/:id', UsersController.delete);

export default router;
