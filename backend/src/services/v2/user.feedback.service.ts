/**
 * Get feebback by question Id
 * @param {string} questionId
 * @returns {Promise<UserFeedback[]>}
 */

import { Question, UserFeedback } from '@prisma/client';
import prisma from '../../client';
import paginationHelper from '../../helper/pagination.helper';
import { Pagination } from '../../types/pagination';
import { buildSelect } from '../../utils/select';

type UserFeedBackWithQuestion = UserFeedback & {
  Question: Question[];
};

const getFeedbacks = async <Key extends keyof UserFeedBackWithQuestion>(
  filter: object,
  options: Pagination,
  keys: Key[] = [
    'id',
    'questionId',
    'userId',
    'feedback',
    'rating',
    'createdAt',
    'updatedAt',
    'Question.id',
    'Question.description'
  ] as Key[]
): Promise<{
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  paginationData: Pick<UserFeedBackWithQuestion, Key>[];
}> => {
  const paginationData = paginationHelper(options);
  const totalCount = await prisma.userFeedback.count({
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
  const feedback = await prisma.userFeedback.findMany({
    select: buildSelect(keys),
    ...paginationData
  });

  return {
    pagination: result,
    paginationData: feedback as unknown as Pick<UserFeedBackWithQuestion, Key>[]
  };
};

/**
 * Get feedback by user Id
 * @param {string} userId
 * @returns {Promise<UserFeedback[]>}
 */
const getFeedbackByUserId = async (userId: string): Promise<UserFeedback[]> => {
  const feedback = await prisma.userFeedback.findMany({
    where: {
      userId: userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return feedback;
};

/**
 * @typedef {Object} QuestionFeedback
 * @property {string} questionId question id
 * @property {string} userId user id
 * @property {string} feedback feedback
 * @property {number} rating rating
 */

/**
 * Create feedback by question Id and user Id
 * @param {QuestionFeedback} QuestionFeedback Information about the question feedback
 * @returns {Promise<UserFeedback>}
 */

const createFeedbackByQuestionId = async ({
  questionId,
  userId,
  feedback,
  rating,
  keys = ['id', 'questionId', 'userId', 'feedback', 'rating']
}: {
  questionId: string;
  userId: string;
  feedback: string;
  rating: number;
  keys?: Array<keyof UserFeedback>;
}): Promise<Partial<UserFeedback>> => {
  const newFeedback = await prisma.userFeedback.create({
    data: {
      questionId: questionId,
      userId: userId,
      feedback: feedback,
      rating: rating
    },
    select: buildSelect<UserFeedback>(keys)
  });

  return newFeedback;
};

export default {
  getFeedbacks,
  createFeedbackByQuestionId,
  getFeedbackByUserId
};
