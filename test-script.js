import { loginUser } from './apis/user.js';
import { checkLoginResponse } from './utils/checks.js';
import { sleep } from 'k6';

export default function () {
  const payload = {
    username: 'default',
    password: '12345678',
  };

  const loginRes = loginUser(payload);
  checkLoginResponse(loginRes);
  sleep(1);
}
