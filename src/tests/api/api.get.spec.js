import { test, expect, request } from '@playwright/test';
import qaEnv from '../../config/qa.environment.js';
import testData from '../../data/testData.json' assert { type: 'json' };
import { createBooking, deleteBooking, createToken } from '../../utils/apiHelper.js';

test.describe('GET /booking/:id', () => {
  let bookingId;
  let token;

  test.beforeAll(async () => {
    token = await createToken(qaEnv.apiBaseUrl, qaEnv.admin.username, qaEnv.admin.password);
    const { json } = await createBooking(qaEnv.apiBaseUrl, testData.booking);
    bookingId = json.bookingid;
  });

  test('should retrieve the created booking', async () => {
    const apiContext = await request.newContext({ baseURL: qaEnv.apiBaseUrl });
    const response = await apiContext.get(`/booking/${bookingId}`);
    expect(response.status()).toBe(200);
    const booking = await response.json();
    expect(booking.firstname).toBe(testData.booking.firstname);
    expect(booking.lastname).toBe(testData.booking.lastname);
    expect(booking.totalprice).toBe(testData.booking.totalprice);
    expect(booking.depositpaid).toBe(testData.booking.depositpaid);
    expect(booking.bookingdates.checkin).toBe(testData.booking.bookingdates.checkin);
    expect(booking.bookingdates.checkout).toBe(testData.booking.bookingdates.checkout);
    expect(booking.additionalneeds).toBe(testData.booking.additionalneeds);
    await apiContext.dispose();
  });

  test.afterAll(async () => {
    if (bookingId) {
      const response = await deleteBooking(qaEnv.apiBaseUrl, bookingId, token);
      expect(response.status()).toBe(201);
    }
  });
});