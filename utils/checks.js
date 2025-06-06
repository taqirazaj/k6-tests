import { check } from 'k6';

export function checkLoginResponse(res) {
  return check(res, {
    'login status is 200': (r) => r.status === 200,
    'login response has token': (r) => r.json('token') !== undefined, // adjust key
  });
}

