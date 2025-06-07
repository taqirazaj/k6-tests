import { check } from 'k6';

export function checkLoginResponse(res) {
  let parsedBody = {};

  // Safely parse JSON
  try {
    parsedBody = JSON.parse(res.body);
  } catch (e) {
    // Log or handle JSON parse error if needed
  }

  return check(res, {
    'login status is 200': (r) => r.status === 200,
    'login response has token': () => parsedBody.token !== undefined && parsedBody.token !== '',
  });
}
