import { loginUser } from '../apis/user.js';
import { checkLoginResponse } from '../utils/checks.js';
import { loginPayload } from '../payload/loginPayload.js';
import { sleep } from 'k6';

export default function () {
  const loginRes = loginUser(loginPayload);
  checkLoginResponse(loginRes);
  sleep(1);
}
