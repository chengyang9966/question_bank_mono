import Joi from 'joi';

const createPublicUser = {
  body: Joi.object().keys({
    email: Joi.string().trim().required().email(),
    name: Joi.string().trim().required()
  })
};

const getPublicUser = {
  params: Joi.object().keys({
    userId: Joi.string().trim().required()
  })
};

const getPublicUsers = {
  query: Joi.object().keys({
    name: Joi.string().trim(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

export default {
  createPublicUser,
  getPublicUser,
  getPublicUsers
};
