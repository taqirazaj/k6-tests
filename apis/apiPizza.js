import http from 'k6/http';
import { BASE_URL } from '../config.js';

export function postPizza(payload, token) {
  const url = `${BASE_URL}/api/pizza`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  return http.post(url, JSON.stringify(payload), { headers });
}
