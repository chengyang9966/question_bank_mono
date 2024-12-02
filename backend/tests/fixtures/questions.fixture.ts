import { Prisma } from '@prisma/client';
import prisma from '../../src/client';

export const insertQuestions = async (tagging: Prisma.QuestionsCreateManyInput[]) => {
  await prisma.questions.createMany({
    data: tagging
  });
};
