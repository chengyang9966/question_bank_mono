import app from '../../../src/app';
import config from '../../../src/config/config';
import setupTestDB from '../../utils/setupTestDb';
import { describe, beforeEach, test, expect, jest } from '@jest/globals';
import request from 'supertest';
import prisma from '../../../src/client';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import { insertTagging } from '../../fixtures/tagging.fixture';
import { insertQuestions } from '../../fixtures/questions.fixture';

setupTestDB();

describe('Admin Tagging routes', () => {
  describe('GET /api/v1/admin/tagging', () => {
    let newTaggingArray: Array<{
      tag: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }>;
    beforeEach(() => {
      newTaggingArray = [
        {
          tag: 'Coronary Arteries',
          description: '2.10 Coronary Arteries',
          createdAt: faker.date.recent().toISOString(),
          updatedAt: faker.date.recent().toISOString()
        }
      ];
    });

    test('should return 201 and successfully register user if request data is ok', async () => {
      await insertTagging(newTaggingArray);
      const res = await request(app).get('/api/v1/admin/tagging').expect(httpStatus.OK);
      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            tag: expect.any(String),
            description: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String)
          })
        ])
      );
    });
  });

  describe('GET /api/v1/admin/tagging/search', () => {
    let newTaggingArray: Array<{
      id: string;
      tag: string;
      description: string;
      createdAt: string;
      updatedAt: string;
    }>;
    beforeEach(() => {
      newTaggingArray = [
        {
          id: 'fdce96e8-8e12-4232-a194-e3f04d48a2c2',
          tag: 'Left Ventricle',
          description: '2.1 Left Ventricle',
          createdAt: faker.date.recent().toISOString(),
          updatedAt: faker.date.recent().toISOString()
        }
      ];
    });

    test('should return 400 if no searchText or taggingId Provided', async () => {
      await request(app).get('/api/v1/admin/tagging/search').expect(httpStatus.BAD_REQUEST);
    });

    test('should return 200 if searchText or taggingId Provided', async () => {
      await insertTagging(newTaggingArray);

      await insertQuestions([
        {
          title: 'test Questions',
          description: 'test Questions 123',
          difficulty: 1,
          taggingQuestionsId: newTaggingArray[0].id
        }
      ]);
      const res = await request(app)
        .get('/api/v1/admin/tagging/search?searchText=Left Ventricle')
        .expect(httpStatus.OK);

      expect(res.body.data).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(String),
            title: expect.any(String),
            description: expect.any(String),
            difficulty: expect.any(Number),
            QuestionsAnswers: [],
            TaggingQuestions: expect.objectContaining({
              id: expect.any(String),
              tag: expect.any(String),
              description: expect.any(String)
            })
          })
        ])
      );
    });
  });
});
