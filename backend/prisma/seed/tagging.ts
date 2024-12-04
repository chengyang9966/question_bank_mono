import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createQuestionsTagging() {
  console.log('Creating in Tagging table');
  // Chapter 2: Cardiovascular System
  await prisma.questionTag.upsert({
    where: {
      id: '3ded9aad-c3c9-4efd-acbd-1e1e9a69c8ad'
    },
    update: {},
    create: {
      tag: 'Left Ventricle',
      description: '2.1 Left Ventricle (LV)',
      id: '3ded9aad-c3c9-4efd-acbd-1e1e9a69c8ad',
      sequence: 1
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '7b4d2892-1944-47b5-a7ef-6700e7f5109f'
    },
    update: {},
    create: {
      tag: 'Left Atrium',
      description: '2.2 Left Atrium (LA)',
      id: '7b4d2892-1944-47b5-a7ef-6700e7f5109f',
      sequence: 2
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: 'f73f14a4-abfd-48e4-b905-4b1942a6b1c8'
    },
    update: {},
    create: {
      tag: 'Right Ventricle',
      description: '2.3 Right Ventricle (RV)',
      id: 'f73f14a4-abfd-48e4-b905-4b1942a6b1c8',
      sequence: 3
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '6d1e2b86-2885-4770-90b6-068cca6ae819'
    },
    update: {},
    create: {
      tag: 'Right Atrium',
      description: '2.4 Right Atrium (RA)',
      id: '6d1e2b86-2885-4770-90b6-068cca6ae819',
      sequence: 4
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '0d285828-2706-4ea6-b528-be71bc076a44'
    },
    update: {},
    create: {
      tag: 'Aortic Valve',
      description: '2.5 Aortic Valve',
      id: '0d285828-2706-4ea6-b528-be71bc076a44',
      sequence: 5
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '31ea2dd4-1053-4011-8980-757673f4affb'
    },
    update: {},
    create: {
      tag: 'Mitral Valve',
      description: '2.6 Mitral Valve',
      id: '31ea2dd4-1053-4011-8980-757673f4affb',
      sequence: 6
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '22d17ba6-90f3-456a-bfef-c14add322513'
    },
    update: {},
    create: {
      tag: 'Pulmonary Valve',
      description: '2.7 Pulmonary Valve',
      id: '22d17ba6-90f3-456a-bfef-c14add322513',
      sequence: 7
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '95197214-b23a-4090-9e77-a4564d9d19d4'
    },
    update: {},
    create: {
      tag: 'Tricuspid Valve',
      description: '2.8 Tricuspid Valve',
      id: '95197214-b23a-4090-9e77-a4564d9d19d4',
      sequence: 8
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '9558865c-9ee4-4ded-9014-f89d53c3a524'
    },
    update: {},
    create: {
      tag: 'Pericardium',
      description: '2.9 Pericardium',
      id: '9558865c-9ee4-4ded-9014-f89d53c3a524',
      sequence: 9
    }
  });
  await prisma.questionTag.upsert({
    where: {
      id: '92a258e7-c9ec-4942-9ef8-a60b459e2c3c'
    },
    update: {},
    create: {
      tag: 'Coronary Arteries',
      description: '2.10 Coronary Arteries',
      id: '92a258e7-c9ec-4942-9ef8-a60b459e2c3c',
      sequence: 10
    }
  });

  console.log('Created in Tagging table');
}
