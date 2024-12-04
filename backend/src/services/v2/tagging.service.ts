import { QuestionTag } from '@prisma/client';
import prisma from '../../client';

/**
 * Get all questions tagging by subject id
 * @param {string} subjectId
 * @returns {Promise<TaggingQuestions[]>}
 */
const getAllQuestionsTaggingBySubjectId = async (
  subjectId: string,
  userId: string
): Promise<QuestionTag[]> => {
  const userAnswer = await prisma.sessionQuestion.findMany({
    where: {
      session: {
        userId: userId
      },
      question: {
        Subject: {
          some: {
            id: subjectId
          }
        }
      }
    },
    select: {
      questionId: true
    },
    distinct: ['questionId']
  });

  const questionTag = await prisma.questionTag.findMany({
    orderBy: {
      sequence: 'asc'
    },
    where: {
      Questions: {
        some: {
          Subject: {
            some: {
              id: {
                equals: subjectId
              }
            }
          }
        }
      }
    },
    include: {
      Questions: {
        select: {
          id: true
        }
      }
    }
  });

  return questionTag.map(({ Questions, ...tag }) => ({
    ...tag,
    TotalQuestions: Questions.length,
    userAnswerQuestions: Questions.filter((question) =>
      userAnswer.some((answer) => answer.questionId === question.id)
    ).length
  }));
};

export default {
  getAllQuestionsTaggingBySubjectId
};
