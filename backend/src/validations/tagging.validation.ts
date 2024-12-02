import Joi from 'joi';

const getTaggingBySubjectId = {
  params: Joi.object().keys({
    subjectId: Joi.string().trim().required()
  })
};

export default {
  getTaggingBySubjectId
};
