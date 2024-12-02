import { Role } from '@prisma/client';
import Joi from 'joi';
import { password } from './custom.validation';

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().trim().required().email(),
    password: Joi.string().trim().required().custom(password),
    name: Joi.string().trim().required(),
    role: Joi.string().trim().required().valid(Role.USER, Role.ADMIN)
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string().trim(),
    role: Joi.string().trim(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  }),
  body: Joi.object()
    .keys({
      email: Joi.string().trim().email(),
      password: Joi.string().trim().custom(password),
      name: Joi.string().trim()
    })
    .min(1)
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.number().integer()
  })
};

export default {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser
};
