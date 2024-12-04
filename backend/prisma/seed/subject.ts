import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createSubject() {
  console.log('Creating in subject table');
  await prisma.subject.upsert({
    where: {
      id: 'd5341128-27b0-467c-8a7a-8031bd005f16'
    },
    update: {},
    create: {
      name: 'medical',
      description: 'medical subject',
      id: 'd5341128-27b0-467c-8a7a-8031bd005f16'
    }
  });
  console.log('Created in subject table');
}
