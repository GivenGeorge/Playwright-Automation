import { request } from '@playwright/test';

export async function createToken(apiBaseUrl, username, password) {
  const apiContext = await request.newContext({ baseURL: apiBaseUrl });
  const response = await apiContext.post('/auth', {
    data: { username, password }
  });
  if (!response.ok()) {
    await apiContext.dispose();
    throw new Error('Auth failed');
  }
  const json = await response.json(); 
  await apiContext.dispose();
  return json.token;
}

export async function createBooking(apiBaseUrl, booking) {
  const apiContext = await request.newContext({ baseURL: apiBaseUrl });
  const response = await apiContext.post('/booking', { data: booking });
  const json = await response.json(); 
  await apiContext.dispose();
  return { response, json };
}

export async function deleteBooking(apiBaseUrl, bookingId, token) {
  const apiContext = await request.newContext({ baseURL: apiBaseUrl });
  const response = await apiContext.delete(`/booking/${bookingId}`, {
    headers: { Cookie: `token=${token}` }
  });
  await apiContext.dispose();
  return response;
}