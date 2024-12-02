import Joi from 'joi';

const getQuestionSessionsBySessionId = {
  params: Joi.object().keys({
    sessionId: Joi.string().trim().required()
  })
};

export default {
  getQuestionSessionsBySessionId
};
