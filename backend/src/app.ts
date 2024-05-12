import express, { Express } from 'express';
import path from 'path';
import cors from 'cors';

import { RouteEnum } from './core/route.enum';
import { logger } from './utils';

import usersRoutes from './services/users/users.routes';
import groupsRoutes from './services/groups/groups.routes';

const app: Express = express();
app.use((req, res, next) => {
  logger.info(`Received a ${req.method} request for ${req.url}`);
  next();
});
app.use(express.json());
app.use(cors());

app.use(RouteEnum.Users, usersRoutes);
app.use(RouteEnum.Groups, groupsRoutes);

app.use(express.static('public'));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

export default app;
