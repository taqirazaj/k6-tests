import { loginUser } from '../apis/apiUser.js';
import { checkLoginResponse } from '../utils/checksLogin.js';
import { loginPayload } from '../payload/loginPayload.js';
import { sleep } from 'k6';

// export const options = {
//   vus: 2,         // 2 virtual users
//   iterations: 10, // total iterations across all VUs
// };


export default function () {
  const loginRes = loginUser(loginPayload);
  checkLoginResponse(loginRes.res)
  sleep(1);
}
