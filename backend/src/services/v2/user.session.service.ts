import { Session, SessionStatus, Question, Answer } from '@prisma/client';
import prisma from '../../client';
import ApiError from '../../utils/ApiError';
import httpStatus from 'http-status';

type SessionWithQuestionsAndUser = Partial<Session> & {
  SessionQuestion: Partial<{
    question: Partial<Question>;
    answer: Partial<Answer>;
  }>[];
};

/**
 * Create a public user session
 * @param {string} userId
 * @param {Object} sessionsQuestions
 * @returns {Promise<Session>}
 */

const createUserSessionByUserId = async (
  userId: string,
  {
    questionsTaggingId,
    numberOfQuestions = 10,
    mcq = [],
    difficulty = ['1']
  }: {
    questionsTaggingId: string[];
    numberOfQuestions: number;
    mcq: string[];
    difficulty: string[];
  }
): Promise<SessionWithQuestionsAndUser> => {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    const totalQuestions = await tx.question.count({
      where: {
        NOT: {
          UserQuestionRank: {
            some: {
              userId: userId
            }
          }
        },
        TaggingQuestions: {
          some: {
            id: {
              in: questionsTaggingId
            }
          }
        },
        difficulty: { in: difficulty.map(Number) },
        ...(mcq.length == 2 ? {} : { isMultipleChoice: mcq.includes('mcq') ? true : false })
      }
    });
    console.log('🚀 ~ createUserSessionByUserId ~ userQuestions:', {
      totalQuestions: totalQuestions
    });

    const randomPick = <key>(values: key[]) => {
      const index = Math.floor(Math.random() * values.length);
      return values[index];
    };
    const skip = Math.max(0, Math.floor(Math.random() * totalQuestions) - numberOfQuestions);
    const orderBy = randomPick<keyof Question>([
      'id',
      'difficulty',
      'text',
      'createdAt',
      'updatedAt'
    ]);
    const orderDir = randomPick([`asc`, `desc`]);
    // logic to generate questions
    const questions = await tx.question.findMany({
      orderBy: { [orderBy]: orderDir },
      take: numberOfQuestions,
      skip: skip,
      where: {
        NOT: {
          UserQuestionRank: {
            some: {
              userId: userId
            }
          }
        },
        TaggingQuestions: {
          some: {
            id: {
              in: questionsTaggingId
            }
          }
        },
        difficulty: { in: difficulty.map(Number) },
        ...(mcq.length == 2 ? {} : { isMultipleChoice: mcq.includes('mcq') ? true : false })
      },
      select: {
        id: true
      }
    });

    if (questions.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No Questions Found');
    }
    const userSession = await tx.session.create({
      data: {
        userId: user.id,
        status: SessionStatus.ACTIVE,
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        SessionQuestion: {
          createMany: {
            data: questions.map((question) => ({
              questionId: question.id,
              order: 0
            }))
          }
        },
        UserSessionSummary: {
          create: {
            correctAnswer: 0,
            score: 0,
            totalQuestions: 0
          }
        }
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
                text: true,
                description: true,
                difficulty: true,
                isMultipleChoice: true,
                isPublic: true,
                Answer: {
                  select: {
                    text: true,
                    sequence: true
                  }
                },
                TaggingQuestions: {
                  select: {
                    id: true,
                    tag: true
                  }
                },
                Reference: {
                  select: {
                    description: true,
                    sequence: true
                  }
                }
              }
            }
          }
        }
      }
    });
    return userSession;
  });
};

/**
 * Get user session by user id
 */
