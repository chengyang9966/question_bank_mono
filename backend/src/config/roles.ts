import { Role } from '@prisma/client';

export enum Features {
  getUsers = 'getUsers',
  manageUsers = 'manageUsers',
  getQuestionsTagging = 'getQuestionsTagging',
  createQuestionsTagging = 'createQuestionsTagging',
  editQuestionsTagging = 'editQuestionsTagging',
  getQuestionsById = 'getQuestionsById',
  createQuestions = 'createQuestions',
  updateQuestionsAnswersByQuestionId = 'updateQuestionsAnswersByQuestionId',
  getAllQuestions = 'getAllQuestions',
  createReference = 'createReference',
  getReference = 'getReference',
  updateReference = 'updateReference',
  deleteReference = 'deleteReference',
  createSession = 'createSession',
  getAllSessions = 'getAllSessions',
  getSessionsById = 'getSessionsById',
  updateSessionsById = 'updateSessionsById',
  updateSessionsByUserId = 'updateSessionsByUserId',
  getFeedbackByUserId = 'getFeedbackByUserId',
  createFeedbackByQuestionId = 'createFeedbackByQuestionId',
  getFeedbacks = 'getFeedbacks',
  uploadQuestionsWithTaggingAndAnswer = 'uploadQuestionsWithTaggingAndAnswer'
}

const allRoles = {
  [Role.USER]: [
    Features.createSession,
    Features.getAllSessions,
    Features.getSessionsById,
    Features.updateSessionsById,
    Features.updateSessionsByUserId,
    Features.getQuestionsTagging,
    Features.getFeedbackByUserId,
    Features.createFeedbackByQuestionId,
    Features.manageUsers,
    Features.getUsers
  ],
  [Role.ADMIN]: [
    Features.getUsers,
    Features.manageUsers,
    Features.getQuestionsTagging,
    Features.createQuestionsTagging,
    Features.editQuestionsTagging,
    Features.getQuestionsById,
    Features.createQuestions,
    Features.updateQuestionsAnswersByQuestionId,
    Features.getAllQuestions,
    Features.createReference,
    Features.getReference,
    Features.updateReference,
    Features.deleteReference,
    Features.createSession,
    Features.getAllSessions,
    Features.getSessionsById,
    Features.updateSessionsById,
    Features.updateSessionsByUserId,
    Features.getFeedbackByUserId,
    Features.createFeedbackByQuestionId,
    Features.getFeedbacks,
    Features.uploadQuestionsWithTaggingAndAnswer
  ]
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
