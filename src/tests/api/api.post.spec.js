import { test, expect } from '@playwright/test';
import qaEnv from '../../config/qa.environment.js';
import testData from '../../data/testData.json' assert { type: 'json' };
import { createBooking, deleteBooking, createToken } from '../../utils/apiHelper.js';

test.describe('POST /booking', () => {
  let bookingId;
  let token;

  test.beforeAll(async () => {
    token = await createToken(qaEnv.apiBaseUrl, qaEnv.admin.username, qaEnv.admin.password);
  });

  test('should create a new booking', async () => {
    const { response, json } = await createBooking(qaEnv.apiBaseUrl, testData.booking);
    expect(response.status()).toBe(200);
    expect(json.booking).toMatchObject(testData.booking);
    bookingId = json.bookingid;
  });

  test.afterAll(async () => {
    if (bookingId) {
      const response = await deleteBooking(qaEnv.apiBaseUrl, bookingId, token);
      expect(response.status()).toBe(201);
    }
  });
});