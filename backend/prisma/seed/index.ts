import { PrismaClient } from '@prisma/client';
import { createSubject } from './subject';
import { createQuestionsTagging } from './tagging';
import { createReferences } from './references';
import { createQuestionsChapter2 } from './questions/Chapter2';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database');
  try {
    await createSubject();
    await createReferences();
    await createQuestionsTagging();
    await createQuestionsChapter2();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Seed completed');
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
