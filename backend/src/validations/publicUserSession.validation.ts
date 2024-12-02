import Joi from 'joi';

const updatePublicUserSession = {
  body: Joi.object().keys({
    sessionId: Joi.string().trim().required(),
    questionsTaggingId: Joi.string().trim().required(),
    numberOfQuestions: Joi.number().integer().required(),
    mcq: Joi.boolean().required()
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

const updateAnswerPublicSession = {
  params: Joi.object().keys({
    sessionId: Joi.string().trim().required()
  }),
  body: Joi.object().keys({
    questionId: Joi.string().trim().required(),
    answerIds: Joi.array().items(Joi.string().trim()).required()
  })
};

const getPublicUserBySessionId = {
  params: Joi.object().keys({
    sessionId: Joi.string().trim().required()
  })
};

export default {
  updatePublicUserSession,
  getPublicUser,
  getPublicUsers,
  updateAnswerPublicSession,
  getPublicUserBySessionId
};
