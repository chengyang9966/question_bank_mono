import { faker } from '@faker-js/faker';
import { describe, expect, test, beforeEach } from '@jest/globals';
import httpStatus from 'http-status';
import request from 'supertest';
import app from '../../../../src/app';
import config from '../../../../src/config/config';
import { TokenType, User } from '@prisma/client';
import { tokenService } from '../../../../src/services';
import moment from 'moment';
import { admin, insertUsers, userOne } from '../../../fixtures/user.fixture';
import prisma from '../../../../src/client';
import setupTestDB from '../../../utils/setupTestDb';

setupTestDB();

describe('Admin Tagging V2 routes', () => {
  // Get All Tagging
  describe('GET /api/v2/admin/tagging', () => {
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

    test('should return 401 if no token provided', async () => {
      //  await insertTagging(newTaggingArray);
      const res = await request(app).get('/api/v2/admin/tagging').expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 401 if request is User', async () => {
      //  await insertTagging(newTaggingArray);
      await insertUsers([userOne]);
      const dbUserOne = (await prisma.user.findUnique({ where: { email: userOne.email } })) as User;
      const userOneAccessToken = tokenService.generateToken(
        dbUserOne.id,
        moment().add(config.jwt.accessExpirationMinutes, 'minutes'),
        TokenType.ACCESS
      );

      const res = await request(app)
        .get('/api/v2/admin/tagging')
        .set({
          Authorization: userOneAccessToken
        })
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 201 if request data is ok', async () => {
      //  await insertTagging(newTaggingArray);
      await insertUsers([admin]);
      const dbUserOne = (await prisma.user.findUnique({
        where: { email: admin.email }
      })) as User;
      console.log('🚀 ~ test ~ dbUserOne:', dbUserOne);

      const adminAccessToken = tokenService.generateToken(
        dbUserOne.id,
        moment().add(config.jwt.accessExpirationMinutes, 'minutes'),
        TokenType.ACCESS
      );
      console.log('🚀 ~ test ~ adminAccessToken:', adminAccessToken);

      const res = await request(app).get('/api/v2/admin/tagging').set({
        Authorization: adminAccessToken
      });
      // .expect(httpStatus.OK);
      console.log('🚀 ~ test ~ res:', res.body);
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
});

// Search Tagging
// Update Tagging
// Delete Tagging
