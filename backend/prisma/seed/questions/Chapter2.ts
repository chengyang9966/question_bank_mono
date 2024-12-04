import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const Subject = {
  connect: {
    id: 'd5341128-27b0-467c-8a7a-8031bd005f16'
  }
};
export async function createQuestionsChapter2() {
  console.log('Creating in question table');
  console.log('Creating Chapter 2.1 in question table');
  const chapterOneReferenceTagging = {
    TaggingQuestions: {
      connect: {
        id: '3ded9aad-c3c9-4efd-acbd-1e1e9a69c8ad'
      }
    },
    Reference: {
      connect: {
        id: 'c6b97cbf-de09-4cd5-8dc3-9362b507b056'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: 'd5341128-27b0-467c-8a7a-8031bd005f16'
    },
    update: {},
    create: {
      id: 'd5341128-27b0-467c-8a7a-8031bd005f16',
      text: 'The left ventricle sends oxygenated blood to the aorta.',
      description: 'Related to Left Ventricle',
      isMultipleChoice: false,
      isPublic: false,
      Subject,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The left ventricle sends oxygenated blood to the aorta.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterOneReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '2b17c5f4-251e-43a6-80c2-669a54605964'
    },
    update: {},
    create: {
      id: '2b17c5f4-251e-43a6-80c2-669a54605964',
      text: 'The left ventricle has a thicker wall than the right ventricle',
      description: 'Related to Left Ventricle',
      isMultipleChoice: false,
      isPublic: false,
      Subject,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The left ventricle has a thicker wall than the right ventricle'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterOneReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '807a160f-4266-4cf8-a6ec-078b60023aed'
    },
    update: {},
    create: {
      difficulty: 2,
      id: '807a160f-4266-4cf8-a6ec-078b60023aed',
      text: 'Which part of the heart will experience a proportional increase in cardiac chamber size and wall thickness due to exercise-induced cardiac remodelling?',
      description: 'Related to Left Ventricle',
      isMultipleChoice: true,
      isPublic: false,
      Subject,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Right ventricle',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Right atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left ventricle',
              isCorrect: true,
              explaination:
                'The left ventricle will experience a proportional increase in cardiac chamber size and wall thickness due to exercise-induced cardiac remodelling.'
            },
            {
              text: ' Left atrium',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterOneReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '2a9ad7c9-54df-4f3e-859d-132373693f8c'
    },
    update: {},
    create: {
      id: '2a9ad7c9-54df-4f3e-859d-132373693f8c',
      difficulty: 2,
      text: 'How many segments is the left ventricle myocardium conventionally subdivided into?',
      description: 'Related to Left Ventricle',
      isMultipleChoice: true,
      isPublic: false,
      Subject,
      Answer: {
        createMany: {
          data: [
            {
              text: '13',
              isCorrect: false,
              explaination: ''
            },
            {
              text: '15',
              isCorrect: false,
              explaination: ''
            },
            {
              text: '17',
              isCorrect: true,
              explaination:
                'The left ventricle myocardium is conventionally subdivided into 17 segments.'
            },
            {
              text: '19',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterOneReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'e314f974-ac47-4080-be0b-b349b4c7b25d'
    },
    update: {},
    create: {
      id: 'e314f974-ac47-4080-be0b-b349b4c7b25d',
      text: 'How many segments is the left ventricle myocardium conventionally subdivided into?',
      description: 'Related to Left Ventricle',
      isMultipleChoice: true,
      isPublic: false,
      Subject,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Aorta',
              isCorrect: true,
              explaination: 'The left ventricle sends oxygenated blood to the aorta.'
            },
            {
              text: 'Pulmonary artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Superior vena cava',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Inferior vena cava',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterOneReferenceTagging
    }
  });
  console.log('Created Chapter 2.1 in question table');

  console.log('Creating Chapter 2.2 in question table');
  const chapterTwoReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '7b4d2892-1944-47b5-a7ef-6700e7f5109f'
      }
    },
    Reference: {
      connect: {
        id: '8482816d-9ca5-4495-b126-1443a73262fe'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: 'da2a5cae-d32c-4cd1-bd9c-bbae0941d18e'
    },
    update: {},
    create: {
      id: 'da2a5cae-d32c-4cd1-bd9c-bbae0941d18e',
      text: 'Venous blood returns to the left atrium via the pulmonary veins.',
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'Venous blood returns to the left atrium via the pulmonary veins.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '45adf372-bfb6-4fb3-9108-3dbc86e9b4c2'
    },
    update: {},
    create: {
      id: '45adf372-bfb6-4fb3-9108-3dbc86e9b4c2',
      text: 'The left atrium receives deoxygenated blood from the body.',
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The left atrium receives deoxygenated blood from the body.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'bc46fcc3-452e-46e9-907c-3e83d09fdc60'
    },
    update: {},
    create: {
      id: 'bc46fcc3-452e-46e9-907c-3e83d09fdc60',
      text: 'The left atrium receives oxygenated blood from the pulmonary veins.',
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The left atrium receives oxygenated blood from the pulmonary veins.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '84348ba8-a1f7-49ea-b17f-61d1a4a10ac8'
    },
    update: {},
    create: {
      id: '84348ba8-a1f7-49ea-b17f-61d1a4a10ac8',
      text: 'There are four pulmonary veins in total.',
      difficulty: 2,
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'There are four pulmonary veins in total.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '6507c19b-4cd7-457f-97f9-de16a06b902b'
    },
    update: {},
    create: {
      id: '6507c19b-4cd7-457f-97f9-de16a06b902b',
      text: 'The left atrium is the most posterior chamber of the heart.',
      difficulty: 2,
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The left atrium is the most posterior chamber of the heart.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '6d49f30a-2805-4727-b795-ba9c8de40893'
    },
    update: {},
    create: {
      id: '6d49f30a-2805-4727-b795-ba9c8de40893',
      text: 'The left atrium is the most anterior chamber of the heart.',
      difficulty: 2,
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The left atrium is the most anterior chamber of the heart.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'ab860539-1beb-4dae-9a03-e46a88983dab'
    },
    update: {},
    create: {
      id: 'ab860539-1beb-4dae-9a03-e46a88983dab',
      text: 'The left atrium is adjacent to the oesophagus.',
      difficulty: 2,
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The left atrium is adjacent to the oesophagus.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '1e9f9667-3fcd-47c5-b42e-d499cbf78678'
    },
    update: {},
    create: {
      id: '1e9f9667-3fcd-47c5-b42e-d499cbf78678',
      text: 'The left atrium contracts during atrial systole to aid in filling the left ventricle. ',
      description: 'Related to Left Atrium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'The left atrium contracts during atrial systole to aid in filling the left ventricle.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '151de267-1037-4d41-b2f2-162238f36cc1'
    },
    update: {},
    create: {
      id: '151de267-1037-4d41-b2f2-162238f36cc1',
      text: 'Which chamber of the heart receives oxygenated blood from the lungs?',
      description: 'Related to Left Ventricle',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Right atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Right ventricle',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left atrium',
              isCorrect: true,
              explaination: 'The left atrium receives oxygenated blood from the lungs.'
            },
            {
              text: 'Left ventricle',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '8beb8420-187f-475e-bf48-509438ba76a2'
    },
    update: {},
    create: {
      id: '8beb8420-187f-475e-bf48-509438ba76a2',
      text: 'What is the anatomical position of the left atrium?',
      description: 'Related to Left Ventricle',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'In front of the sternum',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'In front of the oesophagus',
              isCorrect: true,
              explaination: 'The left atrium is in front of the oesophagus.'
            },
            {
              text: 'Behind the oesophagus',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Behind the diaphragm',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '632e5e8b-8562-42f1-a003-88bb7a17e24b'
    },
    update: {},
    create: {
      id: '632e5e8b-8562-42f1-a003-88bb7a17e24b',
      text: `What is the significance of the 'left atrial kick'?`,
      description: 'Related to Left Ventricle',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'It opens the pulmonary valve',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'It aids in diastolic filling of the left ventricle',
              isCorrect: true,
              explaination: 'The left atrial kick aids in diastolic filling of the left ventricle.'
            },
            {
              text: 'It prevents regurgitation',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'It closes the mitral valve',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '03d9e4f0-ba48-480b-9871-10ca8d388ccb'
    },
    update: {},
    create: {
      id: '03d9e4f0-ba48-480b-9871-10ca8d388ccb',
      text: `What is the role of atrial systole in the cardiac cycle?`,
      description: 'Related to Left Ventricle',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'To initiate ventricular contraction',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To close the mitral valve',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To augment ventricular filling',
              isCorrect: true,
              explaination: 'Atrial systole augments ventricular filling.'
            },
            {
              text: 'To open the aortic valve',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '46cb27ac-841b-4791-852a-79d6e3db4f1a'
    },
    update: {},
    create: {
      id: '46cb27ac-841b-4791-852a-79d6e3db4f1a',
      text: `Which veins carry oxygenated blood to the left atrium?`,
      description: 'Related to Left Ventricle',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Inferior vena cava',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Superior vena cava',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Pulmonary veins',
              isCorrect: true,
              explaination: 'Pulmonary veins carry oxygenated blood to the left atrium.'
            },
            {
              text: 'Coronary veins',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTwoReferenceTagging
    }
  });
  console.log('Created Chapter 2.2 in question table');

  console.log('Creating Chapter 2.3 in question table');

  const chapterThreeReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: 'f73f14a4-abfd-48e4-b905-4b1942a6b1c8'
      }
    },
    Reference: {
      connect: {
        id: '04b9eeb9-5b77-431f-a3ab-23425bb2bd3c'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: 'b9300833-5896-495f-ae1e-8112eddc70c7'
    },
    update: {},
    create: {
      id: 'b9300833-5896-495f-ae1e-8112eddc70c7',
      text: 'The right ventricle contains a moderator band.',
      description: 'Related to Right Ventricle',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The right ventricle contains a moderator band.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterThreeReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'a865f32c-6bad-4de9-ba3d-7542c1d15a5b'
    },
    update: {},
    create: {
      id: 'a865f32c-6bad-4de9-ba3d-7542c1d15a5b',
      text: 'The left ventricle contains a moderator band.',
      description: 'Related to Right Ventricle',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The left ventricle does not contain a moderator band.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterThreeReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '578c8377-8545-4641-bc7e-7cb90434a6c2'
    },
    update: {},
    create: {
      id: '578c8377-8545-4641-bc7e-7cb90434a6c2',
      text: 'The moderator band can an arrhythmogenic source.',
      description: 'Related to Right Ventricle',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The moderator band can an arrhythmogenic source.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterThreeReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '241960b6-6412-493d-bef3-77ef65b15567'
    },
    update: {},
    create: {
      id: '241960b6-6412-493d-bef3-77ef65b15567',
      text: `Which chamber of the heart pumps deoxygenated blood to the lungs?`,
      description: 'Related to Left Ventricle',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Left atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Right atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left ventricle',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Right ventricle',
              isCorrect: true,
              explaination: 'The right ventricle pumps deoxygenated blood to the lungs.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterThreeReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'a3d4191d-1094-4fe2-9f6c-44ca60196d15'
    },
    update: {},
    create: {
      id: 'a3d4191d-1094-4fe2-9f6c-44ca60196d15',
      text: `Which cardiac chamber is the closest to the sternum?`,
      description: 'Related to Left Ventricle',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Left atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Right atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left ventricle',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Right ventricle',
              isCorrect: true,
              explaination: 'The right ventricle is the closest to the sternum.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterThreeReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'ab98392b-399f-44cd-a555-34627b9bbe86'
    },
    update: {},
    create: {
      id: 'ab98392b-399f-44cd-a555-34627b9bbe86',
      text: `What is the shape of the right ventricle (RV)?`,
      description: 'Related to Left Ventricle',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Crescent',
              isCorrect: true,
              explaination: 'The right ventricle is crescent-shaped.'
            },
            {
              text: 'Cylindrical',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Cuboid',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Ellipsoidal',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterThreeReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'a38b7339-8c11-4f8a-b47c-469a1b390a39'
    },
    update: {},
    create: {
      id: 'a38b7339-8c11-4f8a-b47c-469a1b390a39',
      text: `What is the primary function of the pulmonary circulation?`,
      description: 'Related to Left Ventricle',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'To deliver oxygenated blood to the body',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To facilitate gas exchange in the lungs',
              isCorrect: true,
              explaination:
                'The primary function of the pulmonary circulation is to facilitate gas exchange in the lungs.'
            },
            {
              text: 'To return deoxygenated blood to the heart',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To pump blood to the left atrium',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterThreeReferenceTagging
    }
  });
  console.log('Created Chapter 2.3 in question table');

  console.log('Creating Chapter 2.4 in question table');

  const chapterFourReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '6d1e2b86-2885-4770-90b6-068cca6ae819'
      }
    },
    Reference: {
      connect: {
        id: 'b29bf882-36d4-467e-b4db-380409676066'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: '3ebcfd69-ea19-4e5a-bbcf-0d6ee61811ac'
    },
    update: {},
    create: {
      id: '3ebcfd69-ea19-4e5a-bbcf-0d6ee61811ac',
      text: 'The right atrium only receives blood from the vena cava',
      description: 'Related to Right Atrium',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The right atrium receives blood from the vena cava and the coronary sinus.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFourReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'a38b7339-8c11-4f8a-b47c-469a1b390a39'
    },
    update: {},
    create: {
      id: 'a38b7339-8c11-4f8a-b47c-469a1b390a39',
      text: `Which vessel carries deoxygenated blood from the head to the right atrium?`,
      description: 'Related to Right Atrium',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Pulmonary arteries',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Pulmonary veins',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Superior vena cava',
              isCorrect: true,
              explaination:
                'The superior vena cava carries deoxygenated blood from the head to the right atrium.'
            },
            {
              text: 'Inferior vena cava',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFourReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '39ec78c1-fb61-49b2-ae3d-9a7660a2be0a'
    },
    update: {},
    create: {
      id: '39ec78c1-fb61-49b2-ae3d-9a7660a2be0a',
      text: `Which of the following cannot be found in the right atrium?`,
      description: 'Related to Right Atrium',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Cristae terminalis',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Moderator band',
              isCorrect: true,
              explaination: 'The moderator band is found in the right ventricle.'
            },
            {
              text: 'Thebesian valve',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Eustachian valve',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFourReferenceTagging
    }
  });
  console.log('Created Chapter 2.4 in question table');
  console.log('Creating Chapter 2.5 in question table');
  const chapterFiveReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '0d285828-2706-4ea6-b528-be71bc076a44'
      }
    },
    Reference: {
      connect: {
        id: '7c43a85c-4eaf-453d-83f4-a5d31f7ed831'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: '1afc3235-987c-494f-9707-6e4c17df8111'
    },
    update: {},
    create: {
      id: '1afc3235-987c-494f-9707-6e4c17df8111',
      text: 'There are two semilunar valves in the heart.',
      description: 'Related to Aortic Valve',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'There are two semilunar valves in the heart.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '98ffec0c-815f-40f0-8cf7-d63e7f5a3970'
    },
    update: {},
    create: {
      id: '98ffec0c-815f-40f0-8cf7-d63e7f5a3970',
      text: 'All aortic valves have three cusps',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'Not all aortic valves have three cusps.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '300dd7ce-ddd8-4624-be8e-69400dd6e8be'
    },
    update: {},
    create: {
      id: '300dd7ce-ddd8-4624-be8e-69400dd6e8be',
      text: 'The aortic valve opens widely during diastole.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The aortic valve opens widely during systole.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '0f9c24eb-0f06-40c8-be2e-d326fea8d2e0'
    },
    update: {},
    create: {
      id: '0f9c24eb-0f06-40c8-be2e-d326fea8d2e0',
      text: 'Each cusp of the aortic valve has a small nodule at its center called the nodule of Arantius.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      difficulty: 2,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'Each cusp of the aortic valve has a small nodule at its center called the nodule of Arantius.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '0a85cc50-5497-4c91-ace1-381c19f9b45c'
    },
    update: {},
    create: {
      id: '0a85cc50-5497-4c91-ace1-381c19f9b45c',
      text: 'The aortic valve has a Y-shaped appearance in diastole.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The aortic valve has a Y-shaped appearance in diastole.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '1bf795b8-3d74-4e34-8d9d-9ba327119336'
    },
    update: {},
    create: {
      id: '1bf795b8-3d74-4e34-8d9d-9ba327119336',
      text: 'The Mercedes-Benz sign refers to aortic valve appearance systole.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The Mercedes-Benz sign refers to aortic valve appearance in diastole.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'd35b3a4b-8c7d-4338-8ed3-9e20ed77b3af'
    },
    update: {},
    create: {
      id: 'd35b3a4b-8c7d-4338-8ed3-9e20ed77b3af',
      text: 'The three cusps of aortic valve are called the right coronary, left coronary and the non-coronary cusps.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'The three cusps of aortic valve are called the right coronary, left coronary and the non-coronary cusps.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'b3130c22-3fc5-4fb1-bc01-4a1eddfb95ca'
    },
    update: {},
    create: {
      id: 'b3130c22-3fc5-4fb1-bc01-4a1eddfb95ca',
      text: 'The aortic valve is located between the left ventricular outflow tract and the aortic root.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'The aortic valve is located between the left ventricular outflow tract and the aortic root.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '697f5327-dc42-4e09-9a4b-428c8662ed21'
    },
    update: {},
    create: {
      id: '697f5327-dc42-4e09-9a4b-428c8662ed21',
      text: 'The aortic valve closes during systole.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The aortic valve closes during diastole.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'bdc095a2-c454-4ea2-bc58-77b0145dea2d'
    },
    update: {},
    create: {
      id: 'bdc095a2-c454-4ea2-bc58-77b0145dea2d',
      text: 'The commissure is the point where adjacent cusps of the aortic valve meet.',
      description: 'Related to Aortic Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'The commissure is the point where adjacent cusps of the aortic valve meet.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'b92e511d-9e05-424d-b505-de0596c2c03d'
    },
    update: {},
    create: {
      id: 'b92e511d-9e05-424d-b505-de0596c2c03d',
      text: `What structure lies between the left ventricular outflow tract and the aortic root?`,
      description: 'Related to Aortic Valve',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Aortic valve',
              isCorrect: true,
              explaination:
                'The aortic valve lies between the left ventricular outflow tract and the aortic root.'
            },
            {
              text: ' Pulmonary valve',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Mitral valve',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Tricuspid valve',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '7b439ec1-3036-4b0c-a79a-b514108b307b'
    },
    update: {},
    create: {
      id: '7b439ec1-3036-4b0c-a79a-b514108b307b',
      text: `What is the name of the small nodule found at the center of each aortic valve cusp?`,
      description: 'Related to Aortic Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Lambl’s excrescence',
              isCorrect: false,
              explaination: ''
            },
            {
              text: ' Nodule of Arantius',
              isCorrect: true,
              explaination:
                'The nodule of Arantius is found at the center of each aortic valve cusp.'
            },
            {
              text: 'Cristae terminalis',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Sentinel node',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '2ef8df8a-9103-47f9-95d4-ed5d66b3ff0c'
    },
    update: {},
    create: {
      id: '2ef8df8a-9103-47f9-95d4-ed5d66b3ff0c',
      text: `What is the name of the small nodule found at the center of each aortic valve cusp?`,
      description: 'Related to Aortic Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Lambl’s excrescence',
              isCorrect: false,
              explaination: ''
            },
            {
              text: ' Nodule of Arantius',
              isCorrect: true,
              explaination:
                'The nodule of Arantius is found at the center of each aortic valve cusp.'
            },
            {
              text: 'Cristae terminalis',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Sentinel node',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'a68b6003-10b0-4896-9602-03f4a08ce71f'
    },
    update: {},
    create: {
      id: 'a68b6003-10b0-4896-9602-03f4a08ce71f',
      text: `What is the term for the point where adjacent cusps of the aortic valve meet?`,
      description: 'Related to Aortic Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Annulus',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Nodule',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Commissure',
              isCorrect: true,
              explaination:
                'The commissure is the point where adjacent cusps of the aortic valve meet.'
            },
            {
              text: 'Chordae',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '93440c1b-2590-45d7-86da-2740f53a9a96'
    },
    update: {},
    create: {
      id: '93440c1b-2590-45d7-86da-2740f53a9a96',
      text: `Which of the following statements best describe the non-coronary cusp of the aortic valve?`,
      description: 'Related to Aortic Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'It gives rise to the left coronary artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'It gives rise to the right coronary artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'It gives rise to the coronary sinus',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'It does not have a coronary artery associated with it',
              isCorrect: true,
              explaination:
                'The non-coronary cusp does not have a coronary artery associated with it.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  console.log('Created Chapter 2.5 in question table');
  console.log('Creating Chapter 2.6 in question table');

  const chapterSixReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '31ea2dd4-1053-4011-8980-757673f4affb'
      }
    },
    Reference: {
      connect: {
        id: 'ab3c0f6b-edd7-43a1-b1b4-97641d20d6be'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: 'd578514c-04d9-4117-b5f5-c17065f1a627'
    },
    update: {},
    create: {
      id: 'd578514c-04d9-4117-b5f5-c17065f1a627',
      text: 'The mitral valve is the only cardiac valve with two leaflets.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The mitral valve is the only cardiac valve with two leaflets.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '96f87ea8-ebbb-42ed-bfdd-87b0b278d1a4'
    },
    update: {},
    create: {
      id: '96f87ea8-ebbb-42ed-bfdd-87b0b278d1a4',
      text: 'The mitral valve leaflets are called the right mitral valve leaflet and the left mitral valve leaflet.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The mitral valve leaflets are called the anterior and posterior leaflets.'
            },
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '0b615a0e-e497-4619-8bd8-d0814c2ba35f'
    },
    update: {},
    create: {
      id: '0b615a0e-e497-4619-8bd8-d0814c2ba35f',
      text: 'The mitral valve leaflets are called the anterior mitral valve leaflet and the posterior mitral valve leaflet.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'The mitral valve leaflets are called the anterior and posterior leaflets.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'dbaf423e-b975-4f2a-ad03-029daab0fa7b'
    },
    update: {},
    create: {
      id: 'dbaf423e-b975-4f2a-ad03-029daab0fa7b',
      text: 'The anterior mitral valve leaflet is longer than the posterior mitral valve leaflet.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      difficulty: 2,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'The anterior mitral valve leaflet is longer than the posterior mitral valve leaflet.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'c3401df9-e234-4e31-b1d8-d463440a7291'
    },
    update: {},
    create: {
      id: 'c3401df9-e234-4e31-b1d8-d463440a7291',
      text: 'The anterior mitral valve leaflet is shorter than the posterior mitral valve leaflet.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      difficulty: 2,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The anterior mitral valve leaflet is longer than the posterior mitral valve leaflet.'
            },
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'a664618e-af89-4bc1-90d2-6b9436fca3cb'
    },
    update: {},
    create: {
      id: 'a664618e-af89-4bc1-90d2-6b9436fca3cb',
      text: 'Each papillary muscle supplies chordae to only one mitral leaflet.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'Each papillary muscle supplies chordae to both the anterior and posterior mitral leaflets.'
            },
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '7f793752-46ec-4625-af6e-dde1fb35c402'
    },
    update: {},
    create: {
      id: '7f793752-46ec-4625-af6e-dde1fb35c402',
      text: 'Chordae tendineae help prevent the prolapse of mitral leaflets during systole.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      difficulty: 2,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'Chordae tendineae help prevent the prolapse of mitral leaflets during systole.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'a52c52bd-1aad-4bc1-8dce-e71b030b90c1'
    },
    update: {},
    create: {
      id: 'a52c52bd-1aad-4bc1-8dce-e71b030b90c1',
      text: 'Chordae tendineae help prevent the prolapse of mitral leaflets during diastole',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      difficulty: 2,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'Chordae tendineae help prevent the prolapse of mitral leaflets during systole.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '47dad92a-08b6-4bce-9d8e-c13ea64b3282'
    },
    update: {},
    create: {
      id: '47dad92a-08b6-4bce-9d8e-c13ea64b3282',
      text: 'Mitral valve chordae are categorised into three groups: first order, second order and third order.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'Mitral valve chordae are categorised into three groups.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'a6bfbeaf-a58d-4539-a442-72ced0533b9e'
    },
    update: {},
    create: {
      id: 'a6bfbeaf-a58d-4539-a442-72ced0533b9e',
      text: 'Mitral regurgitation can occur due to poor coaptation of the leaflets.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'Mitral regurgitation can occur due to poor coaptation of the leaflets.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '3e5357ad-1361-46dd-80bf-48ca5a6c69dc'
    },
    update: {},
    create: {
      id: '3e5357ad-1361-46dd-80bf-48ca5a6c69dc',
      text: 'The mitral valve leaflets do not overlap at their tips during closure',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The mitral valve leaflets overlap at their tips during closure.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '9a668c8f-4965-4637-9578-c40630760121'
    },
    update: {},
    create: {
      id: '9a668c8f-4965-4637-9578-c40630760121',
      text: 'There are three papillary muscles associated with the mitral valve.',
      description: 'Related to Mitral Valve',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'There are two papillary muscles associated with the mitral valve.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '7ac85a2d-361d-440a-b4f4-e82c9ace8879'
    },
    update: {},
    create: {
      id: '7ac85a2d-361d-440a-b4f4-e82c9ace8879',
      text: 'The mitral valve opens widely during diastole.',
      description: 'Related to Mitral Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The mitral valve opens widely during diastole.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSixReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '09d49ad3-1b1c-4c93-ba81-53fc062002f1'
    },
    update: {},
    create: {
      id: '09d49ad3-1b1c-4c93-ba81-53fc062002f1',
      text: `Which is the most lateral segment of the posterior mitral leaflet?`,
      description: 'Related to Mitral Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'A1',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'A3',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'P1',
              isCorrect: true,
              explaination: 'P1 is the most lateral segment of the posterior mitral leaflet.'
            },
            {
              text: 'P3',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '896f0eee-0ce5-4d5c-9e61-5c2d0993216f'
    },
    update: {},
    create: {
      id: '896f0eee-0ce5-4d5c-9e61-5c2d0993216f',
      text: `What is the role of chordae tendineae in the heart?`,
      description: 'Related to Mitral Valve',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'To regulate heart rate',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To connect the atria and ventricles',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To keep the AV valve leaflets under tension to prevent regurgitation',
              isCorrect: true,
              explaination:
                'Chordae tendineae keep the AV valve leaflets under tension to prevent regurgitation.'
            },
            {
              text: 'To supply blood to the myocardium',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'd4da33b7-aeed-46f3-82c5-62189d227b1b'
    },
    update: {},
    create: {
      id: 'd4da33b7-aeed-46f3-82c5-62189d227b1b',
      text: `Which type of chordae tendineae attaches to the free edges of the mitral leaflets?`,
      description: 'Related to Mitral Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Strut chordae',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Marginal chordae',
              isCorrect: true,
              explaination: 'Marginal chordae attach to the free edges of the mitral leaflets.'
            },
            {
              text: ' Basal chordae',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'None of the above',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'f591ccb0-020d-4f2d-abf7-dae0624cf0d9'
    },
    update: {},
    create: {
      id: 'f591ccb0-020d-4f2d-abf7-dae0624cf0d9',
      text: `Which group of chordae tendineae attaches to the tip of the mitral valve leaflet?`,
      description: 'Related to Mitral Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'First order',
              isCorrect: true,
              explaination: 'First order chordae attach to the tip of the mitral valve leaflet.'
            },
            {
              text: 'Second order',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Third order',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'None of the above',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '19a6da4f-44cf-4fc9-b14b-b3d6ca75a177'
    },
    update: {},
    create: {
      id: '19a6da4f-44cf-4fc9-b14b-b3d6ca75a177',
      text: `What happens to the mitral leaflets during ventricular diastole?`,
      description: 'Related to Mitral Valve',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'They close tightly',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'They open widely',
              isCorrect: true,
              explaination: 'The mitral leaflets open widely during ventricular diastole.'
            },
            {
              text: 'They became rigid',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'They prolapse into the atrium',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '237835c3-a8ca-460a-99d5-651c3ba573ca'
    },
    update: {},
    create: {
      id: '237835c3-a8ca-460a-99d5-651c3ba573ca',
      text: `Which mitral valve leaflet is the longest?`,
      description: 'Related to Mitral Valve',
      isMultipleChoice: true,
      difficulty: 2,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Anterior leaflet',
              isCorrect: true,
              explaination:
                'The anterior mitral valve leaflet is longer than the posterior mitral valve leaflet.'
            },
            {
              text: 'Posterior leaflet',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Medial leaflet',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Lateral leaflet',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterFiveReferenceTagging
    }
  });
  console.log('Created Chapter 2.6 in question table');

  console.log('Creating Chapter 2.7 in question table');
  const chapterSevenReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '22d17ba6-90f3-456a-bfef-c14add322513'
      }
    },
    Reference: {
      connect: {
        id: 'adc59b96-c1a5-4b99-bc29-bd5b597ecb8a'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: 'dd7c5073-3e99-4a48-bdb4-39d99222ae44'
    },
    update: {},
    create: {
      id: 'dd7c5073-3e99-4a48-bdb4-39d99222ae44',
      text: 'The three cusps of pulmonary valve are called the right coronary cusp, left coronary cusp and the non-coronary cusp.',
      description: 'Related to Pulmonary Valve',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The three cusps of pulmonary valve are called the right, left and anterior cusps.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSevenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'c5d84611-8120-4e71-8054-c41ff6e9434c'
    },
    update: {},
    create: {
      id: 'c5d84611-8120-4e71-8054-c41ff6e9434c',
      text: 'Pulmonary valve is the most anterior facing cardiac valve.',
      description: 'Related to Pulmonary Valve',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'Pulmonary valve is the most anterior facing cardiac valve.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSevenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'c5c447e9-67a5-4bad-920e-0dc5956e2b1c'
    },
    update: {},
    create: {
      id: 'cc5c447e9-67a5-4bad-920e-0dc5956e2b1c',
      text: 'The pulmonary valve opens during diastole to allow blood flow.',
      description: 'Related to Pulmonary Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The pulmonary valve opens during systole to allow blood flow.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSevenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '855fba63-a135-44cc-8143-b9e0f2ad6db2'
    },
    update: {},
    create: {
      id: '855fba63-a135-44cc-8143-b9e0f2ad6db2',
      text: 'The pulmonary valve has three cusps.',
      description: 'Related to Pulmonary Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The pulmonary valve has three cusps.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterSevenReferenceTagging
    }
  });
  console.log('Created Chapter 2.7 in question table');

  console.log('Creating Chapter 2.8 in question table');

  const chapterEightReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '95197214-b23a-4090-9e77-a4564d9d19d4'
      }
    },
    Reference: {
      connect: {
        id: '58d1de98-6c9b-466e-82c5-145ce6952bef'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: '5cb7a187-d52f-47ab-a6a6-49a3f4360dbe'
    },
    update: {},
    create: {
      id: '5cb7a187-d52f-47ab-a6a6-49a3f4360dbe',
      text: 'The tricuspid valve is located between the left atrium and left ventricle.',
      description: 'Related to Tricuspid Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The tricuspid valve is located between the right atrium and right ventricle.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'f9166185-0f10-4eff-b2c6-64cf03a123bb'
    },
    update: {},
    create: {
      id: 'f9166185-0f10-4eff-b2c6-64cf03a123bb',
      text: 'The tricuspid valve opens during systole.',
      description: 'Related to Tricuspid Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The tricuspid valve opens during diastole to allow blood flow from the right atrium to the right ventricle.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '0026ff85-4c4d-4a46-b00c-08ec9fbc7dd3'
    },
    update: {},
    create: {
      id: '0026ff85-4c4d-4a46-b00c-08ec9fbc7dd3',
      text: 'The orifice area of the tricuspid valve is smaller than that of the mitral valve.',
      description: 'Related to Tricuspid Valve',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The orifice area of the tricuspid valve is larger than that of the mitral valve.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '3725183a-d526-44ac-ba25-2fa6e1b5ffff'
    },
    update: {},
    create: {
      id: '3725183a-d526-44ac-ba25-2fa6e1b5ffff',
      text: 'The tricuspid valve closes during diastole to prevent regurgitation.',
      description: 'Related to Tricuspid Valve',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The tricuspid valve closes during systole to prevent regurgitation of blood back into the right atrium.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'c3f874fa-db2d-4056-b3a7-a30e29ebe747'
    },
    update: {},
    create: {
      id: 'c3f874fa-db2d-4056-b3a7-a30e29ebe747',
      text: 'Tricuspid valve is the cardiac valve with the largest orifice area.',
      description: 'Related to Tricuspid Valve',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'Tricuspid valve is the cardiac valve with the largest orifice area.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '310e1abe-e8aa-46d5-aad7-a407721edaf4'
    },
    update: {},
    create: {
      id: '310e1abe-e8aa-46d5-aad7-a407721edaf4',
      text: `How many papillary muscles are associated with the mitral valve?`,
      description: 'Related to Tricuspid Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'One',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Two',
              isCorrect: true,
              explaination: 'There are two papillary muscles associated with the mitral valve.'
            },
            {
              text: 'Three',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Four',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '70e66ee4-ce45-4bb7-81d9-dc2d64999aac'
    },
    update: {},
    create: {
      id: '70e66ee4-ce45-4bb7-81d9-dc2d64999aac',
      text: `How many papillary muscles are associated with the tricuspid valve?`,
      description: 'Related to Tricuspid Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'One',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Two',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Three',
              isCorrect: true,
              explaination: 'There are three papillary muscles associated with the tricuspid valve.'
            },
            {
              text: 'Four',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'b32ee01a-291a-4343-a1b8-bfaff00a8920'
    },
    update: {},
    create: {
      id: 'b32ee01a-291a-4343-a1b8-bfaff00a8920',
      text: `What is the normal orifice area of the tricuspid valve?`,
      description: 'Related to Tricuspid Valve',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: '1.0 cm²',
              isCorrect: false,
              explaination: ''
            },
            {
              text: '3.0 cm²',
              isCorrect: false,
              explaination: ''
            },
            {
              text: '5.0 cm²',
              isCorrect: false,
              explaination: ''
            },
            {
              text: '7.0 cm²',
              isCorrect: true,
              explaination: 'The normal orifice area of the tricuspid valve is 7.0 cm².'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '4795ff18-e837-4b12-be2f-1da4f8303abf'
    },
    update: {},
    create: {
      id: '4795ff18-e837-4b12-be2f-1da4f8303abf',
      text: `How many cusps does the tricuspid valve have?`,
      description: 'Related to Tricuspid Valve',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Two',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Three',
              isCorrect: true,
              explaination: 'The tricuspid valve has three cusps.'
            },
            {
              text: 'Four',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Five',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterEightReferenceTagging
    }
  });
  console.log('Created Chapter 2.8 in question table');
  console.log('Creating Chapter 2.9 in question table');
  const chapterNightReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '9558865c-9ee4-4ded-9014-f89d53c3a524'
      }
    },
    Reference: {
      connect: {
        id: '15bd4ad6-3eff-46b4-af97-4f0370e03a21'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: 'baede8d2-51af-4c09-8870-31318582bcf0'
    },
    update: {},
    create: {
      id: 'baede8d2-51af-4c09-8870-31318582bcf0',
      text: 'The pericardial cavity normally contains less than 50 mL.',
      description: 'Related to Pericadium',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The pericardial cavity normally contains less than 50 mL.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterNightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'd8250a9f-9b41-4466-8926-185bf9ad5fb1'
    },
    update: {},
    create: {
      id: 'd8250a9f-9b41-4466-8926-185bf9ad5fb1',
      text: 'The oblique pericardial sinus is formed between the four pulmonary veins.',
      description: 'Related to Pericadium',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'The oblique pericardial sinus is formed between the four pulmonary veins.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterNightReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '236fde52-5cef-42b2-a589-43e4f07265fb'
    },
    update: {},
    create: {
      id: '236fde52-5cef-42b2-a589-43e4f07265fb',
      text: 'The pericardium has an outer fibrous layer and an inner serous layer.',
      description: 'Related to Pericadium',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The pericardium has an outer fibrous layer and an inner serous layer.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterNightReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '9f8ed713-71ea-46ba-87c4-25358abc46af'
    },
    update: {},
    create: {
      id: '9f8ed713-71ea-46ba-87c4-25358abc46af',
      text: `What is the function of the pericardium?`,
      description: 'Related to Pericadium',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'To minimize friction between the heart and adjacent tissues',
              isCorrect: true,
              explaination:
                'The pericardium minimizes friction between the heart and adjacent tissues.'
            },
            {
              text: 'To supply blood to the heart',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To regulate heart rate',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To facilitate gas exchange',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterNightReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '78a9cbac-e1cb-4378-a515-8ddce21103ac'
    },
    update: {},
    create: {
      id: '78a9cbac-e1cb-4378-a515-8ddce21103ac',
      text: `What is the outer layer of the pericardium called?`,
      description: 'Related to Pericadium',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Serous pericardium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Fibrous pericardium',
              isCorrect: true,
              explaination: 'The outer layer of the pericardium is called the fibrous pericardium.'
            },
            {
              text: 'Visceral pericardium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Epicardium',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterNightReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '5205062a-1590-47f5-8ffc-2d9fb507eaec'
    },
    update: {},
    create: {
      id: '5205062a-1590-47f5-8ffc-2d9fb507eaec',
      text: `How much fluid does the pericardial cavity normally contain?`,
      description: 'Related to Pericadium',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Less than 50 mL',
              isCorrect: true,
              explaination: 'The pericardial cavity normally contains less than 50 mL.'
            },
            {
              text: 'Less than 100 mL',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Less than 200 mL',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'More than 200 mL',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterNightReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '8110898b-8d39-4eaa-be55-43ce3339c1e7'
    },
    update: {},
    create: {
      id: '8110898b-8d39-4eaa-be55-43ce3339c1e7',
      text: `What is the name of the small pocket of pericardium around the aorta and pulmonary artery?`,
      description: 'Related to Pericadium',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Transverse sinus',
              isCorrect: true,
              explaination:
                'The transverse sinus is a small pocket of pericardium around the aorta and pulmonary artery.'
            },
            {
              text: 'Oblique sinus',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Coronary sinus',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Sinus of Valsalva',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterNightReferenceTagging
    }
  });
  console.log('Created Chapter 2.9 in question table');

  console.log('Created Chapter 2.10 in question table');
  const chapterTenReferenceTagging = {
    Subject,
    TaggingQuestions: {
      connect: {
        id: '92a258e7-c9ec-4942-9ef8-a60b459e2c3c'
      }
    },
    Reference: {
      connect: {
        id: 'c4075c99-79c5-4b4d-819b-2bcb7fcecc3d'
      }
    }
  };
  await prisma.question.upsert({
    where: {
      id: 'df25cf2f-3cf3-47ce-85c2-8029bcbd853a'
    },
    update: {},
    create: {
      id: 'df25cf2f-3cf3-47ce-85c2-8029bcbd853a',
      text: 'The right coronary artery supplies the sinoatrial node.',
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The right coronary artery supplies the sinoatrial node.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'eb0f192b-c006-41e6-ac1e-564cc5afdb0c'
    },
    update: {},
    create: {
      id: 'eb0f192b-c006-41e6-ac1e-564cc5afdb0c',
      text: `Coronary dominance is a term used to describe the coronary artery branch that supplies the posterior descending artery (PDA) and the inferior wall of the heart.`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination:
                'Coronary dominance is a term used to describe the coronary artery branch that supplies the posterior descending artery (PDA) and the inferior wall of the heart.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '76bb911c-8927-40cb-993b-be602b62f36c'
    },
    update: {},
    create: {
      id: '76bb911c-8927-40cb-993b-be602b62f36c',
      text: `Coronary dominance is a term used to describe the coronary artery branch that supplies the posterior left ventricular artery (PLV) and the inferior wall of the heart.`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'Coronary dominance is a term used to describe the coronary artery branch that supplies the posterior descending artery (PDA) and the inferior wall of the heart.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '70239ee5-6d91-445c-b64c-93f1833c8cfe'
    },
    update: {},
    create: {
      id: '70239ee5-6d91-445c-b64c-93f1833c8cfe',
      text: `Majority of the heart are left coronary dominant.`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'Majority of the heart are right coronary dominant.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '85f8a069-c133-429a-b401-10fd998f7ece'
    },
    update: {},
    create: {
      id: '85f8a069-c133-429a-b401-10fd998f7ece',
      text: `Majority of the heart are right coronary dominant.`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'Majority of the heart are right coronary dominant.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '22a7340a-09b8-46c6-ac56-91ff416a38ec'
    },
    update: {},
    create: {
      id: '22a7340a-09b8-46c6-ac56-91ff416a38ec',
      text: `Coronary arteries arise from the sinus of Valsalva.`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'Coronary arteries arise from the sinus of Valsalva.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'e7459a59-8c20-4ea9-958e-87a90e4b3581'
    },
    update: {},
    create: {
      id: 'e7459a59-8c20-4ea9-958e-87a90e4b3581',
      text: `Coronary arteries arise above the sinus of Valsalva.`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'Coronary arteries arise from the sinus of Valsalva.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'bdddfeb3-ab6d-455d-9610-14b065a95b3d'
    },
    update: {},
    create: {
      id: 'bdddfeb3-ab6d-455d-9610-14b065a95b3d',
      text: `The left circumflex artery runs in the left atrioventricular groove.`,
      description: 'Related to Coronary Arteries',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The left circumflex artery runs in the left atrioventricular groove.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'ba586e0a-0a74-4b8d-993f-31b62a0bf9f2'
    },
    update: {},
    create: {
      id: 'ba586e0a-0a74-4b8d-993f-31b62a0bf9f2',
      text: `The right coronary artery is dominant in most people.`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: true,
              explaination: 'The right coronary artery is dominant in most people.'
            },
            {
              text: 'False',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '7a4cc9db-d6ae-42c8-8afd-249869431a4c'
    },
    update: {},
    create: {
      id: '7a4cc9db-d6ae-42c8-8afd-249869431a4c',
      text: `The posterior descending artery is typically a branch of the left coronary artery. `,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The posterior descending artery is typically a branch of the right coronary artery.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: '380a12bb-421b-421f-9a71-1e00ec753da1'
    },
    update: {},
    create: {
      id: '380a12bb-421b-421f-9a71-1e00ec753da1',
      text: `The right coronary artery runs down the interventricular groove.`,
      description: 'Related to Coronary Arteries',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination: 'The right coronary artery runs down the atrioventricular groove.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '1877f143-5a4d-4625-a812-ac27447dc66f'
    },
    update: {},
    create: {
      id: '1877f143-5a4d-4625-a812-ac27447dc66f',
      text: `The interventricular septum is supplied by branches from the left circumflex artery.`,
      description: 'Related to Coronary Arteries',
      isMultipleChoice: false,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'True',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'False',
              isCorrect: true,
              explaination:
                'The interventricular septum is supplied by branches from the left anterior descending artery.'
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'd4ef2730-0a76-4e2e-a639-60639b3c17c0'
    },
    update: {},
    create: {
      id: 'd4ef2730-0a76-4e2e-a639-60639b3c17c0',
      text: `Where do coronary arteries originate from?`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: ' Left atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Right atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Sinus of Valsalva',
              isCorrect: true,
              explaination: 'Coronary arteries originate from the sinus of Valsalva.'
            },
            {
              text: 'Descending aorta',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '59f5041a-2289-4bb3-9465-428cb70dc3db'
    },
    update: {},
    create: {
      id: '59f5041a-2289-4bb3-9465-428cb70dc3db',
      text: `What is the function of the right coronary artery?`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'To drain blood from the heart',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To supply blood to the right heart',
              isCorrect: true,
              explaination: 'The right coronary artery supplies blood to the right heart.'
            },
            {
              text: 'To supply blood to the left atrium',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'To connect the aorta to the pulmonary trunk',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'aa377579-a483-4759-89a0-fac9bab610c1'
    },
    update: {},
    create: {
      id: 'aa377579-a483-4759-89a0-fac9bab610c1',
      text: `What are the two main arteries that arise from the sinuses of Valsalva?`,
      description: 'Related to Coronary Arteries',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Pulmonary artery and aorta',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left coronary artery and right coronary artery',
              isCorrect: true,
              explaination:
                'The left coronary artery and right coronary artery arise from the sinuses of Valsalva.'
            },
            {
              text: 'Coronary sinus and pulmonary veins',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Superior vena cava and inferior vena cava',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'ff950df1-12f0-41c6-b140-2a0967ab4641'
    },
    update: {},
    create: {
      id: 'ff950df1-12f0-41c6-b140-2a0967ab4641',
      text: `Which artery is responsible for supplying the interventricular septum?`,
      description: 'Related to Coronary Arteries',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: ' Left circumflex artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left anterior descending artery',
              isCorrect: true,
              explaination:
                'The left anterior descending artery is responsible for supplying the interventricular septum.'
            },
            {
              text: 'Right coronary artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Coronary sinus',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: 'f14db5b6-9e89-4470-ac46-7050beb6fa8f'
    },
    update: {},
    create: {
      id: 'f14db5b6-9e89-4470-ac46-7050beb6fa8f',
      text: `Which coronary artery runs in the right atrioventricular groove?`,
      description: 'Related to Coronary Arteries',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Left circumflex artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left anterior descending artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: ' Right coronary artery',
              isCorrect: true,
              explaination: 'The right coronary artery runs in the right atrioventricular groove.'
            },
            {
              text: 'Ascending aorta',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '319626c4-9e0c-4e10-90f4-21b9fce928f9'
    },
    update: {},
    create: {
      id: '319626c4-9e0c-4e10-90f4-21b9fce928f9',
      text: `Which artery runs down the anterior interventricular groove?`,
      description: 'Related to Coronary Arteries',
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Right coronary artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left circumflex artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: ' Left anterior descending artery',
              isCorrect: true,
              explaination:
                'The left anterior descending artery runs down the anterior interventricular groove.'
            },
            {
              text: 'Left main stem',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });

  await prisma.question.upsert({
    where: {
      id: 'e131cf2a-e52f-44d0-9c75-f6d86e475c7f'
    },
    update: {},
    create: {
      id: 'e131cf2a-e52f-44d0-9c75-f6d86e475c7f',
      text: `Which artery is typically dominant in most individuals?`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'Right coronary artery',
              isCorrect: true,
              explaination: 'The right coronary artery is typically dominant in most individuals.'
            },
            {
              text: 'Left main stem',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left anterior descending artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Left circumflex artery',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  await prisma.question.upsert({
    where: {
      id: '9c17721d-f22a-4749-87b0-5758d185e45a'
    },
    update: {},
    create: {
      id: '9c17721d-f22a-4749-87b0-5758d185e45a',
      text: `What defines the 'dominance' in coronary circulation?`,
      description: 'Related to Coronary Arteries',
      difficulty: 2,
      isMultipleChoice: true,
      isPublic: false,
      Answer: {
        createMany: {
          data: [
            {
              text: 'The size of the coronary arteries',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'The number of branches from the left coronary artery',
              isCorrect: false,
              explaination: ''
            },
            {
              text: 'Which artery supplies the posterior descending artery',
              isCorrect: true,
              explaination:
                'The artery that supplies the posterior descending artery defines the dominance in coronary circulation.'
            },
            {
              text: 'The presence of collateral circulation',
              isCorrect: false,
              explaination: ''
            }
          ],
          skipDuplicates: true
        }
      },
      ...chapterTenReferenceTagging
    }
  });
  console.log('Created Chapter 2.10 in question table');

  console.log('Created in question table');
}
