import { Router } from 'express';

import { GroupsController } from './groups.controller';

const router = Router();

router.get('/', GroupsController.getAll);

export default router;
