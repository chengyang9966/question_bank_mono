import { Questions, QuestionsAnswers, QuestionsReferences, TaggingQuestions } from '@prisma/client';
import prisma from '../client';
import { Pagination } from '../types/pagination';
import paginationHelper from '../helper/pagination.helper';
import { v4 as uuidv4 } from 'uuid';
import { buildSelect } from '../utils/select';
type QuestionsWithAnswers = Questions & {
  QuestionsAnswers: QuestionsAnswers[];
  TaggingQuestions: TaggingQuestions[];
};
type Answer = {
  id: string;
  answer: string;
  sequence: number;
  isCorrect: boolean;
  isDelete?: boolean;
};
type QuestionsProps = {
  id: string;
  question: string;
  taggingQuestionsId?: string;
  difficulty?: number;
  description?: string;
  isDelete?: boolean;
};
type ConditionalAnswer = Answer &
  ({ isDelete: true; id: string } | { isDelete?: false | undefined; id?: string });

type ConditionalQuestions = QuestionsProps &
  ({ isDelete: true; id: string } | { isDelete?: false | undefined; id?: string }) & {
    answer: ConditionalAnswer[];
  };
// type QuestionsReferences = QuestionsReferences & {
//   QuestionsAnswers: QuestionsAnswers[];
//   TaggingQuestions: TaggingQuestions[];
// };

/**
 * Create a questions
 * @param {Object[]} questions
 * @returns {Promise<Questions[]>}
 */
