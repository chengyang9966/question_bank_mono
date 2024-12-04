import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createReferences() {
  console.log('Creating in Reference table');
  // Chapter 2: Cardiovascular System

  // 2.1 Left Ventricle (LV)
  await prisma.reference.upsert({
    where: {
      id: 'c6b97cbf-de09-4cd5-8dc3-9362b507b056'
    },
    update: {},
    create: {
      description:
        'The LV is the main pumping chamber of the heart, cylindrical at its base and tapering towards the apex. It has a thicker wall compared to the RV and is subdivided into 17 segments for functional assessment. During ventricular systole, LV contracts and pumps oxygenated blood to the entire body via the aorta.',
      format: 'text',
      sequence: 1,
      id: 'c6b97cbf-de09-4cd5-8dc3-9362b507b056'
    }
  });
  // 2.2 Left Atrium (LA)
  await prisma.reference.upsert({
    where: {
      id: '8482816d-9ca5-4495-b126-1443a73262fe'
    },
    update: {},
    create: {
      description: `The left atrium (LA) is positioned at the rear of the heart, serving as the most posterior cardiac chamber. It receives oxygenated blood from the lungs through four pulmonary veins. Being situated in front of the mid-esophagus, the left atrial structures, particularly the left atrial appendage, are more easily visualized on a transesophageal echocardiogram (TOE) in comparison to a transthoracic echocardiogram (TTE). The LA actively aids in filling the left ventricle (LV) during atrial systole, contributing to the phenomenon known as the 'atrial kick'. It is separated from the right atrium (RA) by the interatrial septum, which may exhibit a patent foramen ovale or atrial septal defect (ASD).`,
      format: 'text',
      sequence: 1,
      id: '8482816d-9ca5-4495-b126-1443a73262fe'
    }
  });
  // 2.3 Right Ventricle (RV)
  await prisma.reference.upsert({
    where: {
      id: '04b9eeb9-5b77-431f-a3ab-23425bb2bd3c'
    },
    update: {},
    create: {
      description: `The RV is the most anterior-facing cardiac chamber. It has a crescent shape and encircles the LV. It has thinner walls and more trabeculations compared to the LV. The moderator band, found exclusively in the RV, can occasionally be a cause of arrhythmias. The RV's atrioventricular valve (Tricuspid valve) is also positioned further towards the cardiac apex. The RV is responsible for pumping deoxygenated blood to the lungs.`,
      format: 'text',
      sequence: 1,
      id: '04b9eeb9-5b77-431f-a3ab-23425bb2bd3c'
    }
  });
  // 2.4 Right Atrium (RA)
  await prisma.reference.upsert({
    where: {
      id: 'b29bf882-36d4-467e-b4db-380409676066'
    },
    update: {},
    create: {
      description: `Blood is received by the right atrium from the superior vena cava (upper body), inferior vena cava (lower body), and the coronary sinus (heart). Near the junction of the inferior vena cava, there may be the Eustachian valve, an embryological remnant that can sometimes be observed on an echocardiogram. The Thebesian valve, also referred to as the valve of the coronary sinus, is a fold located in the right atrium at the entrance of the coronary sinus. Additional structures that might be visible include the cristae terminalis and chiari network.`,
      format: 'text',
      sequence: 1,
      id: 'b29bf882-36d4-467e-b4db-380409676066'
    }
  });
  // 2.5 Aortic Valve
  await prisma.reference.upsert({
    where: {
      id: '7c43a85c-4eaf-453d-83f4-a5d31f7ed831'
    },
    update: {},
    create: {
      description: `Both the aortic valve and the pulmonary valve are known as the semilunar cardiac valves. The aortic valve is located between the LV outflow tract (LVOT) and the aortic root. It has three cusps that open during systole and close during diastole, appearing Y-shaped (Mercedes-Benz sign) in the parasternal short-axis view. These three cusps are called right coronary, left coronary and non-coronary cusps. Bicuspid aortic valves are not uncommon and affect up to 2% of the population. The aortic valve annulus is where the cusps attach to the aortic root, and the commissure is where adjacent cusps meet. Each cusp has a nodule of Arantius at its centre.`,
      format: 'text',
      sequence: 1,
      id: '7c43a85c-4eaf-453d-83f4-a5d31f7ed831'
    }
  });
  // 2.6 Mitral Valve
  await prisma.reference.upsert({
    where: {
      id: 'ab3c0f6b-edd7-43a1-b1b4-97641d20d6be'
    },
    update: {},
    create: {
      description: `The mitral valve, located between the LA and LV, consists of two leaflets that open during diastole and close during systole. It is supported by the mitral annulus, two papillary muscles, and chordae tendineae.

The mitral valve is composed of two leaflets. The anterior leaflet has a semi-circular shape and connects to two-fifths of the annular circumference. Although the anterior leaflet is longer, it has a similar surface area to the posterior leaflet.

The posterior leaflet of the mitral valve is quadrangular in shape and is attached to around three-fifths of the annular circumference. Typically, the posterior leaflet displays two distinct indentations that divide it into three separate scallops identified as P1 (most lateral), P2, and P3 (most medial). The three corresponding segments of the anterior leaflet are A1 (most lateral), A2, and A3 (most medial).

Chordae tendineae maintain tension on the leaflets during systole to prevent regurgitation. They are categorized into three groups based on their attachment:
* First order (marginal) - attaches at leaflet tips (‘coaptation line’).
* Second order (strut) - attaches at mid-body of leaflets
* Third order (basal) - attaches at the base of leaflets
`,
      format: 'markdown',
      sequence: 1,
      id: 'ab3c0f6b-edd7-43a1-b1b4-97641d20d6be'
    }
  });
  // 2.7 Pulmonary Valve
  await prisma.reference.upsert({
    where: {
      id: 'adc59b96-c1a5-4b99-bc29-bd5b597ecb8a'
    },
    update: {},
    create: {
      description: `As the most anterior-facing cardiac valve, the pulmonary valve is situated between the RVOT and pulmonary artery, allowing blood to flow to the lungs during systole and preventing regurgitation during diastole. Although both semilunar valves (aortic valve and pulmonary valve) have three cusps, the pulmonary valve cusps are coined anterior, right and left cusps as opposed to non-coronary, right coronary and left coronary cusps for the aortic valve.`,
      format: 'text',
      sequence: 1,
      id: 'adc59b96-c1a5-4b99-bc29-bd5b597ecb8a'
    }
  });
  // 2.8 Tricuspid Valve
  await prisma.reference.upsert({
    where: {
      id: '58d1de98-6c9b-466e-82c5-145ce6952bef'
    },
    update: {},
    create: {
      description: `The tricuspid valve lies between the RA and RV, opening during diastole and closing during systole. It has three cusps: anterior, posterior, and septal. The tricuspid valve has the largest orifice area among all cardiac valves, typically greater than 7.0 cm². Unlike the mitral valve, the tricuspid valve often attaches to three papillary muscles rather than two.`,
      format: 'text',
      sequence: 1,
      id: '58d1de98-6c9b-466e-82c5-145ce6952bef'
    }
  });

  // 2.9 Pericardium
  await prisma.reference.upsert({
    where: {
      id: '15bd4ad6-3eff-46b4-af97-4f0370e03a21'
    },
    update: {},
    create: {
      description: `The pericardium is a protective sac-like structure that surrounds the heart, consisting of an outer fibrous layer and an inner serous layer. The serous pericardium is composed of two layers:
- The parietal layer of the serous pericardium is the outer layer firmly attached to the fibrous pericardium, with no space between them.
- The visceral layer of the serous pericardium is the innermost layer that directly covers the heart and the roots of the great vessels, also known as the epicardium.
- The pericardial cavity is the space between the two layers of the serous pericardium, containing pericardial fluid. This fluid helps reduce friction during cardiac contractions by filling the space between the parietal and visceral layers.

The pericardial cavity includes openings for vessels and forms sinuses around structures like the aorta (transverse sinus) and pulmonary veins (oblique sinus). Normally, the pericardial cavity holds a small volume of less than 50 mL of fluid. However, inflammation can lead to excessive fluid accumulation, causing pericardial effusion, which in severe cases can progress to cardiac tamponade.
`,
      format: 'markdown',
      sequence: 1,
      id: '15bd4ad6-3eff-46b4-af97-4f0370e03a21'
    }
  });

  // 2.10 Coronary Arteries
  await prisma.reference.upsert({
    where: {
      id: 'c4075c99-79c5-4b4d-819b-2bcb7fcecc3d'
    },
    update: {},
    create: {
      description: `The coronary circulation arises from the sinuses of Valsalva, with the left coronary artery (LCA) from the left coronary sinus and the right coronary artery (RCA) from the right coronary sinus.

The LCA branches into the left anterior descending artery (LAD) which runs in the interventricular groove and the left circumflex artery (LCX) which runs in the left atrioventricular groove. The LAD gives rise to septal branches (supplies the interventricular septum) and diagonal branches (supplies the anterior walls of LV) while the LCX gives rise to obtuse marginal branches (supplies lateral walls of LV).

The right coronary artery (RCA) courses through the right atrioventricular groove and commonly (in about 80% of cases) branches into the posterior descending artery (PDA), establishing coronary dominance and supplying the inferior surface of the heart. When the PDA originates from the left circumflex artery (LCX), the heart is considered to have left coronary dominance. Occasionally, the PDA may stem from both the RCA and LCX, resulting in a state of co-dominance. The RCA also provides oxygenated blood to the right heart and to the sinoatrial node (SA node), which serves as the heart's intrinsic pacemaker.
`,
      format: 'markdown',
      sequence: 1,
      id: 'c4075c99-79c5-4b4d-819b-2bcb7fcecc3d'
    }
  });
  console.log('Created in Reference table');
}
