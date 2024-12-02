import Joi from 'joi';

const updatePublicUserSession = {
  body: Joi.object().keys({
    sessionId: Joi.string().trim().required(),
    questionsTaggingId: Joi.string().trim().required(),
    numberOfQuestions: Joi.number().integer().required()
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
  updatePublicUserSession,
  getPublicUser,
  getPublicUsers
};
