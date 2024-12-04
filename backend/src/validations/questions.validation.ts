import Joi from 'joi';

const answer = Joi.object().keys({
  id: Joi.string().trim().optional(),
  answer: Joi.string().trim().required(),
  sequence: Joi.number().optional(),
  isCorrect: Joi.boolean().optional(),
  isDelete: Joi.boolean().optional()
});
const createQuestion = Joi.object().keys({
  question: Joi.string().trim().required(),
  difficulty: Joi.number().optional(),
  description: Joi.string().optional(),
  isMultipleChoice: Joi.boolean().optional(),
  isPublic: Joi.boolean().optional(),
  answer: Joi.array().items(answer).required(),
  taggingQuestionsId: Joi.string().trim().required(),
  referenceId: Joi.string().trim().required()
});
const createQuestions = {
  body: Joi.object().keys({
    questions: Joi.array().items(createQuestion).required(),
    SubjectId: Joi.string().trim().optional()
  })
};

const createTagging = {
  body: Joi.object().keys({
    tagging: Joi.array()
      .items(
        Joi.object({
          title: Joi.string().trim().required(),
          description: Joi.string().trim().optional()
        })
      )
      .required()
  })
};

const updateQuestions = {
  // params: Joi.object().keys({
  //   questionsId: Joi.number().integer()
  // }),
  body: Joi.object().keys({
    questions: Joi.array()
      .items(
        Joi.object().keys({
          id: Joi.string().trim().optional(),
          question: Joi.string().trim().optional(),
          difficulty: Joi.number().optional(),
          description: Joi.string().optional(),
          answer: Joi.array().items(answer).optional(),
          taggingQuestionsId: Joi.string().trim().optional(),
          isDeleted: Joi.boolean().optional()
        })
      )
      .required()
  })
};

const deleteQuestions = {
  params: Joi.object().keys({
    questionsId: Joi.number().integer()
  })
};

const getQuestionsById = {
  params: Joi.object().keys({
    questionId: Joi.string().trim()
  })
};

const references = Joi.object().keys({
  id: Joi.string().optional(),
  reference: Joi.string().trim().required(),
  sequence: Joi.number().required(),
  format: Joi.string().trim().required()
});

const createReferences = {
  body: Joi.object().keys({
    questionIds: Joi.array().items(Joi.string().trim()).required(),
    references: Joi.array().items(references).required()
  })
};

const updateReferences = {
  params: Joi.object().keys({
    questionId: Joi.number().integer()
  }),
  body: Joi.object().keys({
    references: Joi.array().items(references).required()
  })
};

const getReferencesById = {
  params: Joi.object().keys({
    questionId: Joi.string()
  })
};

const uploadReferences = {
  body: Joi.object().keys({
    questionId: Joi.string().trim().required()
  })
};

export default {
  createQuestions,
  createTagging,
  updateQuestions,
  deleteQuestions,
  getQuestionsById,
  getReferencesById,
  createReferences,
  updateReferences,
  uploadReferences
};
