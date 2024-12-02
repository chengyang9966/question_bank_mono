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
  updateSessionsByUserId = 'updateSessionsByUserId'
}

const allRoles = {
  [Role.USER]: [
    Features.createSession,
    Features.getAllSessions,
    Features.getSessionsById,
    Features.updateSessionsById,
    Features.updateSessionsByUserId,
    Features.getQuestionsTagging
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
    Features.updateSessionsByUserId
  ]
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
