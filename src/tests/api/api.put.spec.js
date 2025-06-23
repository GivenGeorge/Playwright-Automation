import { test, expect, request } from '@playwright/test';
import qaEnv from '../../config/qa.environment.js';
import testData from '../../data/testData.json' assert { type: 'json' };
import { createBooking, deleteBooking, createToken } from '../../utils/apiHelper.js';

test.describe('PUT /booking/:id', () => {
  let bookingId;
  let token;

  test.beforeAll(async () => {
    token = await createToken(qaEnv.apiBaseUrl, qaEnv.admin.username, qaEnv.admin.password);
    const { json } = await createBooking(qaEnv.apiBaseUrl, testData.booking);
    bookingId = json.bookingid;
  });

  test('should update the booking', async () => {
    const apiContext = await request.newContext({ baseURL: qaEnv.apiBaseUrl });
    const response = await apiContext.put(`/booking/${bookingId}`, {
      data: testData.updatedBooking,
      headers: { Cookie: `token=${token}` }
    });
    expect(response.status()).toBe(200);
    const booking = await response.json();
    expect(booking.firstname).toBe(testData.updatedBooking.firstname);
    expect(booking.lastname).toBe(testData.updatedBooking.lastname);
    expect(booking.totalprice).toBe(testData.updatedBooking.totalprice);
    expect(booking.depositpaid).toBe(testData.updatedBooking.depositpaid);
    expect(booking.bookingdates.checkin).toBe(testData.updatedBooking.bookingdates.checkin);
    expect(booking.bookingdates.checkout).toBe(testData.updatedBooking.bookingdates.checkout);
    expect(booking.additionalneeds).toBe(testData.updatedBooking.additionalneeds);
    await apiContext.dispose();
  });

  test.afterAll(async () => {
    if (bookingId) {
      const response = await deleteBooking(qaEnv.apiBaseUrl, bookingId, token);
      expect(response.status()).toBe(201);
    }
  });
});