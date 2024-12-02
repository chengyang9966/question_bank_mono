import {
  PublicUser,
  PublicUserAnswers,
  PublicUserSession,
  Questions,
  QuestionsAnswers,
  QuestionsReferences,
  Role,
  UserQuestions
} from '@prisma/client';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import paginationHelper from '../helper/pagination.helper';
import { buildSelect } from '../utils/select';

interface PublicUserAnswersExtended extends PublicUserAnswers {
  userAnswer: QuestionsAnswers;
}

interface QuestionsWithAnswers extends Questions {
  answers: PublicUserAnswersExtended[];
  QuestionsReferences: QuestionsReferences[];
}

interface QuestionsExtended extends Questions {
  UserQuestions: QuestionsWithAnswers[];
  QuestionsAnswers: QuestionsAnswers[];
}

interface UserQuestionsExtended extends UserQuestions {
  question: QuestionsExtended;
  answers: PublicUserAnswersExtended[];
}

interface PublicUserSessionExtended extends PublicUserSession {
  SessionInfo: UserQuestionsExtended[];
}

interface PublicUserWithSession extends PublicUser {
  PublicUserSession: PublicUserSessionExtended[];
}
interface PublicUserWithSessionResponse extends PublicUser {
  UserSession: Partial<PublicUserWithSession>[];
}

/**
 * Create a public User
 * @param {Object} userBody
 * @returns {Promise<PublicUser>}
 */
const createPublicUser = async (email: string, name?: string): Promise<PublicUser> => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return prisma.publicUser.create({
    data: {
      email,
      name
    }
  });
};

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async <Key extends keyof PublicUserWithSession>(
  email: string,
  keys: Key[] = ['id', 'email', 'name', 'createdAt', 'updatedAt', 'PublicUserSession'] as Key[]
): Promise<Pick<PublicUserWithSession, Key> | null> => {
  return prisma.publicUser.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<PublicUserWithSession, Key> | null>;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<PublicUser, Key> | null>}
 */
const getPublicUserById = async <Key extends keyof PublicUserWithSession>(
  id: string,
  keys: Key[] = [
    'id',
    'email',
    'name',
    'createdAt',
    'updatedAt',
    'PublicUserSession.id',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.id',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.title',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.description',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.isMultipleChoice',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.isPublic',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.difficulty',
    'PublicUserSession.SessionInfo.question.QuestionsAnswers.id',
    'PublicUserSession.SessionInfo.question.QuestionsAnswers.answer',
    'PublicUserSession.SessionInfo.question.QuestionsAnswers.sequence',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.id',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.reference',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.format',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.sequence',
    'PublicUserSession.SessionInfo.question.UserQuestions.answers.answer',
    'PublicUserSession.SessionInfo.question.UserQuestions.answers.userAnswer.answer',
    'PublicUserSession.SessionInfo.question.UserQuestions.answers.isCorrect'
  ] as Key[]
): Promise<PublicUserWithSessionResponse | null> => {
  const select = buildSelect(keys);

  const response = (await prisma.publicUser.findUnique({
    where: { id },
    select
  })) as PublicUserWithSession | null;
  if (!response) return null;
  const { PublicUserSession, ...rest } = response;
  return {
    ...rest,
    UserSession: PublicUserSession.map(({ SessionInfo, ...rest }) => {
      return {
        ...rest,
        SessionInfo: SessionInfo.map(({ question, answers, ...rest }) => {
          return {
            ...rest,
            questions: question['UserQuestions'].map(({ answers, ...q }) => {
              return {
                ...q,
                questionAnswers: question.QuestionsAnswers.map((a) => {
                  return {
                    id: a.id,
                    answer: a.answer,
                    sequence: a.sequence
                  };
                }),
                userAnswer: answers.map((a) => {
                  return {
                    answer: a.userAnswer.answer,
                    isCorrect: a.isCorrect,
                    id: a.answer
                  };
                })
              };
            })
          };
        })
      };
    })
  };
  // return response;
};

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryPublicUsers = async <Key extends keyof PublicUserWithSession>(
  filter: object,
  options: {
    limit?: number;
    page?: number;
    sortBy?: string;
    sortType?: 'asc' | 'desc';
  },
  keys: Key[] = [
    'id',
    'email',
    'name',
    'createdAt',
    'updatedAt',
    'PublicUserSession.id',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.id',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.title',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.description',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.isMultipleChoice',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.isPublic',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.difficulty',
    'PublicUserSession.SessionInfo.question.QuestionsAnswers.id',
    'PublicUserSession.SessionInfo.question.QuestionsAnswers.answer',
    'PublicUserSession.SessionInfo.question.QuestionsAnswers.sequence',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.id',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.reference',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.format',
    'PublicUserSession.SessionInfo.question.UserQuestions.question.QuestionsReferences.sequence',
    'PublicUserSession.SessionInfo.question.UserQuestions.answers.answer',
    'PublicUserSession.SessionInfo.question.UserQuestions.answers.userAnswer.answer',
    'PublicUserSession.SessionInfo.question.UserQuestions.answers.isCorrect'
  ] as Key[]
): Promise<{
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  paginationData: PublicUserWithSessionResponse[];
}> => {
  const paginationData = paginationHelper(options);
  const totalCount = await prisma.publicUser.count({
    where: filter
  });
  const totalPage = Math.ceil(totalCount / paginationData.take);
  const currentPage = options.page ?? 1;
  const limit = options.limit ?? 10;

  const result = {
    page: currentPage,
    limit: limit,
    totalPages: totalPage,
    totalResults: totalCount
  };
  const select = buildSelect(keys);

  const users = (await prisma.publicUser.findMany({
    select: select,
    ...paginationData
  })) as unknown as PublicUserWithSession[];
  return {
    pagination: result,
    paginationData: users.map((response) => {
      const { PublicUserSession, ...rest } = response;
      return {
        ...rest,
        UserSession: PublicUserSession.map(({ SessionInfo, ...rest }) => {
          return {
            ...rest,
            SessionInfo: SessionInfo.map(({ question, answers, ...rest }) => {
              return {
                ...rest,
                questions: question['UserQuestions'].map(({ answers, ...q }) => {
                  return {
                    ...q,
                    questionAnswers: question.QuestionsAnswers.map((a) => {
                      return {
                        id: a.id,
                        answer: a.answer,
                        sequence: a.sequence
                      };
                    }),
                    userAnswer: answers.map((a) => {
                      return {
                        answer: a.userAnswer.answer,
                        isCorrect: a.isCorrect,
                        id: a.answer
                      };
                    })
                  };
                })
              };
            })
          };
        })
      };
    })
  };
};

export default {
  createPublicUser,
  getPublicUserById,
  queryPublicUsers
};