const getUserSessionByUserId = async (userId: string): Promise<SessionWithQuestionsAndUser[]> => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  const sessionData = await prisma.session.findMany({
    where: {
      userId: user.id
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
              Answer: {
                select: {
                  id: true,
                  text: true,
                  sequence: true,
                  isCorrect: true
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
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  return sessionData.map((session) => {
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
  });
};

async function answerSessionQuestion({
  sessionId,
  questionId,
  answerIds,
  userId
}: {
  sessionId: string;
  questionId: string;
  answerIds: string[];
  userId: string;
}) {
  console.log('params', { sessionId, questionId, answerIds, userId });
  return await prisma.$transaction(async (tx) => {
    // Step 1: Validate the SessionQuestion
    const sessionQuestion = await tx.sessionQuestion.findFirst({
      where: {
        questionId: questionId,
        sessionId: sessionId,
        session: {
          userId: userId, // Ensure the session belongs to this user
          status: 'ACTIVE' // Ensure the session is still active
        }
      },
      include: {
        question: {
          include: {
            Answer: true // Include answers to validate the provided answerId
          }
        }
      }
    });

    if (!sessionQuestion) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Session not found or not accessible.');
    }

    // Step 2: Validate the Answer ID
    const isValidAnswer = sessionQuestion.question.Answer.some((answer) =>
      answerIds.includes(answer.id)
    );
    const questionAnswer = sessionQuestion.question.Answer;
    const userAnswers = questionAnswer
      .map((w) => (answerIds.includes(w.id) ? w : null))
      .filter((x) => x);
    console.log('🚀 ~ $transaction ~ questionAnswer:', questionAnswer);
    console.log('🚀 ~ $transaction ~ userAnswers:', userAnswers);
    const isUserCorrect = questionAnswer
      .filter((answer) => answer.isCorrect)
      .map((w) => userAnswers?.map((x) => x?.id).includes(w.id))
      .every((x) => x);

    console.log('🚀 ~ $transaction ~ isUserCorrect:', isUserCorrect);

    if (!isValidAnswer) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Invalid answer ID.');
    }

    answerIds.forEach(async (answerId) => {
      // Step 3: Check if the UserQuestion already exists
      let userQuestion = await tx.userQuestion.findFirst({
        where: {
          sessionQuestionId: sessionQuestion.id,
          answerId: answerId
        }
      });
      if (userQuestion) {
        // If exists, update it
        userQuestion = await tx.userQuestion.update({
          where: { id: userQuestion.id },
          data: {
            answerId: answerId,
            isCorrect:
              sessionQuestion.question.Answer.find((answer) => answer.id === answerId)?.isCorrect ??
              false
          }
        });
      } else {
        // Otherwise, create a new entry
        userQuestion = await tx.userQuestion.create({
          data: {
            sessionQuestionId: sessionQuestion.id,
            answerId: answerId,
            isCorrect:
              sessionQuestion.question.Answer.find((answer) => answer.id === answerId)?.isCorrect ??
              false
          }
        });
      }

      // Step 5: Optionally Update Answer Selection Summary
      const answerSelectionSummary = await tx.answerSelectionSummary.findFirst({
        where: {
          questionId: sessionQuestion.questionId,
          answerId: answerId
        }
      });
      if (answerSelectionSummary) {
        await tx.answerSelectionSummary.update({
          where: { id: answerSelectionSummary.id },
          data: {
            selectionCount: {
              increment: 1
            }
          }
        });
      } else {
        await tx.answerSelectionSummary.create({
          data: {
            questionId: sessionQuestion.questionId,
            answerId: answerId,
            selectionCount: 1
          }
        });
      }
    });

    // Step 4: Optionally Update Session Summary
    await tx.userSessionSummary.update({
      where: { sessionId: sessionId },
      data: {
        correctAnswer: {
          increment: isUserCorrect ? 1 : 0
        },
        totalQuestions: {
          increment: 1
        }
      }
    });

    // Step 6: Update Question Score Summary
    const questionScoreSummary = await tx.questionScoreSummary.findFirst({
      where: {
        questionId: sessionQuestion.questionId
      }
    });

    if (questionScoreSummary) {
      await tx.questionScoreSummary.update({
        where: { id: questionScoreSummary.id },
        data: {
          correctAttempts: {
            increment: isUserCorrect ? 1 : 0
          },
          totalAttempts: {
            increment: 1
          }
        }
      });
    } else {
      await tx.questionScoreSummary.create({
        data: {
          questionId: sessionQuestion.questionId,
          correctAttempts: isUserCorrect ? 1 : 0,
          totalAttempts: 1
        }
      });
    }
    const questionSummary = await tx.questionScoreSummary.findFirst({
      where: {
        questionId: sessionQuestion.questionId
      }
    });
    const questionStatistic = {
      totalAttempts: questionSummary?.totalAttempts || 1,
      isCorrect: questionSummary?.correctAttempts || 0
    };
    const answerSummary = await tx.answerSelectionSummary.findMany({
      where: {
        questionId: sessionQuestion.questionId
      }
    });
    const answerStatistic = sessionQuestion.question.Answer.reduce((prev, current) => {
      const answerStatistic = answerSummary.find((ans) => ans.answerId === current.id);
      return {
        ...prev,
        [current.id]: (answerStatistic?.selectionCount || 0) / questionStatistic.totalAttempts
      };
    }, {});
    return {
      questionStatistic,
      answerStatistic,
      correctAnswer: questionAnswer
        .filter((w) => w.isCorrect)
        .map((x) => ({
          id: x.id,
          text: x.text
        }))
    };
  });
}

export default {
  createUserSessionByUserId,
  getUserSessionByUserId,
  answerSessionQuestion
};
