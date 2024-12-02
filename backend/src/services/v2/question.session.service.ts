import httpStatus from 'http-status';
import prisma from '../../client';
import ApiError from '../../utils/ApiError';

const getQuestionSessionBySessionId = async (sessionId: string) => {
  const session = await prisma.session.findUnique({
    where: {
      id: sessionId
    },
    select: {
      id: true,
      userId: true,
      status: true,
      expiresAt: true,
      createdAt: true,
      UserSessionSummary: {
        select: {
          correctAnswer: true,
          score: true,
          totalQuestions: true
        }
      },
      SessionQuestion: {
        select: {
          question: {
            select: {
              id: true,
              text: true,
              description: true,
              difficulty: true,
              isMultipleChoice: true,
              isPublic: true,
              TaggingQuestions: {
                select: {
                  id: true,
                  tag: true
                }
              },
              Reference: {
                select: {
                  id: true,
                  description: true,
                  sequence: true
                }
              },
              Answer: {
                select: {
                  id: true,
                  text: true,
                  sequence: true
                }
              }
            }
          },
          UserQuestion: {
            select: {
              answer: {
                select: {
                  id: true,
                  text: true
                }
              },
              isCorrect: true
            }
          }
        }
      }
    }
  });
  if (!session) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Session not found');
  }
  return {
    id: session.id,
    userId: session.userId,
    status: session.status,
    expiresAt: session.expiresAt,
    createdAt: session.createdAt,
    UserSessionSummary: session.UserSessionSummary,
    SessionQuestion: session.SessionQuestion.map((sessionQuestion) => {
      return {
        question: sessionQuestion.question,
        userAnswer: sessionQuestion.UserQuestion.map((userQuestion) => {
          return {
            id: userQuestion.answer.id,
            text: userQuestion.answer.text,
            isCorrect: userQuestion.isCorrect
          };
        })
      };
    })
  };
};

export default {
  getQuestionSessionBySessionId
};
