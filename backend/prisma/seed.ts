import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  const subject = await prisma.subject.upsert({
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
  console.log('Creating in subject table:', subject.name);
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
