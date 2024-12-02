import { Answer, Question, QuestionTag } from '@prisma/client';
import prisma from '../../client';
import { v4 as uuidv4 } from 'uuid';
import { Pagination } from '../../types/pagination';
import paginationHelper from '../../helper/pagination.helper';
import { buildSelect } from '../../utils/select';

const medicalSubjectId = 'd5341128-27b0-467c-8a7a-8031bd005f16';

type QuestionsWithAnswers = Question & {
  Answer: Answer[];
  TaggingQuestions: QuestionTag[];
};
/**
 * Get all questions tagging
 * @param {Object} userBody
 * @returns {Promise<TaggingQuestions[]>}
 */
const getAllQuestionsTagging = async (): Promise<QuestionTag[]> => {
  return prisma.questionTag.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  });
};

/**
 * Create a tagging
 * @param {Object[]} tagging
 * @returns {Promise<QuestionTag[]>}
 */
const createQuestionTagging = async (
  tagging: {
    title: string;
    description?: string;
  }[]
): Promise<Partial<QuestionTag>[]> => {
  await prisma.questionTag.createMany({
    data: tagging.map((tag) => ({
      tag: tag.title.trim(),
      description: tag.description?.trim()
    })),
    skipDuplicates: true
  });
  return await prisma.questionTag.findMany({
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
 * Create a reference for questions
 * @param {string} questionsId
 * @param {Array} references
 * @returns {Promise<Partial<Question>[]>}
 */
const createReference = async (
  // questionId: string,
  questionIds: string[],
  references: Array<{
    reference: string;
    sequence: number;
    format: string;
  }>
): Promise<Partial<Question>[]> => {
  return await prisma.$transaction(async (tx) => {
    const referencesWithIds = references.map((q) => ({
      format: q.format,
      description: q.reference,
      id: uuidv4()
    }));
    await tx.reference.createMany({
      data: referencesWithIds
    });
    await Promise.all(
      questionIds.map(async (id) => {
        await tx.question.update({
          where: {
            id
          },
          data: {
            Reference: {
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
    return await tx.question.findMany({
      where: {
        id: {
          in: questionIds
        },
        Reference: {
          some: {
            id: {
              in: referencesWithIds.map((ref) => ref.id)
            }
          }
        }
      },
      select: {
        _count: true,
        description: true,
        Reference: {
          select: {
            description: true,
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

/**
 * Get all references
 */

const getAllReferences = async (): Promise<Partial<Question>[]> => {
  return prisma.reference.findMany({
    include: {
      Questions: {
        select: {
          description: true,
          _count: true,
          text: true
        }
      }
    }
  });
};

/**
 * Create a questions
 * @param {Object[]} questions
 * @returns {Promise<Questions[]>}
 */
const createQuestions = async (
  questions: Array<{
    question: string;
    taggingQuestionsId: string;
    isMultipleChoice: boolean;
    isPublic: boolean;
    answer: Array<{ answer: string; sequence: number; isCorrect: boolean }>;
    difficulty?: number;
    description?: string;
    referenceId?: string;
  }>,
  SubjectId: string
) => {
  const questionWithIds = questions.map((q) => ({
    ...q,
    id: uuidv4()
  }));

  return await prisma.$transaction(async (tx) => {
    await tx.question.createMany({
      data: questionWithIds.map((q) => ({
        id: q.id,
        text: q.question,
        description: q?.description,
        isMultipleChoice: q?.isMultipleChoice,
        isPublic: q?.isPublic,
        difficulty: q?.difficulty
      }))
    });

    // Add Subject
    await Promise.all(
      questionWithIds.map(async (q) => {
        await tx.subject.update({
          where: {
            id: SubjectId || medicalSubjectId
          },
          data: {
            Question: {
              connect: {
                id: q.id
              }
            }
          }
        });
      })
    );

    // Add Tagging
    await Promise.all(
      questionWithIds.map(async (q) => {
        await tx.questionTag.update({
          where: {
            id: q.taggingQuestionsId
          },
          data: {
            Questions: {
              connect: {
                id: q.id
              }
            }
          }
        });
      })
    );

    // Add References
    await Promise.all(
      questionWithIds
        .filter((x) => x.referenceId)
        .map(async (q) => {
          await tx.reference.update({
            where: {
              id: q.referenceId
            },
            data: {
              Questions: {
                connect: {
                  id: q.id
                }
              }
            }
          });
        })
    );

    const answersData = questionWithIds.flatMap((q) => {
      return q?.answer.map((ans) => ({
        text: ans.answer,
        explaination: '',
        sequence: ans.sequence,
        isCorrect: ans.isCorrect,
        questionId: q.id
      }));
    });

    // Add Answers
    await tx.answer.createMany({
      data: answersData
    });

    // Return all created questions with answers
    return tx.question.findMany({
      where: {
        id: {
          in: questionWithIds.map((q) => q.id)
        }
      },
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        Answer: true
      }
    });
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
    'text',
    'description',
    'isMultipleChoice',
    'isPublic',
    'difficulty',
    'isMultipleChoice',
    'isPublic',
    'Answer.id',
    'Answer.text',
    'Answer.isCorrect',
    'Answer.sequence',
    'TaggingQuestions.id',
    'TaggingQuestions.tag',
    'TaggingQuestions.description',
    'Reference.description',
    'Reference.sequence'
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
  const totalCount = await prisma.question.count({
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

  const questions = await prisma.question.findMany({
    // where: filter,
    select: buildSelect(keys),
    ...paginationData
  });

  return {
    pagination: result,
    paginationData: questions as Pick<QuestionsWithAnswers, Key>[]
  };
};

export default {
  getAllQuestionsTagging,
  createQuestionTagging,
  createReference,
  getAllReferences,
  createQuestions,
  getAllQuestions
};
