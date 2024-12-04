import { PublicUser, PublicUserSession, Questions } from '@prisma/client';
import prisma from '../client';
import ApiError from '../utils/ApiError';
import httpStatus from 'http-status';
import paginationHelper from '../helper/pagination.helper';

interface PublicUserWithSession extends PublicUser {
  PublicUserSession: PublicUserSession[];
}
interface PublicUserSessionWithUserInfo extends Partial<PublicUserSession> {
  PublicUser: Partial<PublicUser>;
}
interface PublicUserSessionWithQuestions extends PublicUserSession {
  Questions: {
    id: string;
    title: string;
    answers: {
      id: string;
      answer: string;
      sequence: number;
    }[];
  }[];
}
interface PublicUserSessionWithQuestionsWithAnswer extends PublicUserSession {
  Question?: {
    id: string;
    title: string;
    answers: {
      id: string;
      answer: string;
    }[];
  };
  Questions: {
    id: string;
    title: string;
    answers: {
      id: string;
      answer: string;
    }[];
  }[];
  CorrectPercentage: string;
}
/**
 * Create a public User Session by userId
 * @param {userId} userId
 * @returns {Promise<PublicUserSessionWithUserInfo>}
 */
const createPublicUserSessionByUserId = async (
  userId: string
): Promise<PublicUserSessionWithUserInfo> => {
  const user = await getPublicUserById(userId);
  console.log('🚀 ~ createPublicUserSessionByUserId ~ user:', user);
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Not Found');
  }
  return prisma.publicUserSession.create({
    data: {
      userId
    },
    select: {
      id: true,
      userId: true,
      PublicUser: {
        select: {
          email: true,
          name: true
        }
      }
    }
  });
};

/**
 * Create a Questions for public User By SessionId
 * @param {string} sessionId - Session Id
 * @param {string} questionsTagging - Tagging for questions
 * @param {number} numberOfQuestions - Number of questions to generate
 * @param {boolean} mcq - Only MCQ questions
 * @param {number} difficulty - Difficulty level
 * @returns {Promise<PublicUserSessionWithQuestions>}
 */
const generateQuestionsForPublicUserSession = async (
  sessionId: string,
  questionsTagging: string,
  numberOfQuestions = 3,
  mcq = true,
  difficulty = 1
): Promise<PublicUserSessionWithQuestions> => {
  return await prisma.$transaction(async (tx) => {
    const session = await tx.publicUserSession.findUnique({
      where: { id: sessionId },
      select: {
        id: true,
        userId: true
      }
    });
    if (!session) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Session Not Found');
    }
    const answerQuestionsForUserWithTagging = await tx.publicUserSession.findMany({
      where: {
        userId: session.userId
        // NOT: {
        //   id: sessionId
        // }
      },
      select: {
        SessionInfo: {
          select: {
            question: {
              select: {
                id: true,
                taggingQuestionsId: true
              }
            }
          }
        }
      }
    });

    // get unique all questions id
    const questionsIds = [
      ...new Set(
        answerQuestionsForUserWithTagging.flatMap((q) => q.SessionInfo.map((s) => s.question.id))
      )
    ];
    const itemCount = await tx.questions.count({
      where: {
        taggingQuestionsId: questionsTagging,
        id: {
          notIn: questionsIds
        }
      }
    });
    const randomPick = <key>(values: key[]) => {
      const index = Math.floor(Math.random() * values.length);
      return values[index];
    };
    const skip = Math.max(0, Math.floor(Math.random() * itemCount) - numberOfQuestions);
    const orderBy = randomPick<keyof Questions>(['id', 'title', 'createdAt', 'updatedAt']);
    const orderDir = randomPick([`asc`, `desc`]);

    // logic to generate questions
    const questions = await tx.questions.findMany({
      orderBy: { [orderBy]: orderDir },
      take: numberOfQuestions,
      skip: skip,
      where: {
        taggingQuestionsId: questionsTagging,
        difficulty,
        isMultipleChoice: mcq,
        id: {
          notIn: questionsIds
        }
      },
      select: {
        id: true
      }
    });

    if (questions.length === 0) {
      throw new ApiError(httpStatus.NOT_FOUND, 'No Questions Found');
    }
    const { SessionInfo, ...publicUserSessionData } = await tx.publicUserSession.update({
      data: {
        SessionInfo: {
          create: questions.map((q) => ({
            question: {
              connect: { id: q.id }
            }
          }))
        }
      },
      include: {
        SessionInfo: {
          select: {
            question: {
              select: {
                id: true,
                title: true,
                description: true,
                isMultipleChoice: true,
                isPublic: true,
                difficulty: true,
                QuestionsAnswers: {
                  select: {
                    id: true,
                    answer: true,
                    sequence: true
                  }
                },
                QuestionsReferences: {
                  select: {
                    id: true,
                    reference: true,
                    format: true,
                    sequence: true
                  }
                }
              }
            }
          }
        }
      },
      where: {
        id: sessionId
      }
    });

    return {
      ...publicUserSessionData,
      Questions: SessionInfo.map((q) => {
        return {
          id: q.question.id,
          title: q.question.title,
          answers: q.question.QuestionsAnswers,
          references: q.question.QuestionsReferences
        };
      }).filter((q) => questions.map((w) => w.id).includes(q.id))
    };
  });
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<PublicUser, Key> | null>}
 */
