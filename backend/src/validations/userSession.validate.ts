import Joi from 'joi';

const updateUserSession = {
  body: Joi.object().keys({
    sessionId: Joi.string().trim().required(),
    questionsTaggingId: Joi.string().trim().required(),
    numberOfQuestions: Joi.number().integer().required(),
    mcq: Joi.boolean().required()
  })
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().trim().required()
  })
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string().trim(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

const updateAnswerUserSession = {
  params: Joi.object().keys({
    sessionId: Joi.string().trim().required()
  }),
  body: Joi.object().keys({
    questionId: Joi.string().trim().required(),
    answerIds: Joi.array().items(Joi.string().trim()).required()
  })
};

const getUserBySessionId = {
  params: Joi.object().keys({
    sessionId: Joi.string().trim().required()
  })
};

const getUserSessionsByUserId = {
  params: Joi.object().keys({
    userId: Joi.string().trim().required()
  })
};
const createUserSession = {
  params: Joi.object().keys({
    userId: Joi.string().trim().required()
  })
};

const updateSessionByUser = {
  params: Joi.object().keys({
    userId: Joi.string().trim().required()
  }),
  body: Joi.object().keys({
    questionId: Joi.string().trim().required(),
    sessionId: Joi.string().trim().required(),
    answerIds: Joi.array().items(Joi.string().trim()).required()
  })
};

const createUserSessionQuestions = {
  body: Joi.object().keys({
    questionsTaggingId: Joi.array().items(Joi.string().trim()).optional(),
    numberOfQuestions: Joi.number().integer().optional(),
    mcq: Joi.array().items(Joi.string().trim()).optional(),
    difficulty: Joi.array().items(Joi.string().trim()).optional()
  })
};

export default {
  updateUserSession,
  getUser,
  getUsers,
  updateAnswerUserSession,
  getUserBySessionId,
  createUserSessionQuestions,
  createUserSession,
  getUserSessionsByUserId,
  updateSessionByUser
};