const createQuestions = async (
  questions: Array<{
    question: string;
    taggingQuestionsId: string;
    answer: Array<{ answer: string; sequence: number; isCorrect: boolean }>;
    difficulty?: number;
    description?: string;
  }>
): Promise<Questions[]> => {
  const questionWithIds = questions.map((q) => ({
    ...q,
    id: uuidv4()
  }));

  return await prisma.$transaction(async (tx) => {
    await tx.questions.createMany({
      data: questionWithIds.map((q) => ({
        id: q.id,
        title: q.question,
        description: q?.description,
        taggingQuestionsId: q.taggingQuestionsId,
        difficulty: q?.difficulty
      }))
    });

    const answersData = questionWithIds.flatMap((q) => {
      return q?.answer.map((ans) => ({
        answer: ans.answer,
        sequence: ans.sequence,
        isCorrect: ans.isCorrect,
        questionsId: q.id
      }));
    });

    await tx.questionsAnswers.createMany({
      data: answersData
    });

    return tx.questions.findMany({
      where: {
        id: {
          in: questionWithIds.map((q) => q.id)
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        QuestionsAnswers: true
      }
    });
  });
};

/**
 * Update a questions
 * @param {ConditionalQuestions[]} questions
 * @returns {Promise<Questions[]>}
 */
const updateQuestionsAnswersByQuestionId = async (
  questions: Array<ConditionalQuestions>
): Promise<Questions[]> => {
  // 1318cc86-af6d-4289-ac08-6ab443bc1357
  return await prisma.$transaction(async (tx) => {
    const questionsDataWithIds = questions.filter((q) => q.id && !q.isDelete);

    await Promise.all(
      questions.map(async (q) => {
        await tx.questions.upsert({
          where: {
            id: q.id
          },
          create: {
            title: q?.question,
            description: q?.description,
            taggingQuestionsId: q.taggingQuestionsId,
            difficulty: q?.difficulty
          },
          update: {
            title: q?.question,
            description: q?.description,
            taggingQuestionsId: q.taggingQuestionsId,
            difficulty: q?.difficulty
          }
        });
        await Promise.all(
          q?.answer.map(async (ans) => {
            if (!ans.id) {
              await tx.questionsAnswers.create({
                data: {
                  answer: ans.answer,
                  sequence: ans.sequence,
                  isCorrect: ans.isCorrect,
                  questionsId: q.id
                }
              });
            } else {
              await tx.questionsAnswers.upsert({
                where: {
                  id: ans.id
                },
                create: {
                  answer: ans.answer,
                  sequence: ans.sequence,
                  isCorrect: ans.isCorrect,
                  questionsId: q.id
                },
                update: {
                  answer: ans.answer,
                  sequence: ans.sequence,
                  isCorrect: ans.isCorrect,
                  questionsId: q.id
                }
              });
            }
          })
        );
      })
    );
    const questionsWithIds: string[] = questionsDataWithIds.map((q) => q.id as string);
    return tx.questions.findMany({
      where: {
        id: {
          in: questionsWithIds
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        QuestionsAnswers: true
      }
    });
  });
};

/**
 * Get question by Id
 * @param {Object} userBody
 * @returns {Promise<Questions>}
 */
const getQuestionsById = async (id: string): Promise<Partial<Questions> | null> => {
  return prisma.questions.findFirst({
    where: {
      id
    },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      QuestionsAnswers: {
        select: {
          id: true,
          answer: true,
          sequence: true
        }
      },
      TaggingQuestions: {
        select: {
          id: true,
          tag: true,
          description: true
        }
      },
      QuestionsReferences: {
        select: {
          id: true,
          reference: true,
          sequence: true
        }
      }
    }
  });
};

/**
 * Get questions by tagging Id
 * @param {Object} userBody
 * @returns {Promise<Partial<Questions>[]>}
 */
const getQuestionsByTaggingId = async (
  taggingQuestionsId: string
): Promise<Partial<Questions>[]> => {
  return prisma.questions.findMany({
    where: {
      taggingQuestionsId
    },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      QuestionsAnswers: {
        select: {
          id: true,
          answer: true,
          sequence: true
        }
      },
      TaggingQuestions: {
        select: {
          id: true,
          tag: true,
          description: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};

/**
 * Get questions by tagging title
 * @param {Object} userBody
 * @returns {Promise<Partial<Questions>[]>}
 */
const getQuestionsByTaggingTitle = async (tag: string): Promise<Partial<Questions>[]> => {
  const tagging = await prisma.taggingQuestions.findMany({
    where: {
      tag: {
        contains: tag
      }
    }
  });

  return prisma.questions.findMany({
    where: {
      taggingQuestionsId: {
        in: tagging.map((t) => t.id)
      }
    },
    select: {
      id: true,
      title: true,
      description: true,
      difficulty: true,
      QuestionsAnswers: {
        select: {
          id: true,
          answer: true,
          sequence: true
        }
      },
      TaggingQuestions: {
        select: {
          id: true,
          tag: true,
          description: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  });
};
/**
 * Get all questions
 * @param {Object} filter - Prisma filter
 * @param {Pagination} options - Query options
 * @returns {Promise<Questions>}
 */

const getAllQuestions = async <Key extends keyof QuestionsWithAnswers>(
  filter: object,
  options: Pagination,
  keys: Key[] = [
    'id',
    'title',
    'description',
    'isMultipleChoice',
    'isPublic',
    'difficulty',
    'QuestionsAnswers.id',
    'QuestionsAnswers.answer',
    'QuestionsAnswers.isCorrect',
    'QuestionsAnswers.sequence',
    'TaggingQuestions.id',
    'TaggingQuestions.tag',
    'TaggingQuestions.description',
    'QuestionsReferences.reference',
    'QuestionsReferences.sequence'
  ] as Key[]
): Promise<{
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  paginationData: Pick<QuestionsWithAnswers, Key>[];
}> => {
  const paginationData = paginationHelper(options);
  const totalCount = await prisma.questions.count({
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

  const questions = await prisma.questions.findMany({
    // where: filter,
    select: buildSelect(keys),
    ...paginationData
  });

  return {
    pagination: result,
    paginationData: questions as Pick<QuestionsWithAnswers, Key>[]
  };
};

/**
 * Create a tagging
 * @param {Object} userBody
 * @returns {Promise<TaggingQuestions>}
 */
const createTagging = async (
  tagging: {
    title: string;
    description?: string;
  }[]
): Promise<Partial<TaggingQuestions>[]> => {
  await prisma.taggingQuestions.createMany({
    data: tagging.map((tag) => ({
      tag: tag.title.trim(),
      description: tag.description?.trim()
    })),
    skipDuplicates: true
  });
  return await prisma.taggingQuestions.findMany({
    orderBy: {
      createdAt: 'desc'
    },
    where: {
      tag: {
        in: tagging.map((tag) => tag.title)
      }
    },
    select: {
      id: true,
      tag: true,
      description: true
    }
  });
};

/**
 * Get all tagging
 * @param {Object} userBody
 * @returns {Promise<TaggingQuestions[]>}
 */
const getAllTagging = async (): Promise<TaggingQuestions[]> => {
  return prisma.taggingQuestions.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

/**
 * Create a reference for questions
 * @param {string} questionsId
 * @param {Array} references
 * @returns {Promise<Partial<Questions>[]>}
 */
const createReference = async (
  // questionId: string,
  questionIds: string[],
  references: Array<{
    reference: string;
    sequence: number;
    format: string;
  }>
): Promise<Partial<Questions>[]> => {
  return await prisma.$transaction(async (tx) => {
    const referencesWithIds = references.map((q) => ({
      ...q,
      id: uuidv4()
    }));
    await tx.questionsReferences.createMany({
      data: referencesWithIds
    });
    await Promise.all(
      questionIds.map(async (id) => {
        await tx.questions.update({
          where: {
            id
          },
          data: {
            QuestionsReferences: {
              connect: referencesWithIds.map((ref) => ({ id: ref.id }))
            }
          }
        });
      })
    );
    // await tx.questions.update({
    //   where: {
    //     id: questionId
    //   },
    //   data: {
    //     QuestionsReferences: {
    //       connect: referencesWithIds.map((ref) => ({ id: ref.id }))
    //     }
    //   }
    // });
    return await tx.questions.findMany({
      where: {
        id: {
          in: questionIds
        },
        QuestionsReferences: {
          some: {
            id: {
              in: referencesWithIds.map((ref) => ref.id)
            }
          }
        }
      },
      select: {
        _count: true,
        title: true,
        description: true,
        QuestionsReferences: {
          select: {
            reference: true,
            sequence: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
  });
};

const getReferencesByQuestionId = async (questionId: string): Promise<QuestionsReferences[]> => {
  return prisma.questionsReferences.findMany({
    where: {
      Questions: {
        some: {
          id: questionId
        }
      }
    },
    orderBy: {
      sequence: 'asc'
    }
  });
};

/**
 * Get all questions
 * @param {Object} filter - Prisma filter
 * @param {Pagination} options - Query options
 * @returns {Promise<Questions>}
 */
const getAllReferences = async <Key extends keyof QuestionsReferences>(
  filter: object,
  options: Pagination,
  keys: Key[] = [
    'format',
    'reference',
    'sequence',
    'Questions.id',
    'Questions.title',
    'Questions.description',
    'Questions.TaggingQuestions.id',
    'Questions.TaggingQuestions.tag',
    'Questions.TaggingQuestions.description'
  ] as Key[]
): Promise<{
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
  };
  paginationData: Pick<QuestionsReferences, Key>[];
}> => {
  const paginationData = paginationHelper(options);
  const totalCount = await prisma.questionsReferences.count({
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

  const questions = await prisma.questionsReferences.findMany({
    // where: filter,
    select: buildSelect(keys) as any,
    ...paginationData
  });

  return {
    pagination: result,
    paginationData: questions as Pick<QuestionsReferences, Key>[]
  };
};

/**
 * Update Questions Reference
 * @param {string} questionId - Question Id
 * @param {references} references - References
 * @returns {Promise<Questions>}
 */
const updateQuestionsReference = async ({
  questionId,
  references
}: {
  questionId: string;
  references: Array<{
    id: string;
    reference: string;
    sequence: number;
    format: string;
  }>;
}): Promise<QuestionsReferences[]> => {
  await prisma.questionsReferences.updateMany({
    data: references.map((ref) => ({
      id: ref.id,
      questionId,
      reference: ref.reference,
      sequence: ref.sequence,
      format: ref.format
    })),
    where: {
      Questions: {
        some: {
          id: questionId
        }
      }
    }
  });
  return await prisma.questionsReferences.findMany({
    where: {
      Questions: {
        some: {
          id: questionId
        }
      }
    },
    orderBy: {
      sequence: 'asc'
    }
  });
};

export default {
  createQuestions,
  getQuestionsById,
  getQuestionsByTaggingId,
  getQuestionsByTaggingTitle,
  getAllQuestions,
  createTagging,
  getAllTagging,
  createReference,
  getReferencesByQuestionId,
  getAllReferences,
  updateQuestionsReference,
  updateQuestionsAnswersByQuestionId
};
