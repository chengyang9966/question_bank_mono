import { Prisma } from '@prisma/client';
import prisma from '../../src/client';

export const insertTagging = async (tagging: Prisma.QuestionTagCreateManyInput[]) => {
  await prisma.questionTag.createMany({
    data: tagging
  });
};