const getPublicUserById = async <Key extends keyof PublicUserWithSession>(
  id: string,
  keys: Key[] = ['id', 'email', 'name', 'createdAt', 'updatedAt', 'PublicUserSession'] as Key[]
): Promise<Pick<PublicUserWithSession, Key> | null> => {
  return prisma.publicUser.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {})
  }) as Promise<Pick<PublicUserWithSession, Key> | null>;
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
  keys: Key[] = ['id', 'email', 'name', 'createdAt', 'updatedAt', 'PublicUserSession'] as Key[]
): Promise<{
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  paginationData: Pick<PublicUserWithSession, Key>[];
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
  const users = await prisma.publicUser.findMany({
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    ...paginationData
  });
  return {
    pagination: result,
    paginationData: users as Pick<PublicUserWithSession, Key>[]
  };
};

/**
 *
 * @param sessionId
 * @param questionId
 * @param answersId
 * @returns {Promise<PublicUserSessionWithQuestions>}
 */
const createPublicSessionUserIdWithAnswer = async (
  sessionId: string,
  questionId: string,
  answersId: string[]
): Promise<Partial<PublicUserSessionWithQuestionsWithAnswer>> => {
  const session = await prisma.publicUserSession.findFirst({
    where: {
      id: sessionId,
      SessionInfo: {
        some: {
          questionId
        }
      }
    },
    select: {
      SessionInfo: {
        select: {
          id: true,
          question: {
            select: {
              id: true
            }
          }
        }
      },
      PublicUser: {
        select: {
          id: true
        }
      }
    }
  });

  if (sessionId !== '1234') {
    if (!session) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Session Not Found');
    }
    const foundUserQuestion = session.SessionInfo.find((q) => q.question.id === questionId);
    if (!foundUserQuestion) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Question Not Found');
    }
    const QuestionsAnswers = await prisma.questionsAnswers.findMany({
      where: {
        questionsId: questionId
      }
    });

    const {
      question,
      answers,
      session: updatedSession
    } = await prisma.userQuestions.update({
      where: {
        id: foundUserQuestion.id
      },
      data: {
        answers: {
          createMany: {
            data: answersId.map((answerId) => ({
              answer: answerId,
              isCorrect: QuestionsAnswers.find((a) => a.id === answerId)?.isCorrect
            }))
          }
        }
      },
      include: {
        question: true,
        answers: {
          select: {
            id: true,
            answer: true,
            isCorrect: true
          }
        },
        session: true
      }
    });
    const userAnswer = await prisma.publicUserAnswers.count({
      where: {
        userQuestion: {
          questionId,
          session: {
            userId: {
              notIn: [session?.PublicUser.id ?? '']
            }
          }
        }
      }
    });
    const userAnswerIsCorrect = await prisma.publicUserAnswers.count({
      where: {
        userQuestion: {
          questionId,
          session: {
            userId: {
              notIn: [session?.PublicUser.id ?? '']
            }
          }
        },
        isCorrect: true
      }
    });
    return {
      ...updatedSession,
      Question: {
        id: question.id,
        title: question.title,
        answers: answers.filter((a) => answersId.includes(a.id))
      },
      CorrectPercentage: `${userAnswer > 0 ? (userAnswerIsCorrect / userAnswer) * 100 : 100}%`
    };
  } else {
    const QuestionsAnswers = await prisma.questionsAnswers.findMany({
      where: {
        questionsId: questionId,
        id: {
          in: answersId
        }
      },
      select: {
        id: true,
        answer: true,
        isCorrect: true
      }
    });
    const question = await prisma.questions.findUnique({
      where: {
        id: questionId
      }
    });
    const userAnswer = await prisma.publicUserAnswers.count({
      where: {
        userQuestion: {
          questionId
          // session: {
          //   userId: {
          //     notIn: [session?.PublicUser.id ?? '']
          //   }
          // }
        }
      }
    });
    const userAnswerIsCorrect = await prisma.publicUserAnswers.count({
      where: {
        userQuestion: {
          questionId
          // session: {
          //   userId: {
          //     notIn: [session?.PublicUser.id ?? '']
          //   }
          // }
        },
        isCorrect: true
      }
    });
    console.log('🚀 ~ userAnswerIsCorrect:', { userAnswerIsCorrect, userAnswer });

    if (!question) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Question Not Found');
    }
    return {
      id: '1234',
      userId: '1234',
      createdAt: new Date('2021-09-29T14:00:00.000Z'),
      updatedAt: new Date('2021-09-29T14:00:00.000Z'),
      Question: {
        id: question.id,
        title: question.title,
        answers: QuestionsAnswers
      },
      CorrectPercentage: `${userAnswer > 0 ? (userAnswerIsCorrect / userAnswer) * 100 : 100}%`
    };
  }
};

const getPublicUserSessionById = (sessionId: string) => {
  return prisma.publicUserSession.findFirst({
    where: {
      id: sessionId
    },
    include: {
      SessionInfo: {
        select: {
          id: true,
          question: {
            select: {
              id: true,
              title: true,
              description: true,
              QuestionsReferences: {
                select: {
                  id: true,
                  reference: true,
                  format: true,
                  sequence: true
                }
              }
            }
          },
          answers: {
            select: {
              id: true,
              answer: true
            }
          }
        }
      }
    }
  });
};
export default {
  createPublicUserSessionByUserId,
  generateQuestionsForPublicUserSession,
  createPublicSessionUserIdWithAnswer,
  queryPublicUsers,
  getPublicUserSessionById
};
