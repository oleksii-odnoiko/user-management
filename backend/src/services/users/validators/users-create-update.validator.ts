import { body } from 'express-validator';
import { GetUsersUseCase } from '../user-cases';

const createEmailChain = () => body('email').trim().isEmail();

const baseUserValidator = [
  body('name', 'Invalid name').trim().not().isEmpty(),
  body('birthday', 'Invalid birthday').trim().isISO8601() // check date is ISOString
];

export const createUserValidator = [
  ...baseUserValidator,
  createEmailChain().custom((value) => {
    const user = GetUsersUseCase.getUserByEmail(value);
    if (user) {
      throw new Error('Email already in use');
    }
    return true;
  })
];

export const updateUserValidator = [
  ...baseUserValidator,
  createEmailChain().custom((value, { req }) => {
    let user = GetUsersUseCase.getById(+req.params?.id);
    if (user?.email !== value) {
      user = GetUsersUseCase.getUserByEmail(value);
      if (user) {
        throw new Error('Email already in use');
      }
    }
    return true;
  })
];
