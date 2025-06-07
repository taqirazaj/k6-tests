import http from "k6/http";
import { BASE_URL, HEADERS } from "../config.js";

export function loginUser(payload) {
  const url = `${BASE_URL}/api/users/token/login?set_cookie=true`;
  const res = http.post(url, JSON.stringify(payload), {
    headers: HEADERS,
  });
  const responseBody = JSON.parse(res.body); // ✅ Fix here
  // Adjust the key according to your API response
  const token = responseBody.token;
  return { token, res };
}
