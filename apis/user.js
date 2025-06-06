import http from 'k6/http';
import { BASE_URL, HEADERS } from '../config.js';

export function loginUser(payload) {
  const url = `${BASE_URL}/api/users/token/login?set_cookie=true`;
  return http.post(url, JSON.stringify(payload), HEADERS);
}

