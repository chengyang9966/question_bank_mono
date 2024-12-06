import Joi from 'joi';

const createFeedback = {
  body: Joi.object().keys({
    feedback: Joi.string().trim().required(),
    rating: Joi.number().integer().required(),
    userId: Joi.string().trim().required(),
    questionId: Joi.string().trim().required()
  })
};

const getFeedbackByUserId = {
  params: Joi.object().keys({
    params: Joi.string().trim().required()
  })
};

const getFeedbacks = {
  query: Joi.object().keys({
    questionId: Joi.string().allow('').optional().trim(),
    userId: Joi.string().allow('').optional().trim(),
    sortBy: Joi.string().trim(),
    limit: Joi.number().integer(),
    page: Joi.number().integer()
  })
};

export default {
  createFeedback,
  getFeedbacks,
  getFeedbackByUserId
};
